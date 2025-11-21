import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useEffect, useRef, useState } from 'react';
import { photoData } from '../data/photoData';

export const Phase3Photos = () => {
  
  const navigate = useNavigate();
  const [visibleIndices, setVisibleIndices] = useState<Set<number>>(new Set());
  const [showButton, setShowButton] = useState(false);
  const photoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const visibilityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    let currentRefs: (HTMLDivElement | null)[] = [];

    const timer = setTimeout(() => {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const index = photoRefs.current.indexOf(entry.target as HTMLDivElement);
              if (index !== -1) {
                setVisibleIndices((prev) => {
                  const newSet = new Set([...prev, index]);
                  return newSet;
                });
              }
            }
          });
        },
        { threshold: 0.3 }
      );

      currentRefs = photoRefs.current.filter((ref) => ref !== null);
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

    if (visibleIndices.has(photoData.length - 1) && visibleIndices.size === photoData.length) {
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
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-100 to-pink-200 py-12 px-4">
      <h1 className="text-4xl md:text-5xl font-bold text-pink-600 text-center mb-12">
        Our Beautiful Memories 📸
      </h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {photoData.map((photo, index) => (
          <div
            key={index}
            ref={(el) => {
              photoRefs.current[index] = el;
            }}
            className="flex justify-center"
            style={{
              opacity: visibleIndices.has(index) ? 1 : 0,
              transform: visibleIndices.has(index) 
                ? `rotate(${photo.rotation}deg) translateY(0)` 
                : `rotate(${photo.rotation}deg) translateY(40px)`,
              transition: 'opacity 0.8s ease-in-out, transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
              transitionDelay: visibleIndices.has(index) ? '0s' : '0s'
            }}
            onMouseEnter={(e) => {
              if (visibleIndices.has(index)) {
                e.currentTarget.style.transform = 'rotate(0deg) scale(1.05)';
                e.currentTarget.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
              }
            }}
            onMouseLeave={(e) => {
              if (visibleIndices.has(index)) {
                e.currentTarget.style.transform = `rotate(${photo.rotation}deg) scale(1)`;
                e.currentTarget.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
              }
            }}
          >
            <div className="bg-white p-4 shadow-2xl">
              <div className="bg-gray-200 w-64 h-64 flex items-center justify-center mb-3">
                <img
                  src={`${photo.filename}`}
                  alt={photo.caption}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="256" height="256"%3E%3Crect fill="%23e5e7eb" width="256" height="256"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="16" fill="%239ca3af"%3EPhoto%3C/text%3E%3C/svg%3E';
                  }}
                />
              </div>
              <p className="text-center text-pink-600 font-handwriting text-lg">
                {photo.caption}
              </p>
            </div>
          </div>
        ))}
      </div>

      {showButton && (
        <div className="flex justify-center pb-8 animate-fadeIn">
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
              fontSize: '1.25rem',
              textTransform: 'none',
              fontWeight: 'bold',
              animation: 'fadeIn 0.5s ease-in'
            }}
          >
            Next
          </Button>
        </div>
      )}

      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};
