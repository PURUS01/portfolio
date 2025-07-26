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
    <div className="min-h-screen text-white font-sans px-4 md:px-0 py-16 flex justify-center relative overflow-hidden">
      <div className="w-full max-w-6xl relative z-10 animate-main-fadein">
        {/* Page Heading */}
        <div className="text-center mb-16 animate-fadeInUp">
          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-lime-400 to-white mb-4">
            Projects
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-lime-400 to-green-500 mx-auto rounded-full"></div>
        </div>

        <div className="max-w-6xl w-full mx-auto py-8 px-4 md:px-16 animate-fadeInUp">
        <div className="flex flex-col gap-12 group/project-cards">
  {projects.map((project, idx) => (
    <div
      key={project.id}
      className={`relative flex items-start gap-6 group/card overflow-hidden rounded-2xl p-6 shadow-xl border border-lime-400/20 backdrop-blur-lg bg-white/10 animate-cardFadeIn transform transition-all duration-700 ease-in-out hover:scale-[1.03] hover:shadow-2xl hover:border-lime-300`}
      style={{ animationDelay: `${idx * 200}ms`, animationFillMode: 'forwards' }}
    >
      {/* Glowing animated background */}
      <div className="absolute inset-0 z-0 pointer-events-none before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-br before:from-lime-400/10 before:to-green-500/10 before:blur-2xl before:opacity-20 transition-all duration-700"></div>

      {/* Card content */}
    <div className="flex-1 relative z-10 transition-all duration-500">
      {/* Header */}
      <div className="flex items-center mb-3 transition-all duration-500">
        <img
          src={project.image}
          alt={project.name}
          className="w-10 h-10 rounded-full object-cover border border-white/20 mr-3 transition-all duration-300 ease-in-out group-hover/card:ring-2 group-hover/card:ring-lime-400"
        />
        <h2 className="text-xl font-bold text-lime-400 hover:underline underline-offset-4 transition-all duration-300 ease-in-out">
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
            className="bg-gray-800/80 text-lime-300 px-3 py-1 rounded-full text-xs font-semibold transition-all duration-300 hover:bg-lime-500/10 hover:text-lime-200 shadow-sm shadow-lime-400/10"
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
        className="inline-block text-sm font-semibold text-lime-300 hover:text-white border border-lime-300 px-4 py-1 rounded-full hover:bg-lime-400/10 transition-all duration-300 ease-in-out shadow-md shadow-lime-300/10"
      >
        🚀 View on GitHub
      </a>
    </div>

    </div>
  ))}
</div>

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
      50% { transform: scale(1.14) translate(30px, -40px); }
    }
    @keyframes blob4 {
      0%, 100% { transform: scale(1) translate(0, 0); }
      50% { transform: scale(1.07) translate(-25px, 35px); }
    }
   @keyframes main-fadein {
     0% { opacity: 0; }
     100% { opacity: 1; }
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
   .animate-main-fadein {
     animation: main-fadein 1s ease-out forwards;
   }
 `}</style>
      </div>
    </div>
  );
}

export default ProjectsPage;