import React, { useState, useEffect } from 'react';
import DrupalNewsPage from './pages/DrupalNewsPage';
import { portfolioFiles, FileItem } from './data/portfolioData';

interface Tab {
  id: string;
  title: string;
  content: string;
  language: string;
  icon: string;
  type: 'file' | 'welcome' | 'microsite';
}

const fetchFiles = async (): Promise<FileItem[]> => {
  // Return static data instead of fetching from Drupal API
  return new Promise((resolve) => {
    // Simulate async operation for consistency
    setTimeout(() => resolve(portfolioFiles), 100);
  });
};

const FileIcon: React.FC<{ icon: string; className?: string }> = ({ icon, className = '' }) => {
  const getIconColor = () => {
    switch (icon) {
      case 'md': return 'text-blue-400';
      case 'json': return 'text-yellow-400';
      case 'jsx': case 'js': return 'text-yellow-300';
      case 'tsx': case 'ts': return 'text-blue-500';
      default: return 'text-gray-400';
    }
  };

  return (
    <span className={`${getIconColor()} ${className}`}>
      {icon === 'md' && '📝'}
      {icon === 'json' && '{}'}
      {(icon === 'jsx' || icon === 'js') && '⚛️'}
      {(icon === 'tsx' || icon === 'ts') && '📘'}
      {!['md', 'json', 'jsx', 'js', 'tsx', 'ts'].includes(icon) && '📄'}
    </span>
  );
};

const Sidebar: React.FC<{
  files: FileItem[];
  onFileSelect: (file: FileItem) => void;
  activeFileId: string;
}> = ({ files, onFileSelect, activeFileId }) => {
  return (
    <div className="w-64 bg-gray-800 border-r border-gray-700 flex h-full">
      <div className="w-12 bg-gray-900 flex flex-col items-center py-4 gap-4">
        <div className="text-2xl cursor-pointer hover:text-white transition-colors">📁</div>
      </div>
      <div className="flex-1 overflow-auto">
        <div className="px-4 py-2 text-xs uppercase text-gray-400 font-semibold">Portfolio</div>
        <div className="px-2">
          {files.map(file => (
            <div
              key={file.id}
              onClick={() => onFileSelect(file)}
              className={`px-2 py-1.5 cursor-pointer hover:bg-gray-700 rounded flex items-center gap-2 text-sm transition-colors ${
                activeFileId === file.id ? 'bg-gray-700' : ''
              }`}
            >
              <FileIcon icon={file.icon} />
              <span>{file.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const TabBar: React.FC<{
  tabs: Tab[];
  activeTabId: string;
  onTabSelect: (tabId: string) => void;
  onTabClose: (tabId: string) => void;
}> = ({ tabs, activeTabId, onTabSelect, onTabClose }) => {
  return (
    <div className="bg-gray-800 border-b border-gray-700 flex overflow-x-auto">
      {tabs.map(tab => (
        <div
          key={tab.id}
          onClick={() => onTabSelect(tab.id)}
          className={`px-4 py-2 border-r border-gray-700 cursor-pointer flex items-center gap-2 min-w-max transition-colors ${
            activeTabId === tab.id ? 'bg-gray-900 text-white border-t-2 border-t-blue-500' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
        >
          <FileIcon icon={tab.icon} className="text-sm" />
          <span className="text-sm">{tab.title}</span>
          {tabs.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onTabClose(tab.id);
              }}
              className="ml-2 hover:bg-gray-600 rounded px-1"
            >
              ×
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

const BackToHome: React.FC<{ onGoHome: () => void }> = ({ onGoHome }) => {
  // Visible on all screen sizes — compact on mobile
  return (
    <div className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-800 border-b border-gray-700 flex items-center gap-4">
      <button
        onClick={onGoHome}
        className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 text-xs sm:text-sm font-medium transition-colors"
      >
        <span>←</span>
        <span>Home</span>
      </button>
    </div>
  );
};

const CodeEditor: React.FC<{
  content: string;
  language: string;
  title?: string;
  onOpenMicrosite?: (tab: Tab) => void;
  onGoHome?: () => void;
}> = ({ content, language, title, onOpenMicrosite, onGoHome }) => {
  // Clean HTML from Drupal and convert to plain text
  const cleanContent = (html: string): string => {
    return html
      .replace(/<br\s*\/?>/gi, '\n')           // <br> to newline
      .replace(/<\/p>/gi, '\n\n')              // </p> to double newline
      .replace(/<p[^>]*>/gi, '')               // Remove <p> tags
      .replace(/&nbsp;/gi, ' ')                // &nbsp; to space
      .replace(/&lt;/gi, '<')                  // &lt; to <
      .replace(/&gt;/gi, '>')                  // &gt; to >
      .replace(/&amp;/gi, '&')                 // &amp; to &
      .replace(/&quot;/gi, '"')                // &quot; to "
      .replace(/<[^>]*>/g, '')                 // Remove any remaining HTML tags
      .replace(/\n{3,}/g, '\n\n');             // Max 2 consecutive newlines
  };

  const renderMarkdown = () => {
    const cleanedContent = cleanContent(content);
    const lines = cleanedContent.split('\n');
    const elements: React.ReactNode[] = [];
    let inCodeBlock = false;
    let codeBlockLines: string[] = [];
    let codeBlockKey = 0;

    for (let idx = 0; idx < lines.length; idx++) {
      const line = lines[idx];

      // Handle code block start/end
      if (line.trim().startsWith('```')) {
        if (inCodeBlock) {
          // End code block
          elements.push(
            <pre key={`code-${codeBlockKey++}`} className="bg-gray-800 p-4 rounded my-4 text-sm text-green-400 font-mono whitespace-pre overflow-x-auto">
              {codeBlockLines.join('\n')}
            </pre>
          );
          codeBlockLines = [];
          inCodeBlock = false;
        } else {
          // Start code block
          inCodeBlock = true;
        }
        continue;
      }

      // Collect code block content
      if (inCodeBlock) {
        codeBlockLines.push(line);
        continue;
      }

      // Detect ASCII art (lines with box characters)
      const isAsciiArt = /^[\s]*[+\-|┌┐└┘├┤┬┴┼│─]/.test(line) || /[+\-]{3,}/.test(line);
      if (isAsciiArt) {
        codeBlockLines.push(line);
        // Look ahead for more ASCII art lines
        while (idx + 1 < lines.length) {
          const nextLine = lines[idx + 1];
          const nextIsAscii = /^[\s]*[+\-|┌┐└┘├┤┬┴┼│─]/.test(nextLine) || /[+\-]{3,}/.test(nextLine) || /^\s*[|]/.test(nextLine);
          if (nextIsAscii || (nextLine.trim() && codeBlockLines.length > 0 && /[|]/.test(nextLine))) {
            codeBlockLines.push(nextLine);
            idx++;
          } else {
            break;
          }
        }
        elements.push(
          <pre key={`ascii-${idx}`} className="bg-gray-800 p-4 rounded my-4 text-sm text-blue-300 font-mono whitespace-pre overflow-x-auto">
            {codeBlockLines.join('\n')}
          </pre>
        );
        codeBlockLines = [];
        continue;
      }

      // Regular markdown parsing
      if (line.startsWith('# ')) {
        elements.push(<h1 key={idx} className="text-2xl font-bold text-white mt-6 mb-4">{line.substring(2)}</h1>);
      } else if (line.startsWith('## ')) {
        elements.push(<h2 key={idx} className="text-xl font-bold text-blue-400 mt-4 mb-3">{line.substring(3)}</h2>);
      } else if (line.startsWith('### ')) {
        elements.push(<h3 key={idx} className="text-lg font-bold text-blue-300 mt-3 mb-2">{line.substring(4)}</h3>);
      } else if (line.startsWith('- ')) {
        elements.push(<li key={idx} className="ml-4 text-gray-300">{line.substring(2)}</li>);
      } else if (line.includes('**')) {
        const parts = line.split('**');
        elements.push(
          <p key={idx} className="mb-2">
            {parts.map((part, i) => i % 2 === 1 ? <strong key={i} className="text-yellow-300">{part}</strong> : part)}
          </p>
        );
      } else if (line.trim()) {
        elements.push(<p key={idx} className="mb-2 text-gray-300">{line}</p>);
      } else {
        elements.push(<br key={idx} />);
      }
    }

    // Handle unclosed code block
    if (codeBlockLines.length > 0) {
      elements.push(
        <pre key={`code-final`} className="bg-gray-800 p-4 rounded my-4 text-sm text-green-400 font-mono whitespace-pre overflow-x-auto">
          {codeBlockLines.join('\n')}
        </pre>
      );
    }

    return elements;
  };

  const openExperienceMicrosite = () => {
    if (!onOpenMicrosite) return;
    const newTab: Tab = {
      id: 'experience-microsite',
      title: 'Experience Timeline',
      content: cleanContent(content),
      language: 'microsite-experience',
      icon: 'tsx',
      type: 'microsite',
    };
    onOpenMicrosite(newTab);
  };

  const openSkillsMicrosite = () => {
    if (!onOpenMicrosite) return;
    const newTab: Tab = {
      id: 'skills-microsite',
      title: 'Skills Dashboard',
      content: cleanContent(content),
      language: 'microsite-skills',
      icon: 'tsx',
      type: 'microsite',
    };
    onOpenMicrosite(newTab);
  };

  const isExperienceJson = title?.toLowerCase().includes('experience') && language !== 'markdown';
  const isSkillsFile = title?.toLowerCase().includes('skill') && language !== 'markdown';

  return (
    <div className="flex flex-col h-full bg-gray-900">
      {/* Back to Home */}
      {onGoHome && <BackToHome onGoHome={onGoHome} />}

      {/* Action Banner */}
      {(isExperienceJson || isSkillsFile) && (
        <div className="px-3 py-3 sm:px-4 sm:py-5 bg-gradient-to-r from-blue-900/30 via-gray-900 to-blue-900/30 border-b border-blue-500/30">
          <div className="flex flex-col items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-2 text-sm sm:text-base">
              <span className="text-yellow-400 text-base sm:text-lg">💡</span>
              <p className="text-yellow-300 font-medium text-xs sm:text-base">
                {isExperienceJson && 'Transform this JSON into an interactive timeline!'}
                {isSkillsFile && 'Visualize this data as a skills dashboard!'}
              </p>
            </div>
            {isExperienceJson && (
              <button
                onClick={openExperienceMicrosite}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-3 rounded-lg font-mono transition-all flex items-center gap-3 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105 group"
              >
                <span className="text-green-400">$</span>
                <span>npm run build:timeline</span>
                <span className="text-blue-300 group-hover:translate-x-1 transition-transform">▶</span>
              </button>
            )}
            {isSkillsFile && (
              <button
                onClick={openSkillsMicrosite}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-lg font-mono transition-all flex items-center gap-3 shadow-lg shadow-green-500/25 hover:shadow-green-500/40 hover:scale-105 group"
              >
                <span className="text-yellow-400">$</span>
                <span>npm run render:skills</span>
                <span className="text-green-300 group-hover:translate-x-1 transition-transform">▶</span>
              </button>
            )}
            <p className="text-gray-500 text-xs">
              {isExperienceJson && 'Click to see my experience timeline'}
              {isSkillsFile && 'Click to see my skills dashboard'}
            </p>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 p-6 overflow-auto">
        {language === 'markdown' ? (
          <div className="prose prose-invert max-w-none">{renderMarkdown()}</div>
        ) : (
          <pre className="text-sm leading-relaxed text-gray-300 whitespace-pre-wrap">{cleanContent(content)}</pre>
        )}
      </div>
    </div>
  );
};

const ExperienceMicrosite: React.FC<{ content: string; onGoHome?: () => void }> = ({ content, onGoHome }) => {
  // Clean HTML from Drupal content
  const cleanContent = (html: string): string => {
    return html
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/p>/gi, '\n\n')
      .replace(/<p[^>]*>/gi, '')
      .replace(/&nbsp;/gi, ' ')
      .replace(/&lt;/gi, '<')
      .replace(/&gt;/gi, '>')
      .replace(/&amp;/gi, '&')
      .replace(/&quot;/gi, '"')
      .replace(/<[^>]*>/g, '')
      .trim();
  };

  let data: any = {};
  try {
    data = JSON.parse(cleanContent(content));
  } catch (e) {
    return <div className="p-6 text-red-400">Error parsing experience data</div>;
  }

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {onGoHome && <BackToHome onGoHome={onGoHome} />}
      <div className="flex-1 p-4 sm:p-6 overflow-auto">
        <div className="max-w-4xl mx-auto">
          {/* Header - compact on mobile */}
          <div className="text-center mb-4 sm:mb-10">
            <h1 className="text-xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">Saurabh Tripathi</h1>
            <p className="text-blue-400 text-sm sm:text-lg">Professional Experience</p>
          <p className="text-gray-400 mt-1 text-xs sm:text-base">{data.totalYears || '14+'} Years in Software Development</p>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-500/30"></div>

          {data.positions?.map((pos: any, idx: number) => (
            <div key={idx} className="relative pl-12 pb-8">
              <div className={`absolute left-2 w-5 h-5 rounded-full ${pos.current ? 'bg-green-500 ring-4 ring-green-500/20' : 'bg-blue-500'}`}></div>

              <div className="bg-gray-800/80 rounded-xl p-5 border border-gray-700 hover:border-blue-500/50 transition-colors">
                <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{pos.title}</h3>
                    <p className="text-blue-400">{pos.company}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs ${pos.current ? 'bg-green-500/20 text-green-400' : 'bg-gray-700 text-gray-400'}`}>
                      {pos.current ? 'Current' : pos.period}
                    </span>
                    <p className="text-gray-500 text-sm mt-1">{pos.location}</p>
                  </div>
                </div>

                {pos.responsibilities && (
                  <ul className="space-y-1 mt-3">
                    {pos.responsibilities.slice(0, 4).map((r: string, rIdx: number) => (
                      <li key={rIdx} className="flex items-start gap-2 text-gray-300 text-sm">
                        <span className="text-blue-400">-</span>
                        <span>{r}</span>
                      </li>
                    ))}
                    {pos.responsibilities.length > 4 && (
                      <li className="text-gray-500 text-xs ml-4">+{pos.responsibilities.length - 4} more...</li>
                    )}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Education */}
        {data.education && (
          <div className="mt-8 bg-gray-800/80 rounded-xl p-5 border border-gray-700">
            <h3 className="text-lg font-semibold text-blue-400 mb-2">Education</h3>
            <p className="text-white">{data.education.degree}</p>
            <p className="text-gray-400 text-sm">{data.education.university} - {data.education.year}</p>
          </div>
        )}

          {/* Footer */}
          <div className="text-center mt-8 pt-6 border-t border-gray-800">
            <p className="text-gray-500 text-xs">Generated from experience.json</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const SkillsMicrosite: React.FC<{ content: string; onGoHome?: () => void }> = ({ content, onGoHome }) => {
  // Clean HTML from Drupal content
  const cleanContent = (html: string): string => {
    return html
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/p>/gi, '\n\n')
      .replace(/<p[^>]*>/gi, '')
      .replace(/&nbsp;/gi, ' ')
      .replace(/&lt;/gi, '<')
      .replace(/&gt;/gi, '>')
      .replace(/&amp;/gi, '&')
      .replace(/&quot;/gi, '"')
      .replace(/<[^>]*>/g, '')
      .trim();
  };

  let data: any = {};
  try {
    data = JSON.parse(cleanContent(content));
  } catch (e) {
    return <div className="p-6 text-red-400">Error parsing skills data</div>;
  }

  const categories = ['backend', 'frontend', 'devops', 'integrations', 'tools'];
  const categoryColors: { [key: string]: string } = {
    backend: 'from-blue-500 to-blue-600',
    frontend: 'from-green-500 to-green-600',
    devops: 'from-purple-500 to-purple-600',
    integrations: 'from-orange-500 to-orange-600',
    tools: 'from-pink-500 to-pink-600',
  };
  const categoryIcons: { [key: string]: string } = {
    backend: '🔧',
    frontend: '🎨',
    devops: '☁️',
    integrations: '🔗',
    tools: '🛠️',
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {onGoHome && <BackToHome onGoHome={onGoHome} />}
      <div className="flex-1 p-4 sm:p-6 overflow-auto">
        <div className="max-w-5xl mx-auto">
          {/* Header - compact on mobile */}
          <div className="text-center mb-4 sm:mb-10">
            <h1 className="text-xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">Technical Skills</h1>
            <p className="text-gray-400 text-xs sm:text-base">Saurabh Tripathi - Senior Solutions Architect</p>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {categories.map(cat => {
              const category = data[cat];
              if (!category) return null;
              return (
                <div key={cat} className="bg-gray-800/80 rounded-xl p-3 sm:p-5 border border-gray-700">
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-4 flex items-center gap-2">
                    <span>{categoryIcons[cat]}</span>
                    {category.label}
                  </h3>
                  <div className="space-y-2 sm:space-y-3">
                    {category.skills?.map((skill: any, idx: number) => (
                      <div key={idx}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-300">{typeof skill === 'string' ? skill : skill.name}</span>
                          {typeof skill !== 'string' && <span className="text-gray-500">{skill.level}%</span>}
                        </div>
                        {typeof skill !== 'string' && (
                          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className={`h-full bg-gradient-to-r ${categoryColors[cat]} rounded-full transition-all duration-500`}
                              style={{ width: `${skill.level}%` }}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Soft Skills */}
          {data.soft && (
            <div className="mt-6 bg-gray-800/80 rounded-xl p-5 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <span>💡</span>
                {data.soft.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {data.soft.skills?.map((skill: string, idx: number) => (
                  <span key={idx} className="bg-gray-700 px-3 py-1 rounded-full text-sm text-gray-300">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="text-center mt-8 pt-6 border-t border-gray-800">
            <p className="text-gray-500 text-xs">Generated from skills.json</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const WelcomeTab: React.FC<{
  files: FileItem[];
  onFileSelect: (file: FileItem) => void;
  onOpenMicrosite: (tab: Tab) => void;
}> = ({ files, onFileSelect, onOpenMicrosite }) => {
  const findFileByName = (name: string) => {
    return files.find(f => f.title.toLowerCase().includes(name.toLowerCase()));
  };

  const handleOpenFile = (fileName: string) => {
    const file = findFileByName(fileName);
    if (file) {
      onFileSelect(file);
    } else if (files.length > 0) {
      onFileSelect(files[0]);
    }
  };

  const handleOpenExperience = () => {
    const expFile = findFileByName('experience');
    if (expFile) {
      onOpenMicrosite({
        id: 'experience-microsite',
        title: 'Experience Timeline',
        content: expFile.content,
        language: 'microsite-experience',
        icon: 'tsx',
        type: 'microsite',
      });
    }
  };

  const handleOpenSkills = () => {
    const skillsFile = findFileByName('skill');
    if (skillsFile) {
      onOpenMicrosite({
        id: 'skills-microsite',
        title: 'Skills Dashboard',
        content: skillsFile.content,
        language: 'microsite-skills',
        icon: 'tsx',
        type: 'microsite',
      });
    }
  };

  const certifications = [
    'Acquia Certified Developer - Drupal 10 & 11',
    'Acquia Grand Master - Drupal 9 (Triple Certified)',
    'Acquia Grand Master - Drupal 8 (Triple Certified)',
  ];

  const skills = [
    { name: 'Drupal', icon: '🎯' },
    { name: 'PHP', icon: '🐘' },
    { name: 'JavaScript', icon: '🟨' },
    { name: 'jQuery', icon: '📜' },
    { name: 'React', icon: '⚛️' },
    { name: 'TypeScript', icon: '📘' },
    { name: 'HTML/CSS', icon: '🎨' },
    { name: 'Acquia Cloud', icon: '🅰️' },
    { name: 'AWS', icon: '☁️' },
    { name: 'Docker', icon: '🐳' },
  ];

  return (
    <div className="p-4 sm:p-8 overflow-auto h-full bg-gray-900">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="mb-6 sm:mb-10 text-center">
          <h1 className="text-2xl sm:text-4xl font-bold text-white mb-1 sm:mb-2">Saurabh Tripathi</h1>
          <h2 className="text-base sm:text-xl text-blue-400 mb-2 sm:mb-4">Senior Solutions Architect</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
            Full Stack Developer specializing in enterprise-level Drupal applications,
            headless CMS architectures, React frontends, and cloud deployments.
          </p>
          {/* Social Links - hidden on mobile (in bottom nav), shown on desktop */}
          <div className="hidden sm:flex sm:justify-center gap-3 mt-4">
            <a
              href="https://www.linkedin.com/in/saurabh-tripathi-a8b89945/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 px-3 py-2 bg-gray-800 hover:bg-blue-600 text-blue-400 hover:text-white rounded-lg text-sm transition-colors border border-gray-700 hover:border-blue-500"
            >
              <span>💼</span>
              <span>LinkedIn</span>
            </a>
            <a
              href="https://github.com/saurabhtripathi"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 px-3 py-2 bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white rounded-lg text-sm transition-colors border border-gray-700 hover:border-gray-500"
            >
              <span>🐙</span>
              <span>GitHub</span>
            </a>
            <a
              href="https://www.drupal.org/u/saurabhtripathics"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 px-3 py-2 bg-gray-800 hover:bg-blue-800 text-blue-300 hover:text-white rounded-lg text-sm transition-colors border border-gray-700 hover:border-blue-500"
            >
              <span>💧</span>
              <span>Drupal.org</span>
            </a>
            <a
              href="https://www.saurabh-tripathi.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 px-3 py-2 bg-gray-800 hover:bg-purple-600 text-purple-400 hover:text-white rounded-lg text-sm transition-colors border border-gray-700 hover:border-purple-500"
            >
              <span>🌐</span>
              <span>Website</span>
            </a>
          </div>
        </div>

        {/* Mobile Navigation Tiles - square boxes like Quick Stats, shown above stats on mobile */}
        <div className="grid grid-cols-4 gap-2 mb-4 sm:hidden">
          <button
            onClick={() => handleOpenFile('about')}
            className="bg-gray-800 p-3 rounded-lg text-center border border-gray-700 hover:border-blue-500 active:bg-gray-700 transition-colors"
          >
            <div className="text-lg">👤</div>
            <div className="text-[10px] text-gray-400 mt-1">About</div>
          </button>
          <button
            onClick={handleOpenExperience}
            className="bg-gray-800 p-3 rounded-lg text-center border border-gray-700 hover:border-blue-500 active:bg-gray-700 transition-colors"
          >
            <div className="text-lg">💼</div>
            <div className="text-[10px] text-gray-400 mt-1">Work</div>
          </button>
          <button
            onClick={handleOpenSkills}
            className="bg-gray-800 p-3 rounded-lg text-center border border-gray-700 hover:border-blue-500 active:bg-gray-700 transition-colors"
          >
            <div className="text-lg">⚡</div>
            <div className="text-[10px] text-gray-400 mt-1">Skills</div>
          </button>
          <button
            onClick={() => handleOpenFile('project')}
            className="bg-gray-800 p-3 rounded-lg text-center border border-gray-700 hover:border-blue-500 active:bg-gray-700 transition-colors"
          >
            <div className="text-lg">🚀</div>
            <div className="text-[10px] text-gray-400 mt-1">Projects</div>
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-10">
          <div className="bg-gray-800 p-3 sm:p-4 rounded text-center">
            <div className="text-xl sm:text-2xl font-bold text-blue-400">🚀</div>
            <div className="text-xs text-gray-400">Full Stack Developer</div>
          </div>
          <div className="bg-gray-800 p-3 sm:p-4 rounded text-center">
            <div className="text-xl sm:text-2xl font-bold text-green-400">3x</div>
            <div className="text-xs text-gray-400">Triple Certified Drupal</div>
          </div>
          <div className="bg-gray-800 p-3 sm:p-4 rounded text-center">
            <div className="text-xl sm:text-2xl font-bold text-yellow-400">D7-11</div>
            <div className="text-xs text-gray-400">Drupal Versions</div>
          </div>
          <div className="bg-gray-800 p-3 sm:p-4 rounded text-center">
            <div className="text-xl sm:text-2xl font-bold text-purple-400">SG</div>
            <div className="text-xs text-gray-400">Singapore Based</div>
          </div>
        </div>

        {/* Skills Pills */}
        <div className="mb-10">
          <h3 className="text-sm text-gray-500 uppercase tracking-wider mb-3">Core Technologies</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, idx) => (
              <span key={idx} className="bg-gray-800 px-3 py-1 rounded-full text-sm text-gray-300 hover:bg-gray-700 transition-colors">
                {skill.icon} {skill.name}
              </span>
            ))}
          </div>
        </div>

        {/* Navigation Cards - hidden on mobile (replaced by square tiles above stats) */}
        <div className="mb-10 hidden sm:block">
          <h3 className="text-sm text-gray-500 uppercase tracking-wider mb-3">Explore</h3>
          <div className="grid grid-cols-2 gap-4">
            <div
              onClick={() => handleOpenFile('about')}
              className="bg-gray-800 p-5 rounded-lg hover:bg-gray-700 cursor-pointer transition-colors border border-gray-700 hover:border-blue-500"
            >
              <div className="text-2xl mb-2">👤</div>
              <div className="text-white font-medium mb-1">About Me</div>
              <div className="text-xs text-gray-400">Background, certifications & achievements</div>
            </div>
            <div
              onClick={() => handleOpenFile('project')}
              className="bg-gray-800 p-5 rounded-lg hover:bg-gray-700 cursor-pointer transition-colors border border-gray-700 hover:border-blue-500"
            >
              <div className="text-2xl mb-2">🚀</div>
              <div className="text-white font-medium mb-1">Projects</div>
              <div className="text-xs text-gray-400">CNA, Berita, Seithi & more enterprise work</div>
            </div>
            <div
              onClick={handleOpenExperience}
              className="bg-gray-800 p-5 rounded-lg hover:bg-gray-700 cursor-pointer transition-colors border border-gray-700 hover:border-blue-500"
            >
              <div className="text-2xl mb-2">💼</div>
              <div className="text-white font-medium mb-1">Experience</div>
              <div className="text-xs text-gray-400">Mediacorp, Acquia, Accenture & more</div>
            </div>
            <div
              onClick={handleOpenSkills}
              className="bg-gray-800 p-5 rounded-lg hover:bg-gray-700 cursor-pointer transition-colors border border-gray-700 hover:border-blue-500"
            >
              <div className="text-2xl mb-2">⚡</div>
              <div className="text-white font-medium mb-1">Skills</div>
              <div className="text-xs text-gray-400">Technical expertise & proficiency levels</div>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="mb-10">
          <h3 className="text-sm text-gray-500 uppercase tracking-wider mb-3">Certifications</h3>
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            {certifications.map((cert, idx) => (
              <div key={idx} className="flex items-center gap-2 py-2 border-b border-gray-700 last:border-0">
                <span className="text-green-400">✓</span>
                <span className="text-gray-300 text-sm">{cert}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Files - desktop only, mobile uses bottom nav */}
        <div className="mb-8 hidden sm:block">
          <h3 className="text-sm text-gray-500 uppercase tracking-wider mb-3">Quick Access</h3>
          <div className="flex flex-wrap gap-2">
            {files.slice(0, 5).map(file => (
              <div
                key={file.id}
                onClick={() => onFileSelect(file)}
                className="bg-gray-800 px-3 py-2 rounded text-sm text-gray-400 hover:text-white hover:bg-gray-700 cursor-pointer transition-colors flex items-center gap-2"
              >
                <FileIcon icon={file.icon} />
                {file.title}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-600 text-xs mt-10 pt-6 border-t border-gray-800">
          <p>Built with Drupal (Headless CMS) + React + TypeScript</p>
          <p className="mt-1">Demonstrating modern headless architecture</p>
        </div>
      </div>
    </div>
  );
};

const StatusBar: React.FC<{ activeFile?: string; onToggleTerminal: () => void; terminalOpen: boolean }> = ({ activeFile, onToggleTerminal, terminalOpen }) => {
  return (
    <div className="bg-blue-600 text-white px-4 py-1 flex justify-between items-center text-xs">
      <div className="flex items-center gap-4">
        <span>DDEV</span>
        <span>main</span>
        <button
          onClick={onToggleTerminal}
          className={`px-2 py-0.5 rounded text-xs transition-colors ${terminalOpen ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
        >
          Terminal {terminalOpen ? '▼' : '▲'}
        </button>
      </div>
      <div className="flex items-center gap-4">
        {activeFile && <span>{activeFile}</span>}
        <span>TypeScript React</span>
      </div>
    </div>
  );
};

interface TerminalLine {
  type: 'input' | 'output' | 'error' | 'success';
  text: string;
}

const Terminal: React.FC<{
  files: FileItem[];
  onFileSelect: (file: FileItem) => void;
  onOpenMicrosite: (tab: Tab) => void;
  onGoHome: () => void;
  hideHeader?: boolean;
}> = ({ files, onFileSelect, onOpenMicrosite, onGoHome, hideHeader }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<TerminalLine[]>([
    { type: 'success', text: '💡 Type a command or tap a button above. Try: home, about, skills, experience' },
  ]);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const terminalRef = React.useRef<HTMLDivElement>(null);

  const addLine = (type: TerminalLine['type'], text: string) => {
    setHistory(prev => [...prev, { type, text }]);
  };

  const findFile = (name: string) => {
    return files.find(f =>
      f.title.toLowerCase().includes(name.toLowerCase()) ||
      f.title.toLowerCase().replace(/\.[^/.]+$/, '').includes(name.toLowerCase())
    );
  };

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    addLine('input', `$ ${cmd}`);

    if (!trimmedCmd) {
      return;
    }

    // Home command - go to welcome page
    if (trimmedCmd === 'home' || trimmedCmd === 'welcome' || trimmedCmd === 'cd ~' || trimmedCmd === 'cd') {
      onGoHome();
      addLine('success', '🏠 Welcome page opened!');
      return;
    }

    // Help command
    if (trimmedCmd === 'help' || trimmedCmd === '?') {
      addLine('output', '');
      addLine('success', '📂 Navigation Commands:');
      addLine('output', '');
      addLine('output', '  home           → Go to Welcome page');
      addLine('output', '  about          → Open my about page');
      addLine('output', '  experience     → View my experience timeline');
      addLine('output', '  skills         → View my skills dashboard');
      addLine('output', '  projects       → Open my projects');
      addLine('output', '  architecture   → See how this site is built');
      addLine('output', '');
      addLine('success', '🛠️ Utility Commands:');
      addLine('output', '');
      addLine('output', '  ls / list      → List all available files');
      addLine('output', '  clear          → Clear terminal');
      addLine('output', '  whoami         → About me summary');
      addLine('output', '  contact        → Get my contact info');
      addLine('output', '');
      return;
    }

    // Clear command
    if (trimmedCmd === 'clear' || trimmedCmd === 'cls') {
      setHistory([]);
      return;
    }

    // List files
    if (trimmedCmd === 'ls' || trimmedCmd === 'list' || trimmedCmd === 'dir') {
      addLine('output', '');
      addLine('success', '📁 Portfolio Files:');
      files.forEach(f => {
        addLine('output', `  ${f.icon.padEnd(4)} ${f.title}`);
      });
      addLine('output', '');
      return;
    }

    // Whoami
    if (trimmedCmd === 'whoami') {
      addLine('output', '');
      addLine('success', '👤 Saurabh Tripathi');
      addLine('output', '   Senior Solutions Architect');
      addLine('output', '   14+ years in Drupal & Web Development');
      addLine('output', '   Singapore 🇸🇬');
      addLine('output', '');
      return;
    }

    // Contact
    if (trimmedCmd === 'contact') {
      addLine('output', '');
      addLine('success', '📬 Contact Information:');
      addLine('output', '   Email: saurabh.tripathi.cs@gmail.com');
      addLine('output', '   LinkedIn: linkedin.com/in/saurabh-tripathi');
      addLine('output', '   GitHub: github.com/saurabh-tripathi');
      addLine('output', '');
      return;
    }

    // Build timeline microsite
    if (trimmedCmd === 'build:timeline' || trimmedCmd === 'npm run build:timeline') {
      const expFile = findFile('experience');
      if (expFile) {
        addLine('output', '⚡ Building experience timeline...');
        addLine('output', '✓ Parsing experience.json');
        addLine('output', '✓ Generating timeline view');
        const newTab: Tab = {
          id: 'experience-microsite',
          title: 'Experience Timeline',
          content: expFile.content,
          language: 'microsite-experience',
          icon: 'tsx',
          type: 'microsite',
        };
        onOpenMicrosite(newTab);
        addLine('success', '✓ Done! Timeline opened 👆 See above');
      } else {
        addLine('error', '✗ Error: experience.json not found');
      }
      return;
    }

    // Render skills microsite
    if (trimmedCmd === 'render:skills' || trimmedCmd === 'npm run render:skills') {
      const skillsFile = findFile('skill');
      if (skillsFile) {
        addLine('output', '⚡ Rendering skills dashboard...');
        addLine('output', '✓ Parsing skills data');
        addLine('output', '✓ Generating visualizations');
        const newTab: Tab = {
          id: 'skills-microsite',
          title: 'Skills Dashboard',
          content: skillsFile.content,
          language: 'microsite-skills',
          icon: 'tsx',
          type: 'microsite',
        };
        onOpenMicrosite(newTab);
        addLine('success', '✓ Done! Dashboard opened 👆 See above');
      } else {
        addLine('error', '✗ Error: skills file not found');
      }
      return;
    }

    // Experience command - open timeline directly
    if (trimmedCmd === 'experience' || trimmedCmd === 'exp') {
      const expFile = findFile('experience');
      if (expFile) {
        const newTab: Tab = {
          id: 'experience-microsite',
          title: 'Experience Timeline',
          content: expFile.content,
          language: 'microsite-experience',
          icon: 'tsx',
          type: 'microsite',
        };
        onOpenMicrosite(newTab);
        addLine('success', '✓ Experience Timeline opened!');
      } else {
        addLine('error', '✗ Error: experience data not found');
      }
      return;
    }

    // Skills command - open dashboard directly
    if (trimmedCmd.toLowerCase() === 'skills' || trimmedCmd.toLowerCase() === 'skill') {
      const skillsFile = findFile('skill');
      if (skillsFile) {
        const newTab: Tab = {
          id: 'skills-microsite',
          title: 'Skills Dashboard',
          content: skillsFile.content,
          language: 'microsite-skills',
          icon: 'tsx',
          type: 'microsite',
        };
        onOpenMicrosite(newTab);
        addLine('success', '✓ Skills Dashboard opened!');
      } else {
        addLine('error', '✗ Error: skills data not found');
      }
      return;
    }

    // Open specific files
    const fileCommands: { [key: string]: string } = {
      'about': 'readme',
      'readme': 'readme',
      'projects': 'project',
      'architecture': 'architecture',
    };

    for (const [cmd, fileName] of Object.entries(fileCommands)) {
      if (trimmedCmd === cmd || trimmedCmd === `open ${cmd}` || trimmedCmd === `cat ${cmd}`) {
        const file = findFile(fileName);
        if (file) {
          onFileSelect(file);
          addLine('success', `✓ ${file.title} opened!`);
          return;
        }
      }
    }

    // Unknown command
    addLine('error', `Command not found: ${cmd}`);
    addLine('output', 'Type "help" for available commands.');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(input);
    setInput('');
  };

  // Track history length to find new lines
  const prevHistoryLength = React.useRef(history.length);

  // Auto-scroll to show first new success line at top of visible area
  React.useEffect(() => {
    if (terminalRef.current && history.length > prevHistoryLength.current) {
      // Scroll terminal output to bottom so latest output is visible
      // Use scrollTop instead of scrollIntoView to avoid scrolling ancestor containers (which breaks mobile)
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      prevHistoryLength.current = history.length;
    }
  }, [history]);

  // Focus input only when clicking specifically on the input area (not command buttons)
  const handleTerminalInputAreaClick = (e: React.MouseEvent) => {
    // Only focus if clicking directly on the input area, not on buttons
    e.stopPropagation();
    inputRef.current?.focus();
  };

  return (
    <div className="bg-gray-950 border-t border-gray-700 font-mono text-sm">
      {!hideHeader && (
      <div className="flex items-center justify-between px-4 py-1.5 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span className="text-green-400">●</span>
          <span>TERMINAL</span>
        </div>
        <div className="text-xs text-gray-500">bash</div>
      </div>
      )}
      {/* Command hints bar */}
      <div
        className="bg-gray-900 border-b border-gray-800 px-2 py-1"
        style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', alignItems: 'center', gap: '6px', overflowX: 'auto', whiteSpace: 'nowrap', fontSize: '12px', minHeight: '30px' }}
      >
        {[
          { cmd: 'home', color: 'text-white' },
          { cmd: 'about', color: 'text-blue-400' },
          { cmd: 'experience', color: 'text-green-400' },
          { cmd: 'skills', color: 'text-green-400' },
          { cmd: 'projects', color: 'text-blue-400' },
          { cmd: 'whoami', color: 'text-purple-400' },
          { cmd: 'contact', color: 'text-purple-400' },
          { cmd: 'help', color: 'text-yellow-400' },
        ].map(({ cmd: c, color }) => (
          <button
            key={c}
            onClick={(e) => {
              e.stopPropagation(); // Don't trigger terminal focus
              inputRef.current?.blur(); // Close keyboard if open
              executeCommand(c);
              setInput('');
            }}
            className={`${color} hover:brightness-125 active:scale-95`}
            style={{ padding: '3px 7px', background: '#23272e', borderRadius: '4px', fontSize: '12px' }}
          >
            {c}
          </button>
        ))}
      </div>
      <div
        ref={terminalRef}
        className="overflow-auto p-2"
        id="terminal-output"
        style={{ maxHeight: '80px' }}
        onClick={handleTerminalInputAreaClick}
      >
        {history.map((line, idx) => (
          <div
            key={idx}
            data-line={idx}
            className={`${
              line.type === 'input' ? 'text-white' :
              line.type === 'error' ? 'text-red-400' :
              line.type === 'success' ? 'text-green-400 bg-green-900/30 rounded px-1 animate-pulse' :
              'text-gray-400'
            }`}
            style={line.type === 'success' ? { animationDuration: '1.2s' } : {}}
          >
            {line.text}
          </div>
        ))}
      </div>
      {/* Input form - tap to type */}
      <form onSubmit={handleSubmit} onClick={handleTerminalInputAreaClick} className="flex items-center gap-2 px-3 py-2 bg-gray-900 border-t border-gray-800">
        <span className="text-green-400 text-lg">$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent outline-none text-white caret-yellow-400"
          placeholder="Tap here to type a command…"
          style={{ caretColor: '#facc15', fontSize: '16px' }}
        />
      </form>
    </div>
  );
};

const PortfolioApp: React.FC<{ onNavigateNews: () => void }> = ({ onNavigateNews }) => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [tabs, setTabs] = useState<Tab[]>([{
    id: 'welcome',
    title: 'Welcome',
    content: '',
    language: 'welcome',
    icon: 'home',
    type: 'welcome',
  }]);
  const [activeTabId, setActiveTabId] = useState('welcome');
  const [loading, setLoading] = useState(true);
  const [terminalOpen, setTerminalOpen] = useState(true);

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = async () => {
    setLoading(true);
    const fetchedFiles = await fetchFiles();
    setFiles(fetchedFiles);
    setLoading(false);
    const activeFile = fetchedFiles.find(f => f.isActive);
    if (activeFile) {
      handleFileSelect(activeFile);
    }
  };

  const handleFileSelect = (file: FileItem) => {
    setTabs(prevTabs => {
      const existingTab = prevTabs.find(tab => tab.id === file.id);
      if (existingTab) {
        return prevTabs;
      }
      const newTab: Tab = {
        id: file.id,
        title: file.title,
        content: file.content,
        language: file.language,
        icon: file.icon,
        type: 'file',
      };
      return [...prevTabs, newTab];
    });
    setActiveTabId(file.id);
  };

  const handleOpenMicrosite = (tab: Tab) => {
    setTabs(prevTabs => {
      const existingTab = prevTabs.find(t => t.id === tab.id);
      if (existingTab) {
        return prevTabs;
      }
      return [...prevTabs, tab];
    });
    setActiveTabId(tab.id);
  };

  const handleTabClose = (tabId: string) => {
    const newTabs = tabs.filter(tab => tab.id !== tabId);
    if (newTabs.length === 0) {
      setTabs([tabs[0]]);
      setActiveTabId('welcome');
    } else {
      setTabs(newTabs);
      if (activeTabId === tabId) {
        setActiveTabId(newTabs[newTabs.length - 1].id);
      }
    }
  };

  const activeTab = tabs.find(tab => tab.id === activeTabId);

  const handleGoHome = () => {
    setActiveTabId('welcome');
  };

  // Mobile-only UI
  const [isMobile, setIsMobile] = React.useState(typeof window !== 'undefined' && window.innerWidth <= 640);
  const contentAreaRef = React.useRef<HTMLDivElement>(null);

  // Listen for resize to update isMobile
  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 640);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Watch for tab changes — scroll content to top (desktop only, mobile handled by scrollMobileToContent)
  React.useEffect(() => {
    if (!isMobile && activeTabId !== 'welcome' && contentAreaRef.current) {
      contentAreaRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeTabId, isMobile]);

  // Ref for the mobile outer wrapper
  const mobileWrapperRef = React.useRef<HTMLDivElement>(null);

  // Toast state for mobile
  const [mobileToast, setMobileToast] = React.useState<string | null>(null);

  // Mobile terminal open/close state (closed by default)
  const [mobileTerminalOpen, setMobileTerminalOpen] = React.useState(false);

  // Show a brief toast overlay instead of a banner
  const showMobileToast = React.useCallback((msg: string) => {
    setMobileToast(msg);
    setTimeout(() => setMobileToast(null), 1400);
  }, []);

  // Helper: scroll mobile view to show content (top of page)
  const scrollMobileToContent = React.useCallback(() => {
    setTimeout(() => {
      // Scroll inner content area to its top
      if (contentAreaRef.current) {
        contentAreaRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }
      // Scroll the content area element into view so user sees it (not the terminal)
      const contentEl = document.getElementById('content-area');
      if (contentEl) {
        contentEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 150);
  }, []);

  // Mobile bottom nav helpers
  const handleMobileNavAbout = React.useCallback(() => {
    const aboutFile = files.find(f => f.title.toLowerCase().includes('readme') || f.title.toLowerCase().includes('about'));
    if (aboutFile) handleFileSelect(aboutFile);
    scrollMobileToContent();
  }, [files, scrollMobileToContent]);

  const handleMobileNavExperience = React.useCallback(() => {
    const expFile = files.find(f => f.title.toLowerCase().includes('experience'));
    if (expFile) {
      handleOpenMicrosite({
        id: 'experience-microsite',
        title: 'Experience Timeline',
        content: expFile.content,
        language: 'microsite-experience',
        icon: 'tsx',
        type: 'microsite',
      });
    }
    scrollMobileToContent();
  }, [files, scrollMobileToContent]);

  const handleMobileNavSkills = React.useCallback(() => {
    const skillsFile = files.find(f => f.title.toLowerCase().includes('skill'));
    if (skillsFile) {
      handleOpenMicrosite({
        id: 'skills-microsite',
        title: 'Skills Dashboard',
        content: skillsFile.content,
        language: 'microsite-skills',
        icon: 'tsx',
        type: 'microsite',
      });
    }
    scrollMobileToContent();
  }, [files, scrollMobileToContent]);

  const handleMobileNavProjects = React.useCallback(() => {
    const projFile = files.find(f => f.title.toLowerCase().includes('project'));
    if (projFile) handleFileSelect(projFile);
    scrollMobileToContent();
  }, [files, scrollMobileToContent]);

  // Determine active bottom nav item
  const getActiveNav = () => {
    if (activeTabId === 'welcome') return 'home';
    if (activeTabId === 'experience-microsite') return 'experience';
    if (activeTabId === 'skills-microsite') return 'skills';
    const tab = activeTab;
    if (tab?.title?.toLowerCase().includes('readme') || tab?.title?.toLowerCase().includes('about')) return 'about';
    if (tab?.title?.toLowerCase().includes('project')) return 'projects';
    return '';
  };

  const activeNav = getActiveNav();

  if (isMobile) {
    return (
      <div
        ref={mobileWrapperRef}
        className="h-screen w-screen flex flex-col bg-gray-900 text-gray-300"
        style={{ overflowY: 'auto', overflowX: 'hidden' }}
      >
        {/* Slim top bar */}
        <div className="bg-gray-800 border-b border-gray-700 px-3 flex items-center justify-between flex-shrink-0" style={{ height: '28px', minHeight: '28px' }}>
          <button onClick={handleGoHome} className="text-white font-bold truncate" style={{ fontSize: '11px' }}>Saurabh Tripathi</button>
          <div className="flex items-center gap-3" style={{ fontSize: '11px' }}>
            <button onClick={onNavigateNews} className="text-blue-400 whitespace-nowrap">📰 News</button>
          </div>
        </div>

        {/* Toast overlay — absolutely positioned, doesn't push content */}
        {mobileToast && (
          <div
            style={{
              position: 'absolute',
              top: '32px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 50,
              background: 'rgba(37,99,235,0.92)',
              color: 'white',
              padding: '4px 16px',
              borderRadius: '16px',
              fontSize: '11px',
              fontWeight: 600,
              pointerEvents: 'none',
              animation: 'toastFade 1.4s ease-out forwards',
              whiteSpace: 'nowrap',
            }}
          >
            ✓ {mobileToast}
          </div>
        )}
        <style>{`
          @keyframes toastFade {
            0% { opacity: 0; transform: translateX(-50%) translateY(-4px); }
            15% { opacity: 1; transform: translateX(-50%) translateY(0); }
            75% { opacity: 1; }
            100% { opacity: 0; }
          }
        `}</style>

        {/* Content area - takes all remaining space above bottom nav */}
        <div
          id="content-area"
          ref={contentAreaRef}
          className="flex-1 overflow-auto"
        >
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-gray-400">Loading...</div>
            </div>
          ) : activeTab?.type === 'welcome' ? (
            <WelcomeTab files={files} onFileSelect={handleFileSelect} onOpenMicrosite={handleOpenMicrosite} />
          ) : activeTab?.type === 'microsite' && activeTab.language === 'microsite-experience' ? (
            <ExperienceMicrosite content={activeTab.content} onGoHome={handleGoHome} />
          ) : activeTab?.type === 'microsite' && activeTab.language === 'microsite-skills' ? (
            <SkillsMicrosite content={activeTab.content} onGoHome={handleGoHome} />
          ) : activeTab ? (
            <CodeEditor content={activeTab.content} language={activeTab.language} title={activeTab.title} onOpenMicrosite={handleOpenMicrosite} onGoHome={handleGoHome} />
          ) : null}
        </div>

        {/* Floating Terminal Toggle Button - shown when terminal is closed, above bottom nav */}
        {!mobileTerminalOpen && (
          <button
            onClick={() => setMobileTerminalOpen(true)}
            className="fixed right-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-3 py-1.5 rounded-full shadow-lg shadow-green-500/30 flex items-center gap-1.5 z-40"
            style={{ bottom: 'calc(36px + env(safe-area-inset-bottom, 0px))' }}
          >
            <span>⌨️</span>
            <span className="text-xs font-medium">Terminal</span>
          </button>
        )}

        {/* Terminal - collapsible at bottom */}
        {mobileTerminalOpen && (
          <div
            id="mobile-terminal"
            className="flex-shrink-0 bg-gray-950 border-t-2 border-green-500"
          >
            {/* Terminal header with close button */}
            <div className="flex items-center justify-between px-3 py-1 bg-gray-800 border-b border-gray-700">
              <span className="text-xs text-gray-400 flex items-center gap-2">
                <span className="text-green-400">●</span> TERMINAL
              </span>
              <button
                onClick={() => setMobileTerminalOpen(false)}
                className="bg-red-600 hover:bg-red-500 active:bg-red-700 text-white rounded px-2 py-0.5 text-[11px] font-bold leading-none"
                style={{ boxShadow: '0 2px 6px rgba(220,38,38,0.5), 0 1px 2px rgba(0,0,0,0.4)', minWidth: '24px', textAlign: 'center' }}
              >
                ✕
              </button>
            </div>
            <Terminal
              hideHeader
              files={files}
              onFileSelect={(file) => {
                handleFileSelect(file);
                showMobileToast(`Opened: ${file.title}`);
                setMobileTerminalOpen(false); // Close terminal after action
                scrollMobileToContent();
              }}
              onOpenMicrosite={(tab) => {
                handleOpenMicrosite(tab);
                showMobileToast(`Opened: ${tab.title}`);
                setMobileTerminalOpen(false); // Close terminal after action
                scrollMobileToContent();
              }}
              onGoHome={() => {
                handleGoHome();
                setMobileTerminalOpen(false);
                scrollMobileToContent();
              }}
            />
          </div>
        )}

        {/* Bottom Bar - social links only */}
        <div
          className="flex-shrink-0 bg-gray-800 border-t border-gray-700"
          style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
        >
          <div className="flex items-center justify-center gap-4 px-3 py-2">
            <a href="https://www.linkedin.com/in/saurabh-tripathi-a8b89945/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-[11px] flex items-center gap-1 transition-colors">
              <span>💼</span><span>LinkedIn</span>
            </a>
            <a href="https://github.com/saurabhtripathi" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-300 text-[11px] flex items-center gap-1 transition-colors">
              <span>🐙</span><span>GitHub</span>
            </a>
            <a href="https://www.drupal.org/u/saurabhtripathics" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-200 text-[11px] flex items-center gap-1 transition-colors">
              <span>💧</span><span>Drupal.org</span>
            </a>
            <a href="https://www.saurabh-tripathi.com/" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 text-[11px] flex items-center gap-1 transition-colors">
              <span>🌐</span><span>Web</span>
            </a>
          </div>
        </div>
      </div>
    );
  }
  // Desktop UI
  return (
    <div className="h-screen flex flex-col bg-gray-900 text-gray-300">
      <div className="bg-gray-800 px-4 py-1 flex justify-between items-center text-sm border-b border-gray-700">
        <div className="flex items-center gap-4">
          <span className="font-semibold">Visual Studio Code</span>
        </div>
        <div className="flex items-center gap-4 text-gray-400">
          <button
            onClick={onNavigateNews}
            className="group relative flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-lg shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all hover:scale-105"
          >
            <span className="text-lg">📰</span>
            <span className="text-xs font-semibold uppercase tracking-wider">Drupal Media</span>
            <span className="text-xs opacity-70 group-hover:opacity-100 transition-opacity">→</span>
          </button>
          <span className="hidden sm:inline">Saurabh Tripathi - Portfolio</span>
        </div>
      </div>
      <div className="flex-1 flex overflow-hidden">
        <Sidebar files={files} onFileSelect={handleFileSelect} activeFileId={activeTabId} />
        <div className="flex-1 flex flex-col">
          <div id="tab-bar" className="transition-all">
            <TabBar tabs={tabs} activeTabId={activeTabId} onTabSelect={setActiveTabId} onTabClose={handleTabClose} />
          </div>
          <div id="content-area" className="flex-1 overflow-auto">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-gray-400">Loading...</div>
              </div>
            ) : activeTab?.type === 'welcome' ? (
              <WelcomeTab files={files} onFileSelect={handleFileSelect} onOpenMicrosite={handleOpenMicrosite} />
            ) : activeTab?.type === 'microsite' && activeTab.language === 'microsite-experience' ? (
              <ExperienceMicrosite content={activeTab.content} onGoHome={handleGoHome} />
            ) : activeTab?.type === 'microsite' && activeTab.language === 'microsite-skills' ? (
              <SkillsMicrosite content={activeTab.content} onGoHome={handleGoHome} />
            ) : activeTab ? (
              <CodeEditor content={activeTab.content} language={activeTab.language} title={activeTab.title} onOpenMicrosite={handleOpenMicrosite} onGoHome={handleGoHome} />
            ) : null}
          </div>
        </div>
      </div>
      {terminalOpen && (
        <Terminal files={files} onFileSelect={handleFileSelect} onOpenMicrosite={handleOpenMicrosite} onGoHome={handleGoHome} />
      )}
      <StatusBar activeFile={activeTab?.title} onToggleTerminal={() => setTerminalOpen(!terminalOpen)} terminalOpen={terminalOpen} />
    </div>
  );
};

const App: React.FC = () => {
  const [route, setRoute] = useState(window.location.pathname);

  useEffect(() => {
    const handleRouteChange = () => setRoute(window.location.pathname);
    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  const navigate = (path: string) => {
    if (window.location.pathname === path) return;
    window.history.pushState({}, '', path);
    setRoute(path);
  };

  if (route.startsWith('/drupal-media')) {
    return <DrupalNewsPage onNavigateHome={() => navigate('/')} />;
  }

  return <PortfolioApp onNavigateNews={() => navigate('/drupal-media')} />;
};

export default App;
