import React from "react";
import CreatableSelect from 'react-select/creatable';

export default function AboutSection() {
    return (
        <>
            <h3 className="text-2xl font-bold mb-8 text-[#00BFFF] drop-shadow-lg">About</h3>
            <form className="w-full max-w-3xl flex flex-col gap-10 items-center">
                {/* Personal Info */}
                <div className="w-full flex flex-col md:flex-row gap-6">
                    <div className="flex-1 flex flex-col gap-2">
                        <label className="text-[#00BFFF] font-semibold mb-1">First Name</label>
                        <input type="text" placeholder="Enter your first name" className="w-full px-4 py-2 rounded-xl bg-white/10 text-white placeholder-white/60 border-2 border-transparent focus:border-[#00BFFF] focus:text-[#00BFFF] focus:shadow-[0_0_12px_2px_#00BFFF99] focus:bg-[#0a192f]/60 focus:backdrop-blur-md transition-all duration-300 hover:border-[#00BFFF] hover:text-[#00BFFF] hover:shadow-[0_0_8px_2px_#00BFFF66]" />
                    </div>
                    <div className="flex-1 flex flex-col gap-2">
                        <label className="text-[#00BFFF] font-semibold mb-1">Last Name</label>
                        <input type="text" placeholder="Enter your last name" className="w-full px-4 py-2 rounded-xl bg-white/10 text-white placeholder-white/60 border-2 border-transparent focus:border-[#00BFFF] focus:text-[#00BFFF] focus:shadow-[0_0_12px_2px_#00BFFF99] focus:bg-[#0a192f]/60 focus:backdrop-blur-md transition-all duration-300 hover:border-[#00BFFF] hover:text-[#00BFFF] hover:shadow-[0_0_8px_2px_#00BFFF66]" />
                    </div>
                </div>
                <div className="w-full flex flex-col md:flex-row gap-6">
                    <div className="flex-1 flex flex-col gap-2">
                        <label className="text-[#00BFFF] font-semibold mb-1">Title</label>
                        <input type="text" placeholder="Your professional title" className="w-full px-4 py-2 rounded-xl bg-white/10 text-white placeholder-white/60 border-2 border-transparent focus:border-[#00BFFF] focus:text-[#00BFFF] focus:shadow-[0_0_12px_2px_#00BFFF99] focus:bg-[#0a192f]/60 focus:backdrop-blur-md transition-all duration-300 hover:border-[#00BFFF] hover:text-[#00BFFF] hover:shadow-[0_0_8px_2px_#00BFFF66]" />
                    </div>
                    <div className="flex-1 flex flex-col gap-2">
                        <label className="text-[#00BFFF] font-semibold mb-1">City</label>
                        <input type="text" placeholder="City" className="w-full px-4 py-2 rounded-xl bg-white/10 text-white placeholder-white/60 border-2 border-transparent focus:border-[#00BFFF] focus:text-[#00BFFF] focus:shadow-[0_0_12px_2px_#00BFFF99] focus:bg-[#0a192f]/60 focus:backdrop-blur-md transition-all duration-300 hover:border-[#00BFFF] hover:text-[#00BFFF] hover:shadow-[0_0_8px_2px_#00BFFF66]" />
                    </div>
                    <div className="flex-1 flex flex-col gap-2">
                        <label className="text-[#00BFFF] font-semibold mb-1">Country</label>
                        <input type="text" placeholder="Country" className="w-full px-4 py-2 rounded-xl bg-white/10 text-white placeholder-white/60 border-2 border-transparent focus:border-[#00BFFF] focus:text-[#00BFFF] focus:shadow-[0_0_12px_2px_#00BFFF99] focus:bg-[#0a192f]/60 focus:backdrop-blur-md transition-all duration-300 hover:border-[#00BFFF] hover:text-[#00BFFF] hover:shadow-[0_0_8px_2px_#00BFFF66]" />
                    </div>
                </div>
                <div className="w-full flex flex-col gap-2">
                    <label className="text-[#00BFFF] font-semibold mb-1">Email</label>
                    <input type="email" placeholder="Your email address" className="w-full px-4 py-2 rounded-xl bg-white/10 text-white placeholder-white/60 border-2 border-transparent focus:border-[#00BFFF] focus:text-[#00BFFF] focus:shadow-[0_0_12px_2px_#00BFFF99] focus:bg-[#0a192f]/60 focus:backdrop-blur-md transition-all duration-300 hover:border-[#00BFFF] hover:text-[#00BFFF] hover:shadow-[0_0_8px_2px_#00BFFF66]" />
                </div>
                <div className="w-full flex flex-col gap-2">
                    <label className="text-[#00BFFF] font-semibold mb-1">Profile Image</label>
                    <div className="relative w-full">
                        <input
                            type="file"
                            accept="image/*"
                            className="w-full px-4 py-2 rounded-xl bg-white/10 text-white file:text-white file:bg-[#0077C8]/60 file:border-none file:rounded-lg file:px-4 file:py-2 border-2 border-transparent focus:border-[#00BFFF] focus:text-[#00BFFF] focus:shadow-[0_0_12px_2px_#00BFFF99] focus:bg-[#0a192f]/60 focus:backdrop-blur-md transition-all duration-300 hover:border-[#00BFFF] hover:text-[#00BFFF] hover:shadow-[0_0_8px_2px_#00BFFF66] file:cursor-pointer file:font-semibold"
                        />
                    </div>
                </div>
                {/* About Me */}
                <div className="w-full flex flex-col gap-2">
                    <label className="text-[#00BFFF] font-semibold mb-1">About Me</label>
                    <textarea placeholder="Write about yourself..." rows={4} className="w-full px-4 py-2 rounded-xl bg-white/10 text-white placeholder-white/60 border-2 border-transparent focus:border-[#00BFFF] focus:text-[#00BFFF] focus:shadow-[0_0_12px_2px_#00BFFF99] focus:bg-[#0a192f]/60 focus:backdrop-blur-md transition-all duration-300 hover:border-[#00BFFF] hover:text-[#00BFFF] hover:shadow-[0_0_8px_2px_#00BFFF66] resize-none" />
                </div>
                {/* Education */}
                <div className="w-full flex flex-col md:flex-row gap-6">
                    <div className="flex-1 flex flex-col gap-2">
                        <label className="text-[#00BFFF] font-semibold mb-1">Degree</label>
                        <input type="text" placeholder="Bachelor's Degree in Computer Science" className="w-full px-4 py-2 rounded-xl bg-white/10 text-white placeholder-white/60 border-2 border-transparent focus:border-[#00BFFF] focus:text-[#00BFFF] focus:shadow-[0_0_12px_2px_#00BFFF99] focus:bg-[#0a192f]/60 focus:backdrop-blur-md transition-all duration-300 hover:border-[#00BFFF] hover:text-[#00BFFF] hover:shadow-[0_0_8px_2px_#00BFFF66]" />
                    </div>
                    <div className="flex-1 flex flex-col gap-2">
                        <label className="text-[#00BFFF] font-semibold mb-1">University</label>
                        <input type="text" placeholder="University Name" className="w-full px-4 py-2 rounded-xl bg-white/10 text-white placeholder-white/60 border-2 border-transparent focus:border-[#00BFFF] focus:text-[#00BFFF] focus:shadow-[0_0_12px_2px_#00BFFF99] focus:bg-[#0a192f]/60 focus:backdrop-blur-md transition-all duration-300 hover:border-[#00BFFF] hover:text-[#00BFFF] hover:shadow-[0_0_8px_2px_#00BFFF66]" />
                    </div>
                    <div className="flex-1 flex flex-col gap-2">
                        <label className="text-[#00BFFF] font-semibold mb-1">Year</label>
                        <input type="text" placeholder="2016 - 2020" className="w-full px-4 py-2 rounded-xl bg-white/10 text-white placeholder-white/60 border-2 border-transparent focus:border-[#00BFFF] focus:text-[#00BFFF] focus:shadow-[0_0_12px_2px_#00BFFF99] focus:bg-[#0a192f]/60 focus:backdrop-blur-md transition-all duration-300 hover:border-[#00BFFF] hover:text-[#00BFFF] hover:shadow-[0_0_8px_2px_#00BFFF66]" />
                    </div>
                </div>
                {/* Technical Skills */}
                <div className="w-full flex flex-col gap-2">
                    <label className="text-[#00BFFF] font-semibold mb-1">Technical Skills</label>
                    <div className="group">
                        <CreatableSelect
                            isMulti
                            classNamePrefix="react-select"
                            placeholder="Select or type to add skills..."
                            options={[
                                { value: 'JavaScript', label: 'JavaScript' },
                                { value: 'React', label: 'React' },
                                { value: 'Laravel', label: 'Laravel' },
                                { value: 'Tailwind', label: 'Tailwind' },
                                { value: 'HTML5', label: 'HTML5' },
                                { value: 'CSS3', label: 'CSS3' },
                                { value: 'REST APIs', label: 'REST APIs' },
                                { value: 'MySQL', label: 'MySQL' },
                                { value: 'Git', label: 'Git' },
                                { value: 'Node.js', label: 'Node.js' },
                            ]}
                            styles={{
                                control: (base, state) => ({
                                    ...base,
                                    backgroundColor: 'rgba(255,255,255,0.08)',
                                    borderColor: state.isFocused ? '#00BFFF' : 'transparent',
                                    borderWidth: state.isFocused ? '2px' : '2px',
                                    color: 'white',
                                    boxShadow: state.isFocused ? '0 0 16px 2px #00BFFF' : 'none',
                                    borderRadius: '0.75rem',
                                    minHeight: '48px',
                                    transition: 'box-shadow 0.3s, border-color 0.3s',
                                }),
                                multiValue: (base) => ({
                                    ...base,
                                    backgroundColor: '#00BFFF22',
                                    color: '#00BFFF',
                                }),
                                multiValueLabel: (base) => ({
                                    ...base,
                                    color: '#00BFFF',
                                }),
                                option: (base, state) => ({
                                    ...base,
                                    backgroundColor: state.isSelected ? '#00BFFF55' : 'rgba(10,25,47,0.8)',
                                    color: 'white',
                                }),
                                menu: (base) => ({
                                    ...base,
                                    backgroundColor: 'rgba(10,25,47,0.95)',
                                }),
                                input: (base) => ({
                                    ...base,
                                    color: 'white',
                                }),
                                singleValue: (base) => ({
                                    ...base,
                                    color: 'white',
                                }),
                            }}
                            isHovered={false}
                            onMenuOpen={() => {
                                document.querySelector('.group').classList.add('hovered');
                            }}
                            onMenuClose={() => {
                                document.querySelector('.group').classList.remove('hovered');
                            }}
                        />
                    </div>
                </div>
                {/* Professional Experience */}
                <div className="w-full flex flex-col gap-6">
                    <label className="text-[#00BFFF] font-semibold mb-1">Professional Experience</label>
                    {/* Experience 1 */}
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1 flex flex-col gap-2">
                            <input type="text" placeholder="2022 - Present" className="w-full px-4 py-2 rounded-xl bg-white/10 text-white placeholder-white/60 border-2 border-transparent focus:border-[#00BFFF] focus:text-[#00BFFF] focus:shadow-[0_0_12px_2px_#00BFFF99] focus:bg-[#0a192f]/60 focus:backdrop-blur-md transition-all duration-300 hover:border-[#00BFFF] hover:text-[#00BFFF] hover:shadow-[0_0_8px_2px_#00BFFF66]" />
                        </div>
                        <div className="flex-1 flex flex-col gap-2">
                            <input type="text" placeholder="Frontend Developer" className="w-full px-4 py-2 rounded-xl bg-white/10 text-white placeholder-white/60 border-2 border-transparent focus:border-[#00BFFF] focus:text-[#00BFFF] focus:shadow-[0_0_12px_2px_#00BFFF99] focus:bg-[#0a192f]/60 focus:backdrop-blur-md transition-all duration-300 hover:border-[#00BFFF] hover:text-[#00BFFF] hover:shadow-[0_0_8px_2px_#00BFFF66]" />
                        </div>
                        <div className="flex-1 flex flex-col gap-2">
                            <input type="text" placeholder="Bohar Solutions" className="w-full px-4 py-2 rounded-xl bg-white/10 text-white placeholder-white/60 border-2 border-transparent focus:border-[#00BFFF] focus:text-[#00BFFF] focus:shadow-[0_0_12px_2px_#00BFFF99] focus:bg-[#0a192f]/60 focus:backdrop-blur-md transition-all duration-300 hover:border-[#00BFFF] hover:text-[#00BFFF] hover:shadow-[0_0_8px_2px_#00BFFF66]" />
                        </div>
                    </div>
                    <textarea placeholder="Describe your responsibilities..." rows={2} className="w-full px-4 py-2 rounded-xl bg-white/10 text-white placeholder-white/60 border-2 border-transparent focus:border-[#00BFFF] focus:text-[#00BFFF] focus:shadow-[0_0_12px_2px_#00BFFF99] focus:bg-[#0a192f]/60 focus:backdrop-blur-md transition-all duration-300 hover:border-[#00BFFF] hover:text-[#00BFFF] hover:shadow-[0_0_8px_2px_#00BFFF66] resize-none" />
                    {/* Experience 2 */}
                    <div className="flex flex-col md:flex-row gap-6 mt-4">
                        <div className="flex-1 flex flex-col gap-2">
                            <input type="text" placeholder="2020 - 2022" className="w-full px-4 py-2 rounded-xl bg-white/10 text-white placeholder-white/60 border-2 border-transparent focus:border-[#00BFFF] focus:text-[#00BFFF] focus:shadow-[0_0_12px_2px_#00BFFF99] focus:bg-[#0a192f]/60 focus:backdrop-blur-md transition-all duration-300 hover:border-[#00BFFF] hover:text-[#00BFFF] hover:shadow-[0_0_8px_2px_#00BFFF66]" />
                        </div>
                        <div className="flex-1 flex flex-col gap-2">
                            <input type="text" placeholder="Backend Developer" className="w-full px-4 py-2 rounded-xl bg-white/10 text-white placeholder-white/60 border-2 border-transparent focus:border-[#00BFFF] focus:text-[#00BFFF] focus:shadow-[0_0_12px_2px_#00BFFF99] focus:bg-[#0a192f]/60 focus:backdrop-blur-md transition-all duration-300 hover:border-[#00BFFF] hover:text-[#00BFFF] hover:shadow-[0_0_8px_2px_#00BFFF66]" />
                        </div>
                        <div className="flex-1 flex flex-col gap-2">
                            <input type="text" placeholder="Company B" className="w-full px-4 py-2 rounded-xl bg-white/10 text-white placeholder-white/60 border-2 border-transparent focus:border-[#00BFFF] focus:text-[#00BFFF] focus:shadow-[0_0_12px_2px_#00BFFF99] focus:bg-[#0a192f]/60 focus:backdrop-blur-md transition-all duration-300 hover:border-[#00BFFF] hover:text-[#00BFFF] hover:shadow-[0_0_8px_2px_#00BFFF66]" />
                        </div>
                    </div>
                    <textarea placeholder="Describe your responsibilities..." rows={2} className="w-full px-4 py-2 rounded-xl bg-white/10 text-white placeholder-white/60 border-2 border-transparent focus:border-[#00BFFF] focus:text-[#00BFFF] focus:shadow-[0_0_12px_2px_#00BFFF99] focus:bg-[#0a192f]/60 focus:backdrop-blur-md transition-all duration-300 hover:border-[#00BFFF] hover:text-[#00BFFF] hover:shadow-[0_0_8px_2px_#00BFFF66] resize-none" />
                </div>
                <button type="submit" className="mt-8 px-4 py-2 rounded-lg bg-gradient-to-br from-[#0077C8]/60 via-[#00BFFF]/40 to-[#00FFB2]/30 text-white font-semibold shadow-lg border border-[#00BFFF]/30 backdrop-blur-md transition-all duration-500 hover:scale-105 hover:shadow-blue-400/50 hover:bg-gradient-to-br hover:from-[#00BFFF]/80 hover:via-[#0077C8]/60 hover:to-[#00FFB2]/50 sticky bottom-0 z-50 w-48 text-sm">Update Details</button>
            </form>
        </>
    );
}
