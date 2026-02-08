import React from 'react';

interface Source {
  id: string;
  name: string;
  siteUrl: string;
  pageUrl: string;
}

interface FooterProps {
  sources: Source[];
}

const Footer: React.FC<FooterProps> = ({ sources }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="dn-footer">
      <div className="dn-footer-inner">
        <div>
          <div className="dn-footer-brand">Drupal Media</div>
          <p className="dn-footer-desc">
            Your curated source for the latest Drupal news, tutorials, and community updates.
            Aggregating content from the most trusted voices in the Drupal ecosystem.
          </p>
        </div>

        <div>
          <h4 className="dn-footer-title">Sources</h4>
          <div className="dn-footer-links">
            {sources.slice(0, 5).map((source) => (
              <a
                key={source.id}
                href={source.siteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="dn-footer-link"
              >
                {source.name}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="dn-footer-title">Drupal Resources</h4>
          <div className="dn-footer-links">
            <a href="https://www.drupal.org" target="_blank" rel="noopener noreferrer" className="dn-footer-link">
              Drupal.org
            </a>
            <a href="https://www.drupal.org/docs" target="_blank" rel="noopener noreferrer" className="dn-footer-link">
              Documentation
            </a>
            <a href="https://www.drupal.org/project/project_module" target="_blank" rel="noopener noreferrer" className="dn-footer-link">
              Modules
            </a>
            <a href="https://www.drupal.org/community" target="_blank" rel="noopener noreferrer" className="dn-footer-link">
              Community
            </a>
            <a href="https://events.drupal.org" target="_blank" rel="noopener noreferrer" className="dn-footer-link">
              Events
            </a>
          </div>
        </div>

        <div>
          <h4 className="dn-footer-title">Connect</h4>
          <div className="dn-footer-links">
            <a href="https://twitter.com/drupal" target="_blank" rel="noopener noreferrer" className="dn-footer-link">
              Twitter / X
            </a>
            <a href="https://www.drupal.org/slack" target="_blank" rel="noopener noreferrer" className="dn-footer-link">
              Drupal Slack
            </a>
            <a href="https://www.reddit.com/r/drupal" target="_blank" rel="noopener noreferrer" className="dn-footer-link">
              Reddit
            </a>
            <a href="https://www.linkedin.com/company/drupal-association" target="_blank" rel="noopener noreferrer" className="dn-footer-link">
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      <div className="dn-footer-bottom">
        <div>© {currentYear} Drupal Media. All rights reserved.</div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <span>Built with React</span>
          <span>•</span>
          <span>Powered by Open Source</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
