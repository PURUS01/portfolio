import React from 'react';

function GetInTouchPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white font-sans px-4 relative overflow-hidden flex items-center justify-center">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-lime-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
      </div>

      {/* Contact Form Card */}
      <div className="relative z-10 w-full max-w-2xl animate-fadeInUp">
        <div className="bg-white/5 backdrop-blur-md p-10 rounded-3xl border border-white/10 shadow-2xl hover:bg-white/10 hover:border-lime-400/30 transition-all duration-500">
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-lime-400 to-white animate-gradient-x">
              Get in Touch
            </h2>
            <p className="text-gray-400 mt-3 text-sm">
              Feel free to reach out for collaborations or just a chat!
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-6 py-4 rounded-2xl bg-white/5 text-white border border-white/10 outline-none focus:border-lime-400 focus:bg-white/10 transition-all duration-300 placeholder-gray-500"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-6 py-4 rounded-2xl bg-white/5 text-white border border-white/10 outline-none focus:border-lime-400 focus:bg-white/10 transition-all duration-300 placeholder-gray-500"
              required
            />
            <textarea
              placeholder="Your Message"
              rows={6}
              className="w-full px-6 py-4 rounded-2xl bg-white/5 text-white border border-white/10 outline-none focus:border-lime-400 focus:bg-white/10 transition-all duration-300 placeholder-gray-500"
              required
            ></textarea>
            <button
              type="submit"
              className="w-full mt-4 bg-gradient-to-r from-lime-500 to-green-500 text-black font-bold py-4 rounded-2xl shadow-xl hover:scale-105 transition-all duration-300 group"
            >
              <span className="flex items-center justify-center gap-2">
                Send Message
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </span>
            </button>
          </form>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gradient-x {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </div>
    );
}

export default GetInTouchPage;