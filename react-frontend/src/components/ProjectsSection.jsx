import React, { useState } from "react";
import CreatableSelect from 'react-select/creatable';

export default function ProjectsSection() {
    const [form, setForm] = useState({
        name: "",
        description: "",
        tags: [],
        github: "",
        logo: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleTagsChange = (selected) => {
        setForm((prev) => ({
            ...prev,
            tags: selected ? selected.map(option => option.value) : []
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // handle project update logic here
    };

    return (
        <>
            <h3 className="text-2xl font-bold mb-8 text-[#00BFFF] drop-shadow-lg">Projects</h3>
            <form className="w-full max-w-3xl flex flex-col gap-10 items-center" onSubmit={handleSubmit}>
                <div className="w-full flex flex-col md:flex-row gap-6">
                    <div className="flex-1 flex flex-col gap-2">
                        <label className="text-[#00BFFF] font-semibold mb-1">Project Name</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Project Name"
                            className="w-full px-4 py-2 rounded-xl bg-white/10 text-white placeholder-white/60 border-2 border-transparent focus:border-[#00BFFF] focus:text-[#00BFFF] focus:shadow-[0_0_12px_2px_#00BFFF99] focus:bg-[#0a192f]/60 focus:backdrop-blur-md transition-all duration-300 hover:border-[#00BFFF] hover:text-[#00BFFF] hover:shadow-[0_0_8px_2px_#00BFFF66]"
                            required
                        />
                    </div>
                    <div className="flex-1 flex flex-col gap-2">
                        <label className="text-[#00BFFF] font-semibold mb-1">Tags</label>
                        <CreatableSelect
                            isMulti
                            name="tags"
                            value={form.tags.map(tag => ({ label: tag, value: tag }))}
                            onChange={handleTagsChange}
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
                                    fontSize: '1rem',
                                    paddingLeft: '0.5rem',
                                    paddingRight: '0.5rem',
                                    transition: 'box-shadow 0.3s, border 0.3s',
                                }),
                                valueContainer: (base) => ({
                                    ...base,
                                    padding: '0 8px',
                                }),
                                input: (base) => ({
                                    ...base,
                                    color: '#fff',
                                }),
                                placeholder: (base) => ({
                                    ...base,
                                    color: '#b0b8c1',
                                    fontSize: '1rem',
                                }),
                                multiValue: (base) => ({
                                    ...base,
                                    backgroundColor: '#1b263b',
                                    color: '#fff',
                                    borderRadius: '0.5rem',
                                }),
                                multiValueLabel: (base) => ({
                                    ...base,
                                    color: '#fff',
                                    fontWeight: 500,
                                }),
                                multiValueRemove: (base) => ({
                                    ...base,
                                    color: '#00BFFF',
                                    ':hover': {
                                        backgroundColor: '#00BFFF22',
                                        color: '#00BFFF',
                                    },
                                }),
                                dropdownIndicator: (base, state) => ({
                                    ...base,
                                    color: state.isFocused ? '#00BFFF' : '#b0b8c1',
                                    transition: 'color 0.3s',
                                }),
                                indicatorSeparator: (base) => ({
                                    ...base,
                                    backgroundColor: 'transparent',
                                }),
                                menu: (base) => ({
                                    ...base,
                                    backgroundColor: 'rgba(255,255,255,0.06)',
                                    color: '#fff',
                                    borderRadius: '0.75rem',
                                    boxShadow: '0 4px 24px 0 #000a',
                                }),
                                option: (base, state) => ({
                                    ...base,
                                    backgroundColor: state.isSelected ? '#00BFFF33' : state.isFocused ? '#1b263b' : 'transparent',
                                    color: '#fff',
                                    fontWeight: state.isSelected ? 600 : 400,
                                }),
                            }}
                        />
                    </div>
                </div>
                <div className="w-full flex flex-col gap-2">
                    <label className="text-[#00BFFF] font-semibold mb-1">Project Description</label>
                    <textarea name="description" value={form.description} onChange={handleChange} placeholder="Project Description" rows={4} className="w-full px-4 py-2 rounded-xl bg-white/10 text-white placeholder-white/60 border-2 border-transparent focus:border-[#00BFFF] focus:text-[#00BFFF] focus:shadow-[0_0_12px_2px_#00BFFF99] focus:bg-[#0a192f]/60 focus:backdrop-blur-md transition-all duration-300 hover:border-[#00BFFF] hover:text-[#00BFFF] hover:shadow-[0_0_8px_2px_#00BFFF66] resize-none" required />
                </div>
                <div className="w-full flex flex-col md:flex-row gap-6">
                    <div className="flex-1 flex flex-col gap-2">
                        <label className="text-[#00BFFF] font-semibold mb-1">GitHub URL</label>
                        <input type="url" name="github" value={form.github} onChange={handleChange} placeholder="GitHub URL" className="w-full px-4 py-2 rounded-xl bg-white/10 text-white placeholder-white/60 border-2 border-transparent focus:border-[#00BFFF] focus:text-[#00BFFF] focus:shadow-[0_0_12px_2px_#00BFFF99] focus:bg-[#0a192f]/60 focus:backdrop-blur-md transition-all duration-300 hover:border-[#00BFFF] hover:text-[#00BFFF] hover:shadow-[0_0_8px_2px_#00BFFF66]" required />
                    </div>
                    <div className="flex-1 flex flex-col gap-2">
                        <label className="text-[#00BFFF] font-semibold mb-1">Logo filename (optional)</label>
                        <div className="w-full">
                            <input
                                type="file"
                                name="logo"
                                onChange={e => setForm(prev => ({ ...prev, logo: e.target.files[0] }))}
                                className="w-full px-4 py-2 rounded-xl bg-[#232b3e] text-white border-2 border-transparent focus:border-[#00BFFF] focus:shadow-[0_0_12px_2px_#00BFFF99] transition-all duration-300 hover:border-[#00BFFF] hover:shadow-[0_0_8px_2px_#00BFFF66] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#0077C8] file:text-white file:transition-all file:duration-300 file:hover:bg-[#00BFFF]"
                            />
                        </div>
                    </div>
                </div>
                <button type="submit" className="mt-8 px-4 py-2 rounded-lg bg-gradient-to-br from-[#0077C8]/60 via-[#00BFFF]/40 to-[#00FFB2]/30 text-white font-semibold shadow-lg border border-[#00BFFF]/30 backdrop-blur-md transition-all duration-500 hover:scale-105 hover:shadow-blue-400/50 hover:bg-gradient-to-br hover:from-[#00BFFF]/80 hover:via-[#0077C8]/60 hover:to-[#00FFB2]/50 sticky bottom-0 z-50 w-48 text-sm">Update Project</button>
            </form>
        </>
    );
}
