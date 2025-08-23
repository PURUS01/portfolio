import React, { useEffect, useState } from "react";
import { firestore } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

function ProjectsPage() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsRef = doc(firestore, "portfolion", "projects"); // 🔹 your doc
        const snapshot = await getDoc(projectsRef);

        if (snapshot.exists()) {
          const data = snapshot.data();

          // Ensure projects exist and map them properly
          if (Array.isArray(data.projects)) {
            const formattedProjects = data.projects.map((p, idx) => ({
              id: idx + 1,
              name: p.projectName,
              description: p.projectDescription,
              languages: p.tags || [],
              url: p.githubUrl,
              image: p.logoFilename
                ? `/assets/${p.logoFilename}` // adjust if logos are stored in /public/assets
                : "https://via.placeholder.com/80x80.png?text=No+Logo",
            }));
            setProjects(formattedProjects);
          }
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen text-white font-sans px-4 md:px-0 py-16 flex justify-center relative overflow-hidden">
      <div className="w-full max-w-6xl relative z-10 animate-main-fadein">
        {/* Page Heading */}
        <div className="text-center mb-16 animate-fadeInUp">
          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#0077C8] to-white mb-4">
            Projects
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-[#0077C8] to-[#00BFFF] mx-auto rounded-full"></div>
        </div>

        <div className="max-w-6xl w-full mx-auto py-8 px-4 md:px-16 animate-fadeInUp">
          <div className="flex flex-col gap-12 group/project-cards">
            {projects.map((project, idx) => (
              <div
                key={project.id}
                className={`relative flex items-start gap-6 group/card overflow-hidden rounded-2xl p-6 shadow-xl border border-[#0077C8]/20 backdrop-blur-lg bg-white/10 animate-cardFadeIn transform transition-all duration-700 ease-in-out hover:scale-[1.03] hover:shadow-2xl hover:border-[#00BFFF]`}
                style={{ animationDelay: `${idx * 200}ms`, animationFillMode: "forwards" }}
              >
                {/* Glowing animated background */}
                <div className="absolute inset-0 z-0 pointer-events-none before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-br before:from-[#0077C8]/10 before:to-[#00BFFF]/10 before:blur-2xl before:opacity-20 transition-all duration-700"></div>

                {/* Card content */}
                <div className="flex-1 relative z-10 transition-all duration-500">
                  {/* Header */}
                  <div className="flex items-center mb-3 transition-all duration-500">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-10 h-10 rounded-full object-cover border border-white/20 mr-3 transition-all duration-300 ease-in-out group-hover/card:ring-2 group-hover/card:ring-[#00BFFF]"
                    />
                    <h2 className="text-xl font-bold text-[#0077C8] hover:underline underline-offset-4 transition-all duration-300 ease-in-out">
                      {project.name}
                    </h2>
                  </div>

                  {/* Description */}
                  <p className="text-gray-200 text-sm mb-4 opacity-80 group-hover/card:opacity-100 transition-opacity duration-500 ease-in-out delay-100">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.languages.map((lang, langIdx) => (
                      <span
                        key={langIdx}
                        className="bg-gray-800/80 text-[#00BFFF] px-3 py-1 rounded-full text-xs font-semibold transition-all duration-300 hover:bg-[#0077C8]/10 hover:text-[#0077C8] shadow-sm shadow-[#00BFFF]/10"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>

                  {/* GitHub Link */}
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-sm font-semibold text-[#00BFFF] hover:text-white border border-[#00BFFF] px-4 py-1 rounded-full hover:bg-[#0077C8]/10 transition-all duration-300 ease-in-out shadow-md shadow-[#00BFFF]/10"
                  >
                    🚀 View on GitHub
                  </a>
                </div>
              </div>
            ))}

            {projects.length === 0 && (
              <p className="text-center text-gray-400">No projects found.</p>
            )}
          </div>
        </div>

        {/* 🔹 keep your same animations & CSS */}
        <style jsx>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(40px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fadeInUp {
            animation: fadeInUp 0.9s cubic-bezier(0.23, 1, 0.32, 1) both;
          }
          @keyframes cardFadeIn {
            from {
              opacity: 0;
              transform: translateY(32px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-cardFadeIn {
            animation: cardFadeIn 0.7s cubic-bezier(0.23, 1, 0.32, 1) both;
          }
          .group\/project-cards:hover .group\/card:not(:hover) {
            filter: blur(3px) grayscale(0.3);
            opacity: 0.7;
            transition: filter 0.3s, opacity 0.3s;
          }
          .group\/project-cards .group\/card {
            transition: filter 0.3s, opacity 0.3s;
          }
          .card-zoom-glow {
            transition: transform 0.7s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.7s cubic-bezier(0.23, 1, 0.32, 1);
          }
          .card-zoom-glow:hover {
            transform: scale(1.18);
            box-shadow: 0 0 32px 0 rgba(163, 230, 53, 0.25), 0 2px 8px 0 rgba(0, 0, 0, 0.15);
            z-index: 2;
          }
          @keyframes main-fadein {
            0% {
              opacity: 0;
            }
            100% {
              opacity: 1;
            }
          }
          .animate-main-fadein {
            animation: main-fadein 1s ease-out forwards;
          }
        `}</style>
      </div>
    </div>
  );
}

export default ProjectsPage;
