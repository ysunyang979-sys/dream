
import React from 'react';
import type { DreamResult } from '../types';

interface DreamOutputProps {
  result: DreamResult;
  onReset: () => void;
}

const DreamOutput: React.FC<DreamOutputProps> = ({ result, onReset }) => {

  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = result.imageUrl;
    link.download = 'dream-weaver-art.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full max-w-5xl mx-auto animate-fade-in-up space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left Column: Image and Palette */}
        <div className="lg:col-span-3 space-y-8">
          <div className="relative group bg-slate-800/50 p-4 rounded-xl border border-slate-700 shadow-2xl shadow-cyan-500/10">
            <h2 className="text-2xl font-bold mb-4 text-cyan-300">Your Dreamscape</h2>
            <img src={result.imageUrl} alt="AI generated dreamscape" className="w-full h-auto object-cover rounded-lg shadow-lg" />
             <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg">
                <button
                    onClick={downloadImage}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-800 rounded-md hover:bg-white transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Download
                </button>
            </div>
          </div>
          <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
            <h3 className="text-xl font-bold mb-4 text-cyan-300">Dream Palette</h3>
            <div className="flex flex-wrap gap-4">
              {result.palette.map((color, index) => (
                <div key={index} className="flex flex-col items-center group">
                  <div
                    className="w-16 h-16 rounded-full border-2 border-slate-600 transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span className="mt-2 text-sm text-slate-400 group-hover:text-white transition-colors">{color.name}</span>
                  <span className="text-xs text-slate-500">{color.hex}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Text content */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
            <h3 className="text-xl font-bold mb-4 text-cyan-300">Interpretation</h3>
            <p className="text-slate-300 leading-relaxed">{result.interpretation}</p>
          </div>
          <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
            <h3 className="text-xl font-bold mb-4 text-cyan-300">A Woven Tale</h3>
            <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">{result.story}</p>
          </div>
        </div>
      </div>
      
      <div className="text-center mt-8">
        <button
          onClick={onReset}
          className="py-3 px-8 text-lg font-bold text-white bg-purple-600 rounded-lg hover:bg-purple-500 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-600/30"
        >
          Weave Another Dream
        </button>
      </div>
    </div>
  );
};

export default DreamOutput;
