import React from "react";

// Static project data
const projects = [
  {
    id: 1,
    name: "Portfolio Website",
    description: "A modern personal portfolio built with React and Tailwind CSS.",
    languages: ["JavaScript", "CSS"],
    url: "https://github.com/your-github-username/portfolio-website",
    image: "https://via.placeholder.com/80x80.png?text=P1"
  },
  {
    id: 2,
    name: "Task Manager API",
    description: "A RESTful API for managing tasks, built with Laravel.",
    languages: ["PHP", "MySQL"],
    url: "https://github.com/your-github-username/task-manager-api",
    image: "https://via.placeholder.com/80x80.png?text=P2"
  },
  {
    id: 3,
    name: "Weather App",
    description: "A responsive weather app using OpenWeatherMap API.",
    languages: ["JavaScript", "HTML", "CSS"],
    url: "https://github.com/your-github-username/weather-app",
    image: "https://via.placeholder.com/80x80.png?text=P3"
  },
  // Add more projects as needed
];

function ProjectsPage() {
  return (
    <div className="min-h-screen bg-gradient from-gray-900 via-black to-gray-800 text-white font-sans px-6 relative overflow-hidden">
      <div className="max-w-6xl w-full mx-auto py-16 px-4 md:px-16 animate-fadeInUp">
        <h1 className="text-4xl font-bold mb-12 text-center">Projects</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 group/project-cards">
          {projects.map((project, idx) => (
            <div
              key={project.id}
              className={`card-zoom-glow bg-white/10 backdrop-blur-lg border border-lime-400/20 rounded-2xl p-6 shadow-2xl flex flex-col justify-between opacity-0 translate-y-8 animate-cardFadeIn group/card`}
              style={{ animationDelay: `${idx * 120}ms`, animationFillMode: 'forwards' }}
            >
              <div className="flex items-center mb-4">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-10 h-10 rounded-full object-cover border border-white/20 mr-3 group-hover/card:ring-2 group-hover/card:ring-lime-400 transition" />
                <h2 className="text-xl font-bold text-lime-400">{project.name}</h2>
              </div>
              <p className="text-gray-200 mb-4 min-h-[60px]">
                {project.description}
              </p>
              <div className="flex flex-col gap-2 md:flex-col md:items-start md:justify-between mt-4 min-w-0">
                <div className="flex flex-wrap gap-2 min-w-0">
                  {project.languages.map((lang, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-800 text-lime-300 px-3 py-1 rounded-full text-xs font-semibold"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="github-link-btn font-bold whitespace-normal break-words w-full max-w-full text-center overflow-hidden md:mt-2"
                >
                  View on GitHub
                </a>
              </div>
            </div>
          ))}
        </div>
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
   /* Blur effect for non-hovered cards */
   .group\/project-cards:hover .group\/card:not(:hover) {
     filter: blur(3px) grayscale(0.3);
     opacity: 0.7;
     transition: filter 0.3s, opacity 0.3s;
   }
   .group\/project-cards .group\/card {
     transition: filter 0.3s, opacity 0.3s;
   }
   /* Smooth zoom-in with subtle glow on hover */
   .card-zoom-glow {
     transition: transform 0.7s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.7s cubic-bezier(0.23, 1, 0.32, 1);
   }
   .card-zoom-glow:hover {
     transform: scale(1.18);
     box-shadow: 0 0 32px 0 rgba(163, 230, 53, 0.25), 0 2px 8px 0 rgba(0,0,0,0.15);
     z-index: 2;
   }
   /* Modern button style for GitHub link */
   .github-link-btn {
     display: inline-block;
     padding: 0.5rem 1.1rem;
     border-radius: 9999px;
     border: 2px solid #a3e635;
     background: transparent;
     color: #a3e635;
     transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
     box-shadow: none;
     text-decoration: none;
     font-size: 1rem;
     box-sizing: border-box;
     max-width: 100%;
     margin-top: 0.25rem;
   }
   .github-link-btn:hover {
     background: #a3e635;
     color: #18181b;
     box-shadow: 0 2px 12px 0 rgba(163, 230, 53, 0.18);
     border-color: #a3e635;
     text-decoration: none;
   }
   @media (max-width: 640px) {
     .github-link-btn {
       padding: 0.4rem 0.6rem;
       font-size: 0.95rem;
     }
   }
 `}</style>
      </div>
    </div>
  );
}

export default ProjectsPage;