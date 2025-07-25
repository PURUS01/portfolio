// src/components/HomePage.jsx
import { FaDownload, FaArrowRight } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { useRef } from "react";

function HomePage() {
    const [data, setData] = useState(null);
    const [greeting, setGreeting] = useState("");
    const [showHello, setShowHello] = useState(false);
    const [showName, setShowName] = useState(false);
    const [showTitle, setShowTitle] = useState(false);
    const [showLocation, setShowLocation] = useState(false);
    // 3D tilt state
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const cardRef = useRef(null);

    // Typewriter effect for dynamic name
    useEffect(() => {
      if (!data || !data.name) return;
      const fullGreeting = `I'm ${data.name}`;
      let current = 0;
      setGreeting("");
      const interval = setInterval(() => {
        current++;
        setGreeting(fullGreeting.slice(0, current));
        if (current === fullGreeting.length) {
          clearInterval(interval);
        }
      }, 60);
      return () => clearInterval(interval);
    }, [data]);

    // Sequentially show each line
    useEffect(() => {
      setShowHello(false);
      setShowName(false);
      setShowTitle(false);
      setShowLocation(false);
      const timers = [];
      timers.push(setTimeout(() => setShowHello(true), 200));
      timers.push(setTimeout(() => setShowName(true), 900));
      timers.push(setTimeout(() => setShowTitle(true), 1800));
      timers.push(setTimeout(() => setShowLocation(true), 2500));
      return () => timers.forEach(clearTimeout);
    }, []);

  useEffect(() => {
    fetch("http://localhost:8000/api/profile")
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error("API Error", err));
  }, []);
if (!data) return (
    <div className="min-h-screen bg-gradient from-gray-900 via-black to-gray-800 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-lime-400 mx-auto mb-4"></div>
        <div className="text-lg text-white animate-pulse">Loading...</div>
      </div>
    </div>
  );
  
  return (
    <div>
        {/* Hero Section */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center mt-20 max-w-6xl mx-auto bg-transparent animate-fadeInInitial gap-8 md:gap-16 py-12">
        {/* Left: Text Section */}
        <div className="flex-1 flex flex-col justify-center items-start max-w-xl space-y-6 animate-fadeInLeft">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
            <span className={`block ${showHello ? 'fade-in-up' : 'opacity-0'}`}>Hello,</span>
            <span className={`block ${showName ? 'fade-in-up' : 'opacity-0'}`} style={{color: '#a3e635', fontWeight: 'bold'}}>{greeting}</span>
            <span className={`block ${showTitle ? 'fade-in-up' : 'opacity-0'}`}>Laravel Developer</span>
            <span className={`block ${showLocation ? 'fade-in-up' : 'opacity-0'}`}>in Sri Lanka.</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-lg">
            I’m a passionate IT student at SLIATE Jaffna and a Software Engineer Intern at Bohar Solutions. I specialize in Laravel and modern web technologies, gaining hands-on experience through real-world projects. I thrive in collaborative, growth-focused environments and am driven to build impactful tech solutions.
          </p>
          <div className="flex gap-4 mt-2">
            <a href="/cv.pdf" download className="px-6 py-3 rounded-full border border-lime-400 text-lime-400 font-semibold bg-transparent hover:bg-lime-400 hover:text-black transition-all duration-200 shadow-md flex items-center gap-2">
              <span>Download CV</span>
              <FaDownload className="w-5 h-5" />
            </a>
          </div>
        </div>
        {/* Right: Image Section */}
        <div className="flex-1 flex justify-center items-center animate-fadeInRight">
          <div
            className="relative flex items-center justify-center group"
            style={{minWidth: '340px', minHeight: '340px', perspective: '1200px'}}
            ref={cardRef}
            onMouseMove={e => {
              const rect = cardRef.current.getBoundingClientRect();
              const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
              const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
              setTilt({ x: y * 12, y: -x * 12 });
            }}
            onMouseLeave={() => setTilt({ x: 0, y: 0 })}
          >
            {/* Animated glow background */}
            <div className="absolute w-[340px] h-[340px] rounded-[1.5rem] -z-10 animate-profile-blob-pulse profile-glow-bg"></div>
            {/* 3D card with image */}
            <div
              className="rounded-[1.5rem] border-2 shadow-2xl transition-transform duration-300"
              style={{
                width: '400px',
                height: '400px',
                borderColor: '#414741',
                background: 'none',
                zIndex: 2,
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1,1,1)`
              }}
            >
              <img
                src="/images/purus.jpeg"
                alt="Profile"
                className="object-cover w-full h-full rounded-[1.3rem] transition-transform duration-300"
                style={{background: 'none'}}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Worked with section */}
      <div className="relative z-10 max-w-5xl mx-auto mt-32 animate-fadeInUp" style={{animationDelay: '0.9s'}}>
        <p className="text-sm text-gray-400 uppercase tracking-widest mb-8 text-center">Worked with</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 text-center text-gray-300">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 py-4 px-6 rounded-xl hover:bg-white/10 hover:border-lime-400/50 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-lime-400/20">
            Bohar Solutions
          </div>
        </div>
      </div>

      {/* Projects */}
      <div className="relative z-10 max-w-6xl mx-auto mt-32 px-4 pb-20 animate-fadeInUp" style={{animationDelay: '1.2s'}}>
        <h2 className="text-4xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-white via-lime-400 to-white">
          Projects
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {data.projects.slice(0, 3).map((project, i) => (
            <div
              key={i}
              className="group bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 hover:bg-white/10 hover:border-lime-400/50 hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-lime-400/20 animate-fadeInUp"
              style={{animationDelay: `${1.5 + i * 0.2}s`}}
            >
              <div className="relative overflow-hidden">
                <h3 className="text-2xl font-bold text-lime-400 mb-4 group-hover:text-lime-300 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-300 group-hover:text-white transition-colors duration-300 leading-relaxed">
                  {project.description}
                </p>
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-lime-400 to-green-500 group-hover:w-full transition-all duration-500"></div>
              </div>
            </div>
          ))}
        </div>
        {/* See All Projects Link */}
        <div className="flex justify-center mt-8">
          <a
            href="/projects"
            className="inline-flex items-center gap-1 text-lime-400 font-semibold text-base hover:underline hover:text-lime-300 transition-all duration-200"
          >
            See All Projects
            <FaArrowRight className="w-4 h-4 ml-1" />
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInInitial {
          from {
            opacity: 0;
            transform: scale(0.98) translateY(40px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes gradient-x {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }

        @keyframes profileFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-18px); }
        }
        .animate-profile-float {
          animation: profileFloat 3.5s ease-in-out infinite;
        }
        @keyframes profileBlobPulse {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.08); }
        }
        .animate-profile-blob-pulse {
          animation: profileBlobPulse 5s ease-in-out infinite;
        }

        .animate-fadeInLeft {
          animation: fadeInLeft 0.8s ease-out forwards;
        }

        .animate-fadeInRight {
          animation: fadeInRight 0.8s ease-out forwards;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }

        .animate-fadeInInitial {
          animation: fadeInInitial 1.2s cubic-bezier(0.23, 1, 0.32, 1) forwards;
        }
        /* Remove squircle/floating image styles for clean card look */
        .fade-in-up {
          opacity: 1;
          animation: fadeInUp 0.7s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        .opacity-0 {
          opacity: 0;
        }
        .profile-gradient-border {
          background: conic-gradient(from 180deg, #a3e635, #22c55e, #a3e635 100%);
          padding: 8px;
          position: relative;
        }
        @keyframes profileGlow {
          0%, 100% { box-shadow: 0 0 32px 8px #a3e63544, 0 0 0 0 #22c55e44; opacity: 0.7; }
          50% { box-shadow: 0 0 48px 16px #a3e63588, 0 0 0 8px #22c55e44; opacity: 1; }
        }
        .animate-profile-glow {
          box-shadow: 0 0 32px 8px #a3e63544, 0 0 0 0 #22c55e44;
          animation: profileGlow 3.5s ease-in-out infinite;
        }
        /* No extra border/glow/floating for simple card */
        .profile-glow-bg {
          background: radial-gradient(ellipse at 60% 40%, #a3e63533 0%, #22c55e22 60%, transparent 100%);
          filter: blur(24px) brightness(1.2);
          opacity: 0.7;
          transition: opacity 0.3s;
        }
      `}</style>
    </div>
  );
}

export default HomePage;