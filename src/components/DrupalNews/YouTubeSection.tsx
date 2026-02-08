import React from 'react';

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
        <div className="dn-youtube-main">
          <div className="dn-youtube-embed">
            <iframe
              src="https://www.youtube.com/embed/MlejHClN_Q4"
              title="Drupal Meetup Pune - Drupal Media"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          <div className="dn-youtube-info">
            <h3>Drupal Meetup Pune</h3>
            <p>Community meetup session covering the latest in Drupal development and best practices.</p>
          </div>
        </div>

        <div className="dn-youtube-sidebar">
          <div className="dn-youtube-card">
            <div className="dn-youtube-embed-small">
              <iframe
                src="https://www.youtube.com/embed/A3pW0ucLnF8"
                title="RaspberryPi Security Camera"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="dn-youtube-card-info">
              <h4>RaspberryPi Experiment</h4>
              <p>Security Camera with Pi/Python</p>
            </div>
          </div>

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
              Join us for Drupal meetups, community updates, and tech experiments.
            </p>
          </div>

          <div className="dn-youtube-links">
            <a href="https://www.youtube.com/@drupalmedia8824/videos" target="_blank" rel="noopener noreferrer">
              📺 All Videos
            </a>
            <a href="https://www.youtube.com/@DrupalAssociation" target="_blank" rel="noopener noreferrer">
              🎪 Drupal Association
            </a>
            <a href="https://www.youtube.com/results?search_query=drupalcon+sessions" target="_blank" rel="noopener noreferrer">
              🔍 DrupalCon Sessions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YouTubeSection;
