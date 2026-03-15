const axios = require('axios');
const express = require('express');
const cors = require('cors');
const cheerio = require('cheerio');

const PORT = process.env.NEWS_SCRAPER_PORT || 3001;

const SOURCES = [
  {
    id: 'dries',
    name: 'Dries Buytaert',
    siteUrl: 'https://dri.es/',
    pageUrl: 'https://dri.es/',
    feedUrl: 'https://dri.es/rss.xml',
  },
  {
    id: 'planet-drupal',
    name: 'Planet Drupal',
    siteUrl: 'https://www.drupal.org/planet',
    pageUrl: 'https://www.drupal.org/planet',
    feedUrl: 'https://www.drupal.org/planet/rss.xml',
  },
  {
    id: 'lullabot',
    name: 'Lullabot',
    siteUrl: 'https://lullabot.com/',
    pageUrl: 'https://lullabot.com/articles',
    feedUrl: 'https://lullabot.com/rss/articles',
  },
  {
    id: 'drupalize',
    name: 'Drupalize.Me',
    siteUrl: 'https://drupalize.me/',
    pageUrl: 'https://drupalize.me/blog',
    feedUrl: 'https://drupalize.me/blog/feed',
  },
  {
    id: 'pantheon',
    name: 'Pantheon Blog',
    siteUrl: 'https://pantheon.io/',
    pageUrl: 'https://pantheon.io/blog',
    feedUrl: 'https://pantheon.io/blog/feed',
  },
  {
    id: 'drupaleasy',
    name: 'DrupalEasy',
    siteUrl: 'https://drupaleasy.com/',
    pageUrl: 'https://drupaleasy.com/',
    feedUrl: 'https://drupaleasy.com/rss.xml',
  },
  {
    id: 'wimleers',
    name: 'Wim Leers',
    siteUrl: 'https://wimleers.com/',
    pageUrl: 'https://wimleers.com/',
    feedUrl: 'https://wimleers.com/feed',
  },
];

const safeText = (value) => (value || '').replace(/\s+/g, ' ').trim();

const absoluteUrl = (base, link) => {
  if (!link) return base;
  try {
    return new URL(link, base).toString();
  } catch (error) {
    return link;
  }
};

const pickFirst = ($root, selectors, attr) => {
  for (const selector of selectors) {
    const node = $root.find(selector).first();
    if (!node.length) continue;
    if (attr) {
      const value = node.attr(attr);
      if (value) return value;
    } else {
      const value = safeText(node.text());
      if (value) return value;
    }
  }
  return '';
};

const parseDate = ($root, selectors) => {
  for (const selector of selectors) {
    const node = $root.find(selector).first();
    if (!node.length) continue;
    const datetime = node.attr('datetime');
    if (datetime) return datetime;
    const text = safeText(node.text());
    if (text) return text;
  }
  return '';
};

const stripHtml = (html) => safeText(html.replace(/<[^>]*>/g, ' '));

const parseRssItems = ($, source) => {
  const items = $('channel > item');
  return items.toArray().map((item, index) => {
    const $item = $(item);
    const title = safeText($item.find('title').first().text()) || 'Untitled';
    const link = safeText($item.find('link').first().text()) || source.siteUrl;
    const publishedAt =
      safeText($item.find('pubDate').first().text()) ||
      safeText($item.find('dc\\:date').first().text());
    const rawSummary =
      $item.find('content\\:encoded').first().text() ||
      $item.find('description').first().text();

    return {
      id: `${source.id}-${index}-${title.slice(0, 40).replace(/[^a-z0-9]+/gi, '-')}`,
      title,
      link,
      publishedAt,
      summary: stripHtml(rawSummary),
      sourceId: source.id,
      sourceName: source.name,
    };
  });
};

const parseAtomEntries = ($, source) => {
  const entries = $('entry');
  return entries.toArray().map((entry, index) => {
    const $entry = $(entry);
    const title = safeText($entry.find('title').first().text()) || 'Untitled';
    const linkNode =
      $entry.find('link[rel="alternate"]').first().length
        ? $entry.find('link[rel="alternate"]').first()
        : $entry.find('link').first();
    const link = linkNode.attr('href') || source.siteUrl;
    const publishedAt =
      safeText($entry.find('published').first().text()) ||
      safeText($entry.find('updated').first().text());
    const rawSummary =
      $entry.find('summary').first().text() ||
      $entry.find('content').first().text();

    return {
      id: `${source.id}-${index}-${title.slice(0, 40).replace(/[^a-z0-9]+/gi, '-')}`,
      title,
      link,
      publishedAt,
      summary: stripHtml(rawSummary),
      sourceId: source.id,
      sourceName: source.name,
    };
  });
};

const parseFeed = (xml, source) => {
  const $ = cheerio.load(xml, { xmlMode: true });
  const rssItems = parseRssItems($, source);
  if (rssItems.length) return rssItems;
  return parseAtomEntries($, source);
};

const extractArticles = (html, source, limit = 12) => {
  const $ = cheerio.load(html);
  const containers = [];

  const listSelectors = source.listSelectors || [
    'article',
    '.view-content .views-row',
    '.views-row',
  ];
  const titleSelectors = source.titleSelectors || ['h2 a', 'h3 a', '.title a', 'a'];
  const dateSelectors = source.dateSelectors || ['time[datetime]', 'time', '.date', '.submitted'];
  const summarySelectors = source.summarySelectors || ['.field--name-body', '.summary', 'p'];

  for (const selector of listSelectors) {
    const matches = $(selector).toArray();
    if (matches.length) {
      containers.push(...matches);
      break;
    }
  }

  if (!containers.length) {
    containers.push(...$('article').toArray());
  }

  const results = [];
  for (const element of containers) {
    if (results.length >= limit) break;
    const $item = $(element);
    const title = pickFirst($item, titleSelectors);
    const link = absoluteUrl(source.siteUrl, pickFirst($item, titleSelectors, 'href'));
    if (!title || !link) continue;
    const summary = pickFirst($item, summarySelectors);
    const publishedAt = parseDate($item, dateSelectors);

    results.push({
      id: `${source.id}-${results.length}-${title.slice(0, 40).replace(/[^a-z0-9]+/gi, '-')}`,
      title,
      link,
      publishedAt,
      summary,
      sourceId: source.id,
      sourceName: source.name,
    });
  }

  return results;
};

const fetchText = async (url, acceptHeader) => {
  const response = await axios.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      Accept: acceptHeader,
      'Accept-Language': 'en-US,en;q=0.9',
    },
    responseType: 'text',
    timeout: 15000,
  });
  return response.data;
};

const fetchHtml = async (url) =>
  fetchText(url, 'text/html,application/xhtml+xml');

const fetchFeed = async (url) =>
  fetchText(url, 'application/rss+xml, application/atom+xml, text/xml, application/xml');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/news', async (req, res) => {
  const sourceId = req.query.source;
  const activeSources = sourceId
    ? SOURCES.filter((source) => source.id === sourceId)
    : SOURCES;

  if (!activeSources.length) {
    return res.status(400).json({ error: 'Unknown source id.' });
  }

  const results = await Promise.allSettled(
    activeSources.map(async (source) => {
      if (source.feedUrl) {
        const xml = await fetchFeed(source.feedUrl);
        const parsed = parseFeed(xml, source);
        if (parsed.length > 0) return parsed;
      }
      if (!source.pageUrl) return [];
      const html = await fetchHtml(source.pageUrl);
      return extractArticles(html, source);
    })
  );

  const articles = [];
  const errors = {};
  results.forEach((result, index) => {
    const source = activeSources[index];
    if (result.status === 'fulfilled') {
      articles.push(...result.value);
    } else {
      errors[source.id] = result.reason?.message || 'Failed to parse source';
    }
  });

  articles.sort((a, b) => {
    const aTime = Date.parse(a.publishedAt) || 0;
    const bTime = Date.parse(b.publishedAt) || 0;
    return bTime - aTime;
  });

  res.set('Cache-Control', 'public, max-age=300');
  return res.json({
    updatedAt: new Date().toISOString(),
    sources: activeSources.map((source) => ({
      id: source.id,
      name: source.name,
      siteUrl: source.siteUrl,
      pageUrl: source.pageUrl,
    })),
    articles,
    errors,
  });
});

app.get('/api/news/health', (_req, res) => {
  res.json({ status: 'ok' });
});

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const RESUME_CONTEXT = `You are an AI assistant embedded in Saurabh Tripathi's VS Code-themed developer portfolio. Answer questions about Saurabh's professional background concisely and helpfully. Keep answers to 2-4 sentences. Sound professional but conversational.

About: Senior Solutions Architect, 14+ years experience, Singapore.
Email: saurabh.tripathi.cs@gmail.com | LinkedIn: linkedin.com/in/saurabh-tripathi

Certifications: Acquia Certified Developer Drupal 10 & 11, Acquia Grand Master Drupal 8 & 9 (Triple Certified).

Experience:
- Mediacorp (2019-Present): Lead architect for CNA, Berita, Seithi platforms. Headless Drupal + React. Led team of 8. 99.9% uptime, 40% faster loads.
- Acquia Inc (2016-2019): Enterprise Drupal for Fortune 500 clients. Integrations, technical leadership.
- Accenture (2013-2016): Custom Drupal modules, enterprise integrations, migrations.
- Various Agencies (2010-2013): PHP, MySQL, JavaScript.

Skills: Drupal 7-11 (95%), PHP (90%), React (85%), TypeScript (80%), JavaScript (90%), AWS (75%), Acquia Cloud (90%), Docker (80%), Salesforce, Elasticsearch, Redis.

Projects: CNA (Channel NewsAsia) millions of users; Berita Harian Malay news portal; Seithi Tamil news 50K+ users; Fortune 500 e-commerce $10M+ transactions.

If asked something not in the resume, suggest contacting Saurabh at saurabh.tripathi.cs@gmail.com.`;

app.post('/api/chat', async (req, res) => {
  try {
    const { message, history = [] } = req.body;
    if (!message) return res.status(400).json({ error: 'Message required' });

    const contents = [
      ...history.slice(-8).map((m) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
      })),
      { role: 'user', parts: [{ text: message }] },
    ];

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-lite-latest:generateContent?key=${GEMINI_API_KEY}`,
      {
        system_instruction: { parts: [{ text: RESUME_CONTEXT }] },
        contents,
        generationConfig: { maxOutputTokens: 512, temperature: 0.7 },
      }
    );

    const reply = response.data.candidates[0].content.parts[0].text;
    res.json({ reply });
  } catch (error) {
    console.error('Chat error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to get AI response.' });
  }
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Drupal Media scraper running on http://localhost:${PORT}`);
});
