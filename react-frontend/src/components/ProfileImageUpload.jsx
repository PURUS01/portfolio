import React, { useState, useEffect } from "react";
import { firestore } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { toast } from "react-hot-toast";

export default function ProfileImageUpload() {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchProfileImage = async () => {
            const docRef = doc(firestore, "portfolion", "about");
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setPreview(docSnap.data().profileImage || null);
            }
        };
        fetchProfileImage();
    }, []);

    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        if (selected && selected.size > 10 * 1024 * 1024) {
            toast.error("The image is too large. Max size is 10MB.");
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

    // 🔹 Upload to Cloudinary instead of Base64
    const uploadToCloudinary = async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "portfolio_images"); // create in Cloudinary settings

        const res = await fetch(
            "https://api.cloudinary.com/v1_1/dszhosak1/upload",
            { method: "POST", body: formData }
        );

        if (!res.ok) throw new Error("Cloudinary upload failed");
        return await res.json();
    };

    const updateProfileImage = async () => {
        if (!file) throw new Error("No file selected");

        // 1. Upload to Cloudinary
        const uploaded = await uploadToCloudinary(file);

        // 2. Save URL in Firestore
        await setDoc(
            doc(firestore, "portfolion", "about"),
            { profileImage: uploaded.secure_url, updatedAt: new Date() },
            { merge: true }
        );

        // 3. Update preview with Cloudinary URL
        setPreview(uploaded.secure_url);
        setFile(null);
    };

    const handleSave = () => {
        setIsLoading(true);
        toast.promise(updateProfileImage(), {
            loading: "Uploading profile image...",
            success: <b>Profile image updated successfully!</b>,
            error: <b>Failed to update profile image.</b>,
        }).finally(() => setIsLoading(false));
    };

    return (
        <div className="w-full max-w-3xl flex flex-col gap-4 items-start mb-6 md:mb-8">
            <label className="text-[#00BFFF] font-semibold mb-3 text-base md:text-lg">Profile Image</label>
            <div className="w-full flex flex-col items-center">
                <div
                    className={`border-2 border-dashed border-[#00BFFF] rounded-xl w-full flex flex-col items-center justify-center py-6 md:py-8 mb-4 cursor-pointer transition-all duration-300 hover:border-[#00BFFF]/60 hover:bg-white/10 ${isLoading ? "opacity-50 pointer-events-none" : "bg-white/5"
                        }`}
                    onClick={() => document.getElementById("profile-image-input").click()}
                >
                    {preview ? (
                        <img
                            src={preview}
                            alt="Profile Preview"
                            className="w-20 h-20 md:w-32 md:h-32 rounded-full object-cover mb-3 border-4 border-white/20"
                        />
                    ) : (
                        <div className="w-20 h-20 md:w-32 md:h-32 rounded-full bg-[#0a192f]/40 flex items-center justify-center mb-3">
                            <svg
                                width="28"
                                height="28"
                                className="md:w-12 md:h-12"
                                fill="#00BFFF"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm0 8c-3.31 0-6 2.69-6 6v1h12v-1c0-3.31-2.69-6-6-6z" />
                            </svg>
                        </div>
                    )}
                    <span className="text-white/60 text-sm text-center px-4">
                        Drop your new profile image here (max 10MB)
                    </span>
                </div>
                <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="profile-image-input"
                    onChange={handleFileChange}
                    disabled={isLoading}
                />
                <div className="flex gap-3 w-full max-w-sm">
                    <button
                        type="button"
                        className="flex-1 px-4 py-3 rounded-lg bg-white/10 text-white font-semibold border border-[#00BFFF]/30 hover:bg-[#0077C8]/30 transition-all duration-300 text-sm"
                        onClick={() => {
                            setFile(null);
                            setPreview(null);
                        }}
                        disabled={isLoading}
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        className={`flex-1 px-4 py-3 rounded-lg bg-gradient-to-br from-[#0077C8]/60 via-[#00BFFF]/40 to-[#00FFB2]/30 text-white font-semibold shadow-lg border border-[#00BFFF]/30 backdrop-blur-md transition-all duration-500 hover:scale-105 hover:shadow-blue-400/50 hover:bg-gradient-to-br hover:from-[#00BFFF]/80 hover:via-[#0077C8]/60 hover:to-[#00FFB2]/50 text-sm ${isLoading ? "opacity-50 pointer-events-none" : ""
                            }`}
                        onClick={handleSave}
                        disabled={!file || isLoading}
                    >
                        {isLoading ? "Uploading..." : "Save"}
                    </button>
                </div>
            </div>
        </div>
    );
}
