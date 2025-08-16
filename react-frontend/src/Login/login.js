import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; // adjust path if needed

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Login successful:", userCredential.user);
      // Redirect or show dashboard after login
      window.location.href = "/dashboard"; // or use router push
    } catch (err) {
      console.error(err);
      setError(err.message); // Show error message
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white font-sans px-4 relative overflow-hidden flex items-center justify-center">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#0077C8]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md animate-fadeInUp">
        <div className="bg-white/5 backdrop-blur-md p-10 rounded-3xl border border-white/10 shadow-2xl hover:bg-white/10 hover:border-[#0077C8]/30 transition-all duration-500">
          {/* Header */}
          <div className="text-center mb-10 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            <div className="relative inline-block">
              <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#0077C8] to-white animate-gradient-x">
                Welcome Back
              </h2>
              <div className="absolute -top-1 -left-1 text-4xl font-bold text-[#0077C8]/20 -z-10">
                Welcome Back
              </div>
            </div>
            <p className="text-gray-400 mt-3 text-sm animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
              Sign in to access your portfolio dashboard
            </p>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          {/* Form */}
          <div className="space-y-6">
            {/* Email Field */}
            <div className="animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
              <label className="block mb-3 text-gray-300 font-medium text-sm uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative group">
                <input
                  type="email"
                  className="w-full px-6 py-4 rounded-2xl bg-white/5 backdrop-blur-sm text-white border border-white/10 outline-none focus:border-[#0077C8]/50 focus:bg-white/10 transition-all duration-300 placeholder-gray-500 hover:border-white/20"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#0077C8]/0 via-[#00BFFF]/5 to-[#0077C8]/0 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>

            {/* Password Field */}
            <div className="animate-fadeInUp" style={{ animationDelay: '0.8s' }}>
              <label className="block mb-3 text-gray-300 font-medium text-sm uppercase tracking-wider">
                Password
              </label>
              <div className="relative group">
                <input
                  type="password"
                  className="w-full px-6 py-4 rounded-2xl bg-white/5 backdrop-blur-sm text-white border border-white/10 outline-none focus:border-[#0077C8]/50 focus:bg-white/10 transition-all duration-300 placeholder-gray-500 hover:border-white/20"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#0077C8]/0 via-[#00BFFF]/5 to-[#0077C8]/0 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>

            {/* Login Button */}
            <div className="animate-fadeInUp" style={{ animationDelay: '1s' }}>
              <button
                onClick={handleLogin}
                disabled={isLoading}
                className="relative w-full mt-8 bg-gradient-to-r from-[#0077C8] to-[#00BFFF] text-white font-bold px-8 py-4 rounded-2xl shadow-2xl hover:scale-105 transition-all duration-300 group overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#00BFFF] to-[#0077C8] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-black"></div>
                      Signing In...
                    </>
                  ) : (
                    <>
                      Sign In
                      <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
              </button>
            </div>
          </div>

          {/* Additional Links */}
          <div className="mt-8 text-center animate-fadeInUp" style={{ animationDelay: '1.2s' }}>
            <div className="flex justify-between items-center text-sm">
              <a href="#" className="text-gray-400 hover:text-[#0077C8] transition-colors duration-300 hover:scale-105 transform inline-block">
                Forgot Password?
              </a>
              <a href="#" className="text-gray-400 hover:text-[#0077C8] transition-colors duration-300 hover:scale-105 transform inline-block">
                Need Help?
              </a>
            </div>
          </div>

          {/* Back to Home */}
          <div className="mt-8 text-center animate-fadeInUp" style={{ animationDelay: '1.4s' }}>
            <button
              onClick={() => {
                window.location.href = '/';
              }}
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-all duration-300 hover:scale-105 group cursor-pointer"
            >
              <span className="group-hover:-translate-x-1 transition-transform duration-300">←</span>
              Back to Portfolio
            </button>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-6 -left-6 w-12 h-12 bg-[#0077C8]/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-[#00BFFF]/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
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

export default LoginPage;
