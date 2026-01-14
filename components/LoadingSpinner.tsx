
import React, { useState, useEffect } from 'react';

const loadingMessages = [
  "Consulting the oneiromancer...",
  "Mixing dream pigments...",
  "Weaving the narrative threads...",
  "Translating subconscious symbols...",
  "Entering the realm of Morpheus...",
  "Painting your vision...",
  "Gathering stardust...",
];

const LoadingSpinner: React.FC = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % loadingMessages.length);
    }, 2500);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full animate-fade-in-up my-16">
      <div className="relative w-24 h-24">
        <div className="absolute border-4 border-t-4 border-t-cyan-400 border-slate-600 rounded-full w-full h-full animate-spin"></div>
        <div className="absolute border-4 border-t-4 border-t-purple-400 border-slate-700 rounded-full w-10/12 h-10/12 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin-reverse"></div>
        <div className="absolute w-2/3 h-2/3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
        </div>
      </div>
      <p className="mt-6 text-xl text-slate-300 text-center transition-opacity duration-500">
        {loadingMessages[messageIndex]}
      </p>
      <style jsx>{`
        @keyframes spin-reverse {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(-360deg);
          }
        }
        .animate-spin-reverse {
          animation: spin-reverse 2s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;
