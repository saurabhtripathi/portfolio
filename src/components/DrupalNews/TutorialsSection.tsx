import React from 'react';

const TUTORIALS = [
  {
    id: 'getting-started',
    title: 'Getting Started with Drupal',
    description: 'Your first steps into the Drupal ecosystem. Learn installation, basic concepts, and site building fundamentals.',
    link: 'https://www.drupal.org/docs/getting-started',
    level: 'Beginner',
    levelColor: '#2e8555',
    icon: '🚀',
    topics: ['Installation', 'Admin UI', 'Content Types'],
  },
  {
    id: 'theming',
    title: 'Drupal Theming Guide',
    description: 'Master Twig templating, create custom themes, and learn CSS/JS integration in Drupal.',
    link: 'https://www.drupal.org/docs/theming-drupal',
    level: 'Intermediate',
    levelColor: '#f5a623',
    icon: '🎨',
    topics: ['Twig', 'CSS', 'Theme Hooks'],
  },
  {
    id: 'module-dev',
    title: 'Custom Module Development',
    description: 'Build your own Drupal modules. Learn hooks, plugins, services, and the Drupal API.',
    link: 'https://www.drupal.org/docs/creating-modules',
    level: 'Advanced',
    levelColor: '#c41e3a',
    icon: '⚙️',
    topics: ['Hooks', 'Plugins', 'Services'],
  },
  {
    id: 'drupalize-me',
    title: 'Drupalize.Me Tutorials',
    description: 'Premium video tutorials covering everything from basics to advanced development techniques.',
    link: 'https://drupalize.me/',
    level: 'All Levels',
    levelColor: '#0678be',
    icon: '📺',
    topics: ['Video', 'Comprehensive', 'Updated'],
  },
  {
    id: 'api-first',
    title: 'API-First Drupal',
    description: 'Build decoupled applications with JSON:API, GraphQL, and REST. Power React, Vue, or mobile apps.',
    link: 'https://www.drupal.org/docs/core-modules-and-themes/core-modules/jsonapi-module',
    level: 'Advanced',
    levelColor: '#c41e3a',
    icon: '🔌',
    topics: ['JSON:API', 'REST', 'Headless'],
  },
  {
    id: 'migrations',
    title: 'Content Migrations',
    description: 'Migrate content from other CMSs or Drupal versions. Master the Migrate API and tools.',
    link: 'https://www.drupal.org/docs/upgrading-drupal',
    level: 'Intermediate',
    levelColor: '#f5a623',
    icon: '📦',
    topics: ['Migrate API', 'Upgrades', 'ETL'],
  },
];

const LEARNING_PATHS = [
  {
    title: 'Site Builder',
    description: 'Learn to build websites without coding',
    duration: '2-4 weeks',
    icon: '🏗️',
  },
  {
    title: 'Themer',
    description: 'Create beautiful custom themes',
    duration: '4-6 weeks',
    icon: '🎨',
  },
  {
    title: 'Developer',
    description: 'Build custom modules and applications',
    duration: '8-12 weeks',
    icon: '💻',
  },
];

const TutorialsSection: React.FC = () => {
  return (
    <section className="dn-section dn-tutorials-section" id="tutorials">
      <div className="dn-section-header">
        <h2 className="dn-section-title">
          <span style={{ marginRight: '0.5rem' }}>📚</span>
          Learn Drupal
        </h2>
        <a
          href="https://www.drupal.org/docs"
          target="_blank"
          rel="noopener noreferrer"
          className="dn-section-link"
        >
          Full Documentation →
        </a>
      </div>

      {/* Learning Paths */}
      <div className="dn-learning-paths">
        <h3 className="dn-learning-paths-title">Choose Your Path</h3>
        <div className="dn-learning-paths-grid">
          {LEARNING_PATHS.map((path) => (
            <div key={path.title} className="dn-learning-path">
              <span className="dn-learning-path-icon">{path.icon}</span>
              <h4>{path.title}</h4>
              <p>{path.description}</p>
              <span className="dn-learning-path-duration">{path.duration}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tutorials Grid */}
      <div className="dn-tutorials-grid">
        {TUTORIALS.map((tutorial) => (
          <a
            key={tutorial.id}
            href={tutorial.link}
            target="_blank"
            rel="noopener noreferrer"
            className="dn-tutorial-card"
          >
            <div className="dn-tutorial-card-header">
              <span className="dn-tutorial-card-icon">{tutorial.icon}</span>
              <span 
                className="dn-tutorial-card-level"
                style={{ background: `${tutorial.levelColor}20`, color: tutorial.levelColor }}
              >
                {tutorial.level}
              </span>
            </div>
            <h3 className="dn-tutorial-card-title">{tutorial.title}</h3>
            <p className="dn-tutorial-card-desc">{tutorial.description}</p>
            <div className="dn-tutorial-card-topics">
              {tutorial.topics.map((topic) => (
                <span key={topic} className="dn-tutorial-card-topic">{topic}</span>
              ))}
            </div>
          </a>
        ))}
      </div>

      {/* Resources Footer */}
      <div className="dn-tutorials-resources">
        <h3>More Learning Resources</h3>
        <div className="dn-tutorials-resources-links">
          <a href="https://www.drupal.org/docs" target="_blank" rel="noopener noreferrer">
            📖 Official Docs
          </a>
          <a href="https://drupalize.me/" target="_blank" rel="noopener noreferrer">
            🎬 Drupalize.Me
          </a>
          <a href="https://www.youtube.com/@drupalmedia8824" target="_blank" rel="noopener noreferrer">
            📺 YouTube
          </a>
          <a href="https://drupal.stackexchange.com/" target="_blank" rel="noopener noreferrer">
            ❓ Stack Exchange
          </a>
        </div>
      </div>
    </section>
  );
};

export default TutorialsSection;
