
import React, { useState, useCallback } from 'react';
import type { DreamResult } from './types';
import { generateDreamAnalysis } from './services/geminiService';
import DreamInput from './components/DreamInput';
import LoadingSpinner from './components/LoadingSpinner';
import DreamOutput from './components/DreamOutput';

const App: React.FC = () => {
  const [dreamPrompt, setDreamPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<DreamResult | null>(null);

  const handleSubmit = useCallback(async (prompt: string) => {
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const dreamResult = await generateDreamAnalysis(prompt);
      setResult(dreamResult);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);
  
  const StarryBackground = () => (
    <div className="absolute top-0 left-0 w-full h-full z-[-1] overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-slate-900"></div>
      <div id="stars" className="absolute w-[1px] h-[1px] bg-white rounded-full shadow-[0_0_10px_2px_#fff]"></div>
      <div id="stars2" className="absolute w-[2px] h-[2px] bg-white rounded-full shadow-[0_0_10px_2px_#fff]"></div>
      <div id="stars3" className="absolute w-[3px] h-[3px] bg-white rounded-full shadow-[0_0_10px_2px_#fff]"></div>
      <style>{`
        @keyframes animStar {
          from { transform: translateY(0px); }
          to { transform: translateY(-2000px); }
        }
        #stars { animation: animStar 100s linear infinite; box-shadow: 0 0 10px 2px #fff, 0 0 20px 4px #0ff; }
        #stars2 { animation: animStar 150s linear infinite; box-shadow: 0 0 10px 2px #fff, 0 0 20px 4px #0ff; }
        #stars3 { animation: animStar 200s linear infinite; box-shadow: 0 0 10px 2px #fff, 0 0 20px 4px #0ff; }
        #stars { height: 1px; width: 1px; } #stars2 { height: 2px; width: 2px; } #stars3 { height: 3px; width: 3px; }
        /* Simple JS to generate stars - not using React state for this decorative element to avoid re-renders */
        const starCount = 250;
        const stars = document.getElementById('stars');
        const stars2 = document.getElementById('stars2');
        const stars3 = document.getElementById('stars3');
        if (stars && stars2 && stars3) {
            let starField = ''; let starField2 = ''; let starField3 = '';
            for(let i = 0; i < starCount; i++){
                const x = Math.floor(Math.random() * window.innerWidth);
                const y = Math.floor(Math.random() * 2000);
                const s = Math.random() * 2;
                const which = Math.floor(Math.random() * 3);
                const starStyle = \`\${x}px \${y}px #FFF\`;
                if(which === 0) starField += starStyle + ',';
                else if(which === 1) starField2 += starStyle + ',';
                else starField3 += starStyle + ',';
            }
            stars.style.boxShadow = starField.slice(0, -1);
            stars2.style.boxShadow = starField2.slice(0, -1);
            stars3.style.boxShadow = starField3.slice(0, -1);
        }
      `}</style>
    </div>
  );


  return (
    <>
      <StarryBackground />
      <main className="min-h-screen text-white bg-slate-900/50 backdrop-blur-sm flex flex-col items-center p-4 sm:p-6 md:p-8 relative z-10">
        <header className="w-full max-w-4xl text-center mb-8 animate-fade-in-down">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-wider text-cyan-300 drop-shadow-[0_0_10px_rgba(0,255,255,0.7)]">
            AI Dream Weaver
          </h1>
          <p className="mt-4 text-lg text-slate-300">
            Translate your subconscious visions into art, color, and story.
          </p>
        </header>

        <div className="w-full max-w-4xl flex-grow flex flex-col items-center">
          {isLoading ? (
            <LoadingSpinner />
          ) : result ? (
             <DreamOutput result={result} onReset={() => setResult(null)} />
          ) : (
            <div className="w-full mt-8 animate-fade-in-up">
              {error && (
                <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg relative mb-6 text-center" role="alert">
                  <strong className="font-bold">Error:</strong>
                  <span className="block sm:inline ml-2">{error}</span>
                </div>
              )}
              <DreamInput
                value={dreamPrompt}
                onChange={(e) => setDreamPrompt(e.target.value)}
                onSubmit={() => handleSubmit(dreamPrompt)}
                isLoading={isLoading}
              />
            </div>
          )}
        </div>
        
        <footer className="w-full text-center p-4 mt-8 text-slate-500">
          Powered by Gemini
        </footer>
      </main>
    </>
  );
};

export default App;
