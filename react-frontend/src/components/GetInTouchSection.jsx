
import React, { useState } from 'react';

const GetInTouchSection = () => {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    // Demo messages array
    const [messages, setMessages] = useState([
        {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            message: 'Hello, I am interested in collaborating!',
            date: '2025-08-09',
        },
        {
            id: 2,
            name: 'Jane Smith',
            email: 'jane@example.com',
            message: 'Can you help with my project?',
            date: '2025-08-08',
        },
        {
            id: 3,
            name: 'Alex Turner',
            email: 'alex.turner@example.com',
            message: 'Would love to discuss a new idea with you.',
            date: '2025-08-07',
        },
        {
            id: 4,
            name: 'Priya Singh',
            email: 'priya.singh@example.com',
            message: 'Can you review my portfolio website?',
            date: '2025-08-06',
        },
        {
            id: 5,
            name: 'Michael Chen',
            email: 'michael.chen@example.com',
            message: 'Interested in a freelance project collaboration.',
            date: '2025-08-05',
        },
        {
            id: 6,
            name: 'Sara Lopez',
            email: 'sara.lopez@example.com',
            message: 'Could you help me with React best practices?',
            date: '2025-08-04',
        },
    ]);

    // Action handlers (demo only)
    const handleReply = (id) => alert(`Reply to message ${id}`);
    const handleDelete = (id) => setMessages(messages.filter(msg => msg.id !== id));
    const handleView = (id) => alert(`View message ${id}`);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you can add API integration or email service
        setSubmitted(true);
    };

    return (
        <section className="py-10 px-2 md:px-8 lg:px-24">
            <h3 className="text-2xl font-bold mb-6 text-[#00BFFF] drop-shadow-lg text-center">Messages / Requests</h3>
            <div className="w-full overflow-x-auto rounded-lg bg-[#16213e] text-white shadow-lg border border-[#00BFFF]/20">
                <table className="w-full text-white text-sm">
                    <thead>
                        <tr className="bg-[#1b263b]">
                            <th className="py-3 px-4 text-left font-semibold text-[#00BFFF]">Email</th>
                            <th className="py-3 px-4 text-left font-semibold text-[#00BFFF]">Message</th>
                            <th className="py-3 px-4 text-left font-semibold text-[#00BFFF]">Date</th>
                            <th className="py-3 px-4 text-center font-semibold text-[#00BFFF]">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {messages.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="py-6 px-4 text-center text-white/60">No messages found.</td>
                            </tr>
                        ) : (
                            messages.map(msg => (
                                <tr key={msg.id} className="border-b border-[#232b3e] hover:bg-[#1b263b]/80 transition-all">
                                    <td className="py-3 px-4 text-white/90 whitespace-nowrap">{msg.email}</td>
                                    <td className="py-3 px-4 max-w-xs truncate text-white/80" title={msg.message}>{msg.message}</td>
                                    <td className="py-3 px-4 text-white/70 whitespace-nowrap">{msg.date}</td>
                                    <td className="py-3 px-4 text-center flex gap-1 justify-center">
                                        <button onClick={() => handleReply(msg.id)} className="px-3 py-1 rounded-lg bg-gradient-to-br from-[#00BFFF] via-[#0077C8] to-[#00FFB2] text-white font-semibold shadow border-none transition-all duration-200 hover:scale-105 hover:shadow-blue-400/50">Reply</button>
                                        <button onClick={() => handleView(msg.id)} className="px-3 py-1 rounded-lg bg-[#232b3e] text-white font-semibold border border-white/20 transition-all duration-200 hover:scale-105 hover:bg-[#00BFFF]/20">View</button>
                                        <button onClick={() => handleDelete(msg.id)} className="px-3 py-1 rounded-lg bg-gradient-to-br from-red-500 via-red-400 to-red-300 text-white font-semibold border-none transition-all duration-200 hover:scale-105 hover:bg-red-500/80">Delete</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default GetInTouchSection;
