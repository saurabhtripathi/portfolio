import React, { useEffect, useMemo, useState } from 'react';
import {
  Header,
  CategoryTabs,
  FeaturedArticle,
  ArticleCard,
  Sidebar,
  Footer,
  SourceSection,
  YouTubeSection,
  FeaturedSection,
  CommunitySection,
  TutorialsSection,
} from '../components/DrupalNews';
import '../styles/drupal-news.css';

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

const NEWS_API_URL = process.env.REACT_APP_NEWS_API_URL || 'http://localhost:3001/api/news';

const DEFAULT_SOURCES: NewsSource[] = [
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

const DrupalNewsPage: React.FC<{ onNavigateHome: () => void }> = ({ onNavigateHome }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [sources, setSources] = useState<NewsSource[]>(DEFAULT_SOURCES);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [activeSource, setActiveSource] = useState<string | null>(null);

  const loadFeeds = async () => {
    setLoading(true);
    try {
      // In production, skip the news API and just show the sources
      // The news scraper server is optional and runs locally
      if (process.env.NODE_ENV === 'production') {
        setSources(DEFAULT_SOURCES);
        setArticles([]);
        setLastUpdated(new Date());
        setLoading(false);
        return;
      }

      const response = await fetch(NEWS_API_URL);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const data = (await response.json()) as NewsApiResponse;
      setArticles(data.articles || []);
      setSources(data.sources || DEFAULT_SOURCES);
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

  // Sort articles by date (newest first)
  const sortedArticles = useMemo(() => {
    return [...articles].sort((a, b) => {
      const aTime = Date.parse(a.publishedAt) || 0;
      const bTime = Date.parse(b.publishedAt) || 0;
      return bTime - aTime;
    });
  }, [articles]);

  // Filter by active source
  const filteredArticles = useMemo(() => {
    if (!activeSource) return sortedArticles;
    return sortedArticles.filter((article) => article.sourceId === activeSource);
  }, [sortedArticles, activeSource]);

  // Count articles per source
  const articleCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    sources.forEach((source) => {
      counts[source.id] = sortedArticles.filter((a) => a.sourceId === source.id).length;
    });
    return counts;
  }, [sortedArticles, sources]);

  // Group articles by source for section view
  const articlesBySource = useMemo(() => {
    return sources.map((source) => ({
      source,
      articles: sortedArticles.filter((a) => a.sourceId === source.id),
    }));
  }, [sortedArticles, sources]);

  // Get featured articles (first 4 most recent)
  const featuredArticle = filteredArticles[0];
  const secondaryFeatured = filteredArticles.slice(1, 5);
  const remainingArticles = filteredArticles.slice(5);

  if (loading) {
    return (
      <div className="drupal-news-app">
        <Header
          onNavigateHome={onNavigateHome}
          onRefresh={loadFeeds}
          lastUpdated={null}
          articleCount={0}
          sourceCount={sources.length}
        />
        <div className="dn-loading">
          <div className="dn-loading-spinner"></div>
          <p>Loading the latest Drupal news...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="drupal-news-app">
      <Header
        onNavigateHome={onNavigateHome}
        onRefresh={loadFeeds}
        lastUpdated={lastUpdated}
        articleCount={sortedArticles.length}
        sourceCount={sources.length}
      />

      <CategoryTabs
        sources={sources}
        activeSource={activeSource}
        onSourceChange={setActiveSource}
        articleCounts={articleCounts}
      />

      <main className="dn-main">
        {/* Error Messages */}
        {errors.global && (
          <div className="dn-error">
            ⚠️ Failed to load news: {errors.global}
            <br />
            <small>Make sure the news server is running: <code>npm run start:news</code></small>
          </div>
        )}

        {filteredArticles.length === 0 && !errors.global && (
          <div className="dn-empty">
            <div className="dn-empty-icon">📭</div>
            <p>No articles found. Try selecting a different source.</p>
          </div>
        )}

        {/* Hero Featured Section */}
        {featuredArticle && (
          <div className="dn-layout-featured" id="latest">
            <FeaturedArticle article={featuredArticle} />
            <div className="dn-featured-secondary">
              {secondaryFeatured.map((article) => (
                <ArticleCard key={article.id} article={article} variant="small" />
              ))}
            </div>
          </div>
        )}

        {/* Featured Stories Section */}
        <FeaturedSection articles={sortedArticles} />

        {/* YouTube Section */}
        <YouTubeSection />

        {/* Community Section */}
        <CommunitySection />

        {/* Tutorials Section */}
        <TutorialsSection />

        {/* Main Content Layout */}
        <div className="dn-layout-grid">
          <div>
            {/* If showing all sources, display by section */}
            {!activeSource && articlesBySource.map(({ source, articles: sourceArticles }) => (
              <SourceSection
                key={source.id}
                source={source}
                articles={sourceArticles}
                maxArticles={3}
              />
            ))}

            {/* If filtering by source, show grid of remaining articles */}
            {activeSource && remainingArticles.length > 0 && (
              <section className="dn-section">
                <div className="dn-section-header">
                  <h2 className="dn-section-title">More Articles</h2>
                </div>
                <div className="dn-articles-grid">
                  {remainingArticles.map((article) => (
                    <ArticleCard key={article.id} article={article} variant="card" />
                  ))}
                </div>
              </section>
            )}
          </div>

          <Sidebar
            sources={sources}
            articles={sortedArticles}
            activeSource={activeSource}
            onSourceChange={setActiveSource}
            articleCounts={articleCounts}
          />
        </div>
      </main>

      <Footer sources={sources} />
    </div>
  );
};

export default DrupalNewsPage;
