import React from "react";
import AboutSection from "../components/AboutSection";
import ProjectsSection from "../components/ProjectsSection";
import GetInTouchSection from "../components/GetInTouchSection";
import { Toaster } from "react-hot-toast";
import { getAuth, signOut } from "firebase/auth";

export default function DashboardPage() {
    const [activeTab, setActiveTab] = React.useState("about");
    const [sidebarOpen, setSidebarOpen] = React.useState(false);

    const auth = getAuth();
    const user = auth.currentUser;

    // Set initial sidebar state based on screen size
    React.useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setSidebarOpen(true); // Open on desktop
            } else {
                setSidebarOpen(false); // Closed on mobile
            }
        };

        // Set initial state
        handleResize();

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                console.log("User logged out successfully");
                window.location.href = "/"; // redirect to home after logout
            })
            .catch((error) => {
                console.error("Logout error:", error);
            });
    };

    // Sidebar icons
    const sidebarItems = [
        {
            key: 'about',
            label: 'About',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A9.004 9.004 0 0112 15c2.21 0 4.21.8 5.879 2.137M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
        },
        {
            key: 'projects',
            label: 'Projects',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7a2 2 0 012-2h3.172a2 2 0 011.414.586l1.828 1.828A2 2 0 0012.828 8H19a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
                </svg>
            ),
        },
        {
            key: 'getintouch',
            label: 'Get in Touch',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
        },
    ];

    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />
            <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white font-sans relative flex flex-col md:flex-row">
                {/* Mobile Overlay */}
                {sidebarOpen && (
                    <div 
                        className="fixed inset-0 bg-black/50 z-10 md:hidden transition-opacity duration-300"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}
                
                {/* Sidebar */}
                <div
                    className={`fixed md:relative top-0 left-0 h-full md:h-auto min-h-screen md:min-h-screen flex flex-col py-4 md:py-8 px-2 md:px-1 border-r border-white/10 transition-all duration-300 bg-[#0a192f]/95 md:bg-[#0a192f]/80 backdrop-blur-xl md:rounded-r-3xl shadow-[0_0_32px_4px_#00BFFF55] z-20 overflow-y-auto overflow-x-hidden flex-shrink-0 custom-scrollbar ${sidebarOpen
                            ? 'w-80 md:w-64 md:min-w-[16rem] md:max-w-[16rem] translate-x-0'
                            : 'w-0 md:w-14 md:min-w-[3.5rem] md:max-w-[3.5rem] -translate-x-full md:translate-x-0'
                        }`}
                >

                    {/* Mobile Header with Toggle */}
                    <div className={`flex items-center justify-between mb-6 md:mb-0 transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0 md:opacity-100'}`}>
                        {/* User Info */}
                        {user && (
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#00BFFF]/50 flex items-center justify-center text-white font-bold text-lg">
                                    {(user.displayName || user.email?.split('@')[0] || "U").charAt(0).toUpperCase()}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm md:text-base font-medium text-white">
                                        {user.displayName || user.email?.split('@')[0]}
                                    </span>
                                    <span className="text-xs text-white/60 hidden md:block">
                                        {user.email}
                                    </span>
                                </div>
                            </div>
                        )}
                        
                        {/* Sidebar Toggle Button */}
                        <button
                            className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center shadow-lg border border-[#0077C8]/30 hover:bg-white/50 transition-all duration-300 z-10"
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
                            style={{ outline: 'none' }}
                        >
                            {sidebarOpen ? (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#0077C8" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#0077C8" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>


                    {/* Navigation Items */}
                    <nav className={`flex flex-col gap-4 w-full mt-8 transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0 md:opacity-100'}`}>
                        {sidebarItems.map(item => (
                            <button
                                key={item.key}
                                className={`flex items-center ${sidebarOpen ? 'w-full px-4 py-3' : 'w-10 h-10 justify-center mx-auto'} rounded-xl font-semibold transition-all duration-300 focus:outline-none border-2 relative backdrop-blur-md
                                ${activeTab === item.key
                                        ? 'bg-gradient-to-r from-[#00BFFF]/20 to-[#00BFFF]/10 text-[#00BFFF] border-[#00BFFF] shadow-[0_0_16px_2px_#00BFFF99]'
                                        : 'bg-white/5 text-white border-white/20 hover:bg-white/10'}
                                hover:text-[#00BFFF] hover:border-[#00BFFF] hover:shadow-[0_0_12px_2px_#00BFFF66]`}
                                onClick={() => {
                                    setActiveTab(item.key);
                                    // Close sidebar on mobile after selection
                                    if (window.innerWidth < 768) {
                                        setSidebarOpen(false);
                                    }
                                }}
                                aria-label={item.label}
                            >
                                <span className="flex-shrink-0">{item.icon}</span>
                                {sidebarOpen && <span className="ml-3 text-sm font-medium">{item.label}</span>}
                            </button>
                        ))}
                    </nav>

                    {/* Logout Button */}
                    <div className={`mt-auto py-6 transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0 md:opacity-100'}`}>
                        <button
                            onClick={handleLogout}
                            className={`flex items-center ${sidebarOpen ? 'w-full px-4 py-3' : 'w-10 h-10 justify-center mx-auto'} rounded-xl font-semibold transition-all duration-300 focus:outline-none border-2 border-red-500/30 text-red-400 hover:text-white hover:bg-red-500/20 hover:border-red-500 hover:shadow-[0_0_12px_2px_rgba(255,0,0,0.4)]`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 flex-shrink-0">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10V5" />
                            </svg>
                            {sidebarOpen && <span className="ml-3 text-sm font-medium">Logout</span>}
                        </button>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col px-2 sm:px-4 md:px-12 py-4 md:py-10 min-w-0">
                    {/* Desktop Floating Toggle Button - Only visible when sidebar is collapsed */}
                    {!sidebarOpen && (
                        <button
                            className="hidden md:block fixed top-6 left-16 z-50 w-9 h-9 flex items-center justify-center hover:bg-[#00BFFF]/15 rounded-lg transition-all duration-300 hover:scale-110 group"
                            onClick={() => setSidebarOpen(true)}
                            aria-label="Open sidebar"
                            style={{ outline: 'none' }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="#00BFFF" className="w-5 h-5 drop-shadow-[0_0_6px_#00BFFF] group-hover:drop-shadow-[0_0_8px_#00BFFF] transition-all duration-300" style={{ transform: 'translateX(0.5px)' }}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    )}

                    {/* Mobile Header */}
                    <div className="flex items-center justify-between mb-4 md:hidden">
                        <button
                            className="w-10 h-10 bg-[#00BFFF]/20 rounded-full flex items-center justify-center shadow-lg border border-[#00BFFF]/30 backdrop-blur-md transition-all duration-300 hover:scale-110"
                            onClick={() => setSidebarOpen(true)}
                            aria-label="Open menu"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#00BFFF" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        
                        <h2 className="text-xl font-bold text-[#00BFFF] drop-shadow-lg">
                            {activeTab === 'about' && 'About'}
                            {activeTab === 'projects' && 'Projects'}
                            {activeTab === 'getintouch' && 'Get in Touch'}
                        </h2>
                        
                        <a
                            href="/"
                            className="w-10 h-10 bg-gradient-to-br from-[#0077C8]/60 via-[#00BFFF]/40 to-[#00FFB2]/30 rounded-full shadow-lg flex items-center justify-center border border-[#00BFFF]/30 backdrop-blur-md transition-all duration-500 hover:scale-110"
                            aria-label="Go to home"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#00BFFF" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M4 10v10a1 1 0 001 1h5m5-11v11a1 1 0 001 1h5" />
                            </svg>
                        </a>
                    </div>
                    
                    <div className="flex-1 flex items-center justify-center">
                        <div className="w-full sm:w-[95%] md:w-[90%] h-full max-h-[85vh] md:max-h-[80vh] bg-[#0a192f]/80 rounded-2xl shadow-[0_0_32px_4px_#00BFFF55] backdrop-blur-xl border border-[#00BFFF]/20 p-4 sm:p-6 md:p-16 flex flex-col items-center animate-fade-in overflow-y-auto animated-scrollbar glowing-scrollbar">
                            {activeTab === 'about' && <AboutSection />}
                            {activeTab === 'projects' && <ProjectsSection />}
                            {activeTab === 'getintouch' && <GetInTouchSection />}
                        </div>
                    </div>
                </div>

                {/* Desktop Home Navlink Top Right */}
                <a
                    href="/"
                    className="hidden md:block fixed top-8 right-8 z-50 bg-gradient-to-br from-[#0077C8]/60 via-[#00BFFF]/40 to-[#00FFB2]/30 text-white rounded-full shadow-2xl p-3 flex items-center justify-center border border-[#00BFFF]/30 backdrop-blur-md transition-all duration-500 hover:scale-110 hover:shadow-blue-400/50 hover:bg-gradient-to-br hover:from-[#00BFFF]/80 hover:via-[#0077C8]/60 hover:to-[#00FFB2]/50"
                    style={{ boxShadow: '0 4px 32px 0 #00BFFF80, 0 1.5px 8px 0 #0077C880', background: 'rgba(0, 191, 255, 0.15)' }}
                    aria-label="Go to home"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#00BFFF" className="w-7 h-7 drop-shadow-lg transition-all duration-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M4 10v10a1 1 0 001 1h5m5-11v11a1 1 0 001 1h5" />
                    </svg>
                </a>
            </div>
        </>
    );
}