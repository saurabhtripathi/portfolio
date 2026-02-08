import React from 'react';
import ArticleCard from './ArticleCard';

interface Article {
  id: string;
  title: string;
  link: string;
  publishedAt: string;
  summary: string;
  sourceId: string;
  sourceName: string;
}

interface Source {
  id: string;
  name: string;
  siteUrl: string;
  pageUrl: string;
}

interface SourceSectionProps {
  source: Source;
  articles: Article[];
  maxArticles?: number;
}

const SourceSection: React.FC<SourceSectionProps> = ({
  source,
  articles,
  maxArticles = 3,
}) => {
  const displayArticles = articles.slice(0, maxArticles);

  if (displayArticles.length === 0) {
    return null;
  }

  return (
    <section className="dn-section">
      <div className="dn-section-header">
        <h2 className="dn-section-title">{source.name}</h2>
        <a
          href={source.pageUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="dn-section-link"
        >
          View All →
        </a>
      </div>
      <div className="dn-articles-grid">
        {displayArticles.map((article) => (
          <ArticleCard key={article.id} article={article} variant="card" />
        ))}
      </div>
    </section>
  );
};

export default SourceSection;
