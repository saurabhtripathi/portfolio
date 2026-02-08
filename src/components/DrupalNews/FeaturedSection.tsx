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

interface FeaturedSectionProps {
  articles: Article[];
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

const formatDate = (value: string): string => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const FeaturedSection: React.FC<FeaturedSectionProps> = ({ articles }) => {
  // Get top 6 featured articles (most recent from diverse sources)
  const featuredArticles = articles.slice(0, 6);

  if (featuredArticles.length === 0) {
    return null;
  }

  return (
    <section className="dn-section" id="featured">
      <div className="dn-section-header">
        <h2 className="dn-section-title">
          <span style={{ marginRight: '0.5rem' }}>⭐</span>
          Featured Stories
        </h2>
        <span className="dn-section-subtitle">Editor's picks from across the Drupal ecosystem</span>
      </div>

      <div className="dn-featured-grid">
        {featuredArticles.map((article, index) => (
          <article 
            key={article.id} 
            className={`dn-featured-card ${index === 0 ? 'dn-featured-card-large' : ''}`}
          >
            <div 
              className="dn-featured-card-image"
              style={{
                background: `linear-gradient(135deg, ${getSourceColor(article.sourceId)} 0%, ${getSourceColor(article.sourceId)}88 100%)`,
              }}
            >
              <span className="dn-featured-card-badge">Featured</span>
              <div className="dn-featured-card-icon">
                <svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor" opacity="0.3">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
              </div>
            </div>
            <div className="dn-featured-card-content">
              <div className="dn-featured-card-source" style={{ color: getSourceColor(article.sourceId) }}>
                {article.sourceName}
              </div>
              <h3 className="dn-featured-card-title">
                <a href={article.link} target="_blank" rel="noopener noreferrer">
                  {article.title}
                </a>
              </h3>
              {article.summary && index === 0 && (
                <p className="dn-featured-card-excerpt">
                  {article.summary.slice(0, 150)}...
                </p>
              )}
              <div className="dn-featured-card-meta">
                {formatDate(article.publishedAt)}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default FeaturedSection;
