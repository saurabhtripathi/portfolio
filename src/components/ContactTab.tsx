import React from 'react';
import ContactForm from './ContactForm';
import ResumeDownload from './ResumeDownload';
import DrupalContributions from './DrupalContributions';

interface ContactTabProps {
  onOpenOpenSource?: () => void;
}

const ContactTab: React.FC<ContactTabProps> = ({ onOpenOpenSource }) => {
  return (
    <div className="p-4 sm:p-8 overflow-auto h-full bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Get In Touch</h1>
          <p className="text-gray-400">
            Interested in working together? I'd love to hear from you!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <ContactForm />

          {/* Contact Info & Resume */}
          <div className="space-y-6">
            {/* Drupal Contributions - Compact */}
            <DrupalContributions compact onViewAll={onOpenOpenSource} />

            {/* Quick Contact */}
            <div className="bg-[#1e1e1e] border border-[#3c3c3c] rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
              <div className="space-y-3">
                <a
                  href="mailto:saurabh.tripathi.cs@gmail.com"
                  className="flex items-center gap-3 text-gray-300 hover:text-[#007acc] transition-colors"
                >
                  <span>📧</span>
                  <span>saurabh.tripathi.cs@gmail.com</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/saurabh-tripathi-a8b89945/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-300 hover:text-[#007acc] transition-colors"
                >
                  <span>💼</span>
                  <span>LinkedIn Profile</span>
                </a>
                <a
                  href="https://github.com/saurabhtripathi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-300 hover:text-[#007acc] transition-colors"
                >
                  <span>🐙</span>
                  <span>GitHub Profile</span>
                </a>
                <a
                  href="https://www.drupal.org/u/saurabhtripathics"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-300 hover:text-[#007acc] transition-colors"
                >
                  <span>💧</span>
                  <span>Open Source Profile</span>
                </a>
              </div>
            </div>

            {/* Resume Download */}
            <div className="bg-[#1e1e1e] border border-[#3c3c3c] rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">📄 Resume</h3>
              <p className="text-gray-400 text-sm mb-4">
                Download my complete resume in PDF format.
              </p>
              <ResumeDownload />
            </div>

            {/* Location */}
            <div className="bg-[#1e1e1e] border border-[#3c3c3c] rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-2">📍 Location</h3>
              <p className="text-gray-300">Singapore 🇸🇬</p>
              <p className="text-gray-500 text-sm mt-1">Open to remote opportunities worldwide</p>
            </div>
          </div>
        </div>

        {/* Full Drupal Contributions Section */}
        <div className="mt-8">
          <DrupalContributions />
        </div>

        {/* Footer */}
        <div className="text-center text-gray-600 text-xs mt-10 pt-6 border-t border-gray-800">
          <p>Looking forward to connecting with you!</p>
        </div>
      </div>
    </div>
  );
};

export default ContactTab;
