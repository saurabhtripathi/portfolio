import React, { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const SUGGESTED_QUESTIONS = [
  'What is your current role?',
  'What are your top skills?',
  'Tell me about CNA project',
  'How many years experience?',
  'What certifications do you have?',
  'What tech stack do you use?',
  'Tell me about Mediacorp work',
  'How to contact you?',
];

const CHAT_API_URL =
  process.env.REACT_APP_CHAT_API_URL ||
  'https://drupal-news-api.vercel.app/api/chat';

const AiChatPanel: React.FC<{ onClose: () => void; hideHeader?: boolean; mobileCloseButton?: React.ReactNode }> = ({ onClose, hideHeader, mobileCloseButton }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        "Hi! I'm an AI assistant trained on Saurabh's resume. Ask me anything about his experience, skills, or projects.",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMessage: Message = { role: 'user', content: trimmed };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      const history = updatedMessages.slice(0, -1).map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch(CHAT_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed, history }),
      });

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: data.reply || data.error || 'Sorry, something went wrong.',
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'Connection error. Please check back later or contact Saurabh directly.',
        },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="bg-gray-950 font-mono text-sm flex flex-col" style={{ height: '260px' }}>
      {/* Panel header - only shown when standalone (mobile) */}
      {!hideHeader && (
        <div className="flex items-center justify-between px-4 py-1.5 bg-gray-800 border-b border-gray-700 flex-shrink-0">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span className="text-purple-400">●</span>
            <span>AI ASSISTANT</span>
            <span className="text-gray-600">|</span>
            <span className="text-gray-500">gemini-flash-lite · resume-context</span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-300 transition-colors text-xs px-2 py-0.5 rounded hover:bg-gray-700"
          >
            ✕ Close
          </button>
        </div>
      )}

      {/* Suggested questions row */}
      <div
        className="bg-gray-900 border-b border-gray-800 px-2 py-1 flex-shrink-0"
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'nowrap',
          alignItems: 'center',
          gap: '6px',
          overflowX: 'auto',
          whiteSpace: 'nowrap',
          fontSize: '11px',
          minHeight: '28px',
        }}
      >
        {mobileCloseButton}
        {SUGGESTED_QUESTIONS.map((q) => (
          <button
            key={q}
            onClick={() => sendMessage(q)}
            disabled={loading}
            className="text-purple-400 hover:brightness-125 active:scale-95 disabled:opacity-50"
            style={{
              padding: '2px 7px',
              background: '#23272e',
              borderRadius: '4px',
              fontSize: '11px',
              flexShrink: 0,
            }}
          >
            {q}
          </button>
        ))}
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-auto p-3 space-y-2" style={{ fontSize: '12px' }}>
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'assistant' && (
              <span className="text-purple-400 flex-shrink-0 mt-0.5" style={{ fontSize: '10px' }}>AI</span>
            )}
            <div
              className={`max-w-xs rounded px-2 py-1 leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-blue-600/30 text-blue-200 border border-blue-700/50'
                  : 'bg-gray-800 text-gray-300 border border-gray-700'
              }`}
              style={{ maxWidth: '75%', wordBreak: 'break-word' }}
            >
              {msg.content}
            </div>
            {msg.role === 'user' && (
              <span className="text-blue-400 flex-shrink-0 mt-0.5" style={{ fontSize: '10px' }}>you</span>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex gap-2 justify-start">
            <span className="text-purple-400 flex-shrink-0 mt-0.5" style={{ fontSize: '10px' }}>AI</span>
            <div className="bg-gray-800 text-gray-500 border border-gray-700 rounded px-2 py-1" style={{ fontSize: '12px' }}>
              <span className="animate-pulse">thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 px-3 py-2 bg-gray-900 border-t border-gray-800 flex-shrink-0"
      >
        <span className="text-purple-400 text-sm">{'>'}</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about skills, experience, projects..."
          disabled={loading}
          className="flex-1 bg-transparent outline-none text-white disabled:opacity-50"
          style={{ caretColor: '#c084fc', fontSize: '13px' }}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="text-purple-400 hover:text-purple-300 disabled:opacity-30 transition-colors text-xs"
        >
          send
        </button>
      </form>
    </div>
  );
};

export default AiChatPanel;
