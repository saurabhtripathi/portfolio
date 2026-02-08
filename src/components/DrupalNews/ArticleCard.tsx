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

interface ArticleCardProps {
  article: Article;
  variant?: 'card' | 'small' | 'list';
  index?: number;
}

const formatDate = (value: string): string => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  });
};

const truncateSummary = (text: string, maxLength: number = 120): string => {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
};

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

const ArticleCard: React.FC<ArticleCardProps> = ({ article, variant = 'card', index = 0 }) => {
  if (variant === 'small') {
    return (
      <article className="dn-featured-small">
        <div
          className="dn-featured-small-image"
          style={{
            background: `linear-gradient(135deg, ${getSourceColor(article.sourceId)} 0%, ${getSourceColor(article.sourceId)}88 100%)`,
          }}
        >
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" opacity="0.4">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
          </svg>
        </div>
        <div className="dn-featured-small-content">
          <div className="dn-featured-small-source" style={{ color: getSourceColor(article.sourceId) }}>
            {article.sourceName}
          </div>
          <h3 className="dn-featured-small-title">
            <a href={article.link} target="_blank" rel="noopener noreferrer">
              {article.title}
            </a>
          </h3>
        </div>
      </article>
    );
  }

  if (variant === 'list') {
    return (
      <article className="dn-article-list-item">
        <div className="dn-article-list-number">
          {String(index + 1).padStart(2, '0')}
        </div>
        <div className="dn-article-list-content">
          <div className="dn-article-list-source" style={{ color: getSourceColor(article.sourceId) }}>
            {article.sourceName}
          </div>
          <h3 className="dn-article-list-title">
            <a href={article.link} target="_blank" rel="noopener noreferrer">
              {article.title}
            </a>
          </h3>
        </div>
      </article>
    );
  }

  // Default card variant
  return (
    <article className="dn-article-card">
      <div
        className="dn-article-placeholder"
        style={{
          background: `linear-gradient(135deg, ${getSourceColor(article.sourceId)} 0%, ${getSourceColor(article.sourceId)}88 100%)`,
        }}
      >
        <svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor" opacity="0.3">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
        </svg>
      </div>
      <div className="dn-article-content">
        <div className="dn-article-source" style={{ color: getSourceColor(article.sourceId) }}>
          {article.sourceName}
        </div>
        <h3 className="dn-article-title">
          <a href={article.link} target="_blank" rel="noopener noreferrer">
            {article.title}
          </a>
        </h3>
        {article.summary && (
          <p className="dn-article-excerpt">
            {truncateSummary(article.summary)}
          </p>
        )}
        <div className="dn-article-meta">
          {formatDate(article.publishedAt)}
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;
