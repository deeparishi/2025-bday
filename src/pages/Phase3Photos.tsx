import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useEffect, useRef, useState } from 'react';
import { Heart, Sparkles, Sun, Laugh, Star, Flower, Gift } from 'lucide-react';

const timelineEvents = [
  {
    title: 'Our First Adventure',
    description: 'That magical moment when everything began, and you became my favorite person',
    icon: Heart,
    color: 'from-rose-300 to-pink-300',
    date: 'The Beginning',
    sentiment: 'love'
  },
  {
    title: 'Beautiful Sunset Moments',
    description: 'Watching the world turn golden, with you by my side',
    icon: Sun,
    color: 'from-orange-300 to-rose-300',
    date: 'Cherished',
    sentiment: 'warmth'
  },
  {
    title: 'Your Laughter Heals Me',
    description: 'Those times when you made me laugh so hard I couldn\'t breathe',
    icon: Laugh,
    color: 'from-yellow-200 to-pink-200',
    date: 'Pure Joy',
    sentiment: 'joy'
  },
  {
    title: 'My Forever Person',
    description: 'You are, and will always be, my favorite person in this world',
    icon: Star,
    color: 'from-purple-300 to-pink-300',
    date: 'Forever',
    sentiment: 'devotion'
  },
  {
    title: 'Creating Beautiful Memories',
    description: 'Every moment with you is a memory I treasure forever',
    icon: Flower,
    color: 'from-pink-300 to-rose-300',
    date: 'Always',
    sentiment: 'sweetness'
  },
  {
    title: 'Our Perfect Story',
    description: 'You and me equals everything I ever wanted and more',
    icon: Gift,
    color: 'from-indigo-300 to-pink-300',
    date: 'Destiny',
    sentiment: 'perfection'
  }
];

export const Phase3StoryTimeline = () => {
  const navigate = useNavigate();
  const [visibleIndices, setVisibleIndices] = useState<Set<number>>(new Set());
  const [showButton, setShowButton] = useState(false);
  const eventRefs = useRef<(HTMLDivElement | null)[]>([]);
  const visibilityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    let currentRefs: (HTMLDivElement | null)[] = [];

    const timer = setTimeout(() => {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const index = eventRefs.current.indexOf(entry.target as HTMLDivElement);
              if (index !== -1) {
                setVisibleIndices((prev) => {
                  const newSet = new Set([...prev, index]);
                  return newSet;
                });
              }
            }
          });
        },
        { threshold: 0.2 }
      );

      currentRefs = eventRefs.current.filter((ref) => ref !== null);
      currentRefs.forEach((ref) => {
        if (ref && observer) observer.observe(ref);
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      if (observer) {
        currentRefs.forEach((ref) => {
          if (ref) observer?.unobserve(ref);
        });
        observer.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (visibilityTimerRef.current) {
      clearTimeout(visibilityTimerRef.current);
    }

    if (visibleIndices.has(timelineEvents.length - 1) && visibleIndices.size === timelineEvents.length) {
      visibilityTimerRef.current = setTimeout(() => {
        setShowButton(true);
      }, 800);
    } else {
      setShowButton(false);
    }

    return () => {
      if (visibilityTimerRef.current) {
        clearTimeout(visibilityTimerRef.current);
      }
    };
  }, [visibleIndices]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-rose-50 to-pink-100 py-8 md:py-16 px-4 md:px-6">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 10px rgba(236, 72, 153, 0.5); }
          50% { box-shadow: 0 0 20px rgba(236, 72, 153, 0.8); }
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .timeline-marker {
          animation: glow 3s ease-in-out infinite;
        }
        .float-icon {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 md:mb-16">
          <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 via-rose-600 to-pink-500 bg-clip-text text-transparent mb-4">
            Our Love Story
          </h1>
          <div className="flex items-center justify-center gap-2 text-pink-500 mb-2">
            <Sparkles size={20} className="float-icon" />
            <p className="text-base md:text-lg font-medium">A timeline of beautiful moments</p>
            <Sparkles size={20} className="float-icon" />
          </div>
          <div className="h-1 w-24 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full mx-auto"></div>
        </div>

        <div className="relative">
          {timelineEvents.map((event, index) => {
            const Icon = event.icon;
            const isLeft = index % 2 === 0;

            return (
              <div
                key={index}
                ref={(el) => {
                  eventRefs.current[index] = el;
                }}
                className="mb-6 md:mb-12"
                style={{
                  opacity: visibleIndices.has(index) ? 1 : 0,
                  animation: visibleIndices.has(index) 
                    ? `${isLeft ? 'slideInLeft' : 'slideInRight'} 0.8s ease-out forwards`
                    : 'none'
                }}
              >
                <div className={`flex gap-4 md:gap-8 items-start ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>
                  {/* Timeline Content */}
                  <div className={`flex-1 ${isLeft ? 'text-right md:pr-8' : 'text-left md:pl-8'}`}>
                    <div className="bg-white rounded-2xl p-5 md:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 backdrop-blur-sm bg-opacity-95">
                      <div className="mb-2">
                        <span className="text-xs md:text-sm font-semibold text-pink-500 uppercase tracking-wide">
                          {event.date}
                        </span>
                      </div>
                      <h3 className="text-lg md:text-2xl font-bold text-pink-600 mb-2">
                        {event.title}
                      </h3>
                      <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </div>

                  {/* Timeline Center Marker */}
                  <div className="flex flex-col items-center">
                    <div className={`w-12 md:w-16 h-12 md:h-16 rounded-full bg-gradient-to-br ${event.color} flex items-center justify-center shadow-lg timeline-marker transform hover:scale-110 transition-transform duration-300`}>
                      <Icon size={24} className="text-white md:w-8 md:h-8" strokeWidth={1.5} />
                    </div>
                    {index < timelineEvents.length - 1 && (
                      <div className="w-1 h-8 md:h-12 bg-gradient-to-b from-pink-300 to-transparent mt-2"></div>
                    )}
                  </div>

                  {/* Spacer for alignment */}
                  <div className="flex-1"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Final Heart Beat */}
        <div className="flex justify-center mt-8 md:mt-16 mb-12">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-300 to-rose-300 rounded-full blur-lg opacity-50 animate-pulse"></div>
            <div className="relative w-16 md:w-20 h-16 md:h-20 rounded-full bg-gradient-to-br from-pink-400 to-rose-400 flex items-center justify-center shadow-2xl">
              <Heart size={32} className="text-white md:w-10 md:h-10 fill-white" />
            </div>
          </div>
        </div>

        {/* Call to Action */}
        {showButton && (
          <div className="flex justify-center pb-4 md:pb-8 animate-fadeIn">
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
              onClick={() => navigate('/birthday')}
              sx={{
                backgroundColor: '#ec4899',
                '&:hover': {
                  backgroundColor: '#db2777',
                },
                borderRadius: '50px',
                padding: '12px 40px',
                fontSize: { xs: '1rem', md: '1.25rem' },
                textTransform: 'none',
                fontWeight: 'bold',
                animation: 'fadeIn 0.5s ease-in'
              }}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
