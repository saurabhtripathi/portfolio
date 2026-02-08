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

  // Check if mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 640;

  return (
    <header className="dn-header">
      {/* Top Bar - Hidden on mobile via CSS */}
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
            <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
          </div>
          <div>
            <div className="dn-logo-text">Drupal Media</div>
            <div className="dn-logo-tagline">Your Drupal News Digest</div>
          </div>
        </div>

        <nav className="dn-nav">
          {/* Mobile: Show Home button prominently */}
          <button
            onClick={onNavigateHome}
            className="dn-nav-link"
            style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            ← Portfolio
          </button>
          <a href="#latest" className="dn-nav-link active">Latest</a>
          <a href="#videos" className="dn-nav-link">Videos</a>
          <a href="#community" className="dn-nav-link">Community</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
