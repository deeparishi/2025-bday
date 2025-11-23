import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { welcomeMessages } from '../data/messages';

export const Phase1Welcome = () => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeState, setFadeState] = useState<'in' | 'visible' | 'out'>('in');
  const navigate = useNavigate();

  useEffect(() => {
    
    if (currentIndex >= welcomeMessages.length) {
      navigate('/quiz');
      return;
    }

    const fadeInTimer = setTimeout(() => {
      setFadeState('visible');
    }, 500);

    const visibleTimer = setTimeout(() => {
      setFadeState('out');
    }, 3500);

    const nextTimer = setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
      setFadeState('in');
    }, 4500);

    return () => {
      clearTimeout(fadeInTimer);
      clearTimeout(visibleTimer);
      clearTimeout(nextTimer);
    };
  }, [currentIndex, navigate]);

  const getFadeClass = () => {
    if (fadeState === 'in') {
      return 'translate-y-[-100%] opacity-0';
    }
    if (fadeState === 'out') {
      return 'translate-y-[100%] opacity-0';
    }
    return 'translate-y-0 opacity-100';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-100 to-pink-200 flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl">
        <div
          className={`
            text-3xl md:text-5xl font-bold text-center text-pink-600
            transition-all duration-1000 ease-in-out
            ${getFadeClass()}
          `}
        >
          {welcomeMessages[currentIndex]}
        </div>
      </div>
    </div>
  );
};
