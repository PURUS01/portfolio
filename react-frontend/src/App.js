import React, { useEffect, useState } from "react";
import { FaWhatsapp, FaLinkedinIn, FaInstagram, FaFacebookF } from "react-icons/fa";
import LoginPage from "./Login/login";

function App() {
  const path = window.location.pathname;
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/profile")
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error("API Error", err));
  }, []);

   if (path === "/login") {
    return <LoginPage />;
  }

  if (!data) return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-lime-400 mx-auto mb-4"></div>
        <div className="text-lg text-white animate-pulse">Loading...</div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white font-sans px-6 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-lime-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Navbar */}
      <nav className="relative z-10 flex justify-between items-center py-8 backdrop-blur-sm">
        <div className="bg-white/5 backdrop-blur-md rounded-full px-8 py-3 border border-white/10">
          <ul className="flex space-x-8 text-gray-300 text-sm font-medium">
            <li className="hover:text-lime-400 cursor-pointer transition-all duration-300 hover:scale-110 relative group">
              Home
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-lime-400 group-hover:w-full transition-all duration-300"></div>
            </li>
            <li className="hover:text-lime-400 cursor-pointer transition-all duration-300 hover:scale-110 relative group">
              About
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-lime-400 group-hover:w-full transition-all duration-300"></div>
            </li>
            <li className="hover:text-lime-400 cursor-pointer transition-all duration-300 hover:scale-110 relative group">
              Contact
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-lime-400 group-hover:w-full transition-all duration-300"></div>
            </li>
            <li className="hover:text-lime-400 cursor-pointer transition-all duration-300 hover:scale-110 relative group">
              Recent work
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-lime-400 group-hover:w-full transition-all duration-300"></div>
            </li>
            <li className="hover:text-lime-400 cursor-pointer transition-all duration-300 hover:scale-110 relative group">
              Get In Touch
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-lime-400 group-hover:w-full transition-all duration-300"></div>
            </li>
          </ul>
        </div>
        
        <div className="bg-white/5 backdrop-blur-md rounded-full px-6 py-3 border border-white/10">
          <ul className="flex space-x-6 text-xl text-gray-300">
            <li className="hover:text-green-500 cursor-pointer transition-all duration-300 hover:scale-125 hover:rotate-12">
              <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
                <FaWhatsapp />
              </a>
            </li>
            <li className="hover:text-blue-600 cursor-pointer transition-all duration-300 hover:scale-125 hover:rotate-12">
              <a href="https://www.linkedin.com/in/kukanenthiran-purusothman-9706892a6/?originalSubdomain=lk" target="_blank" rel="noopener noreferrer">
                <FaLinkedinIn />
              </a>
            </li>
            <li className="hover:text-pink-500 cursor-pointer transition-all duration-300 hover:scale-125 hover:rotate-12">
              <a href="https://www.instagram.com/yourprofile" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
            </li>
            <li className="hover:text-blue-500 cursor-pointer transition-all duration-300 hover:scale-125 hover:rotate-12">
              <a href="https://www.facebook.com/yourprofile" target="_blank" rel="noopener noreferrer">
                <FaFacebookF />
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between mt-20 max-w-7xl mx-auto">
        {/* Left: Name, title, bio */}
        <div className="md:w-1/2 space-y-8 text-left animate-fadeInLeft">
          <div className="relative">
            <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-lime-400 to-white animate-gradient-x">
              {data.name}
            </h1>
            <div className="absolute -top-2 -left-2 text-5xl md:text-7xl font-bold text-lime-400/20 -z-10">
              {data.name}
            </div>
          </div>
          
          <div className="relative overflow-hidden">
            <p className="text-gray-300 max-w-md text-lg leading-relaxed animate-fadeInUp" style={{animationDelay: '0.3s'}}>
              {data.bio}
            </p>
          </div>
          
          <div className="animate-fadeInUp" style={{animationDelay: '0.6s'}}>
            <button className="relative mt-6 bg-gradient-to-r from-lime-500 to-green-500 text-black font-bold px-8 py-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-lime-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 flex items-center gap-2">
                Let's get started 
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </span>
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
            </button>
          </div>
        </div>

        {/* Right: Profile Image */}
        <div className="md:w-1/2 mt-16 md:mt-0 flex justify-center animate-fadeInRight">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-lime-400 to-green-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
            <div className="relative">
              <img
                src="https://cdn.vectorstock.com/i/500p/54/69/male-user-icon-vector-8865469.jpg"
                alt="Profile"
                className="w-80 h-80 rounded-full object-cover border-4 border-gradient-to-r from-lime-400 to-green-500 shadow-2xl hover:scale-105 transition-all duration-500 animate-float"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-t from-lime-400/20 to-transparent"></div>
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
          {data.projects.map((project, i) => (
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
      `}</style>
    </div>
  );
}

export default App;