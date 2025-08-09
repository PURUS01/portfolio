import React from "react";
import LoginPage from "./Login/login";
import DashboardPage from "./pages/dashboard_page";
import Navbar from "./components/nav_bar";
import HomePage from "./pages/home_page";
import AboutPage from "./pages/about_page";
import ProjectsPage from "./pages/projects_page";
import GetInTouchPage from "./pages/get_in_touch_page";
import CommonBackground from "./components/CommonBackground";

function App() {
  const path = window.location.pathname;
  // Scroll-to-top button state and handler
  const [showScroll, setShowScroll] = React.useState(false);
  React.useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (path === "/login") {
    return <LoginPage />;
  }
  if (path === "/dashboard") {
    return <DashboardPage />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white font-sans relative overflow-hidden">
      {/* Common Background */}
      <CommonBackground />

      {/* Navbar */}
      <Navbar />

      {/* Scroll-to-top Button */}
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 bg-gradient-to-br from-[#0077C8]/60 via-[#00BFFF]/40 to-[#00FFB2]/30 text-white rounded-full shadow-2xl p-3 flex items-center justify-center border border-[#00BFFF]/30 backdrop-blur-md transition-all duration-500 hover:scale-110 hover:shadow-blue-400/50 hover:bg-gradient-to-br hover:from-[#00BFFF]/80 hover:via-[#0077C8]/60 hover:to-[#00FFB2]/50"
          style={{ boxShadow: '0 4px 32px 0 #00BFFF80, 0 1.5px 8px 0 #0077C880', background: 'rgba(0, 191, 255, 0.15)' }}
          aria-label="Scroll to top"
        >
          {/* Up arrow SVG icon */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#00BFFF" className="w-7 h-7 drop-shadow-lg transition-all duration-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
          </svg>
        </button>
      )}

      {/* Single Page Content */}
      <div className="pt-8">
        {/* Home Section */}
        <section id="home" className="min-h-screen">
          <HomePage />
        </section>

        {/* Modern Section Divider */}
        <div className="relative py-16">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full max-w-4xl mx-auto px-8">
              <div className="relative">
                {/* Animated geometric shapes */}
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-8 h-8 border-2 border-[#0077C8]/30 rotate-45 animate-pulse"></div>
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-[#0077C8]/20 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute left-1/4 top-1/2 transform -translate-y-1/2 w-4 h-4 border border-[#0077C8]/20 rotate-45 animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute right-1/4 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-[#00BFFF]/15 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>

                {/* Main divider line with gradient */}
                <div className="h-px bg-gradient-to-r from-transparent via-[#0077C8]/40 to-transparent"></div>

                {/* Center accent */}
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-br from-[#0077C8]/20 to-[#00BFFF]/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-[#0077C8]/30">
                  <div className="w-2 h-2 bg-[#0077C8] rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <section id="about" className="min-h-screen py-8">
          <AboutPage />
        </section>

        {/* Modern Section Divider */}
        <div className="relative py-16">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full max-w-4xl mx-auto px-8">
              <div className="relative">
                {/* Animated geometric shapes */}
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-[#00BFFF]/20 rounded-full animate-pulse"></div>
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-8 h-8 border-2 border-[#0077C8]/30 rotate-45 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute left-1/3 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-[#0077C8]/25 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute right-1/3 top-1/2 transform -translate-y-1/2 w-5 h-5 border border-[#00BFFF]/20 rotate-45 animate-pulse" style={{ animationDelay: '1.5s' }}></div>

                {/* Main divider line with gradient */}
                <div className="h-px bg-gradient-to-r from-transparent via-[#00BFFF]/40 to-transparent"></div>

                {/* Center accent */}
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-br from-[#00BFFF]/20 to-[#0077C8]/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-[#00BFFF]/30">
                  <div className="w-2 h-2 bg-[#00BFFF] rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Projects Section */}
        <section id="projects" className="min-h-screen py-8">
          <ProjectsPage />
        </section>

        {/* Modern Section Divider */}
        <div className="relative py-16">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full max-w-4xl mx-auto px-8">
              <div className="relative">
                {/* Animated geometric shapes */}
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-7 h-7 border-2 border-[#0077C8]/25 rotate-45 animate-pulse"></div>
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-5 h-5 bg-[#00BFFF]/15 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute left-1/4 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-[#0077C8]/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute right-1/4 top-1/2 transform -translate-y-1/2 w-6 h-6 border border-[#0077C8]/20 rotate-45 animate-pulse" style={{ animationDelay: '1.5s' }}></div>

                {/* Main divider line with gradient */}
                <div className="h-px bg-gradient-to-r from-transparent via-[#0077C8]/40 to-transparent"></div>

                {/* Center accent */}
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-br from-[#0077C8]/20 to-[#00BFFF]/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-[#0077C8]/30">
                  <div className="w-2 h-2 bg-[#0077C8] rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Get in Touch Section */}
        <section id="getintouch" className="min-h-screen py-8">
          <GetInTouchPage />
        </section>
      </div>
    </div>
  );
}

export default App;