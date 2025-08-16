import React, { useState, useEffect } from "react";
import CreatableSelect from 'react-select/creatable';
import { firestore } from "../firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-hot-toast";

export default function ProjectsSection() {
    const [isLoading, setIsLoading] = useState(false);
    const [isDataLoading, setIsDataLoading] = useState(true);
    
    const [projects, setProjects] = useState([{
        projectName: "",
        projectDescription: "",
        tags: [],
        githubUrl: "",
        logoFilename: ""
    }]);

    // Fetch existing data on component mount
    useEffect(() => {
        const fetchExistingData = async () => {
            try {
                setIsDataLoading(true);
                const docRef = doc(firestore, "portfolion", "projects");
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    
                    // Set projects data if it exists
                    if (data.projects && Array.isArray(data.projects) && data.projects.length > 0) {
                        setProjects(data.projects);
                    }
                } else {
                    console.log("No existing projects data found");
                }
            } catch (error) {
                console.error("Error fetching projects data:", error);
                toast.error("Failed to load existing projects");
            } finally {
                setIsDataLoading(false);
            }
        };

        fetchExistingData();
    }, []);

    const handleChange = (index, e) => {
        const { name, value } = e.target;
        setProjects(prev => {
            const updated = [...prev];
            updated[index][name] = value;
            return updated;
        });
    };

    const handleTagsChange = (index, selected) => {
        setProjects(prev => {
            const updated = [...prev];
            updated[index].tags = selected ? selected.map(option => option.value) : [];
            return updated;
        });
    };

    const handleFileChange = (index, e) => {
        const file = e.target.files[0];
        setProjects(prev => {
            const updated = [...prev];
            updated[index].logoFilename = file;
            return updated;
        });
    };

    const addProject = () => {
        setProjects(prev => [...prev, { projectName: "", projectDescription: "", tags: [], githubUrl: "", logoFilename: "" }]);
    };

    const removeProject = (index) => {
        setProjects(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        // Your async function that returns a promise for updating
        const updateProjects = () => {
            // Process projects and handle file uploads
            const processedProjects = projects.map((project) => {
                const processedProject = { ...project };
                
                // If logoFilename is a File object, just store the filename
                if (project.logoFilename && typeof project.logoFilename === 'object') {
                    processedProject.logoFilename = project.logoFilename.name;
                }
                
                return processedProject;
            });

            const data = {
                projects: processedProjects,
                updatedAt: new Date(),
            };

            // Return the promise from Firestore updateDoc
            const docRef = doc(firestore, "portfolion", "projects");
            return updateDoc(docRef, data);
        };

        toast.promise(
            updateProjects(),
            {
                loading: 'Updating projects...',
                success: <b>Projects updated successfully!</b>,
                error: <b>Failed to update projects.</b>,
            }
        ).finally(() => {
            setIsLoading(false);
        });
    };

    // Show loading spinner while fetching data
    if (isDataLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <ClipLoader color="#00BFFF" loading={true} size={50} />
                <span className="ml-4 text-[#00BFFF]">Loading your projects...</span>
            </div>
        );
    }

    return (
        <>
            <h3 className="text-2xl font-bold mb-8 text-[#00BFFF] drop-shadow-lg">Projects</h3>
            <form className="w-full max-w-3xl flex flex-col gap-10 items-center" onSubmit={handleSubmit}>
                {projects.map((form, index) => (
                    <div key={index} className={`w-full flex flex-col gap-10 items-center relative p-6 rounded-2xl shadow-lg transition-all
                        ${index === 0 ? "" : "bg-[#0a1a2f]/40 border border-[#00BFFF]/40"}`}
                    >
                        {/* Project Header */}
                        {index > 0 && (
                            <h4 className="absolute -top-4 left-4 bg-[#00BFFF] text-white px-3 py-1 rounded-full text-sm shadow-md">
                                Project {index + 1}
                            </h4>
                        )}

                        {/* Optional remove button */}
                        {projects.length > 1 && (
                            <button
                                type="button"
                                onClick={() => removeProject(index)}
                                className="absolute top-3 right-3 px-3 py-1 bg-red-500/70 hover:bg-red-600 text-white text-xs rounded-lg transition"
                            >
                                ✕ Remove
                            </button>
                        )}

                        {/* Project Name + Tags */}
                        <div className="w-full flex flex-col md:flex-row gap-6">
                            <div className="flex-1 flex flex-col gap-2">
                                <label className="text-[#00BFFF] font-semibold mb-1">Project Name</label>
                                <input
                                    type="text"
                                    name="projectName"
                                    value={form.projectName}
                                    onChange={(e) => handleChange(index, e)}
                                    placeholder="Project Name"
                                    className="w-full px-4 py-2 rounded-xl bg-white/10 text-white placeholder-white/60 border-2 border-transparent focus:border-[#00BFFF] focus:text-[#00BFFF] focus:shadow-[0_0_12px_2px_#00BFFF99] focus:bg-[#0a192f]/60 transition-all duration-300 hover:border-[#00BFFF] hover:text-[#00BFFF]"
                                    required
                                />
                            </div>
                            <div className="flex-1 flex flex-col gap-2">
                                <label className="text-[#00BFFF] font-semibold mb-1">Tags</label>
                                <CreatableSelect
                                    isMulti
                                    name="tags"
                                    value={form.tags.map(tag => ({ label: tag, value: tag }))}
                                    onChange={(selected) => handleTagsChange(index, selected)}
                                    classNamePrefix="react-select"
                                    placeholder="Select or type to add tags..."
                                    styles={{
                                        control: (base, state) => ({
                                            ...base,
                                            backgroundColor: 'rgba(255,255,255,0.06)',
                                            borderRadius: '0.75rem',
                                            border: state.isFocused ? '2px solid #00BFFF' : '2px solid transparent',
                                            boxShadow: state.isFocused ? '0 0 12px 2px #00BFFF99' : 'none',
                                            minHeight: '48px',
                                            color: '#fff',
                                        }),
                                        multiValue: (base) => ({
                                            ...base,
                                            backgroundColor: '#1b263b',
                                            borderRadius: '0.5rem',
                                        }),
                                        multiValueLabel: (base) => ({ ...base, color: '#fff' }),
                                        multiValueRemove: (base) => ({
                                            ...base,
                                            color: '#00BFFF',
                                            ':hover': { backgroundColor: '#00BFFF22', color: '#00BFFF' },
                                        }),
                                        input: (base) => ({ ...base, color: '#fff' }),
                                        placeholder: (base) => ({ ...base, color: '#b0b8c1' }),
                                        menu: (base) => ({ ...base, backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: '0.75rem' }),
                                    }}
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div className="w-full flex flex-col gap-2">
                            <label className="text-[#00BFFF] font-semibold mb-1">Project Description</label>
                            <textarea
                                name="projectDescription"
                                value={form.projectDescription}
                                onChange={(e) => handleChange(index, e)}
                                placeholder="Project Description"
                                rows={10}
                                className="w-full px-4 py-2 rounded-xl bg-white/10 text-white placeholder-white/60 border-2 border-transparent focus:border-[#00BFFF] focus:text-[#00BFFF] focus:shadow-[0_0_12px_2px_#00BFFF99] focus:bg-[#0a192f]/60 focus:backdrop-blur-md transition-all duration-300 hover:border-[#00BFFF] hover:text-[#00BFFF] hover:shadow-[0_0_8px_2px_#00BFFF66] resize-none"
                                required
                            />
                        </div>

                        {/* GitHub + Logo */}
                        <div className="w-full flex flex-col md:flex-row gap-6">
                            <div className="flex-1 flex flex-col gap-2">
                                <label className="text-[#00BFFF] font-semibold mb-1">GitHub URL</label>
                                <input
                                    type="url"
                                    name="githubUrl"
                                    value={form.githubUrl}
                                    onChange={(e) => handleChange(index, e)}
                                    placeholder="GitHub URL"
                                    className="w-full px-4 py-2 rounded-xl bg-white/10 text-white placeholder-white/60 border-2 border-transparent focus:border-[#00BFFF] focus:text-[#00BFFF] focus:shadow-[0_0_12px_2px_#00BFFF99] focus:bg-[#0a192f]/60"
                                    required
                                />
                            </div>
                            <div className="flex-1 flex flex-col gap-2">
                                <label className="text-[#00BFFF] font-semibold mb-1">Logo (optional)</label>
                                <input
                                    type="file"
                                    name="logoFilename"
                                    onChange={(e) => handleFileChange(index, e)}
                                    accept="image/*"
                                    className="w-full px-4 py-2 rounded-xl bg-[#232b3e] text-white border-2 border-transparent focus:border-[#00BFFF] focus:shadow-[0_0_12px_2px_#00BFFF99] transition-all duration-300 hover:border-[#00BFFF] hover:shadow-[0_0_8px_2px_#00BFFF66] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#0077C8] file:text-white file:transition-all file:duration-300 file:hover:bg-[#00BFFF]"
                                />
                                {form.logoFilename && typeof form.logoFilename === 'string' && (
                                    <span className="text-xs text-[#00BFFF] mt-1">
                                        Current: {form.logoFilename}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}

                <button type="button" onClick={addProject} className="mt-6 px-4 py-2 rounded-lg bg-[#00BFFF]/20 border border-[#00BFFF]/40 text-[#00BFFF] font-semibold transition hover:bg-[#00BFFF]/40 hover:text-white">
                    ➕ Add Another Project
                </button>

                <button 
                    type="submit" 
                    disabled={isLoading}
                    className="mt-8 px-4 py-2 rounded-lg bg-gradient-to-br from-[#0077C8]/60 via-[#00BFFF]/40 to-[#00FFB2]/30 text-white font-semibold shadow-lg border border-[#00BFFF]/30 backdrop-blur-md transition-all duration-500 hover:scale-105 hover:shadow-blue-400/50 hover:bg-gradient-to-br hover:from-[#00BFFF]/80 hover:via-[#0077C8]/60 hover:to-[#00FFB2]/50 sticky bottom-0 z-50 w-48 text-sm"
                >
                    {isLoading ? "Updating..." : "Update Projects"}
                </button>
            </form>
        </>
    );
}