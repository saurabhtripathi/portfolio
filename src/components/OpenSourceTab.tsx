import React from 'react';

interface DrupalProject {
  name: string;
  machineName: string;
  description: string;
  role: 'maintainer' | 'contributor';
  issues: number;
  drupalUrl: string;
  gitUrl: string;
}

const OpenSourceTab: React.FC = () => {
  const maintainedProjects: DrupalProject[] = [
    {
      name: 'AIML Parser',
      machineName: 'aiml_parser',
      description: 'A module that provides AIML (Artificial Intelligence Markup Language) parsing capabilities for Drupal, enabling chatbot and conversational AI features.',
      role: 'maintainer',
      issues: 11,
      drupalUrl: 'https://www.drupal.org/project/aiml_parser',
      gitUrl: 'https://git.drupalcode.org/project/aiml_parser',
    },
    {
      name: 'Bulk delete 301',
      machineName: 'bulk_delete_301',
      description: 'Provides bulk operations to manage and delete 301 redirects efficiently in Drupal.',
      role: 'maintainer',
      issues: 1,
      drupalUrl: 'https://www.drupal.org/project/bulk_delete_301',
      gitUrl: 'https://git.drupalcode.org/project/bulk_delete_301',
    },
    {
      name: 'Country Specific Nodes',
      machineName: 'country_specific_nodes',
      description: 'Allows content to be displayed based on visitor\'s geographic location, enabling country-specific content delivery.',
      role: 'maintainer',
      issues: 3,
      drupalUrl: 'https://www.drupal.org/project/country_specific_nodes',
      gitUrl: 'https://git.drupalcode.org/project/country_specific_nodes',
    },
    {
      name: 'D.A.I.L.',
      machineName: 'dail',
      description: 'Drupal Artificial Intelligence Layer - provides AI integration capabilities for Drupal sites.',
      role: 'maintainer',
      issues: 1,
      drupalUrl: 'https://www.drupal.org/project/dail',
      gitUrl: 'https://git.drupalcode.org/project/dail',
    },
    {
      name: 'drubot',
      machineName: 'drubot',
      description: 'A chatbot module for Drupal that enables automated conversational interactions with site visitors.',
      role: 'maintainer',
      issues: 1,
      drupalUrl: 'https://www.drupal.org/project/drubot',
      gitUrl: 'https://git.drupalcode.org/project/drubot',
    },
    {
      name: 'PasswordResetTabs',
      machineName: 'password_reset_tabs',
      description: 'Enhances the password reset user experience with tabbed interface for better usability.',
      role: 'maintainer',
      issues: 5,
      drupalUrl: 'https://www.drupal.org/project/password_reset_tabs',
      gitUrl: 'https://git.drupalcode.org/project/password_reset_tabs',
    },
  ];

  const contributedProjects: DrupalProject[] = [
    {
      name: 'Drupal Core',
      machineName: 'drupal',
      description: 'The core Drupal CMS project. Contributed patches and bug fixes to improve the platform.',
      role: 'contributor',
      issues: 4,
      drupalUrl: 'https://www.drupal.org/project/drupal',
      gitUrl: 'https://git.drupalcode.org/project/drupal',
    },
    {
      name: 'Chaos Tool Suite (ctools)',
      machineName: 'ctools',
      description: 'A suite of APIs and tools for Drupal module developers.',
      role: 'contributor',
      issues: 1,
      drupalUrl: 'https://www.drupal.org/project/ctools',
      gitUrl: 'https://git.drupalcode.org/project/ctools',
    },
    {
      name: 'Index Now',
      machineName: 'index_now',
      description: 'Implements IndexNow protocol to instantly notify search engines about content changes.',
      role: 'contributor',
      issues: 1,
      drupalUrl: 'https://www.drupal.org/project/index_now',
      gitUrl: 'https://git.drupalcode.org/project/index_now',
    },
    {
      name: 'Contact Storage',
      machineName: 'contact_storage',
      description: 'Stores contact form submissions in the database for later review.',
      role: 'contributor',
      issues: 1,
      drupalUrl: 'https://www.drupal.org/project/contact_storage',
      gitUrl: 'https://git.drupalcode.org/project/contact_storage',
    },
    {
      name: 'Feeds',
      machineName: 'feeds',
      description: 'Import and aggregate content from RSS/Atom feeds and other sources.',
      role: 'contributor',
      issues: 1,
      drupalUrl: 'https://www.drupal.org/project/feeds',
      gitUrl: 'https://git.drupalcode.org/project/feeds',
    },
    {
      name: 'Global Redirect',
      machineName: 'globalredirect',
      description: 'Ensures clean URLs and proper redirects for SEO optimization.',
      role: 'contributor',
      issues: 1,
      drupalUrl: 'https://www.drupal.org/project/globalredirect',
      gitUrl: 'https://git.drupalcode.org/project/globalredirect',
    },
    {
      name: 'Lightning Media',
      machineName: 'lightning_media',
      description: 'Provides a rich media handling experience for the Lightning distribution.',
      role: 'contributor',
      issues: 1,
      drupalUrl: 'https://www.drupal.org/project/lightning_media',
      gitUrl: 'https://git.drupalcode.org/project/lightning_media',
    },
    {
      name: 'Schema.org Metatag',
      machineName: 'schema_metatag',
      description: 'Adds Schema.org structured data to pages using JSON-LD format.',
      role: 'contributor',
      issues: 1,
      drupalUrl: 'https://www.drupal.org/project/schema_metatag',
      gitUrl: 'https://git.drupalcode.org/project/schema_metatag',
    },
    {
      name: 'Video Embed Field',
      machineName: 'video_embed_field',
      description: 'Provides a field type for embedding videos from YouTube, Vimeo, and other providers.',
      role: 'contributor',
      issues: 1,
      drupalUrl: 'https://www.drupal.org/project/video_embed_field',
      gitUrl: 'https://git.drupalcode.org/project/video_embed_field',
    },
    {
      name: 'ShareThis',
      machineName: 'sharethis',
      description: 'Integrates ShareThis social sharing buttons into Drupal.',
      role: 'contributor',
      issues: 1,
      drupalUrl: 'https://www.drupal.org/project/sharethis',
      gitUrl: 'https://git.drupalcode.org/project/sharethis',
    },
    {
      name: 'Reroute Email',
      machineName: 'reroute_email',
      description: 'Reroutes outgoing emails to a configurable address for testing purposes.',
      role: 'contributor',
      issues: 1,
      drupalUrl: 'https://www.drupal.org/project/reroute_email',
      gitUrl: 'https://git.drupalcode.org/project/reroute_email',
    },
    {
      name: 'Quiz',
      machineName: 'quiz',
      description: 'A comprehensive quiz and assessment module for Drupal.',
      role: 'contributor',
      issues: 1,
      drupalUrl: 'https://www.drupal.org/project/quiz',
      gitUrl: 'https://git.drupalcode.org/project/quiz',
    },
    {
      name: 'Libraries API',
      machineName: 'libraries',
      description: 'Provides a common API for managing external libraries in Drupal.',
      role: 'contributor',
      issues: 1,
      drupalUrl: 'https://www.drupal.org/project/libraries',
      gitUrl: 'https://git.drupalcode.org/project/libraries',
    },
    {
      name: 'Txtlocal SMS',
      machineName: 'txtlocal',
      description: 'Integration with Txtlocal SMS gateway for sending text messages.',
      role: 'contributor',
      issues: 2,
      drupalUrl: 'https://www.drupal.org/project/txtlocal',
      gitUrl: 'https://git.drupalcode.org/project/txtlocal',
    },
  ];

  const stats = {
    totalIssues: 92,
    yearsOnDrupal: 13,
    maintainedProjects: maintainedProjects.length,
    contributedProjects: contributedProjects.length,
    coreContributions: 4,
  };

  const ProjectCard: React.FC<{ project: DrupalProject }> = ({ project }) => (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 hover:border-blue-500/50 transition-colors">
      <div className="flex items-start justify-between mb-2">
        <div>
          <h4 className="font-semibold text-white text-sm">{project.name}</h4>
          <code className="text-xs text-gray-500">{project.machineName}</code>
        </div>
        <span className={`text-xs px-2 py-0.5 rounded ${
          project.role === 'maintainer' 
            ? 'bg-green-900/50 text-green-400 border border-green-700' 
            : 'bg-blue-900/50 text-blue-400 border border-blue-700'
        }`}>
          {project.role === 'maintainer' ? 'Maintainer' : 'Contributor'}
        </span>
      </div>
      
      <p className="text-gray-400 text-xs mb-3 line-clamp-2">{project.description}</p>
      
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500">{project.issues} issue{project.issues !== 1 ? 's' : ''}</span>
        <div className="flex gap-2">
          <a
            href={project.drupalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"
          >
            <span>💧</span> Project
          </a>
          <a
            href={project.gitUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-orange-400 hover:text-orange-300 flex items-center gap-1"
          >
            <span>📦</span> Git Repo
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-4 sm:p-8 overflow-auto h-full bg-gray-900">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Open Source Contributions</h1>
          <p className="text-gray-400">
            My contributions to the Drupal community and open source ecosystem.
          </p>
        </div>

        {/* Stats Banner */}
        <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-500/30 rounded-lg p-6 mb-8">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-blue-400">{stats.totalIssues}</div>
              <div className="text-xs text-gray-400">Issue Credits</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-green-400">{stats.maintainedProjects}</div>
              <div className="text-xs text-gray-400">Projects Maintained</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-purple-400">{stats.contributedProjects}</div>
              <div className="text-xs text-gray-400">Projects Contributed</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-yellow-400">{stats.coreContributions}</div>
              <div className="text-xs text-gray-400">Core Contributions</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-orange-400">{stats.yearsOnDrupal}+</div>
              <div className="text-xs text-gray-400">Years on Drupal.org</div>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mt-4 pt-4 border-t border-gray-700">
            <a
              href="https://www.drupal.org/u/saurabhtripathics"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
            >
              💧 Drupal.org Profile →
            </a>
            <a
              href="https://git.drupalcode.org/saurabhtripathics"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-orange-400 hover:text-orange-300 flex items-center gap-1"
            >
              📦 GitLab Profile →
            </a>
          </div>
        </div>

        {/* Maintained Projects */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-green-400 text-lg">✓</span>
            <h2 className="text-lg font-semibold text-white">Projects I Maintain</h2>
            <span className="text-xs text-gray-500">({maintainedProjects.length} projects)</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {maintainedProjects.map((project) => (
              <ProjectCard key={project.machineName} project={project} />
            ))}
          </div>
        </div>

        {/* Contributed Projects */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-blue-400 text-lg">+</span>
            <h2 className="text-lg font-semibold text-white">Projects I've Contributed To</h2>
            <span className="text-xs text-gray-500">({contributedProjects.length} projects)</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {contributedProjects.map((project) => (
              <ProjectCard key={project.machineName} project={project} />
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
          <h3 className="text-white font-semibold mb-3">Community Involvement</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-400">
            <div className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              <span>Security Advisory Coverage Eligible</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-400">🎤</span>
              <span>DrupalCon Asia 2016 Attendee</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-purple-400">📝</span>
              <a href="https://saurabhtripathitech.wordpress.com/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-300">
                Technical Blog →
              </a>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-yellow-400">🏢</span>
              <span>Previously at Acquia, Accenture</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-600 text-xs mt-10 pt-6 border-t border-gray-800">
          <p>All projects are available on drupal.org and git.drupalcode.org</p>
        </div>
      </div>
    </div>
  );
};

export default OpenSourceTab;
