import React, { useState, useEffect } from "react";
import { FaWhatsapp, FaLinkedinIn, FaInstagram, FaFacebookF, FaBars, FaTimes } from "react-icons/fa";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase"; // adjust path if needed

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // dynamic login state
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Track Firebase auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user); // true if user is logged in
    });
    return () => unsubscribe();
  }, []);

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsOpen(false);
    setActiveSection(sectionId);
  };

  // Handle scroll to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'getintouch'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Projects", id: "projects" },
    { name: "Get In Touch", id: "getintouch" },
  ];

  return (
    <>
      {/* Mobile social bar */}
      <div className="md:hidden flex justify-center mt-28 px-4">
        <div className="w-full max-w-sm border border-white/10 rounded-full px-6 py-2">
          <ul className="flex justify-center items-center space-x-4 text-xl text-gray-300">
            {/* Dashboard Link (only if logged in) - Mobile */}
            {isLoggedIn && (
              <li className="mr-2">
                <a
                  href="/dashboard"
                  className="px-3 py-1 rounded-lg border border-[#00BFFF]/40 text-[#00BFFF] font-medium text-sm bg-transparent hover:bg-[#00BFFF]/10 hover:shadow-[0_0_8px_1px_#00BFFF99] transition-all duration-300"
                >
                  Dashboard
                </a>
              </li>
            )}
            <li className="hover:text-[#25D366] hover:scale-125 transition-all">
              <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
                <FaWhatsapp />
              </a>
            </li>
            <li className="hover:text-[#0077B5] hover:scale-125 transition-all">
              <a href="https://www.linkedin.com/in/kukanenthiran-purusothman-9706892a6/?originalSubdomain=lk" target="_blank" rel="noopener noreferrer">
                <FaLinkedinIn />
              </a>
            </li>
            <li className="hover:text-[#E4405F] hover:scale-125 transition-all">
              <a href="https://www.instagram.com/yourprofile" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
            </li>
            <li className="hover:text-[#1877F3] hover:scale-125 transition-all">
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
            {navItems.map(({ name, id }) => (
              <li key={id} className="relative group">
                <button
                  onClick={() => scrollToSection(id)}
                  className={`cursor-pointer transition-all duration-300 hover:scale-110 hover:text-[#00BFFF] ${activeSection === id ? "text-[#0077C8]" : ""
                    }`}
                >
                  {name}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00BFFF] group-hover:w-full transition-all duration-300"></div>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Social media icons */}
        <div className="hidden md:block bg-white/5 backdrop-blur-md rounded-full px-6 py-3 border border-white/10">
          <ul className="flex items-center space-x-6 text-xl text-gray-300">
            {/* Dashboard Link (only if logged in) */}
            {isLoggedIn && (
              <li>
                <a
                  href="/dashboard"
                  className="px-2 py-1 rounded-lg border border-[#00BFFF]/40 text-[#00BFFF] font-medium text-base bg-transparent hover:bg-[#00BFFF]/10 hover:shadow-[0_0_8px_1px_#00BFFF99] transition-all duration-300"
                  style={{ marginRight: '8px', minWidth: '90px', textAlign: 'center' }}
                >
                  Dashboard
                </a>
              </li>
            )}
            {/* Social Media Icons */}
            <li className="hover:text-[#25D366] cursor-pointer transition-all duration-300 hover:scale-125 hover:rotate-12">
              <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
                <FaWhatsapp />
              </a>
            </li>
            <li className="hover:text-[#0077B5] cursor-pointer transition-all duration-300 hover:scale-125 hover:rotate-12">
              <a href="https://www.linkedin.com/in/kukanenthiran-purusothman-9706892a6/?originalSubdomain=lk" target="_blank" rel="noopener noreferrer">
                <FaLinkedinIn />
              </a>
            </li>
            <li className="hover:text-[#E4405F] cursor-pointer transition-all duration-300 hover:scale-125 hover:rotate-12">
              <a href="https://www.instagram.com/yourprofile" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
            </li>
            <li className="hover:text-[#1877F3] cursor-pointer transition-all duration-300 hover:scale-125 hover:rotate-12">
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
            {navItems.map(({ name, id }) => (
              <li key={id}>
                <button
                  onClick={() => scrollToSection(id)}
                  className={`block py-2 hover:text-[#00BFFF] w-full ${activeSection === id ? "text-[#0077C8] font-semibold" : ""
                    }`}
                >
                  {name}
                </button>
              </li>
            ))}
            {/* Dashboard Link in mobile menu (only if logged in) */}
            {isLoggedIn && (
              <li className="pt-2 border-t border-white/10">
                <a
                  href="/dashboard"
                  className="block py-2 px-4 mx-4 rounded-lg border border-[#00BFFF]/40 text-[#00BFFF] font-medium bg-transparent hover:bg-[#00BFFF]/10 hover:shadow-[0_0_8px_1px_#00BFFF99] transition-all duration-300"
                >
                  Dashboard
                </a>
              </li>
            )}
          </ul>
        </div>
      )}
    </>
  );
}

export default Navbar;
