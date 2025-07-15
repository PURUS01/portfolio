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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white font-sans px-6 relative overflow-hidden">
      <div className="max-w-6xl w-full mx-auto py-16 px-4 md:px-16 animate-fadeInUp">
        <h1 className="text-4xl font-bold mb-12 text-center">Projects</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white/10 backdrop-blur-lg border border-lime-400/20 rounded-2xl p-6 shadow-2xl flex flex-col justify-between"
            >
              <div className="flex items-center mb-4">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-10 h-10 rounded-full object-cover border border-white/20 mr-3"
                />
                <h2 className="text-xl font-bold text-lime-400">{project.name}</h2>
              </div>
              <p className="text-gray-200 mb-4 min-h-[60px]">
                {project.description}
              </p>
              <div className="flex items-center justify-between mt-4">
                <div className="flex flex-wrap gap-2">
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
                  className="text-lime-400 hover:underline font-bold whitespace-nowrap"
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
 `}</style>
      </div>
    </div>
  );
}

export default ProjectsPage;