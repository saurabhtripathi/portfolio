import React from 'react';
import ArticleCard from './ArticleCard';

interface Source {
  id: string;
  name: string;
  siteUrl: string;
  pageUrl: string;
}

interface Article {
  id: string;
  title: string;
  link: string;
  publishedAt: string;
  summary: string;
  sourceId: string;
  sourceName: string;
}

interface SidebarProps {
  sources: Source[];
  articles: Article[];
  activeSource: string | null;
  onSourceChange: (sourceId: string | null) => void;
  articleCounts: Record<string, number>;
}

const getSourceColor = (sourceId: string): string => {
  const colors: Record<string, string> = {
    'dries': '#0678be',
    'planet-drupal': '#0678be',
    'lullabot': '#ff6b35',
    'drupalize': '#00a86b',
    'pantheon': '#ffcc00',
    'drupaleasy': '#9b59b6',
    'wimleers': '#3498db',
  };
  return colors[sourceId] || '#c41e3a';
};

const Sidebar: React.FC<SidebarProps> = ({
  sources,
  articles,
  activeSource,
  onSourceChange,
  articleCounts,
}) => {
  // Get top 5 most recent articles for "Trending"
  const trendingArticles = articles.slice(0, 5);

  return (
    <aside className="dn-sidebar">
      {/* Sources Widget */}
      <div className="dn-sidebar-widget">
        <h3 className="dn-sidebar-title">Sources</h3>
        <div className="dn-source-list">
          <div
            className={`dn-source-item ${activeSource === null ? 'active' : ''}`}
            onClick={() => onSourceChange(null)}
          >
            <span className="dn-source-name">All Sources</span>
            <span className="dn-source-count">
              {Object.values(articleCounts).reduce((a, b) => a + b, 0)}
            </span>
          </div>
          {sources.map((source) => (
            <div
              key={source.id}
              className={`dn-source-item ${activeSource === source.id ? 'active' : ''}`}
              onClick={() => onSourceChange(source.id)}
              style={{
                borderLeft: activeSource !== source.id ? `3px solid ${getSourceColor(source.id)}` : undefined,
              }}
            >
              <span className="dn-source-name">{source.name}</span>
              <span className="dn-source-count">{articleCounts[source.id] || 0}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Widget */}
      <div className="dn-sidebar-widget">
        <h3 className="dn-sidebar-title">Trending Now</h3>
        <div className="dn-article-list">
          {trendingArticles.map((article, index) => (
            <ArticleCard
              key={article.id}
              article={article}
              variant="list"
              index={index}
            />
          ))}
        </div>
      </div>

      {/* About Widget */}
      <div className="dn-sidebar-widget">
        <h3 className="dn-sidebar-title">About Drupal Media</h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--dn-text-secondary)', lineHeight: 1.6 }}>
          Your curated feed of the latest news, tutorials, and insights from the Drupal community.
          We aggregate content from trusted sources to keep you informed.
        </p>
        <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {['#Drupal', '#OpenSource', '#CMS', '#PHP', '#WebDev'].map((tag) => (
            <span
              key={tag}
              style={{
                display: 'inline-block',
                padding: '0.25rem 0.5rem',
                background: 'var(--dn-bg-accent)',
                borderRadius: '4px',
                fontSize: '0.75rem',
                color: 'var(--dn-text-secondary)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
