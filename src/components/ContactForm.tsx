import React, { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    const mailtoLink = `mailto:saurabh.tripathi.cs@gmail.com?subject=Portfolio Inquiry from ${formData.name}${formData.company ? ` - ${formData.company}` : ''}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company || 'N/A'}\n\nMessage:\n${formData.message}`
    )}`;

    window.location.href = mailtoLink;
    setStatus('sent');

    setTimeout(() => {
      setFormData({ name: '', email: '', company: '', message: '' });
      setStatus('idle');
    }, 3000);
  };

  return (
    <div className="bg-[#1e1e1e] border border-[#3c3c3c] rounded-lg p-6 max-w-lg">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <span>📧</span> Contact Me
      </h3>

      {status === 'sent' ? (
        <div className="text-green-400 text-center py-8">
          <span className="text-4xl mb-2 block">✓</span>
          <p>Opening your email client...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Name *</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-[#2d2d2d] border border-[#3c3c3c] rounded text-white focus:border-[#007acc] focus:outline-none transition-colors"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Email *</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-[#2d2d2d] border border-[#3c3c3c] rounded text-white focus:border-[#007acc] focus:outline-none transition-colors"
              placeholder="your.email@company.com"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Company</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-[#2d2d2d] border border-[#3c3c3c] rounded text-white focus:border-[#007acc] focus:outline-none transition-colors"
              placeholder="Company name"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Message *</label>
            <textarea
              name="message"
              required
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-[#2d2d2d] border border-[#3c3c3c] rounded text-white focus:border-[#007acc] focus:outline-none transition-colors resize-none"
              placeholder="Hi Saurabh, I'd like to discuss an opportunity..."
            />
          </div>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full px-4 py-2 bg-[#007acc] hover:bg-[#005a9e] text-white rounded font-medium transition-colors disabled:opacity-50"
          >
            {status === 'sending' ? 'Opening...' : 'Send Message'}
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
