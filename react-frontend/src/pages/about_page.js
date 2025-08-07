import React from "react";

function AboutPage() {
  return (
    <div className="min-h-screen text-white font-sans px-4 md:px-0 py-8 flex justify-center relative overflow-hidden">
      <div className="w-full max-w-4xl relative z-10 animate-main-fadein">
        {/* Page Heading */}
        <div className="text-center mb-16 animate-fadeInUp">
          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#0077C8] to-white mb-4">
            About Me
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-[#0077C8] to-[#00BFFF] mx-auto rounded-full"></div>
        </div>

        {/* Hero Section: Name, Title, Email and Location */}
        <div className="relative mb-16 animate-slideup-fadein overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0077C8]/20 via-[#00BFFF]/10 to-[#0077C8]/20 rounded-3xl"></div>
          <div className="relative bg-white/5 backdrop-blur-lg border border-[#0077C8]/30 rounded-3xl px-10 py-12 text-center">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#0077C8] to-transparent"></div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
              <span className="bg-gradient-to-r from-[#0077C8] via-[#00BFFF] to-[#0077C8] bg-clip-text text-transparent animate-gradient-shimmer">
                Kukanenthiran Purusothman
              </span>
            </h2>
            <div className="text-[#0077C8] font-bold text-2xl mb-6">
              Full Stack Developer
            </div>
            <div className="flex flex-wrap gap-8 justify-center text-gray-200 text-lg">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <span className="text-[#00BFFF]">📍</span>
                <span><b className="text-[#00BFFF]">Location:</b> City, Country</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <span className="text-[#00BFFF]">📧</span>
                <span><b className="text-[#00BFFF]">Email:</b> youremail@example.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* About Me Section: Only summary */}
        <div className="mb-16 animate-slideup-fadein" style={{ animationDelay: '0.1s' }}>
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-3xl font-bold text-[#0077C8] mb-4">About Me</h3>
            <div className="w-20 h-1 bg-gradient-to-r from-[#0077C8] to-[#00BFFF] rounded-full mx-auto mb-6"></div>
            <p className="text-gray-100 text-lg leading-relaxed">
              I am a dedicated and creative web developer with a strong background in both frontend and backend technologies. My expertise lies in building modern, responsive web applications using <span className="text-[#0077C8] font-bold">React</span> and <span className="text-[#0077C8] font-bold">Laravel</span>. I thrive on solving complex problems, learning new tools, and turning ideas into reality. Whether working independently or as part of a team, I am committed to delivering high-quality, user-focused solutions.
            </p>
          </div>
        </div>

        {/* Education Section: Only degree and university */}
        <div className="mb-16 animate-slideup-fadein" style={{ animationDelay: '0.4s' }}>
          <div className="text-center mb-12">
            <h4 className="text-3xl font-bold text-[#0077C8] mb-4">Education</h4>
            <div className="w-20 h-1 bg-gradient-to-r from-[#0077C8] to-[#00BFFF] mx-auto rounded-full"></div>
          </div>
          <div className="max-w-2xl mx-auto">
            <div className="relative bg-gradient-to-br from-[#0077C8]/10 via-[#00BFFF]/5 to-[#0077C8]/10 rounded-3xl p-8 border border-[#0077C8]/30 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#0077C8]/20 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
              <div className="relative z-10 text-center">
                <div className="text-6xl mb-6">🎓</div>
                <h5 className="font-bold text-[#0077C8] text-2xl mb-3">Bachelor's Degree in Computer Science</h5>
                <p className="text-gray-300 text-xl mb-2">University Name</p>
                <p className="text-gray-400 text-lg">2016 - 2020</p>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section: Only skills grid */}
        <div className="mb-16 animate-slideup-fadein" style={{ animationDelay: '0.2s' }}>
          <div className="text-center mb-12">
            <h4 className="text-3xl font-bold text-[#0077C8] mb-4">Technical Skills</h4>
            <div className="w-20 h-1 bg-gradient-to-r from-[#0077C8] to-[#00BFFF] mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {[
              { name: 'JavaScript', colorFrom: 'rgb(59 130 246 / 0.6)', colorTo: 'rgb(37 99 235 / 0.6)' },
              { name: 'React', colorFrom: 'rgb(6 182 212 / 0.6)', colorTo: 'rgb(14 116 144 / 0.6)' },
              { name: 'Laravel', colorFrom: 'rgb(239 68 68 / 0.6)', colorTo: 'rgb(220 38 38 / 0.6)' },
              { name: 'Tailwind', colorFrom: 'rgb(45 212 191 / 0.6)', colorTo: 'rgb(20 184 166 / 0.6)' },
              { name: 'HTML5', colorFrom: 'rgb(249 115 22 / 0.6)', colorTo: 'rgb(202 138 4 / 0.6)' },
              { name: 'CSS3', colorFrom: 'rgb(96 165 250 / 0.6)', colorTo: 'rgb(59 130 246 / 0.6)' },
              { name: 'REST APIs', colorFrom: 'rgb(139 92 246 / 0.6)', colorTo: 'rgb(124 58 237 / 0.6)' },
              { name: 'MySQL', colorFrom: 'rgb(34 197 94 / 0.6)', colorTo: 'rgb(21 128 61 / 0.6)' },
              { name: 'Git', colorFrom: 'rgb(75 85 99 / 0.6)', colorTo: 'rgb(55 65 81 / 0.6)' },
              { name: 'Node.js', colorFrom: 'rgb(22 163 74 / 0.6)', colorTo: 'rgb(21 128 61 / 0.6)' }
            ].map((skill, index) => (
              <div key={index} className="group relative">
                <div
                  className="rounded-2xl p-6 text-center bg-white/10 backdrop-blur-md border border-white/20
          transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-2 hover:shadow-2xl"
                  style={{
                    boxShadow: `0 4px 15px 0 ${skill.colorFrom}, 0 0 20px 5px ${skill.colorTo}`,
                  }}
                >
                  {/* Remove icon div or add icon back if needed */}
                  <div className="font-bold text-white text-sm">{skill.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* Experience Section: Only timeline, no repeated years or companies elsewhere */}
        <div className="mb-16 animate-slideup-fadein" style={{ animationDelay: '0.3s' }}>
          <div className="text-center mb-10">
            <h4 className="text-3xl font-extrabold text-[#0077C8] mb-3">Professional Experience</h4>
            <div className="mx-auto w-24 h-1 rounded-full bg-gradient-to-r from-[#0077C8] to-[#00BFFF]"></div>
          </div>

          <div className="relative">
            {/* Center vertical timeline line */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#0077C8] to-[#00BFFF] rounded-full"></div>

            <div className="space-y-16">
              {/* Experience Item 1 - Left side */}
              <div className="relative flex justify-start items-center">
                {/* Bullet */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full bg-[#0077C8] border-4 border-[#00BFFF] shadow-md z-10"></div>

                {/* Content box */}
                <div className="w-5/12 pr-8 text-right">
                  <div className="bg-[#0077C8]/10 border border-[#0077C8]/30 rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300">
                    <span className="text-[#00BFFF] font-semibold text-sm mb-1 block">2022 - Present</span>
                    <h5 className="text-xl font-bold text-[#0077C8] mb-2">Frontend Developer</h5>
                    <p className="text-gray-300 font-medium">Bohar Solutions</p>
                    <p className="text-gray-400 mt-2 text-sm">Building interactive UI components with React and Tailwind CSS.</p>
                  </div>
                </div>
              </div>

              {/* Experience Item 2 - Right side */}
              <div className="relative flex justify-end items-center">
                {/* Bullet */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full bg-[#00BFFF] border-4 border-[#0077C8] shadow-md z-10"></div>

                {/* Content box */}
                <div className="w-5/12 pl-8 text-left">
                  <div className="bg-[#00BFFF]/10 border border-[#00BFFF]/30 rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300">
                    <span className="text-[#0077C8] font-semibold text-sm mb-1 block">2020 - 2022</span>
                    <h5 className="text-xl font-bold text-[#00BFFF] mb-2">Backend Developer</h5>
                    <p className="text-gray-300 font-medium">Company B</p>
                    <p className="text-gray-400 mt-2 text-sm">Developed REST APIs and maintained backend infrastructure.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>



      </div>

      {/* Custom Animations and Styling */}
      <style>{`
        @keyframes fadein-up {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes gradient-shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        @keyframes main-fadein {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes slideup-fadein {
          0% { opacity: 0; transform: translateY(60px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-main-fadein {
          animation: main-fadein 1s ease-out forwards;
        }
        .animate-slideup-fadein {
          animation: slideup-fadein 0.8s ease-out forwards;
        }
        .animate-gradient-shimmer {
          background-size: 200% 200%;
          animation: gradient-shimmer 3s ease infinite;
        }
      `}</style>
    </div>
  );
}

export default AboutPage;