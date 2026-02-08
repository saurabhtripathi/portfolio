import React from 'react';

interface Source {
  id: string;
  name: string;
  siteUrl: string;
  pageUrl: string;
}

interface CategoryTabsProps {
  sources: Source[];
  activeSource: string | null;
  onSourceChange: (sourceId: string | null) => void;
  articleCounts: Record<string, number>;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({
  sources,
  activeSource,
  onSourceChange,
  articleCounts,
}) => {
  return (
    <div className="dn-category-bar">
      <div className="dn-category-tabs">
        <button
          className={`dn-category-tab ${activeSource === null ? 'active' : ''}`}
          onClick={() => onSourceChange(null)}
        >
          All Sources ({Object.values(articleCounts).reduce((a, b) => a + b, 0)})
        </button>
        {sources.map((source) => (
          <button
            key={source.id}
            className={`dn-category-tab ${activeSource === source.id ? 'active' : ''}`}
            onClick={() => onSourceChange(source.id)}
          >
            {source.name} ({articleCounts[source.id] || 0})
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryTabs;
