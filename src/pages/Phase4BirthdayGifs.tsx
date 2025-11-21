import { useState, useEffect, CSSProperties } from 'react';

const FloatingGif = ({ src, pos, delay = 0 }: { src: string; pos: CSSProperties; delay?: number }) => {
  const floatStyle: CSSProperties = {
    position: 'absolute',
    ...pos,
    animation: `float 3s ease-in-out ${delay}s infinite`,
    zIndex: 5,
  };

  return (
    <div style={floatStyle} className="w-40 h-40 md:w-80 md:h-80">
      <img
        src={src}
        alt="celebration"
        className="w-full h-full object-cover rounded-lg shadow-lg"
        onError={(e) => {
          e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23fce7f3" width="100" height="100" rx="8"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-size="40" fill="%23ec4899"%3E🎉%3C/text%3E%3C/svg%3E';
        }}
      />
    </div>
  );
};

export default function BirthdayAnimation(): JSX.Element {
  const [title, setTitle] = useState<string>('');
  const [titleComplete, setTitleComplete] = useState<boolean>(false);
  const [gifs, setGifs] = useState<Array<{ src: string; pos: CSSProperties; delay: number }>>([]);
  const [message, setMessage] = useState<string>('');
  
  const fullTitle = 'Happy Birthday';
  const fullMessage = "On this special day, I want to celebrate not just you, but every moment we've shared. You bring so much joy, love, and light into my life. Every laugh, every adventure, every quiet moment with you is precious to me. Here's to another year of making beautiful memories together. I love you more than words can say 💝";

  // Load GIFs dynamically with positions at four corners
  useEffect(() => {
    const gifList = [
      '/src/files/gif/mocha_wishing_birtday_milk.gif',
      '/src/files/gif/hug.gif',
      '/src/files/gif/hug_kiss.gif',
      '/src/files/gif/milk_hg_mocha.gif',
    ];
    
    // Position GIFs at the four corners - using pixels for better control
    const positions = [
      { top: '20px', left: '20px' },           // Top left
      { top: '20px', right: '20px' },          // Top right
      { bottom: '20px', left: '20px' },        // Bottom left
      { bottom: '20px', right: '20px' },       // Bottom right
    ];
    
    const positionedGifs = gifList.map((gif, i) => ({
      src: gif,
      pos: positions[i],
      delay: i * 0.3,
    }));
    
    setGifs(positionedGifs);
  }, []);

  // Type title
  useEffect(() => {
    if (title.length < fullTitle.length) {
      const timer = setTimeout(() => {
        setTitle(fullTitle.slice(0, title.length + 1));
      }, 150);
      return () => clearTimeout(timer);
    } else if (title === fullTitle && !titleComplete) {
      setTimeout(() => {
        setTitleComplete(true);
      }, 500);
    }
  }, [title, fullTitle, titleComplete]);

  // Type message continuously
  useEffect(() => {
    if (!titleComplete) return;

    if (message.length < fullMessage.length) {
      const timer = setTimeout(() => {
        setMessage(fullMessage.slice(0, message.length + 1));
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [message, titleComplete, fullMessage]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-100 to-pink-200 overflow-hidden relative">
      <div className="relative min-h-screen flex items-center justify-center py-20 px-6 md:px-8">
        {/* Floating GIFs - now relative to parent container */}
        {titleComplete && gifs.map((gif, i) => (
          <FloatingGif key={i} src={gif.src} pos={gif.pos} delay={gif.delay} />
        ))}
        
        {/* Main Content - Centered */}
        <div className="relative z-20 w-full max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-pink-600 mb-10 md:mb-14 text-center">
            {title}
            {title.length < fullTitle.length && (
              <span className="animate-pulse">|</span>
            )}
          </h1>
          
          {titleComplete && (
            <div className="w-full max-w-2xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-6 md:p-10 animate-fade-in">
              <p className="text-base md:text-lg text-gray-700 leading-relaxed text-center">
                {message}
                {message.length < fullMessage.length && (
                  <span className="animate-pulse">|</span>
                )}
              </p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-10px) rotate(2deg);
          }
          50% {
            transform: translateY(-20px) rotate(-2deg);
          }
          75% {
            transform: translateY(-10px) rotate(1deg);
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}