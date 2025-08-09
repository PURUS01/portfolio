import React, { useState } from "react";

export default function ProfileImageUpload() {
    const [file, setFile] = useState(null);
    const [error, setError] = useState("");
    const [preview, setPreview] = useState(null);

    const handleFileChange = (e) => {
        setError("");
        const selected = e.target.files[0];
        if (selected && selected.size > 10 * 1024 * 1024) {
            setError("The image is too large. Max size is 10MB.");
            setFile(null);
            setPreview(null);
        } else if (selected) {
            setFile(selected);
            setPreview(URL.createObjectURL(selected));
        } else {
            setFile(null);
            setPreview(null);
        }
    };

    const handleSave = () => {
        if (!file) return;
        // Simulate upload delay/error
        setTimeout(() => {
            setError("The image upload took too long. Try to use a smaller image or contact us about the issue.");
        }, 1500);
    };

    return (
        <div className="w-full max-w-3xl flex flex-col gap-4 items-start mb-8">
            <label className="text-[#00BFFF] font-semibold mb-1">Profile Image</label>
            <div className="w-full flex flex-col items-center">
                <div className="border-2 border-dashed border-[#00BFFF] rounded-xl w-full flex flex-col items-center justify-center py-6 bg-white/5 mb-2 cursor-pointer" onClick={() => document.getElementById('profile-image-input').click()}>
                    {preview ? (
                        <img src={preview} alt="Profile Preview" className="w-32 h-32 rounded-full object-cover mb-2 border-4 border-white/20" />
                    ) : (
                        <div className="w-32 h-32 rounded-full bg-[#0a192f]/40 flex items-center justify-center mb-2">
                            <svg width="48" height="48" fill="#00BFFF" viewBox="0 0 24 24"><path d="M12 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm0 8c-3.31 0-6 2.69-6 6v1h12v-1c0-3.31-2.69-6-6-6z" /></svg>
                        </div>
                    )}
                    <span className="text-white/60 text-sm">Drop your new profile image here (max 10MB)</span>
                </div>
                {file && (
                    <div className="text-white/80 text-sm mt-2">{file.name}</div>
                )}
                {error && (
                    <div className="bg-red-900/80 border border-red-400 text-red-200 px-4 py-2 rounded mb-2 w-full text-center mt-2">
                        {error}
                    </div>
                )}
                <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="profile-image-input"
                    onChange={handleFileChange}
                />
                <div className="flex gap-4 mt-2 w-full">
                    <button
                        type="button"
                        className="flex-1 px-4 py-2 rounded-lg bg-white/10 text-white font-semibold border border-[#00BFFF]/30 hover:bg-[#0077C8]/30 transition"
                        onClick={() => { setFile(null); setError(""); setPreview(null); }}
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-br from-[#0077C8]/60 via-[#00BFFF]/40 to-[#00FFB2]/30 text-white font-semibold shadow-lg border border-[#00BFFF]/30 backdrop-blur-md transition-all duration-500 hover:scale-105 hover:shadow-blue-400/50 hover:bg-gradient-to-br hover:from-[#00BFFF]/80 hover:via-[#0077C8]/60 hover:to-[#00FFB2]/50 text-sm"
                        onClick={handleSave}
                        disabled={!file}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}
