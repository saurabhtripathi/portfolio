import React from 'react';

interface HeaderProps {
  onNavigateHome: () => void;
  onRefresh: () => void;
  lastUpdated: Date | null;
  articleCount: number;
  sourceCount: number;
}

const Header: React.FC<HeaderProps> = ({
  onNavigateHome,
  onRefresh,
  lastUpdated,
  articleCount,
  sourceCount,
}) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <header className="dn-header">
      {/* Top Bar */}
      <div className="dn-header-top">
        <div className="dn-header-top-inner">
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <span>{sourceCount} Sources</span>
            <span>•</span>
            <span>{articleCount} Articles</span>
            <span>•</span>
            <span>
              Updated {lastUpdated ? formatTime(lastUpdated) : 'just now'}
            </span>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button
              onClick={onRefresh}
              className="dn-btn-ghost"
              style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
            >
              ↻ Refresh
            </button>
            <button
              onClick={onNavigateHome}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                fontSize: '0.75rem',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                cursor: 'pointer',
                boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.2), 0 2px 4px -1px rgba(59, 130, 246, 0.1)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(59, 130, 246, 0.4), 0 4px 6px -2px rgba(59, 130, 246, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(59, 130, 246, 0.2), 0 2px 4px -1px rgba(59, 130, 246, 0.1)';
              }}
            >
              <span style={{ fontSize: '1rem' }}>👤</span>
              <span>About Developer</span>
              <span style={{ opacity: 0.7 }}>←</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="dn-header-main">
        <div className="dn-logo">
          <div className="dn-logo-icon">
            {/* Official Drupal Droplet Icon */}
            <svg viewBox="0 0 100 100" width="28" height="28" fill="currentColor">
              <path d="M50 5c-1.5 0-3 .5-4 1.5L15 45c-10 12-10 30 0 42 10 12 28 12 38 0l35-38.5c2-2 2-5 0-7L54 6.5c-1-1-2.5-1.5-4-1.5zm0 15l30 35c6 7 6 18 0 25s-16 7-22 0L35 55c-6-7-6-18 0-25l15-10z"/>
              <circle cx="50" cy="60" r="8"/>
            </svg>
          </div>
          <div>
            <div className="dn-logo-text">Drupal Media</div>
            <div className="dn-logo-tagline">Your Drupal News Digest</div>
          </div>
        </div>

        <nav className="dn-nav">
          <a href="#latest" className="dn-nav-link active">Latest</a>
          <a href="#featured" className="dn-nav-link">Featured</a>
          <a href="#videos" className="dn-nav-link">Videos</a>
          <a href="#community" className="dn-nav-link">Community</a>
          <a href="#tutorials" className="dn-nav-link">Tutorials</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
