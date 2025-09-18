import React, { useState, useRef } from 'react';
import { doc, updateDoc, arrayUnion, getDoc, setDoc } from 'firebase/firestore';
import { firestore } from '../firebase'; // Import from src/firebase.js
import emailjs from '@emailjs/browser';

function GetInTouchPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const formRef = useRef();

  // EmailJS configuration from environment variables only
  const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
  const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
  const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

  // Combined function that handles both Firebase and EmailJS in one try-catch
  const sendEmail = async (e) => {
    e.preventDefault();

    // Validate environment variables
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      setErrors({ 
        general: 'Email service configuration missing. Please contact support.'
      });
      setLoading(false);
      return;
    }

    try {
      // Step 1: Save to Firebase
      const messagesRef = doc(firestore, 'portfolion', 'messages');

      const messageData = {
        id: Date.now(),
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
        reply: '',
        createdAt: new Date(),
        status: 'unread'
      };

      const docSnap = await getDoc(messagesRef);
      if (docSnap.exists()) {
        await updateDoc(messagesRef, {
          messages: arrayUnion(messageData)
        });
      } else {
        await setDoc(messagesRef, {
          messages: [messageData]
        });
      }

      // Step 2: Send email via EmailJS
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        {
          publicKey: EMAILJS_PUBLIC_KEY,
        }
      );

      // Both operations successful - show success message
      setSubmitted(true);
      setForm({ name: '', email: '', message: '' });
      setErrors({});

      // Reset submitted state after 4 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 4000);

    } catch (error) {
      console.error('Detailed error:', error);
      console.error('Error status:', error.status);
      console.error('Error code:', error.code);
      console.error('Error text:', error.text);
      
      // Set specific error message based on the error type
      let errorMessage = 'Failed to send message. Please try again.';
      
      if (error.code === 'permission-denied') {
        errorMessage = 'Database access denied. Please contact support.';
      } else if (error.code === 'unavailable') {
        errorMessage = 'Service temporarily unavailable. Please try again later.';
      } else if (error.status === 400) {
        errorMessage = 'Invalid email configuration. Please contact support.';
      } else if (error.status === 401) {
        errorMessage = 'Email service authentication failed. Please contact support.';
      } else if (error.status === 403) {
        errorMessage = 'Email service access denied. Please contact support.';
      } else if (error.status === 404) {
        errorMessage = 'Email template not found. Please contact support.';
      } else if (error.status === 412) {
        errorMessage = 'Gmail authentication failed. Please contact support.';
      } else if (error.status === 429) {
        errorMessage = 'Too many requests. Please wait a moment and try again.';
      } else if (error.status >= 500) {
        errorMessage = 'Service temporarily unavailable. Please try again later.';
      }
      
      setErrors({ 
        general: errorMessage
      });
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!form.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (form.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    } else if (form.name.trim().length > 50) {
      newErrors.name = 'Name must be less than 50 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Message validation
    if (!form.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (form.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    } else if (form.message.trim().length > 1000) {
      newErrors.message = 'Message must be less than 1000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
    
    // Clear general error when user starts typing
    if (errors.general) {
      setErrors({ ...errors, general: '' });
    }
  };

  const handleSubmit = async (e) => {
    // Validate form before submitting
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    await sendEmail(e);
  };

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

              {/* Success Message */}
              {submitted && (
                <div className="mb-6 p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 rounded-2xl text-center animate-fadeInUp">
                  <div className="text-green-400 text-lg font-semibold mb-1">✓ Message Sent Successfully!</div>
                  <p className="text-green-300/80 text-sm">Thank you for reaching out. I'll get back to you soon.</p>
                </div>
              )}

              {/* General Error Message */}
              {errors.general && (
                <div className="mb-6 p-4 bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-400/30 rounded-2xl text-center animate-fadeInUp">
                  <div className="text-red-400 text-lg font-semibold mb-1">✗ Error Sending Message</div>
                  <p className="text-red-300/80 text-sm">{errors.general}</p>
                </div>
              )}

              {/* Form */}
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className={`w-full px-6 py-4 rounded-2xl bg-white/5 text-white border outline-none focus:bg-white/10 transition-all duration-300 placeholder-gray-500 ${errors.name
                      ? 'border-red-400 focus:border-red-400'
                      : 'border-white/10 focus:border-[#0077C8]'
                      }`}
                    required
                  />
                  {errors.name && (
                    <p className="text-red-400 text-sm mt-2 ml-2">{errors.name}</p>
                  )}
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    className={`w-full px-6 py-4 rounded-2xl bg-white/5 text-white border outline-none focus:bg-white/10 transition-all duration-300 placeholder-gray-500 ${errors.email
                      ? 'border-red-400 focus:border-red-400'
                      : 'border-white/10 focus:border-[#0077C8]'
                      }`}
                    required
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-2 ml-2">{errors.email}</p>
                  )}
                </div>

                <div>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                    rows={6}
                    className={`w-full px-6 py-4 rounded-2xl bg-white/5 text-white border outline-none focus:bg-white/10 transition-all duration-300 placeholder-gray-500 ${errors.message
                      ? 'border-red-400 focus:border-red-400'
                      : 'border-white/10 focus:border-[#0077C8]'
                      }`}
                    required
                  ></textarea>
                  {errors.message && (
                    <p className="text-red-400 text-sm mt-2 ml-2">{errors.message}</p>
                  )}
                  <p className="text-gray-500 text-xs mt-1 ml-2">
                    {form.message.length}/1000 characters
                  </p>
                </div>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={loading || submitted}
                  className="w-full mt-4 bg-gradient-to-r from-[#0077C8] to-[#00BFFF] text-white font-bold py-4 rounded-2xl shadow-xl hover:scale-105 transition-all duration-300 group disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </span>
                  ) : submitted ? (
                    <span className="flex items-center justify-center gap-2">
                      <span>✓ Sent Successfully</span>
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Send Message
                      <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </span>
                  )}
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