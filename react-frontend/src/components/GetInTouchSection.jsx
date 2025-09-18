import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { firestore } from '../firebase';
import { toast } from 'react-hot-toast';

// Modal component that renders outside the scrollable container
const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
            <div 
                className="fixed inset-0" 
                onClick={onClose}
            />
            <div className="relative z-10">
                {children}
            </div>
        </div>,
        document.body
    );
};

const GetInTouchSection = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [actionLoading, setActionLoading] = useState({ reply: false, delete: false, deleteAll: false });

    // Modal states
    const [replyModal, setReplyModal] = useState({ open: false, messageId: null, replyText: '' });
    const [viewModal, setViewModal] = useState({ open: false, message: null });
    const [deleteModal, setDeleteModal] = useState({ open: false, messageId: null });
    const [deleteAllModal, setDeleteAllModal] = useState({ open: false });

    // Selection states
    const [selectedMessages, setSelectedMessages] = useState(new Set());
    const [selectAll, setSelectAll] = useState(false);

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
    const openViewModal = (msg) => {
        console.log('Opening view modal for message:', msg);
        setViewModal({ open: true, message: msg });
    };
    const closeViewModal = () => setViewModal({ open: false, message: null });
    const openDeleteModal = (id) => setDeleteModal({ open: true, messageId: id });
    const closeDeleteModal = () => setDeleteModal({ open: false, messageId: null });
    const openDeleteAllModal = () => setDeleteAllModal({ open: true });
    const closeDeleteAllModal = () => setDeleteAllModal({ open: false });

    // Selection handlers
    const handleSelectMessage = (messageId) => {
        const newSelected = new Set(selectedMessages);
        if (newSelected.has(messageId)) {
            newSelected.delete(messageId);
        } else {
            newSelected.add(messageId);
        }
        setSelectedMessages(newSelected);
        setSelectAll(newSelected.size === messages.length && messages.length > 0);
    };

    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedMessages(new Set());
            setSelectAll(false);
        } else {
            const allIds = new Set(messages.map(msg => msg.id));
            setSelectedMessages(allIds);
            setSelectAll(true);
        }
    };

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

    // Delete all selected messages with toast.promise
    const handleDeleteAllConfirm = async () => {
        if (selectedMessages.size === 0) return;
        
        setActionLoading(prev => ({ ...prev, deleteAll: true }));

        const deleteAllPromise = (async () => {
            const messagesRef = doc(firestore, 'portfolion', 'messages');
            const docSnap = await getDoc(messagesRef);

            if (!docSnap.exists()) throw new Error('Document not found');

            const data = docSnap.data();
            const filteredMessages = data.messages.filter(msg => !selectedMessages.has(msg.id));
            await updateDoc(messagesRef, { messages: filteredMessages });
            setMessages(messages.filter(msg => !selectedMessages.has(msg.id)));
            setSelectedMessages(new Set());
            setSelectAll(false);
            closeDeleteAllModal();
        })();

        toast.promise(
            deleteAllPromise,
            {
                loading: `Deleting ${selectedMessages.size} message(s)...`,
                success: <b>{selectedMessages.size} message(s) deleted successfully!</b>,
                error: <b>Failed to delete messages.</b>,
            }
        ).finally(() => setActionLoading(prev => ({ ...prev, deleteAll: false })));
    };

    if (loading) return <div className="py-20 flex justify-center items-center text-[#00BFFF] text-lg">Loading messages...</div>;

    return (
        <section className="py-4 sm:py-6 md:py-10 px-2 sm:px-4 md:px-8 lg:px-24 w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-[#00BFFF]">Messages / Requests</h3>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    {selectedMessages.size > 0 && (
                        <button
                            onClick={openDeleteAllModal}
                            disabled={actionLoading.deleteAll}
                            className={`px-3 sm:px-4 py-2 rounded-lg bg-red-500 text-white transition hover:bg-red-600 text-sm sm:text-base ${actionLoading.deleteAll ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {actionLoading.deleteAll ? 'Deleting...' : `Delete Selected (${selectedMessages.size})`}
                        </button>
                    )}
                    <button
                        onClick={() => fetchMessages(true)}
                        disabled={refreshing}
                        className={`px-3 sm:px-4 py-2 rounded-lg border border-[#00BFFF]/50 text-[#00BFFF] transition hover:bg-[#00BFFF]/20 text-sm sm:text-base ${refreshing ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {refreshing ? 'Refreshing...' : 'Refresh'}
                    </button>
                </div>
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto bg-[#16213e] rounded-lg shadow-lg border border-[#00BFFF]/20 text-white">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-[#1b263b]">
                            <th className="py-3 px-4 text-center text-[#00BFFF]">
                                <input
                                    type="checkbox"
                                    checked={selectAll}
                                    onChange={handleSelectAll}
                                    className="w-4 h-4 text-[#00BFFF] bg-transparent border-2 border-[#00BFFF] rounded focus:ring-[#00BFFF] focus:ring-2"
                                />
                            </th>
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
                            <tr><td colSpan={7} className="py-6 text-center text-white/60">No messages found.</td></tr>
                        ) : (
                            messages.map(msg => (
                                <tr key={msg.id} className="border-b border-[#232b3e] hover:bg-[#1b263b]/80 transition-all">
                                    <td className="py-3 px-4 text-center">
                                        <input
                                            type="checkbox"
                                            checked={selectedMessages.has(msg.id)}
                                            onChange={() => handleSelectMessage(msg.id)}
                                            className="w-4 h-4 text-[#00BFFF] bg-transparent border-2 border-[#00BFFF] rounded focus:ring-[#00BFFF] focus:ring-2"
                                        />
                                    </td>
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
                                            className={`px-3 py-1 bg-[#00BFFF] rounded-lg transition-all duration-300 text-xs transform hover:scale-105 hover:shadow-[0_0_15px_rgba(0,191,255,0.6)] hover:bg-[#00BFFF]/80 active:scale-95 ${actionLoading.reply ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            disabled={actionLoading.reply}
                                        >
                                            {actionLoading.reply && replyModal.messageId === msg.id ? 'Saving...' : 'Reply'}
                                        </button>
                                        <button
                                            onClick={() => {
                                                console.log('Desktop View button clicked for message:', msg);
                                                openViewModal(msg);
                                            }}
                                            className="px-3 py-1 bg-[#232b3e] rounded-lg text-xs transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_15px_rgba(35,43,62,0.8)] hover:bg-[#2a3441] active:scale-95"
                                        >
                                            View
                                        </button>
                                        <button
                                            onClick={() => openDeleteModal(msg.id)}
                                            className={`px-3 py-1 bg-red-500 rounded-lg transition-all duration-300 text-xs transform hover:scale-105 hover:shadow-[0_0_15px_rgba(239,68,68,0.6)] hover:bg-red-600 active:scale-95 ${actionLoading.delete ? 'opacity-50 cursor-not-allowed' : ''}`}
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

            {/* Mobile/Tablet Card View */}
            <div className="lg:hidden space-y-4">
                {messages.length === 0 ? (
                    <div className="bg-[#16213e] rounded-lg shadow-lg border border-[#00BFFF]/20 p-6 text-center text-white/60">
                        No messages found.
                    </div>
                ) : (
                    messages.map(msg => (
                        <div key={msg.id} className="bg-[#16213e] rounded-lg shadow-lg border border-[#00BFFF]/20 p-4 sm:p-6 text-white">
                            {/* Header with checkbox, name and status */}
                            <div className="flex items-start gap-3 mb-3">
                                <input
                                    type="checkbox"
                                    checked={selectedMessages.has(msg.id)}
                                    onChange={() => handleSelectMessage(msg.id)}
                                    className="w-4 h-4 text-[#00BFFF] bg-transparent border-2 border-[#00BFFF] rounded focus:ring-[#00BFFF] focus:ring-2 mt-1"
                                />
                                <div className="flex-1">
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                                        <div>
                                            <h4 className="text-lg font-semibold text-[#00BFFF]">{msg.name}</h4>
                                            <p className="text-sm text-white/70 break-all">{msg.email}</p>
                                        </div>
                                        <div className="flex flex-col sm:items-end gap-1">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold w-fit ${msg.status === 'replied'
                                                ? 'bg-green-500/20 text-green-400 border border-green-400/30'
                                                : 'bg-yellow-500/20 text-yellow-400 border border-yellow-400/30'
                                                }`}>{msg.status}</span>
                                            <span className="text-xs text-white/60">{msg.date}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Message content */}
                            <div className="mb-4">
                                <p className="text-sm text-white/90 break-words line-clamp-3">{msg.message}</p>
                            </div>

                            {/* Action buttons */}
                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                                <button
                                    onClick={() => openReplyModal(msg.id, msg.reply)}
                                    className={`flex-1 px-4 py-2 bg-[#00BFFF] rounded-lg transition-all duration-300 text-sm font-medium transform hover:scale-105 hover:shadow-[0_0_20px_rgba(0,191,255,0.6)] hover:bg-[#00BFFF]/90 active:scale-95 ${actionLoading.reply ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    disabled={actionLoading.reply}
                                >
                                    {actionLoading.reply && replyModal.messageId === msg.id ? 'Saving...' : 'Reply'}
                                </button>
                                <button
                                    onClick={() => {
                                        console.log('Mobile View button clicked for message:', msg);
                                        openViewModal(msg);
                                    }}
                                    className="flex-1 px-4 py-2 bg-[#232b3e] rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_20px_rgba(35,43,62,0.8)] hover:bg-[#2a3441] active:scale-95"
                                >
                                    View
                                </button>
                                <button
                                    onClick={() => openDeleteModal(msg.id)}
                                    className={`flex-1 px-4 py-2 bg-red-500 rounded-lg transition-all duration-300 text-sm font-medium transform hover:scale-105 hover:shadow-[0_0_20px_rgba(239,68,68,0.6)] hover:bg-red-600 active:scale-95 ${actionLoading.delete ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {actionLoading.delete && deleteModal.messageId === msg.id ? 'Deleting...' : 'Delete'}
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Modals with responsive design */}
            <Modal isOpen={replyModal.open} onClose={closeReplyModal}>
                <div className="bg-[#16213e] p-6 sm:p-6 md:p-8 rounded-lg w-full max-w-lg sm:max-w-lg md:max-w-xl lg:max-w-2xl shadow-lg transform transition-transform duration-300 scale-95 animate-scale-in">
                    <h4 className="text-xl md:text-xl font-bold text-[#00BFFF] mb-6">Reply to Message</h4>
                    <textarea
                        className="w-full p-4 md:p-4 rounded bg-[#1b263b] text-white mb-6 text-base md:text-base resize-none"
                        rows={6}
                        value={replyModal.replyText}
                        onChange={(e) => setReplyModal({ ...replyModal, replyText: e.target.value })}
                        placeholder="Type your reply here..."
                    />
                    <div className="flex flex-col sm:flex-row justify-end gap-2 md:gap-3">
                        <button
                            onClick={closeReplyModal}
                            className="px-6 py-3 md:px-6 md:py-3 bg-gray-500 rounded hover:bg-gray-600 text-base md:text-base transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_12px_rgba(107,114,128,0.5)] active:scale-95"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleReplySave}
                            className="px-6 py-3 md:px-6 md:py-3 bg-green-500 rounded hover:bg-green-600 text-base md:text-base transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_15px_rgba(34,197,94,0.6)] active:scale-95"
                            disabled={actionLoading.reply}
                        >
                            {actionLoading.reply ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </div>
            </Modal>

            <Modal isOpen={viewModal.open} onClose={closeViewModal}>
                <div className="bg-[#16213e] p-6 sm:p-6 md:p-8 lg:p-10 rounded-lg w-full max-w-lg sm:max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl max-h-[90vh] overflow-y-auto shadow-lg transform transition-transform duration-300 scale-95 animate-scale-in">
                    {viewModal.message ? (
                        <>
                            <h4 className="text-xl md:text-xl lg:text-2xl font-bold text-[#00BFFF] mb-6 md:mb-6 lg:mb-8">{viewModal.message.name}'s Message</h4>
                    <div className="space-y-6 md:space-y-6 lg:space-y-8 text-base md:text-base lg:text-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-6">
                            <div>
                                <strong className="text-[#00BFFF] text-base md:text-base lg:text-lg">Email:</strong>
                                <p className="break-all text-white/90 mt-2 md:mt-2">{viewModal.message?.email}</p>
                            </div>
                            <div>
                                <strong className="text-[#00BFFF] text-base md:text-base lg:text-lg">Date:</strong>
                                <p className="text-white/90 mt-2 md:mt-2">{viewModal.message?.date}</p>
                            </div>
                        </div>
                        <div>
                            <strong className="text-[#00BFFF] text-base md:text-base lg:text-lg">Message:</strong>
                            <p className="text-white/90 break-words mt-2 md:mt-2 leading-relaxed">{viewModal.message?.message}</p>
                        </div>
                        <div>
                            <strong className="text-[#00BFFF] text-base md:text-base lg:text-lg">Reply:</strong>
                            <p className="text-white/90 break-words mt-2 md:mt-2 leading-relaxed">{viewModal.message?.reply || 'No reply yet'}</p>
                        </div>
                    </div>
                            <div className="flex justify-end mt-8 md:mt-8 lg:mt-10">
                                <button
                                    onClick={closeViewModal}
                                    className="px-6 py-3 md:px-6 md:py-3 lg:px-8 lg:py-4 bg-gray-500 rounded hover:bg-gray-600 text-base md:text-base lg:text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_12px_rgba(107,114,128,0.5)] active:scale-95"
                                >
                                    Close
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="text-center text-white/60">
                            <p>No message data available</p>
                            <button
                                onClick={closeViewModal}
                                className="mt-4 px-6 py-3 bg-gray-500 rounded hover:bg-gray-600 text-base transition-all duration-300"
                            >
                                Close
                            </button>
                        </div>
                    )}
                </div>
            </Modal>

            <Modal isOpen={deleteModal.open} onClose={closeDeleteModal}>
                <div className="bg-[#16213e] p-4 sm:p-6 md:p-8 rounded-lg w-full max-w-sm sm:max-w-md md:max-w-lg shadow-lg transform transition-transform duration-300 scale-95 animate-scale-in">
                    <h4 className="text-lg md:text-xl font-bold text-red-500 mb-4 md:mb-6">Confirm Delete</h4>
                    <p className="mb-6 md:mb-8 text-sm md:text-base text-white/90">Are you sure you want to delete this message?</p>
                    <div className="flex flex-col sm:flex-row justify-end gap-2 md:gap-3">
                        <button
                            onClick={closeDeleteModal}
                            className="px-4 py-2 md:px-6 md:py-3 bg-gray-500 rounded hover:bg-gray-600 text-sm md:text-base transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_12px_rgba(107,114,128,0.5)] active:scale-95"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDeleteConfirm}
                            className="px-4 py-2 md:px-6 md:py-3 bg-red-500 rounded hover:bg-red-600 text-sm md:text-base transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_15px_rgba(239,68,68,0.6)] active:scale-95"
                            disabled={actionLoading.delete}
                        >
                            {actionLoading.delete ? 'Deleting...' : 'Delete'}
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Delete All Confirmation Modal */}
            <Modal isOpen={deleteAllModal.open} onClose={closeDeleteAllModal}>
                <div className="bg-[#16213e] p-4 sm:p-6 md:p-8 rounded-lg w-full max-w-sm sm:max-w-md md:max-w-lg shadow-lg transform transition-transform duration-300 scale-95 animate-scale-in">
                    <h4 className="text-lg md:text-xl font-bold text-red-500 mb-4 md:mb-6">Confirm Delete All</h4>
                    <p className="mb-6 md:mb-8 text-sm md:text-base text-white/90">
                        Are you sure you want to delete {selectedMessages.size} selected message(s)? This action cannot be undone.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-end gap-2 md:gap-3">
                        <button
                            onClick={closeDeleteAllModal}
                            className="px-4 py-2 md:px-6 md:py-3 bg-gray-500 rounded hover:bg-gray-600 text-sm md:text-base transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_12px_rgba(107,114,128,0.5)] active:scale-95"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDeleteAllConfirm}
                            className="px-4 py-2 md:px-6 md:py-3 bg-red-500 rounded hover:bg-red-600 text-sm md:text-base transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_15px_rgba(239,68,68,0.6)] active:scale-95"
                            disabled={actionLoading.deleteAll}
                        >
                            {actionLoading.deleteAll ? 'Deleting...' : `Delete ${selectedMessages.size} Message(s)`}
                        </button>
                    </div>
                </div>
            </Modal>
        </section>
    );
};

export default GetInTouchSection;