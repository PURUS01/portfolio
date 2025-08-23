import React from "react";
import AboutSection from "../components/AboutSection";
import ProjectsSection from "../components/ProjectsSection";
import GetInTouchSection from "../components/GetInTouchSection";
import { Toaster } from "react-hot-toast";
import { getAuth, signOut } from "firebase/auth";

export default function DashboardPage() {
    const [activeTab, setActiveTab] = React.useState("about");
    const [sidebarOpen, setSidebarOpen] = React.useState(true);

    const auth = getAuth();
    const user = auth.currentUser;

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
                {/* Sidebar */}
                <div
                    className={`min-h-[56px] md:min-h-screen flex flex-col py-2 md:py-8 px-1 md:px-2 border-b md:border-b-0 md:border-r border-white/10 transition-all duration-500 bg-[#0a192f]/80 backdrop-blur-xl md:rounded-r-3xl shadow-[0_0_32px_4px_#00BFFF55] z-20 overflow-x-auto md:overflow-y-auto flex-shrink-0 ${sidebarOpen
                            ? 'w-full md:w-64 md:min-w-[16rem] md:max-w-[16rem]'
                            : 'w-14 md:min-w-[3.5rem] md:max-w-[3.5rem]'
                        }`}
                    style={{
                        width: sidebarOpen ? (window.innerWidth >= 768 ? '16rem' : '100%') : (window.innerWidth >= 768 ? '3.5rem' : '3.5rem'),
                        minWidth: sidebarOpen ? (window.innerWidth >= 768 ? '16rem' : '100%') : (window.innerWidth >= 768 ? '3.5rem' : '3.5rem'),
                        maxWidth: sidebarOpen ? (window.innerWidth >= 768 ? '16rem' : '100%') : (window.innerWidth >= 768 ? '3.5rem' : '3.5rem'),
                    }}
                >

                    {/* Sidebar Toggle Button */}
                    <button
                        className="absolute top-2 right-2 md:static w-8 h-8 bg-white/30 rounded-full flex items-center justify-center shadow-lg border border-[#0077C8]/30 hover:bg-white/50 transition-all duration-300 z-10"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        aria-label={sidebarOpen ? 'Minimize sidebar' : 'Expand sidebar'}
                        style={{ outline: 'none' }}
                    >
                        {sidebarOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#0077C8" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#0077C8" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        )}
                    </button>

                    {/* User Info */}
                    {sidebarOpen && user && (
                        <div className="flex flex-col items-center mb-6 px-2">
                            <div className="w-12 h-12 rounded-full bg-[#00BFFF]/50 flex items-center justify-center text-white font-bold text-lg">
                                {user.displayName ? user.displayName.charAt(0) : "U"}
                            </div>
                            <span className="mt-2 text-sm font-medium">{user.displayName || user.email}</span>
                        </div>
                    )}

                    {/* Navigation Items */}
                    <nav className="flex flex-col gap-4 items-center md:items-start w-full">
                        {sidebarItems.map(item => (
                            <button
                                key={item.key}
                                className={`flex items-center justify-center ${sidebarOpen ? 'w-full md:px-4 md:py-3 px-2 py-2' : 'w-12 h-12'} rounded-full font-semibold transition-all duration-300 focus:outline-none border-2 relative backdrop-blur-md
                                ${activeTab === item.key
                                        ? 'bg-transparent text-[#00BFFF] border-[#00BFFF] shadow-[0_0_16px_2px_#00BFFF99] scale-105'
                                        : 'bg-transparent text-white border-transparent'}
                                hover:bg-transparent hover:text-[#00BFFF] hover:border-[#00BFFF] hover:shadow-[0_0_12px_2px_#00BFFF66]`}
                                onClick={() => setActiveTab(item.key)}
                                aria-label={item.label}
                                style={{
                                    boxShadow: activeTab === item.key
                                        ? '0 0 24px 4px #00BFFF99, 0 1.5px 8px 0 #0077C880'
                                        : undefined,
                                    borderWidth: activeTab === item.key ? 2 : 1,
                                    borderStyle: 'solid',
                                    borderColor: activeTab === item.key ? '#00BFFF' : 'transparent',
                                    background: activeTab === item.key ? 'linear-gradient(90deg, #011f3a 80%, #00BFFF22 100%)' : undefined,
                                }}
                            >
                                <span>{item.icon}</span>
                                {sidebarOpen && <span className="ml-3 text-base font-medium hidden md:inline">{item.label}</span>}
                            </button>
                        ))}
                    </nav>

                    {/* Logout Button */}
                    <div className="mt-auto px-2 py-4">
                        <button
                            onClick={handleLogout}
                            className="flex items-center justify-center w-full md:px-4 md:py-3 px-2 py-2 rounded-full font-semibold transition-all duration-300 focus:outline-none border-2 border-transparent text-red-500 hover:text-white hover:bg-red-500/20 hover:border-red-500 hover:shadow-[0_0_12px_2px_rgba(255,0,0,0.4)]"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 mr-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10V5" />
                            </svg>
                            {sidebarOpen && <span className="text-base font-medium">Logout</span>}
                        </button>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 flex items-center justify-center px-1 sm:px-4 md:px-12 py-2 md:py-10 min-w-0">
                    <div className="w-full sm:w-[95%] md:w-[90%] h-full max-h-[80vh] bg-[#0a192f]/80 rounded-2xl shadow-[0_0_32px_4px_#00BFFF55] backdrop-blur-xl border border-[#00BFFF]/20 p-2 sm:p-8 md:p-16 flex flex-col items-center animate-fade-in overflow-y-auto">
                        {activeTab === 'about' && <AboutSection />}
                        {activeTab === 'projects' && <ProjectsSection />}
                        {activeTab === 'getintouch' && <GetInTouchSection />}
                    </div>
                </div>

                {/* Home Navlink Top Right */}
                <a
                    href="/"
                    className="fixed top-8 right-8 z-50 bg-gradient-to-br from-[#0077C8]/60 via-[#00BFFF]/40 to-[#00FFB2]/30 text-white rounded-full shadow-2xl p-3 flex items-center justify-center border border-[#00BFFF]/30 backdrop-blur-md transition-all duration-500 hover:scale-110 hover:shadow-blue-400/50 hover:bg-gradient-to-br hover:from-[#00BFFF]/80 hover:via-[#0077C8]/60 hover:to-[#00FFB2]/50"
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