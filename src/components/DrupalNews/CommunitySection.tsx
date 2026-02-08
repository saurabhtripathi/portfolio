import React from 'react';

const COMMUNITY_RESOURCES = [
  {
    id: 'drupal-slack',
    title: 'Drupal Slack',
    description: 'Join 30,000+ Drupal developers in real-time chat. Get help, share knowledge, and connect with the community.',
    link: 'https://www.drupal.org/slack',
    icon: '💬',
    color: '#4A154B',
  },
  {
    id: 'drupal-answers',
    title: 'Drupal Answers',
    description: 'Stack Exchange community for Drupal questions. Find solutions to common problems and share your expertise.',
    link: 'https://drupal.stackexchange.com/',
    icon: '❓',
    color: '#F48024',
  },
  {
    id: 'drupalcon',
    title: 'DrupalCon',
    description: 'The official Drupal conference. Attend sessions, sprints, and networking events with the global community.',
    link: 'https://events.drupal.org/drupalcon',
    icon: '🎪',
    color: '#0678be',
  },
  {
    id: 'drupal-association',
    title: 'Drupal Association',
    description: 'The non-profit organization behind Drupal. Support the project and help shape its future.',
    link: 'https://www.drupal.org/association',
    icon: '🏛️',
    color: '#0678be',
  },
  {
    id: 'local-groups',
    title: 'Local User Groups',
    description: 'Find Drupal meetups and user groups in your area. Connect with developers near you.',
    link: 'https://www.drupal.org/community/local-groups',
    icon: '📍',
    color: '#2e8555',
  },
  {
    id: 'contribute',
    title: 'Contribute to Drupal',
    description: 'Get involved! Contribute code, documentation, translations, or help with issue queues.',
    link: 'https://www.drupal.org/contribute',
    icon: '🤝',
    color: '#c41e3a',
  },
];

const COMMUNITY_STATS = [
  { label: 'Contributors', value: '100,000+' },
  { label: 'Modules', value: '50,000+' },
  { label: 'Countries', value: '200+' },
  { label: 'Years', value: '20+' },
];

const CommunitySection: React.FC = () => {
  return (
    <section className="dn-section dn-community-section" id="community">
      <div className="dn-section-header">
        <h2 className="dn-section-title">
          <span style={{ marginRight: '0.5rem' }}>🌍</span>
          Drupal Community
        </h2>
        <a
          href="https://www.drupal.org/community"
          target="_blank"
          rel="noopener noreferrer"
          className="dn-section-link"
        >
          Explore Community →
        </a>
      </div>

      {/* Community Stats */}
      <div className="dn-community-stats">
        {COMMUNITY_STATS.map((stat) => (
          <div key={stat.label} className="dn-community-stat">
            <div className="dn-community-stat-value">{stat.value}</div>
            <div className="dn-community-stat-label">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Community Resources Grid */}
      <div className="dn-community-grid">
        {COMMUNITY_RESOURCES.map((resource) => (
          <a
            key={resource.id}
            href={resource.link}
            target="_blank"
            rel="noopener noreferrer"
            className="dn-community-card"
          >
            <div 
              className="dn-community-card-icon"
              style={{ background: `${resource.color}15` }}
            >
              <span style={{ fontSize: '2rem' }}>{resource.icon}</span>
            </div>
            <div className="dn-community-card-content">
              <h3 className="dn-community-card-title">{resource.title}</h3>
              <p className="dn-community-card-desc">{resource.description}</p>
            </div>
            <div className="dn-community-card-arrow">→</div>
          </a>
        ))}
      </div>

      {/* Call to Action */}
      <div className="dn-community-cta">
        <h3>Ready to get involved?</h3>
        <p>The Drupal community welcomes contributors of all skill levels. Whether you code, write, design, or organize - there's a place for you.</p>
        <div className="dn-community-cta-buttons">
          <a 
            href="https://www.drupal.org/community/contributor-guide" 
            target="_blank" 
            rel="noopener noreferrer"
            className="dn-btn dn-btn-primary"
          >
            Start Contributing
          </a>
          <a 
            href="https://www.drupal.org/slack" 
            target="_blank" 
            rel="noopener noreferrer"
            className="dn-btn dn-btn-secondary"
          >
            Join Slack
          </a>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
