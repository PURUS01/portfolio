import React from "react";

function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white font-sans px-4 md:px-0 py-16 flex justify-center relative overflow-hidden">
      {/* Subtle Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-lime-400/10 to-green-500/10 rounded-full blur-3xl animate-blob1" style={{animationDelay: '0s'}}></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-green-400/10 to-lime-500/10 rounded-full blur-3xl animate-blob2" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="flex flex-col md:flex-row gap-12 w-full max-w-5xl relative z-10 animate-main-fadein">
        {/* Profile Image Aside - Floating Animation */}
        <div className="flex flex-col items-center md:items-start md:w-1/3 w-full mb-8 md:mb-0 animate-float">
          <div className="relative flex items-center justify-center group">
            {/* Soft glow behind the circle */}
            <div className="absolute w-60 h-60 bg-gradient-to-br from-lime-400 to-green-500 rounded-full blur-2xl opacity-30 group-hover:scale-110 transition-transform duration-500"></div>
            {/* Circular image with gradient border */}
            <div className="w-56 h-56 md:w-60 md:h-60 rounded-full p-1 bg-gradient-to-r from-lime-400 via-green-400 to-lime-500 shadow-2xl relative z-10 flex items-center justify-center hover:scale-110 transition-transform duration-500">
              <img
                src="https://cdn.vectorstock.com/i/500p/54/69/male-user-icon-vector-8865469.jpg"
                alt="Profile"
                className="w-full h-full object-cover rounded-full border-4 border-white/20 shadow-xl"
              />
            </div>
          </div>
        </div>

        {/* Main Details Section */}
        <div className="flex-1 flex flex-col gap-8 animate-slideup-fadein">
          {/* Name & Title */}
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-1 tracking-tight relative inline-block">
              <span className="bg-gradient-to-r from-lime-400 via-green-400 to-lime-500 bg-clip-text text-transparent animate-gradient-shimmer">
                Kukanenthiran Purusothman
              </span>
            </h1>
            {/* Subtle Accent Divider */}
            <div className="mx-auto md:mx-0 w-16 h-1 rounded-full bg-gradient-to-r from-lime-400 via-green-400 to-lime-500 opacity-70 my-3"></div>
            <div className="text-lime-400 font-bold text-lg mb-4 animate-fadein-delay">
              Full Stack Developer
            </div>
            <div className="flex flex-wrap gap-6 text-gray-200 text-base mb-2 animate-fadein-delay2">
              <span><b className="text-lime-400">Location:</b> City, Country</span>
              <span><b className="text-lime-400">Experience:</b> 4+ years</span>
              <span><b className="text-lime-400">Email:</b> youremail@example.com</span>
            </div>
          </div>

          {/* About Me */}
          <div className="bg-white/10 backdrop-blur-lg border-2 border-lime-400/40 rounded-2xl shadow-2xl px-8 py-6 hover:border-lime-400/80 transition-colors duration-300 animate-card-glow">
            <h3 className="text-xl font-bold text-lime-400 mb-3">About Me</h3>
            <p className="text-gray-100 text-base leading-relaxed">
              I am a dedicated and creative web developer with a strong background in both frontend and backend technologies. My expertise lies in building modern, responsive web applications using{" "}
              <span className="text-lime-400 font-bold">React</span>{" "}
              and{" "}
              <span className="text-lime-400 font-bold">Laravel</span>
              . I thrive on solving complex problems, learning new tools, and turning ideas into reality. Whether working independently or as part of a team, I am committed to delivering high-quality, user-focused solutions.
            </p>
          </div>

          {/* Skills Section - Animated Badges with Card Glow */}
          <div className="bg-white/5 backdrop-blur-lg border-2 border-lime-400/40 rounded-2xl shadow-lg px-8 py-6 flex flex-col gap-4 animate-card-glow">
            <h4 className="text-lg font-bold text-lime-400 mb-2">Skills</h4>
            <div className="flex flex-wrap gap-3 justify-start">
              <span className="skill-badge skill-blue">JavaScript</span>
              <span className="skill-badge skill-cyan">React</span>
              <span className="skill-badge skill-pink">Laravel</span>
              <span className="skill-badge skill-teal">Tailwind CSS</span>
              <span className="skill-badge skill-orange">HTML5</span>
              <span className="skill-badge skill-yellow">CSS3</span>
              <span className="skill-badge skill-purple">REST APIs</span>
              <span className="skill-badge skill-green">MySQL</span>
              <span className="skill-badge skill-gray">Git</span>
              <span className="skill-badge skill-red">Node.js</span>
            </div>
          </div>

          {/* Experience */}
          <div className="animate-card-glow bg-white/10 backdrop-blur-lg border-2 border-lime-400/40 rounded-2xl shadow-2xl px-8 py-6 hover:border-lime-400/80 transition-colors duration-300" style={{animationDelay: '0.2s'}}>
            <h4 className="text-lg font-bold text-lime-400 mb-2">Experience</h4>
            <ul className="space-y-3 text-gray-200 text-base">
              <li>
                <span className="font-bold text-lime-400">Frontend Developer</span> at Bohar Solutions (2022 - Present)
              </li>
              <li>
                <span className="font-bold text-lime-400">Backend Developer</span> at Company B (2020 - 2022)
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* Custom Animations and Skill Badge Styling */}
      <style>{`
        @keyframes fadein-up {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadein-right {
          0% { opacity: 0; transform: translateX(40px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadein-delay {
          0% { opacity: 0; }
          60% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes fadein-delay2 {
          0% { opacity: 0; }
          80% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes gradient-shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        @keyframes blob1 {
          0%, 100% { transform: scale(1) translate(0, 0); }
          50% { transform: scale(1.1) translate(30px, -20px); }
        }
        @keyframes blob2 {
          0%, 100% { transform: scale(1) translate(0, 0); }
          50% { transform: scale(1.08) translate(-40px, 30px); }
        }
        @keyframes main-fadein {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes slideup-fadein {
          0% { opacity: 0; transform: translateY(60px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-18px); }
        }
        @keyframes card-glow {
          0%, 100% { box-shadow: 0 8px 32px 0 #a3e63522, 0 0 0 0 #a3e63544; border-color: #a3e63544; }
          50% { box-shadow: 0 12px 48px 0 #a3e63555, 0 0 16px 4px #a3e63588; border-color: #a3e63588; }
        }
        .animate-main-fadein { animation: main-fadein 1.2s both; }
        .animate-slideup-fadein { animation: slideup-fadein 1.2s both; }
        .animate-float { animation: float 3.5s ease-in-out infinite; }
        .animate-gradient-shimmer {
          background-size: 200% 200%;
          animation: gradient-shimmer 2.5s linear infinite alternate;
        }
        .animate-blob1 { animation: blob1 12s ease-in-out infinite alternate; }
        .animate-blob2 { animation: blob2 14s ease-in-out infinite alternate; }
        .animate-card-glow { animation: card-glow 2.5s ease-in-out infinite alternate; }
        .skill-badge {
          display: inline-block;
          padding: 0.5rem 1.25rem;
          border-radius: 9999px;
          color: #fff;
          font-weight: 600;
          font-size: 1rem;
          box-shadow: 0 2px 8px 0 #a3e63522;
          transition: transform 0.25s, box-shadow 0.25s, background 0.25s;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        .skill-badge:hover {
          transform: scale(1.08) translateY(-2px) rotate(-2deg);
          box-shadow: 0 4px 16px 0 #a3e63555;
          filter: brightness(1.15);
        }
        .skill-blue { background: linear-gradient(90deg, #3b82f6cc, #60a5facc 80%); }
        .skill-cyan { background: linear-gradient(90deg, #06b6d4cc, #67e8f9cc 80%); }
        .skill-pink { background: linear-gradient(90deg, #ec4899cc, #f472b6cc 80%); }
        .skill-teal { background: linear-gradient(90deg, #14b8a6cc, #5eead4cc 80%); }
        .skill-orange { background: linear-gradient(90deg, #f59e42cc, #fbbf24cc 80%); }
        .skill-yellow { background: linear-gradient(90deg, #eab308cc, #fde68acc 80%); }
        .skill-purple { background: linear-gradient(90deg, #a21cafcc, #c084fcc 80%); }
        .skill-green { background: linear-gradient(90deg, #22c55ecc, #bbf7d0cc 80%); }
        .skill-gray { background: linear-gradient(90deg, #64748bcc, #cbd5e1cc 80%); }
        .skill-red { background: linear-gradient(90deg, #ef4444cc, #fca5a5cc 80%); }
      `}</style>
    </div>
  );
}

export default AboutPage;