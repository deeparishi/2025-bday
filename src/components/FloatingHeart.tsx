import { useEffect, useState } from 'react';

interface FloatingHeartProps {
  type: 'correct' | 'incorrect';
  onComplete: () => void;
}

const generateEmojis = (type: 'correct' | 'incorrect') => {
  const emojis = type === 'correct' 
    ? Array(18).fill('❤️')
    : Array(9).fill('💔').concat(Array(9).fill('😭'));
  
  return emojis.map((emoji, index) => ({
    id: index,
    emoji,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 0.3,
    duration: 2 + Math.random() * 0.5
  }));
};

export const FloatingHeart = ({ type, onComplete }: FloatingHeartProps) => {
  const [emojis] = useState(() => generateEmojis(type));
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onComplete();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
      {emojis.map((item) => (
        <div
          key={item.id}
          className="fixed"
          style={{
            left: `${item.left}%`,
            top: `${item.top}%`,
            animation: `float-up ${item.duration}s ease-in-out ${item.delay}s forwards`,
            opacity: 0,
          }}
        >
          <span className="text-6xl">{item.emoji}</span>
        </div>
      ))}
      <style>{`
        @keyframes float-up {
          0% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateY(-100px) scale(0.5);
          }
        }
      `}</style>
    </div>
  );
};
