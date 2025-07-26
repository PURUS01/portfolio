import LoginPage from "./Login/login";
import Navbar from "./components/nav_bar";
import HomePage from "./pages/home_page";
import AboutPage from "./pages/about_page";
import ProjectsPage from "./pages/projects_page";
import GetInTouchPage from "./pages/get_in_touch_page";
import CommonBackground from "./components/CommonBackground";

function App() {
  const path = window.location.pathname;

   if (path === "/login") {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white font-sans relative overflow-hidden">
      {/* Common Background */}
      <CommonBackground />

      {/* Navbar */}
      <Navbar />

      {/* Single Page Content */}
      <div className="pt-20">
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
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-8 h-8 border-2 border-lime-400/30 rotate-45 animate-pulse"></div>
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-lime-400/20 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                <div className="absolute left-1/4 top-1/2 transform -translate-y-1/2 w-4 h-4 border border-lime-400/20 rotate-45 animate-pulse" style={{animationDelay: '1s'}}></div>
                <div className="absolute right-1/4 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-green-400/15 rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
                
                {/* Main divider line with gradient */}
                <div className="h-px bg-gradient-to-r from-transparent via-lime-400/40 to-transparent"></div>
                
                {/* Center accent */}
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-br from-lime-400/20 to-green-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-lime-400/30">
                  <div className="w-2 h-2 bg-lime-400 rounded-full animate-pulse"></div>
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
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-green-400/20 rounded-full animate-pulse"></div>
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-8 h-8 border-2 border-lime-400/30 rotate-45 animate-pulse" style={{animationDelay: '0.5s'}}></div>
                <div className="absolute left-1/3 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-lime-400/25 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                <div className="absolute right-1/3 top-1/2 transform -translate-y-1/2 w-5 h-5 border border-green-400/20 rotate-45 animate-pulse" style={{animationDelay: '1.5s'}}></div>
                
                {/* Main divider line with gradient */}
                <div className="h-px bg-gradient-to-r from-transparent via-green-400/40 to-transparent"></div>
                
                {/* Center accent */}
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-br from-green-400/20 to-lime-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-green-400/30">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
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
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-7 h-7 border-2 border-lime-400/25 rotate-45 animate-pulse"></div>
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-5 h-5 bg-green-400/15 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                <div className="absolute left-1/4 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-lime-400/20 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                <div className="absolute right-1/4 top-1/2 transform -translate-y-1/2 w-6 h-6 border border-lime-400/20 rotate-45 animate-pulse" style={{animationDelay: '1.5s'}}></div>
                
                {/* Main divider line with gradient */}
                <div className="h-px bg-gradient-to-r from-transparent via-lime-400/40 to-transparent"></div>
                
                {/* Center accent */}
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-br from-lime-400/20 to-green-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-lime-400/30">
                  <div className="w-2 h-2 bg-lime-400 rounded-full animate-pulse"></div>
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