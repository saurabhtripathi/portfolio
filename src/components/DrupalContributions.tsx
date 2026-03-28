import React from 'react';

interface Project {
  name: string;
  url: string;
  role: 'maintainer' | 'contributor';
  issues?: number;
}

interface DrupalContributionsProps {
  compact?: boolean;
  onViewAll?: () => void;
}

const DrupalContributions: React.FC<DrupalContributionsProps> = ({ compact = false, onViewAll }) => {
  const maintainedProjects: Project[] = [
    { name: 'AIML Parser', url: 'https://www.drupal.org/project/aiml', role: 'maintainer', issues: 11 },
    { name: 'Bulk delete 301', url: 'https://www.drupal.org/project/bulk_delete_301', role: 'maintainer', issues: 1 },
    { name: 'Country Specific Nodes', url: 'https://www.drupal.org/project/country_specific_nodes', role: 'maintainer', issues: 3 },
    { name: 'D.A.I.L.', url: 'https://www.drupal.org/project/dail', role: 'maintainer', issues: 1 },
    { name: 'drubot', url: 'https://www.drupal.org/project/drubot', role: 'maintainer', issues: 1 },
    { name: 'PasswordResetTabs', url: 'https://www.drupal.org/project/password_reset_tabs', role: 'maintainer', issues: 5 },
  ];

  const contributedProjects: Project[] = [
    { name: 'Drupal Core', url: 'https://www.drupal.org/project/drupal', role: 'contributor', issues: 4 },
    { name: 'Chaos Tool Suite (ctools)', url: 'https://www.drupal.org/project/ctools', role: 'contributor', issues: 1 },
    { name: 'Index Now', url: 'https://www.drupal.org/project/index_now', role: 'contributor', issues: 1 },
    { name: 'Contact Storage', url: 'https://www.drupal.org/project/contact_storage', role: 'contributor', issues: 1 },
    { name: 'Feeds', url: 'https://www.drupal.org/project/feeds', role: 'contributor', issues: 1 },
    { name: 'Lightning Media', url: 'https://www.drupal.org/project/lightning_media', role: 'contributor', issues: 1 },
    { name: 'Schema.org Metatag', url: 'https://www.drupal.org/project/schema_metatag', role: 'contributor', issues: 1 },
    { name: 'Video Embed Field', url: 'https://www.drupal.org/project/video_embed_field', role: 'contributor', issues: 1 },
  ];

  const stats = {
    totalIssues: 92,
    yearsOnDrupal: 13,
    maintainedProjects: 6,
    coreContributions: 4,
  };

  if (compact) {
    return (
      <div className="bg-[#1e1e1e] border border-[#3c3c3c] rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <span className="text-blue-400">💧</span> Open Source Contributions
          </h3>
          {onViewAll ? (
            <button
              onClick={onViewAll}
              className="text-xs text-blue-400 hover:text-blue-300"
            >
              View All Projects →
            </button>
          ) : (
            <a
              href="https://www.drupal.org/u/saurabhtripathics"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-400 hover:text-blue-300"
            >
              View Profile →
            </a>
          )}
        </div>
        
        <div className="grid grid-cols-4 gap-2 mb-3">
          <div className="text-center">
            <div className="text-lg font-bold text-blue-400">{stats.totalIssues}</div>
            <div className="text-[10px] text-gray-500">Issues</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-green-400">{stats.maintainedProjects}</div>
            <div className="text-[10px] text-gray-500">Maintained</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-purple-400">{stats.coreContributions}</div>
            <div className="text-[10px] text-gray-500">Core</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-yellow-400">{stats.yearsOnDrupal}+</div>
            <div className="text-[10px] text-gray-500">Years</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {maintainedProjects.slice(0, 3).map((project) => (
            <a
              key={project.name}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] bg-green-900/30 text-green-400 px-2 py-0.5 rounded hover:bg-green-900/50 transition-colors"
            >
              {project.name}
            </a>
          ))}
          <span className="text-[10px] text-gray-500">+{maintainedProjects.length - 3} more</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1e1e1e] border border-[#3c3c3c] rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <span className="text-blue-400">💧</span> Open Source Contributions
        </h3>
        <div className="flex items-center gap-3">
          {onViewAll && (
            <button
              onClick={onViewAll}
              className="text-sm text-green-400 hover:text-green-300 flex items-center gap-1"
            >
              View All Projects →
            </button>
          )}
          <a
            href="https://www.drupal.org/u/saurabhtripathics"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
          >
            Drupal.org Profile →
          </a>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6 p-4 bg-gray-800/50 rounded-lg">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-400">{stats.totalIssues}</div>
          <div className="text-xs text-gray-400">Issue Credits</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-400">{stats.maintainedProjects}</div>
          <div className="text-xs text-gray-400">Projects Maintained</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-400">{stats.coreContributions}</div>
          <div className="text-xs text-gray-400">Core Contributions</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-400">{stats.yearsOnDrupal}+</div>
          <div className="text-xs text-gray-400">Years on Drupal.org</div>
        </div>
      </div>

      {/* Maintained Projects */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-green-400 mb-2 flex items-center gap-2">
          <span>✓</span> Projects I Maintain
        </h4>
        <div className="flex flex-wrap gap-2">
          {maintainedProjects.map((project) => (
            <a
              key={project.name}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm bg-green-900/30 text-green-300 px-3 py-1 rounded-full hover:bg-green-900/50 transition-colors flex items-center gap-1"
            >
              {project.name}
              <span className="text-green-500 text-xs">({project.issues})</span>
            </a>
          ))}
        </div>
      </div>

      {/* Contributed Projects */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-blue-400 mb-2 flex items-center gap-2">
          <span>+</span> Notable Contributions
        </h4>
        <div className="flex flex-wrap gap-2">
          {contributedProjects.map((project) => (
            <a
              key={project.name}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm bg-blue-900/30 text-blue-300 px-3 py-1 rounded-full hover:bg-blue-900/50 transition-colors"
            >
              {project.name}
            </a>
          ))}
        </div>
      </div>

      {/* Additional Info */}
      <div className="text-xs text-gray-500 pt-4 border-t border-gray-700 flex flex-wrap gap-4">
        <span>✓ Security Advisory Coverage Eligible</span>
        <span>🎤 DrupalCon Asia 2016 Attendee</span>
        <a
          href="https://git.drupalcode.org/saurabhtripathics"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300"
        >
          View Git Commits →
        </a>
      </div>
    </div>
  );
};

export default DrupalContributions;
