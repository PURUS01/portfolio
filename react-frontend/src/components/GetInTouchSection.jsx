import React, { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { firestore } from '../firebase';
import { toast } from 'react-hot-toast';

const GetInTouchSection = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [actionLoading, setActionLoading] = useState({ reply: false, delete: false });

    // Modal states
    const [replyModal, setReplyModal] = useState({ open: false, messageId: null, replyText: '' });
    const [viewModal, setViewModal] = useState({ open: false, message: null });
    const [deleteModal, setDeleteModal] = useState({ open: false, messageId: null });

    const fetchMessages = async (isRefresh = false) => {
        if (isRefresh) setRefreshing(true);
        try {
            const messagesRef = doc(firestore, 'portfolion', 'messages');
            const docSnap = await getDoc(messagesRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                const formattedMessages = (data.messages || [])
                    .sort((a, b) => (a.createdAt && b.createdAt) ? b.createdAt.seconds - a.createdAt.seconds : b.id - a.id)
                    .map(msg => ({
                        id: msg.id,
                        name: msg.name,
                        email: msg.email,
                        message: msg.message,
                        reply: msg.reply || '',
                        status: msg.status || 'unread',
                        date: msg.createdAt ? new Date(msg.createdAt.seconds * 1000).toLocaleDateString() : new Date().toLocaleDateString()
                    }));
                setMessages(formattedMessages);
            } else {
                setMessages([]);
            }
        } catch (error) {
            console.error('Error fetching messages:', error);
            toast.error('Failed to fetch messages');
            setMessages([]);
        } finally {
            setLoading(false);
            if (isRefresh) setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    // Modal handlers
    const openReplyModal = (id, currentReply = '') => setReplyModal({ open: true, messageId: id, replyText: currentReply });
    const closeReplyModal = () => setReplyModal({ open: false, messageId: null, replyText: '' });
    const openViewModal = (msg) => setViewModal({ open: true, message: msg });
    const closeViewModal = () => setViewModal({ open: false, message: null });
    const openDeleteModal = (id) => setDeleteModal({ open: true, messageId: id });
    const closeDeleteModal = () => setDeleteModal({ open: false, messageId: null });

    // Reply with toast.promise
    const handleReplySave = async () => {
        setActionLoading(prev => ({ ...prev, reply: true }));

        const saveReplyPromise = (async () => {
            const messagesRef = doc(firestore, 'portfolion', 'messages');
            const docSnap = await getDoc(messagesRef);

            if (!docSnap.exists()) throw new Error('Document not found');

            const data = docSnap.data();
            const updatedMessages = data.messages.map(msg =>
                msg.id === replyModal.messageId ? { ...msg, reply: replyModal.replyText, status: 'replied' } : msg
            );

            await updateDoc(messagesRef, { messages: updatedMessages });
            await fetchMessages(true);
            closeReplyModal();
        })();

        toast.promise(
            saveReplyPromise,
            {
                loading: 'Saving reply...',
                success: <b>Reply saved successfully!</b>,
                error: <b>Failed to save reply.</b>,
            }
        ).finally(() => setActionLoading(prev => ({ ...prev, reply: false })));
    };

    // Delete with toast.promise
    const handleDeleteConfirm = async () => {
        setActionLoading(prev => ({ ...prev, delete: true }));

        const deleteMessagePromise = (async () => {
            const messagesRef = doc(firestore, 'portfolion', 'messages');
            const docSnap = await getDoc(messagesRef);

            if (!docSnap.exists()) throw new Error('Document not found');

            const data = docSnap.data();
            const filteredMessages = data.messages.filter(msg => msg.id !== deleteModal.messageId);
            await updateDoc(messagesRef, { messages: filteredMessages });
            setMessages(messages.filter(msg => msg.id !== deleteModal.messageId));
            closeDeleteModal();
        })();

        toast.promise(
            deleteMessagePromise,
            {
                loading: 'Deleting message...',
                success: <b>Message deleted successfully!</b>,
                error: <b>Failed to delete message.</b>,
            }
        ).finally(() => setActionLoading(prev => ({ ...prev, delete: false })));
    };

    if (loading) return <div className="py-20 flex justify-center items-center text-[#00BFFF] text-lg">Loading messages...</div>;

    return (
        <section className="py-10 px-2 md:px-8 lg:px-24">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-[#00BFFF]">Messages / Requests</h3>
                <button
                    onClick={() => fetchMessages(true)}
                    disabled={refreshing}
                    className={`px-4 py-2 rounded-lg border border-[#00BFFF]/50 text-[#00BFFF] transition hover:bg-[#00BFFF]/20 ${refreshing ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {refreshing ? 'Refreshing...' : 'Refresh'}
                </button>
            </div>

            <div className="overflow-x-auto bg-[#16213e] rounded-lg shadow-lg border border-[#00BFFF]/20 text-white">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-[#1b263b]">
                            <th className="py-3 px-4 text-left text-[#00BFFF]">Name</th>
                            <th className="py-3 px-4 text-left text-[#00BFFF]">Email</th>
                            <th className="py-3 px-4 text-left text-[#00BFFF]">Message</th>
                            <th className="py-3 px-4 text-left text-[#00BFFF]">Date</th>
                            <th className="py-3 px-4 text-center text-[#00BFFF]">Status</th>
                            <th className="py-3 px-4 text-center text-[#00BFFF]">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {messages.length === 0 ? (
                            <tr><td colSpan={6} className="py-6 text-center text-white/60">No messages found.</td></tr>
                        ) : (
                            messages.map(msg => (
                                <tr key={msg.id} className="border-b border-[#232b3e] hover:bg-[#1b263b]/80 transition-all">
                                    <td className="py-3 px-4 whitespace-nowrap">{msg.name}</td>
                                    <td className="py-3 px-4 whitespace-nowrap">{msg.email}</td>
                                    <td className="py-3 px-4 max-w-xs truncate" title={msg.message}>{msg.message}</td>
                                    <td className="py-3 px-4 whitespace-nowrap">{msg.date}</td>
                                    <td className="py-3 px-4 text-center">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${msg.status === 'replied'
                                            ? 'bg-green-500/20 text-green-400 border border-green-400/30'
                                            : 'bg-yellow-500/20 text-yellow-400 border border-yellow-400/30'
                                            }`}>{msg.status}</span>
                                    </td>
                                    <td className="py-3 px-4 text-center flex justify-center gap-1">
                                        <button
                                            onClick={() => openReplyModal(msg.id, msg.reply)}
                                            className={`px-3 py-1 bg-[#00BFFF] rounded-lg transition ${actionLoading.reply ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            disabled={actionLoading.reply}
                                        >
                                            {actionLoading.reply && replyModal.messageId === msg.id ? 'Saving...' : 'Reply'}
                                        </button>
                                        <button
                                            onClick={() => openViewModal(msg)}
                                            className="px-3 py-1 bg-[#232b3e] rounded-lg"
                                        >
                                            View
                                        </button>
                                        <button
                                            onClick={() => openDeleteModal(msg.id)}
                                            className={`px-3 py-1 bg-red-500 rounded-lg transition ${actionLoading.delete ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        >
                                            {actionLoading.delete && deleteModal.messageId === msg.id ? 'Deleting...' : 'Delete'}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modals with transitions */}
            {replyModal.open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-opacity duration-300">
                    <div className="bg-[#16213e] p-6 rounded-lg w-96 shadow-lg transform transition-transform duration-300 scale-95 animate-scale-in">
                        <h4 className="text-lg font-bold text-[#00BFFF] mb-4">Reply to Message</h4>
                        <textarea
                            className="w-full p-2 rounded bg-[#1b263b] text-white mb-4"
                            rows={5}
                            value={replyModal.replyText}
                            onChange={(e) => setReplyModal({ ...replyModal, replyText: e.target.value })}
                        />
                        <div className="flex justify-end gap-2">
                            <button onClick={closeReplyModal} className="px-4 py-2 bg-gray-500 rounded hover:bg-gray-600">Cancel</button>
                            <button onClick={handleReplySave} className="px-4 py-2 bg-green-500 rounded hover:bg-green-600">
                                {actionLoading.reply ? 'Saving...' : 'Save'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {viewModal.open && viewModal.message && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-opacity duration-300">
                    <div className="bg-[#16213e] p-6 rounded-lg w-96 shadow-lg transform transition-transform duration-300 scale-95 animate-scale-in">
                        <h4 className="text-lg font-bold text-[#00BFFF] mb-4">{viewModal.message.name}'s Message</h4>
                        <p className="mb-2"><strong>Email:</strong> {viewModal.message.email}</p>
                        <p className="mb-2"><strong>Date:</strong> {viewModal.message.date}</p>
                        <p className="mb-2"><strong>Message:</strong> {viewModal.message.message}</p>
                        <p className="mb-4"><strong>Reply:</strong> {viewModal.message.reply || 'No reply yet'}</p>
                        <div className="flex justify-end">
                            <button onClick={closeViewModal} className="px-4 py-2 bg-gray-500 rounded hover:bg-gray-600">Close</button>
                        </div>
                    </div>
                </div>
            )}

            {deleteModal.open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-opacity duration-300">
                    <div className="bg-[#16213e] p-6 rounded-lg w-80 shadow-lg transform transition-transform duration-300 scale-95 animate-scale-in">
                        <h4 className="text-lg font-bold text-red-500 mb-4">Confirm Delete</h4>
                        <p className="mb-4">Are you sure you want to delete this message?</p>
                        <div className="flex justify-end gap-2">
                            <button onClick={closeDeleteModal} className="px-4 py-2 bg-gray-500 rounded hover:bg-gray-600">Cancel</button>
                            <button onClick={handleDeleteConfirm} className="px-4 py-2 bg-red-500 rounded hover:bg-red-600">
                                {actionLoading.delete ? 'Deleting...' : 'Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default GetInTouchSection;
