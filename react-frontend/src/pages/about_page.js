import React, { useEffect, useState } from "react";
import { firestore } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import skillColors from "../utils/colours";

function AboutPage() {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const aboutRef = doc(firestore, "portfolion", "about");
      const snapshot = await getDoc(aboutRef);

      if (snapshot.exists()) {
        const data = snapshot.data();

        // assign random gradient colors to skills
        const skillsWithColors = data.skills.map((skill) => {
          const randomColor =
            skillColors[Math.floor(Math.random() * skillColors.length)];
          return { name: skill, ...randomColor };
        });

        setAboutData({ ...data, skills: skillsWithColors });
      }
    };

    fetchData();
  }, []);

  if (!aboutData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

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

        {/* Hero Section */}
        <div className="relative mb-16 animate-slideup-fadein overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0077C8]/20 via-[#00BFFF]/10 to-[#0077C8]/20 rounded-3xl"></div>
          <div className="relative bg-white/5 backdrop-blur-lg border border-[#0077C8]/30 rounded-3xl px-10 py-12 text-center">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#0077C8] to-transparent"></div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
              <span className="bg-gradient-to-r from-[#0077C8] via-[#00BFFF] to-[#0077C8] bg-clip-text text-transparent animate-gradient-shimmer">
                {aboutData.firstName} {aboutData.lastName}
              </span>
            </h2>
            <div className="text-[#0077C8] font-bold text-2xl mb-6">
              {aboutData.title}
            </div>
            <div className="flex flex-wrap gap-8 justify-center text-gray-200 text-lg">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <span className="text-[#00BFFF]">📍</span>
                <span>
                  <b className="text-[#00BFFF]">Location:</b> {aboutData.city},{" "}
                  {aboutData.country}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <span className="text-[#00BFFF]">📧</span>
                <span>
                  <b className="text-[#00BFFF]">Email:</b> {aboutData.email}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* About Me */}
        <div
          className="mb-16 animate-slideup-fadein"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-3xl font-bold text-[#0077C8] mb-4">About Me</h3>
            <div className="w-20 h-1 bg-gradient-to-r from-[#0077C8] to-[#00BFFF] rounded-full mx-auto mb-6"></div>
            <p className="text-gray-100 text-lg leading-relaxed">
              {aboutData.bio}
            </p>
          </div>
        </div>

        {/* Education */}
        <div
          className="mb-16 animate-slideup-fadein"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="text-center mb-12">
            <h4 className="text-3xl font-bold text-[#0077C8] mb-4">Education</h4>
            <div className="w-20 h-1 bg-gradient-to-r from-[#0077C8] to-[#00BFFF] mx-auto rounded-full"></div>
          </div>
          <div className="max-w-2xl mx-auto space-y-6">
            {aboutData.educationList.map((edu, idx) => (
              <div
                key={idx}
                className="relative bg-gradient-to-br from-[#0077C8]/10 via-[#00BFFF]/5 to-[#0077C8]/10 rounded-3xl p-8 border border-[#0077C8]/30 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#0077C8]/20 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
                <div className="relative z-10 text-center">
                  <div className="text-6xl mb-6">🎓</div>
                  <h5 className="font-bold text-[#0077C8] text-2xl mb-3">
                    {edu.degree}
                  </h5>
                  <p className="text-gray-300 text-xl mb-2">{edu.university}</p>
                  <p className="text-gray-400 text-lg">{edu.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div
          className="mb-16 animate-slideup-fadein"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="text-center mb-12">
            <h4 className="text-3xl font-bold text-[#0077C8] mb-4">
              Technical Skills
            </h4>
            <div className="w-20 h-1 bg-gradient-to-r from-[#0077C8] to-[#00BFFF] mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {aboutData.skills.map((skill, idx) => (
              <div key={idx} className="group relative">
                <div
                  className="rounded-2xl p-6 text-center bg-white/10 backdrop-blur-md border border-white/20 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-2 hover:shadow-2xl"
                  style={{
                    boxShadow: `0 4px 15px 0 ${skill.from}, 0 0 20px 5px ${skill.to}`,
                  }}
                >
                  <div className="font-bold text-white text-sm">
                    {skill.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div
          className="mb-16 animate-slideup-fadein"
          style={{ animationDelay: "0.3s" }}
        >
          <div className="text-center mb-10">
            <h4 className="text-3xl font-extrabold text-[#0077C8] mb-3">
              Professional Experience
            </h4>
            <div className="mx-auto w-24 h-1 rounded-full bg-gradient-to-r from-[#0077C8] to-[#00BFFF]"></div>
          </div>

          {/* Desktop Timeline View */}
          <div className="hidden lg:block relative">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#0077C8] to-[#00BFFF] rounded-full"></div>
            <div className="space-y-16">
              {aboutData.experiences.map((exp, idx) => (
                <div
                  key={idx}
                  className={`relative flex ${idx % 2 === 0 ? "justify-start" : "justify-end"
                    } items-center`}
                >
                  <div
                    className={`absolute left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full ${idx % 2 === 0
                      ? "bg-[#0077C8] border-4 border-[#00BFFF]"
                      : "bg-[#00BFFF] border-4 border-[#0077C8]"
                      } shadow-md z-10`}
                  ></div>

                  <div
                    className={`w-5/12 ${idx % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"
                      }`}
                  >
                    <div
                      className={`rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 ${idx % 2 === 0
                        ? "bg-[#0077C8]/10 border border-[#0077C8]/30"
                        : "bg-[#00BFFF]/10 border border-[#00BFFF]/30"
                        }`}
                    >
                      <span className="font-semibold text-sm mb-1 block text-[#00BFFF]">
                        {exp.period}
                      </span>
                      <h5
                        className={`text-xl font-bold mb-2 ${idx % 2 === 0 ? "text-[#0077C8]" : "text-[#00BFFF]"
                          }`}
                      >
                        {exp.title}
                      </h5>
                      <p className="text-gray-300 font-medium">{exp.company}</p>
                      <p className="text-gray-400 mt-2 text-sm">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Vertical Cards View */}
          <div className="lg:hidden space-y-6">
            {aboutData.experiences.map((exp, idx) => (
              <div
                key={idx}
                className="relative bg-gradient-to-br from-[#0077C8]/10 via-[#00BFFF]/5 to-[#0077C8]/10 rounded-2xl p-6 border border-[#0077C8]/30 overflow-hidden hover:shadow-lg hover:shadow-[#0077C8]/20 transition-all duration-300"
              >
                {/* Timeline indicator for mobile */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#0077C8] to-[#00BFFF]"></div>
                <div className="absolute left-0 top-6 w-3 h-3 bg-[#0077C8] border-2 border-[#00BFFF] rounded-full transform -translate-x-1"></div>
                
                <div className="ml-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                    <span className="font-semibold text-sm text-[#00BFFF] mb-1 sm:mb-0">
                      {exp.period}
                    </span>
                    <div className="w-8 h-1 bg-gradient-to-r from-[#0077C8] to-[#00BFFF] rounded-full sm:hidden"></div>
                  </div>
                  
                  <h5 className="text-xl font-bold text-[#0077C8] mb-2">
                    {exp.title}
                  </h5>
                  
                  <p className="text-gray-300 font-medium mb-3">{exp.company}</p>
                  
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Keep animations */}
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
        .animate-main-fadein { animation: main-fadein 1s ease-out forwards; }
        .animate-slideup-fadein { animation: slideup-fadein 0.8s ease-out forwards; }
        .animate-gradient-shimmer { background-size: 200% 200%; animation: gradient-shimmer 3s ease infinite; }
      `}</style>
    </div>
  );
}

export default AboutPage;
