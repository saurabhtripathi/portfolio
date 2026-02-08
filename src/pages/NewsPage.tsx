import React, { useEffect, useMemo, useState } from 'react';

type NewsSource = {
  id: string;
  name: string;
  siteUrl: string;
  pageUrl: string;
};

type Article = {
  id: string;
  title: string;
  link: string;
  publishedAt: string;
  summary: string;
  sourceId: string;
  sourceName: string;
};

type NewsApiResponse = {
  updatedAt: string;
  sources: NewsSource[];
  articles: Article[];
  errors: Record<string, string>;
};

const NEWS_API_URL = process.env.REACT_APP_NEWS_API_URL || '/api/news';

const SOURCES: NewsSource[] = [
  {
    id: 'dries',
    name: 'Dries Buytaert',
    siteUrl: 'https://dri.es/',
    pageUrl: 'https://dri.es/',
  },
  {
    id: 'planet-drupal',
    name: 'Planet Drupal',
    siteUrl: 'https://www.drupal.org/planet',
    pageUrl: 'https://www.drupal.org/planet',
  },
  {
    id: 'lullabot',
    name: 'Lullabot',
    siteUrl: 'https://lullabot.com/',
    pageUrl: 'https://lullabot.com/articles',
  },
  {
    id: 'drupalize',
    name: 'Drupalize.Me',
    siteUrl: 'https://drupalize.me/',
    pageUrl: 'https://drupalize.me/blog',
  },
  {
    id: 'pantheon',
    name: 'Pantheon Blog',
    siteUrl: 'https://pantheon.io/',
    pageUrl: 'https://pantheon.io/blog',
  },
  {
    id: 'drupaleasy',
    name: 'DrupalEasy',
    siteUrl: 'https://drupaleasy.com/',
    pageUrl: 'https://drupaleasy.com/',
  },
  {
    id: 'wimleers',
    name: 'Wim Leers',
    siteUrl: 'https://wimleers.com/',
    pageUrl: 'https://wimleers.com/',
  },
];

const formatDate = (value: string): string => {
  if (!value) return 'Unknown date';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const NewsPage: React.FC<{ onNavigateHome: () => void }> = ({ onNavigateHome }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [sources, setSources] = useState<NewsSource[]>(SOURCES);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const loadFeeds = async () => {
    setLoading(true);
    try {
      const response = await fetch(NEWS_API_URL);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const data = (await response.json()) as NewsApiResponse;
      setArticles(data.articles || []);
      setSources(data.sources || SOURCES);
      setErrors(data.errors || {});
      setLastUpdated(data.updatedAt ? new Date(data.updatedAt) : new Date());
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to load news';
      setErrors({ global: message });
      setArticles([]);
      setLastUpdated(new Date());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFeeds();
  }, []);

  const sortedArticles = useMemo(() => {
    return [...articles].sort((a, b) => {
      const aTime = Date.parse(a.publishedAt) || 0;
      const bTime = Date.parse(b.publishedAt) || 0;
      return bTime - aTime;
    });
  }, [articles]);

  const articlesBySource = useMemo(() => {
    return sources.map((source) => {
      const items = sortedArticles.filter((article) => article.sourceId === source.id);
      return { source, items };
    });
  }, [sortedArticles, sources]);

  return (
    <div className="h-screen overflow-y-auto bg-[radial-gradient(circle_at_top,_#0f2a4a,_#071626_55%,_#050b14)] text-slate-100">
      <header className="border-b border-blue-900/60 bg-gradient-to-r from-[#071a2c] via-[#0b2340] to-[#071a2c]">
        <div className="mx-auto max-w-6xl px-6 py-6 flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-blue-300/70">Drupal Media</p>
              <h1 className="text-3xl font-semibold text-slate-100">Drupal Media</h1>
              <p className="text-blue-100/70 mt-1">
                A focused news stream from the Drupal ecosystem.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={onNavigateHome}
                className="text-sm px-4 py-2 rounded-md border border-blue-800/70 text-blue-100 hover:bg-blue-900/40 transition-colors"
              >
                Back to Portfolio
              </button>
              <button
                onClick={loadFeeds}
                className="text-sm px-4 py-2 rounded-md bg-blue-400 text-blue-950 font-medium hover:bg-blue-300 transition-colors"
              >
                Refresh
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 text-sm text-blue-200/70">
            <span>{sources.length} sources</span>
            <span>•</span>
            <span>{sortedArticles.length} articles</span>
            <span>•</span>
            <span>Updated {lastUpdated ? formatDate(lastUpdated.toISOString()) : 'just now'}</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8 rounded-xl border border-blue-900/60 bg-blue-950/60 p-4 text-blue-100/80 text-sm">
          This page uses a server-side scraper to read public article pages.
          Run the scraper with
          <span className="font-mono"> npm run start:news </span>
          and set
          <span className="font-mono"> REACT_APP_NEWS_API_URL </span>
          if the API is on another host.
        </div>

        {errors.global && (
          <div className="mb-6 rounded-xl border border-amber-400/50 bg-amber-500/10 p-4 text-amber-100 text-sm">
            Failed to load news: {errors.global}
          </div>
        )}

        <section className="mb-10">
          <h2 className="text-lg font-semibold text-blue-100 mb-4">Sources</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {sources.map((source) => (
              <a
                key={source.id}
                href={source.siteUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-blue-900/50 bg-blue-950/40 px-4 py-3 hover:border-blue-500/60 transition-colors"
              >
                <div className="text-blue-50 font-medium">{source.name}</div>
                <div className="text-xs text-blue-200/70 mt-1">{source.pageUrl}</div>
                {errors[source.id] && (
                  <div className="mt-2 text-xs text-amber-200">Source error: {errors[source.id]}</div>
                )}
              </a>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-blue-100 mb-4">Latest articles</h2>
          {loading ? (
            <div className="text-blue-200/80">Loading feeds...</div>
          ) : sortedArticles.length === 0 ? (
            <div className="text-blue-200/80">No articles yet. Try refresh or configure a proxy.</div>
          ) : (
            <div className="flex flex-col gap-10">
              {articlesBySource.map(({ source, items }) => (
                <div key={source.id} className="rounded-2xl border border-blue-900/40 bg-blue-950/30 p-5">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold text-blue-50">{source.name}</h3>
                      <p className="text-sm text-blue-200/70">{source.pageUrl}</p>
                    </div>
                    <a
                      href={source.siteUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-blue-200 hover:text-blue-100"
                    >
                      Visit source →
                    </a>
                  </div>

                  {items.length === 0 ? (
                    <div className="mt-4 text-blue-200/70 text-sm">
                      No articles yet for this source.
                    </div>
                  ) : (
                    <div className="mt-5 grid gap-5">
                      {items.map((article) => (
                        <article
                          key={article.id}
                          className="rounded-2xl border border-blue-900/40 bg-gradient-to-br from-blue-950/70 via-[#071b32] to-blue-950/40 p-6 shadow-[0_20px_40px_rgba(5,20,40,0.4)] hover:border-blue-400/60 transition-colors"
                        >
                          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-widest text-blue-200/60">
                            <span>{formatDate(article.publishedAt)}</span>
                          </div>
                          <h4 className="text-lg font-semibold text-blue-50 mt-3">
                            <a href={article.link} target="_blank" rel="noreferrer" className="hover:text-blue-200">
                              {article.title}
                            </a>
                          </h4>
                          {article.summary && (
                            <p className="text-blue-100/75 mt-3 leading-relaxed">
                              {article.summary}
                            </p>
                          )}
                          <div className="mt-4">
                            <a
                              href={article.link}
                              target="_blank"
                              rel="noreferrer"
                              className="text-sm text-blue-200 hover:text-blue-100"
                            >
                              Read article →
                            </a>
                          </div>
                        </article>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default NewsPage;
