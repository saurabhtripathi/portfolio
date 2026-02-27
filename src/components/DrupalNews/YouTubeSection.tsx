import React from 'react';

// Featured Drupal videos
const FEATURED_VIDEOS = [
  {
    id: '9EiVLvrNFpk',
    title: 'Drupal CMS - The Official Introduction',
  },
  {
    id: 'GMSErG3OnnI',
    title: 'DrupalCon - Driesnote',
  },
  {
    id: 'kZvGOhdIkJc',
    title: 'Drupal Starshot Initiative',
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
          href="https://www.youtube.com/@DrupalAssociation"
          target="_blank"
          rel="noopener noreferrer"
          className="dn-section-link"
        >
          View Channel →
        </a>
      </div>
      
      <div className="dn-youtube-grid">
        {/* Main Video Embed */}
        <div className="dn-youtube-main">
          <div className="dn-youtube-embed">
            <iframe
              src={`https://www.youtube.com/embed/${FEATURED_VIDEOS[0].id}`}
              title={FEATURED_VIDEOS[0].title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          <div className="dn-youtube-info">
            <h3>{FEATURED_VIDEOS[0].title}</h3>
            <p>Watch the latest Drupal tutorials, DrupalCon talks, and community updates.</p>
          </div>
        </div>

        {/* Sidebar with more videos and subscribe */}
        <div className="dn-youtube-sidebar">
          {/* More Videos */}
          {FEATURED_VIDEOS.slice(1).map((video) => (
            <div key={video.id} className="dn-youtube-card" style={{ marginBottom: '1rem' }}>
              <div className="dn-youtube-embed" style={{ aspectRatio: '16/9', borderRadius: '8px', overflow: 'hidden' }}>
                <iframe
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  style={{ width: '100%', height: '100%', border: 'none' }}
                />
              </div>
              <p style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: '#ccc' }}>{video.title}</p>
            </div>
          ))}

          {/* Subscribe Button */}
          <div className="dn-youtube-subscribe">
            <a
              href="https://www.youtube.com/@DrupalAssociation?sub_confirmation=1"
              target="_blank"
              rel="noopener noreferrer"
              className="dn-btn dn-btn-youtube"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              Subscribe to Channel
            </a>
          </div>

          {/* Quick Links */}
          <div className="dn-youtube-links">
            <a href="https://www.youtube.com/@DrupalAssociation/videos" target="_blank" rel="noopener noreferrer">
              📺 All Videos
            </a>
            <a href="https://www.youtube.com/@DrupalAssociation/playlists" target="_blank" rel="noopener noreferrer">
              📁 Playlists
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YouTubeSection;
