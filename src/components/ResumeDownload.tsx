import React from 'react';

const ResumeDownload: React.FC = () => {
  return (
    <a
      href="/resume/Saurabh_Tripathi_Resume.pdf"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded font-medium transition-all shadow-lg hover:shadow-green-500/25 text-xs"
      title="Download Resume"
    >
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <span>Resume</span>
    </a>
  );
};

export default ResumeDownload;
