import React from 'react';

interface Article {
  id: string;
  title: string;
  link: string;
  publishedAt: string;
  summary: string;
  sourceId: string;
  sourceName: string;
}

interface FeaturedArticleProps {
  article: Article;
}

const formatDate = (value: string): string => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const truncateSummary = (text: string, maxLength: number = 200): string => {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
};

// Generate a color based on source ID
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

const FeaturedArticle: React.FC<FeaturedArticleProps> = ({ article }) => {
  return (
    <article className="dn-featured">
      <div
        className="dn-featured-placeholder"
        style={{
          background: `linear-gradient(135deg, ${getSourceColor(article.sourceId)} 0%, ${getSourceColor(article.sourceId)}88 100%)`,
        }}
      >
        <svg viewBox="0 0 24 24" width="80" height="80" fill="currentColor" opacity="0.3">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
        </svg>
      </div>
      <div className="dn-featured-content">
        <span
          className="dn-featured-source"
          style={{ background: getSourceColor(article.sourceId) }}
        >
          {article.sourceName}
        </span>
        <h2 className="dn-featured-title">
          <a href={article.link} target="_blank" rel="noopener noreferrer">
            {article.title}
          </a>
        </h2>
        <p className="dn-featured-excerpt">
          {truncateSummary(article.summary, 280)}
        </p>
        <div className="dn-featured-meta">
          <span>{formatDate(article.publishedAt)}</span>
          <span>•</span>
          <a
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--dn-accent-primary)', textDecoration: 'none' }}
          >
            Read Article →
          </a>
        </div>
      </div>
    </article>
  );
};

export default FeaturedArticle;
