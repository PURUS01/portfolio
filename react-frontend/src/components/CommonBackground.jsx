import React, { useEffect, useState } from 'react';

function CommonBackground() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Parallax factors for each element (increased for more movement)
  const factors = {
    blob1: 0.35,
    blob2: 0.28,
    blob3: 0.42,
    blob4: 0.18,
    dot1: 0.55,
    dot2: 0.38,
    dot3: 0.44,
    dotWhite1: 0.32,
    dotWhite2: 0.21,
    dotWhite3: 0.27,
    grid: 0.04,
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Blobs - more transparent for subtlety */}
        <div
          className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-lime-400/5 to-green-500/5 rounded-full blur-3xl animate-blob1"
          style={{
            animationDelay: '0s',
            transform: `translateY(${scrollY * factors.blob1}px)`
          }}
        ></div>
        <div
          className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-green-400/5 to-lime-500/5 rounded-full blur-3xl animate-blob2"
          style={{
            animationDelay: '2s',
            transform: `translateY(-${scrollY * factors.blob2}px)`
          }}
        ></div>
        <div
          className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-r from-lime-400/6 to-green-400/6 rounded-full blur-3xl animate-blob3"
          style={{
            animationDelay: '4s',
            transform: `translateY(${scrollY * factors.blob3}px)`
          }}
        ></div>
        <div
          className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-white/8 to-lime-400/8 rounded-full blur-3xl animate-blob4"
          style={{
            animationDelay: '6s',
            transform: `translateY(-${scrollY * factors.blob4}px)`
          }}
        ></div>
        {/* Colored Particles - more transparent for smoothness */}
        <div
          className="absolute top-1/4 right-1/4 w-2 h-2 bg-lime-400/30 rounded-full animate-pulse"
          style={{
            transform: `translateY(${scrollY * factors.dot1}px)`
          }}
        ></div>
        <div
          className="absolute bottom-1/4 left-1/4 w-3 h-3 bg-green-400/20 rounded-full animate-pulse"
          style={{
            animationDelay: '1s',
            transform: `translateY(-${scrollY * factors.dot2}px)`
          }}
        ></div>
        <div
          className="absolute top-3/4 left-1/6 w-1 h-1 bg-lime-300/30 rounded-full animate-pulse"
          style={{
            animationDelay: '2s',
            transform: `translateY(${scrollY * factors.dot3}px)`
          }}
        ></div>
        {/* White Particles */}
        <div
          className="absolute top-1/3 left-1/5 w-1.5 h-1.5 bg-white/40 rounded-full animate-pulse"
          style={{
            animationDelay: '0.5s',
            transform: `translateY(${scrollY * factors.dotWhite1}px)`
          }}
        ></div>
        <div
          className="absolute bottom-1/5 right-1/3 w-2 h-2 bg-white/30 rounded-full animate-pulse"
          style={{
            animationDelay: '1.2s',
            transform: `translateY(-${scrollY * factors.dotWhite2}px)`
          }}
        ></div>
        <div
          className="absolute top-2/3 right-1/6 w-1 h-1 bg-white/30 rounded-full animate-pulse"
          style={{
            animationDelay: '2.1s',
            transform: `translateY(${scrollY * factors.dotWhite3}px)`
          }}
        ></div>
        {/* Grid pattern overlay with slight parallax and lighter color */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(rgba(163,230,53,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(163,230,53,0.015) 1px,transparent 1px)',
            backgroundSize: '50px 50px',
            transform: `translateY(${scrollY * factors.grid}px)`
          }}
        ></div>
      </div>

      <style jsx>{`
        @keyframes blob1 {
          0%, 100% { transform: scale(1) translate(0, 0); }
          50% { transform: scale(1.1) translate(30px, -20px); }
        }
        @keyframes blob2 {
          0%, 100% { transform: scale(1) translate(0, 0); }
          50% { transform: scale(1.08) translate(-40px, 30px); }
        }
        @keyframes blob3 {
          0%, 100% { transform: scale(1) translate(0, 0); }
          50% { transform: scale(1.12) translate(25px, -35px); }
        }
        @keyframes blob4 {
          0%, 100% { transform: scale(1) translate(0, 0); }
          50% { transform: scale(1.06) translate(-30px, 20px); }
        }
        
        .animate-blob1 {
          animation: blob1 8s ease-in-out infinite;
        }
        .animate-blob2 {
          animation: blob2 10s ease-in-out infinite;
        }
        .animate-blob3 {
          animation: blob3 12s ease-in-out infinite;
        }
        .animate-blob4 {
          animation: blob4 9s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default CommonBackground; 