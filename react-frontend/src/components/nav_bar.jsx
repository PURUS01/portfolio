// Navbar.jsx
import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { FaWhatsapp, FaLinkedinIn, FaInstagram, FaFacebookF, FaBars,  FaTimes } from "react-icons/fa";
import AboutPage from "../pages/about_page";
import HomePage from "../pages/home_page";
import ProjectsPage from "../pages/projects_page";
import GetInTouchPage from "../pages/get_in_touch_page";
import { useState } from "react";


// Dummy page components for Routes inside Navbar (optional, but better to move routes out)
function Home() {
  return <HomePage />;
}
function About() {
  return <AboutPage />;
}
function Projects() {
  return <ProjectsPage />;
}
function GetInTouch() {
  return <GetInTouchPage />;
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <BrowserRouter>
      {/* Mobile social bar */}
      <div className="md:hidden flex justify-center mt-28 px-4">
        <div className="w-full max-w-sm border border-white/10 rounded-full px-6 py-2">
          <ul className="flex justify-center space-x-6 text-xl text-gray-300">
            <li className="hover:text-green-500 hover:scale-125 transition-all">
              <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
                <FaWhatsapp />
              </a>
            </li>
            <li className="hover:text-blue-600 hover:scale-125 transition-all">
              <a href="https://www.linkedin.com/in/kukanenthiran-purusothman-9706892a6/?originalSubdomain=lk" target="_blank" rel="noopener noreferrer">
                <FaLinkedinIn />
              </a>
            </li>
            <li className="hover:text-pink-500 hover:scale-125 transition-all">
              <a href="https://www.instagram.com/yourprofile" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
            </li>
            <li className="hover:text-blue-500 hover:scale-125 transition-all">
              <a href="https://www.facebook.com/yourprofile" target="_blank" rel="noopener noreferrer">
                <FaFacebookF />
              </a>
            </li>
          </ul>
        </div>
      </div>


      {/* Fixed Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center py-8 px-4 backdrop-blur-sm">
        {/* Navbar links */}
        <div className="hidden md:block bg-white/5 backdrop-blur-md rounded-full px-8 py-3 border border-white/10">
          <ul className="flex space-x-8 text-gray-300 text-sm font-medium">
            {[
              { name: "Home", path: "/" },
              { name: "About", path: "/about" },
              { name: "Projects", path: "/projects" },
              { name: "Get In Touch", path: "/getintouch" },
            ].map(({ name, path }) => (
              <li key={name} className="relative group">
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    `cursor-pointer transition-all duration-300 hover:scale-110 hover:text-lime-400 ${
                      isActive ? "text-lime-400" : ""
                    }`
                  }
                >
                  {name}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-lime-400 group-hover:w-full transition-all duration-300"></div>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Social media icons */}
        <div className="hidden md:block bg-white/5 backdrop-blur-md rounded-full px-6 py-3 border border-white/10">
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

        {/* Mobile toggle button */}
        <div className="md:hidden text-white text-2xl">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown nav */}
      {isOpen && (
        <div className="md:hidden w-full bg-black/90 backdrop-blur-md py-6 text-center border-t border-white/10 fixed top-20 left-0 z-40">
          <ul className="space-y-4 text-white text-base font-medium">
            {[
              { name: "Home", path: "/" },
              { name: "About", path: "/about" },
              { name: "Projects", path: "/projects" },
              { name: "Get In Touch", path: "/getintouch" },
            ].map(({ name, path }) => (
              <li key={name}>
                <NavLink
                  to={path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block py-2 hover:text-lime-400 ${
                      isActive ? "text-lime-400 font-semibold" : ""
                    }`
                  }
                >
                  {name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Add top margin to main content to prevent it from being hidden behind the fixed navbar */}
      <div className="pt-32">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/getintouch" element={<GetInTouch />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default Navbar;