import React from 'react';

function GetInTouchPage() {
  return (
    <div className="min-h-screen text-white font-sans px-4 md:px-0 py-8 flex justify-center relative overflow-hidden">
      <div className="w-full max-w-6xl relative z-10 animate-main-fadein">
        {/* Page Heading */}
        <div className="text-center mb-16 animate-fadeInUp">
          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#0077C8] to-white mb-4">
            Get in Touch
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-[#0077C8] to-[#00BFFF] mx-auto rounded-full"></div>
        </div>

        <div className="flex items-center justify-center">
          {/* Contact Form Card */}
          <div className="relative z-10 w-full max-w-2xl animate-fadeInUp">
            <div className="bg-white/5 backdrop-blur-md p-10 rounded-3xl border border-white/10 shadow-2xl hover:bg-white/10 hover:border-[#0077C8]/30 transition-all duration-500">
              {/* Form Header */}
              <div className="text-center mb-10">
                <h2 className="text-2xl font-bold text-[#0077C8] mb-3">
                  Send a Message
                </h2>
                <p className="text-gray-400 text-sm">
                  Feel free to reach out for collaborations or just a chat!
                </p>
              </div>

              {/* Form */}
              <form className="space-y-6">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-6 py-4 rounded-2xl bg-white/5 text-white border border-white/10 outline-none focus:border-[#0077C8] focus:bg-white/10 transition-all duration-300 placeholder-gray-500"
                  required
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-6 py-4 rounded-2xl bg-white/5 text-white border border-white/10 outline-none focus:border-[#0077C8] focus:bg-white/10 transition-all duration-300 placeholder-gray-500"
                  required
                />
                <textarea
                  placeholder="Your Message"
                  rows={6}
                  className="w-full px-6 py-4 rounded-2xl bg-white/5 text-white border border-white/10 outline-none focus:border-[#0077C8] focus:bg-white/10 transition-all duration-300 placeholder-gray-500"
                  required
                ></textarea>
                <button
                  type="submit"
                  className="w-full mt-4 bg-gradient-to-r from-[#0077C8] to-[#00BFFF] text-white font-bold py-4 rounded-2xl shadow-xl hover:scale-105 transition-all duration-300 group"
                >
                  <span className="flex items-center justify-center gap-2">
                    Send Message
                    <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </span>
                </button>
              </form>
            </div>
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
          50% { transform: scale(1.13) translate(40px, -30px); }
        }
        @keyframes blob4 {
          0%, 100% { transform: scale(1) translate(0, 0); }
          50% { transform: scale(1.05) translate(-35px, 25px); }
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
          animation: blob3 11s ease-in-out infinite;
        }
        .animate-blob4 {
          animation: blob4 13s ease-in-out infinite;
        }
        .animate-main-fadein {
          animation: main-fadein 1s ease-out forwards;
        }
      `}</style>
      </div>
    </div>
  );
}

export default GetInTouchPage;