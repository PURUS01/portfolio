// src/components/HomePage.jsx
import { FaDownload } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { firestore } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

function HomePage() {

  // Fetch data from Firebase
  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(firestore, "portfolion", "about");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {

          const fetchedData = docSnap.data();
          const fixedData = {
            name: `${fetchedData.firstName} ${fetchedData.lastName}`,
            title: `${fetchedData.title}`,
            profileImage: `${fetchedData.profileImage}`,
            workedWith: fetchedData.workedWith || [],
          };
          setData(fixedData);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const [data, setData] = useState(null);
  const [greeting, setGreeting] = useState("");
  const [showHello, setShowHello] = useState(false);
  const [showName, setShowName] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
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
    }, 100);
    return () => clearInterval(interval);
  }, [data]);

  // Sequentially show each line
  useEffect(() => {
    setShowHello(false);
    setShowName(false);
    setShowTitle(false);
    const timers = [];
    timers.push(setTimeout(() => setShowHello(true), 200));
    timers.push(setTimeout(() => setShowName(true), 900));
    timers.push(setTimeout(() => setShowTitle(true), 1800));
    return () => timers.forEach(clearTimeout);
  }, []);


  if (!data) return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#0077C8] mx-auto mb-4"></div>
        <div className="text-lg text-white animate-pulse">Loading...</div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen text-white font-sans relative overflow-hidden">
      <div className="relative z-10 animate-main-fadein">
        {/* Main Content Container */}
        <div className="min-h-screen flex items-center justify-center py-8 lg:py-0">
          <div className="w-full max-w-7xl mx-auto px-6 lg:px-12">
            {/* Mobile and Tablet Layout - Image First */}
            <div className="flex flex-col lg:hidden items-center text-center space-y-8">

              {/* Profile Image - Mobile/Tablet */}
              <div className="animate-fadeInUp">
                <div className="relative">
                  {/* Decorative Elements */}
                  <div className="absolute -top-4 -right-4 w-16 h-16 border border-[#0077C8]/30 rounded-full animate-pulse"></div>
                  <div className="absolute -bottom-6 -left-6 w-20 h-20 border border-[#0077C8]/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>

                  {/* Main Image Container */}
                  <div
                    className="relative w-64 h-80 sm:w-80 sm:h-[420px] group"
                    ref={cardRef}
                    onMouseMove={e => {
                      const rect = cardRef.current.getBoundingClientRect();
                      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
                      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
                      setTilt({ x: y * 5, y: -x * 5 });
                    }}
                    onMouseLeave={() => setTilt({ x: 0, y: 0 })}
                  >
                    {/* Background Shape */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0077C8]/20 to-[#0077C8]/10 rounded-3xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500"></div>

                    {/* Image Container */}
                    <div
                      className="relative w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl overflow-hidden shadow-2xl transform transition-all duration-500 hover:scale-105"
                      style={{
                        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${tilt.x || tilt.y ? 1.02 : 1})`
                      }}
                    >
                      {/* Glow Effect */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0077C8]/10 via-transparent to-transparent"></div>

                      {/* Profile Image */}
                      <img
                        src={data.profileImage}
                        alt="Kukanenthiran Purusothman"
                        className="w-full h-full object-cover transition-all duration-700 hover:brightness-110 filter"
                        style={{
                          filter: 'drop-shadow(0 25px 50px #0077C833)'
                        }}
                      />

                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                  </div>

                  {/* Floating Elements for Visual Interest */}
                  <div className="absolute top-16 -left-4 w-3 h-3 bg-[#0077C8]/60 rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>
                  <div className="absolute bottom-24 -right-3 w-4 h-4 bg-[#0077C8]/40 rounded-full animate-float" style={{ animationDelay: '1.5s' }}></div>
                  <div className="absolute top-1/3 -right-8 w-2 h-2 bg-[#0077C8]/80 rounded-full animate-float" style={{ animationDelay: '2.5s' }}></div>
                </div>
              </div>

              {/* Text Content - Mobile/Tablet */}
              <div className="space-y-6 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
                {/* Main Heading */}
                <div className="space-y-4">
                  <h1 className="leading-none tracking-tight">
                    <span className={`block ${showHello ? 'fade-in-up' : 'opacity-0'} text-gray-200 font-light text-3xl sm:text-4xl`}>Hello,</span>
                    <span className={`block ${showName ? 'fade-in-up' : 'opacity-0'} text-[#0077C8] font-black text-4xl sm:text-5xl`}>{greeting}</span>
                    <span className={`block ${showTitle ? 'fade-in-up' : 'opacity-0'} text-white font-bold text-2xl sm:text-3xl`}>{data.title}</span>
                  </h1>
                </div>

                {/* Download CV Button */}
                <div className="pt-6">
                  <a
                    href="/Purus.pdf"
                    download
                    className="inline-flex items-center gap-3 px-6 py-3 bg-[#0077C8] text-white font-bold text-base sm:text-lg rounded-lg hover:bg-[#005F9E] transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-[#00BFFF]/40 border-2 border-[#0077C8]/60 hover:border-[#005F9E]/40"
                  >
                    <span>DOWNLOAD CV</span>
                    <FaDownload className="w-4 h-4" />
                  </a>
                </div>
              </div>

            </div>

            {/* Desktop Layout - Original Side-by-Side */}
            <div className="hidden lg:grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">

              {/* Left Content - Takes up more space */}
              <div className="lg:col-span-7 space-y-8 animate-fadeInLeft relative">
                {/* Decorative elements around text */}
                <div className="absolute -top-8 -left-8 w-16 h-16 border border-[#0077C8]/20 rounded-full animate-pulse"></div>
                <div className="absolute -bottom-4 -right-4 w-12 h-12 border border-[#0077C8]/15 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 -right-6 w-8 h-8 bg-[#0077C8]/10 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>

                {/* Main Heading */}
                <div className="space-y-6">
                  <h1 className="leading-none tracking-tight">
                    <span className={`block ${showHello ? 'fade-in-up' : 'opacity-0'} text-gray-200 font-light text-4xl lg:text-5xl xl:text-6xl`}>Hello,</span>
                    <span className={`block ${showName ? 'fade-in-up' : 'opacity-0'} text-[#0077C8] font-black text-5xl lg:text-6xl xl:text-7xl`}>{greeting}</span>
                    <span className={`block ${showTitle ? 'fade-in-up' : 'opacity-0'} text-white font-bold text-3xl lg:text-4xl xl:text-5xl`}>{data.title}</span>
                  </h1>
                </div>

                {/* Download CV Button */}
                <div className="pt-10">
                  <a
                    href="/Purus.pdf"
                    download
                    className="inline-flex items-center gap-4 px-8 py-4 bg-[#0077C8] text-white font-bold text-lg rounded-lg hover:bg-[#005F9E] transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-[#00BFFF]/40 border-2 border-[#0077C8]/60 hover:border-[#005F9E]/40"
                  >
                    <span>DOWNLOAD CV</span>
                    <FaDownload className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Right Content - Image */}
              <div className="lg:col-span-5 flex justify-center lg:justify-end animate-fadeInRight">
                <div className="relative">
                  {/* Decorative Elements */}
                  <div className="absolute -top-8 -right-8 w-24 h-24 border border-[#0077C8]/30 rounded-full animate-pulse"></div>
                  <div className="absolute -bottom-12 -left-12 w-32 h-32 border border-[#0077C8]/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>

                  {/* Main Image Container */}
                  <div
                    className="relative w-80 h-[420px] lg:w-[380px] lg:h-[520px] group"
                    onMouseMove={e => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
                      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
                      setTilt({ x: y * 5, y: -x * 5 });
                    }}
                    onMouseLeave={() => setTilt({ x: 0, y: 0 })}
                  >
                    {/* Background Shape */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0077C8]/20 to-[#00BFFF]/20 rounded-3xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500"></div>

                    {/* Image Container */}
                    <div
                      className="relative w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl overflow-hidden shadow-2xl transform transition-all duration-500 hover:scale-105"
                      style={{
                        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${tilt.x || tilt.y ? 1.02 : 1})`
                      }}
                    >
                      {/* Glow Effect */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0077C8]/10 via-transparent to-transparent"></div>

                      {/* Profile Image */}
                      <img
                        src={data.profileImage}
                        alt={data.name}
                        className="w-full h-full object-cover transition-all duration-700 hover:brightness-110 filter"
                        style={{
                          filter: 'drop-shadow(0 25px 50px #0077C833)'
                        }}
                      />

                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                  </div>

                  {/* Floating Elements for Visual Interest */}
                  <div className="absolute top-20 -left-8 w-4 h-4 bg-[#0077C8]/60 rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>
                  <div className="absolute bottom-32 -right-6 w-6 h-6 bg-[#0077C8]/40 rounded-full animate-float" style={{ animationDelay: '1.5s' }}></div>
                  <div className="absolute top-1/3 -right-12 w-2 h-2 bg-[#0077C8]/80 rounded-full animate-float" style={{ animationDelay: '2.5s' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Worked with section */}
        {data.workedWith && data.workedWith.length > 0 && (
          <div className="relative z-10 max-w-5xl mx-auto mt-8 mb-20 px-6 animate-fadeInUp" style={{ animationDelay: '1.5s' }}>
            <p className="text-sm text-gray-400 uppercase tracking-widest mb-8 text-center">Worked with</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 text-center text-gray-300">
              {data.workedWith.map((company, index) => (
                <div 
                  key={index}
                  className="bg-white/5 backdrop-blur-md border border-white/10 py-4 px-6 rounded-xl hover:bg-white/10 hover:border-[#0077C8]/50 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-[#0077C8]/20"
                >
                  {company}
                </div>
              ))}
            </div>
          </div>
        )}
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

        @keyframes breathing-glow {
          0%, 100% {
            box-shadow: 
              0 0 20px #0077C84d,
              0 0 40px #0077C833,
              0 0 60px #0077C81a;
            transform: scale(1);
          }
          50% {
            box-shadow: 
              0 0 30px #0077C880,
              0 0 60px #0077C84d,
              0 0 90px #0077C833;
            transform: scale(1.02);
          }
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

        .animate-breathing-glow {
          animation: breathing-glow 4s ease-in-out infinite;
        }

        .animate-fadeInInitial {
          animation: fadeInInitial 1.2s cubic-bezier(0.23, 1, 0.32, 1) forwards;
        }

        .fade-in-up {
          opacity: 1;
          animation: fadeInUp 0.7s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        
        .opacity-0 {
          opacity: 0;
        }

        /* Mobile and tablet optimizations */
        @media (max-width: 1023px) {
          .min-h-screen {
            padding-top: 2rem;
            padding-bottom: 2rem;
          }
        }

        /* Responsive font adjustments */
        @media (max-width: 1024px) {
          .lg\\:text-5xl {
            font-size: 3rem;
          }
          .xl\\:text-6xl {
            font-size: 3.5rem;
          }
        }
        
        @media (max-width: 768px) {
          .text-4xl {
            font-size: 2.25rem;
          }
          .lg\\:text-5xl {
            font-size: 2.75rem;
          }
        }

        @media (max-width: 640px) {
          .text-3xl {
            font-size: 1.875rem;
          }
          .text-4xl {
            font-size: 2rem;
          }
          .text-5xl {
            font-size: 2.5rem;
          }
        }
      `}</style>
    </div>
  );
}

export default HomePage;