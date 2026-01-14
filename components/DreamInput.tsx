
import React from 'react';

interface DreamInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const DreamInput: React.FC<DreamInputProps> = ({ value, onChange, onSubmit, isLoading }) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      onSubmit();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 bg-slate-800/50 rounded-xl border border-slate-700 shadow-2xl shadow-cyan-500/10">
      <label htmlFor="dream-prompt" className="block mb-3 text-lg font-medium text-slate-300">
        Describe your dream...
      </label>
      <textarea
        id="dream-prompt"
        rows={5}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder="e.g., Flying over a city made of glass while purple whales swim in the sky..."
        className="w-full p-3 bg-slate-900/70 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-300 text-slate-200 placeholder-slate-500 resize-none"
        disabled={isLoading}
      />
      <p className="text-xs text-slate-500 mt-2">Press Ctrl+Enter or Cmd+Enter to submit.</p>
      <button
        onClick={onSubmit}
        disabled={isLoading || !value.trim()}
        className="w-full mt-4 py-3 px-6 text-lg font-bold text-white bg-cyan-600 rounded-lg hover:bg-cyan-500 disabled:bg-slate-700 disabled:text-slate-400 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105 disabled:scale-100 shadow-lg shadow-cyan-600/30"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
        {isLoading ? 'Weaving...' : 'Weave Dream'}
      </button>
    </div>
  );
};

export default DreamInput;
