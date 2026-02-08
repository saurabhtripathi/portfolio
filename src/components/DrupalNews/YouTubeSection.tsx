import React from 'react';

// Featured videos from Drupal Media YouTube channel
// Channel: https://www.youtube.com/@drupalmedia8824
const FEATURED_VIDEOS = [
  {
    id: 'dQw4w9WgXcQ', // Replace with actual Drupal Media video IDs
    title: 'Getting Started with Drupal',
  },
  {
    id: 'jNQXAC9IVRw',
    title: 'Drupal Module Development',
  },
];

const YouTubeSection: React.FC = () => {
  return (
    <section className="dn-section dn-youtube-section" id="videos">
      <div className="dn-section-header">
        <h2 className="dn-section-title">
          <span style={{ marginRight: '0.5rem', color: '#ff0000' }}>▶</span>
          Drupal Media Videos
        </h2>
        <a
          href="https://www.youtube.com/@drupalmedia8824"
          target="_blank"
          rel="noopener noreferrer"
          className="dn-section-link"
        >
          View Channel →
        </a>
      </div>
      
      <div className="dn-youtube-grid">
        {/* Main Channel Embed - Using channel's video feed */}
        <div className="dn-youtube-main">
          <div className="dn-youtube-embed">
            <iframe
              src="https://www.youtube.com/embed?listType=playlist&list=UULFdrupalmedia8824"
              title="Drupal Media - Latest Videos"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          <div className="dn-youtube-info">
            <h3>Latest from Drupal Media</h3>
            <p>Watch the latest Drupal tutorials, DrupalCon talks, and community updates.</p>
          </div>
        </div>

        {/* Sidebar with subscribe and info */}
        <div className="dn-youtube-sidebar">
          {/* Channel Preview Card */}
          <div className="dn-youtube-card">
            <div className="dn-youtube-channel-preview">
              <div className="dn-youtube-channel-avatar">
                <svg viewBox="0 0 24 24" width="48" height="48" fill="#0678be">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
              </div>
              <div className="dn-youtube-channel-info">
                <h4>Drupal Media</h4>
                <p>@drupalmedia8824</p>
                <span className="dn-youtube-channel-stats">Drupal tutorials & news</span>
              </div>
            </div>
          </div>

          {/* Subscribe Button */}
          <div className="dn-youtube-subscribe">
            <a
              href="https://www.youtube.com/@drupalmedia8824?sub_confirmation=1"
              target="_blank"
              rel="noopener noreferrer"
              className="dn-btn dn-btn-youtube"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              Subscribe to Channel
            </a>
            <p className="dn-youtube-channel-desc">
              Join our community for weekly Drupal content, DrupalCon coverage, and the latest from the ecosystem.
            </p>
          </div>

          {/* Quick Links */}
          <div className="dn-youtube-links">
            <a href="https://www.youtube.com/@drupalmedia8824/videos" target="_blank" rel="noopener noreferrer">
              📺 All Videos
            </a>
            <a href="https://www.youtube.com/@drupalmedia8824/playlists" target="_blank" rel="noopener noreferrer">
              📁 Playlists
            </a>
            <a href="https://www.youtube.com/@drupalmedia8824/community" target="_blank" rel="noopener noreferrer">
              💬 Community
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YouTubeSection;
