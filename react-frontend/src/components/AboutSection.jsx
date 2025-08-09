import React from "react";
import CreatableSelect from 'react-select/creatable';
import ProfileImageUpload from './ProfileImageUpload';
import { useState } from "react";
import { firestore } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-hot-toast";

export default function AboutSection() {


    const handleExperienceChange = (index, field, value) => {
        const updated = [...experiences];
        updated[index][field] = value;
        setExperiences(updated);
    };

    const addExperience = () => {
        setExperiences([
            ...experiences,
            { period: "", title: "", company: "", description: "" },
        ]);
    };

    const removeExperience = (index) => {
        const updated = experiences.filter((_, i) => i !== index);
        setExperiences(updated);
    };



    const handleEducationChange = (index, field, value) => {
        const newEducationList = [...educationList];
        newEducationList[index][field] = value;
        setEducationList(newEducationList);
    };

    const addEducation = () => {
        setEducationList([...educationList, { degree: '', university: '', year: '' }]);
    };


    const removeEducation = (index) => {
        const newEducationList = educationList.filter((_, i) => i !== index);
        setEducationList(newEducationList);
    };

    const [isLoading, setIsLoading] = useState(false);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [title, setTitle] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');
    const [skills, setSkills] = useState([]);
    const [experiences, setExperiences] = useState([
        { period: "", title: "", company: "", description: "" },
    ]);
    const [educationList, setEducationList] = useState([
        { degree: "", university: "", year: "" }
    ]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        // Your async function that returns a promise
        const saveSettings = () => {
            const data = {
                firstName,
                lastName,
                title,
                city,
                country,
                email,
                bio,
                educationList,
                skills: skills.map(skill => skill.value),
                experiences,
                createdAt: new Date(),
            };

            // Return the promise from Firestore addDoc
            return addDoc(collection(firestore, "users"), data);
        };

        toast.promise(
            saveSettings(),
            {
                loading: 'Saving...',
                success: <b>Details saved successfully!</b>,
                error: <b>Failed to save details.</b>,
            }
        ).finally(() => {
            setIsLoading(false);
        });
    };

    return (
        <>
            <h3 className="text-2xl font-bold mb-8 text-[#00BFFF] drop-shadow-lg">About</h3>
            <ProfileImageUpload />
            <form onSubmit={handleSubmit} className="w-full max-w-3xl flex flex-col gap-10 items-center">
                {/* Personal Info */}
                <div className="w-full flex flex-col md:flex-row gap-6">
                    <div className="flex-1 flex flex-col gap-2">
                        <label className="text-[#00BFFF] font-semibold mb-1">First Name</label>
                        <input type="text" onChange={(e) => setFirstName(e.target.value)} value={firstName} placeholder="Enter your first name" className="w-full px-4 py-2 rounded-xl bg-white/10 text-white placeholder-white/60 border-2 border-transparent focus:border-[#00BFFF] focus:text-[#00BFFF] focus:shadow-[0_0_12px_2px_#00BFFF99] focus:bg-[#0a192f]/60 focus:backdrop-blur-md transition-all duration-300 hover:border-[#00BFFF] hover:text-[#00BFFF] hover:shadow-[0_0_8px_2px_#00BFFF66]" />
                    </div>
                    <div className="flex-1 flex flex-col gap-2">
                        <label className="text-[#00BFFF] font-semibold mb-1">Last Name</label>
                        <input type="text" onChange={(e) => setLastName(e.target.value)} value={lastName} placeholder="Enter your last name" className="w-full px-4 py-2 rounded-xl bg-white/10 text-white placeholder-white/60 border-2 border-transparent focus:border-[#00BFFF] focus:text-[#00BFFF] focus:shadow-[0_0_12px_2px_#00BFFF99] focus:bg-[#0a192f]/60 focus:backdrop-blur-md transition-all duration-300 hover:border-[#00BFFF] hover:text-[#00BFFF] hover:shadow-[0_0_8px_2px_#00BFFF66]" />
                    </div>
                </div>
                <div className="w-full flex flex-col md:flex-row gap-6">
                    <div className="flex-1 flex flex-col gap-2">
                        <label className="text-[#00BFFF] font-semibold mb-1">Title</label>
                        <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} placeholder="Your professional title" className="w-full px-4 py-2 rounded-xl bg-white/10 text-white placeholder-white/60 border-2 border-transparent focus:border-[#00BFFF] focus:text-[#00BFFF] focus:shadow-[0_0_12px_2px_#00BFFF99] focus:bg-[#0a192f]/60 focus:backdrop-blur-md transition-all duration-300 hover:border-[#00BFFF] hover:text-[#00BFFF] hover:shadow-[0_0_8px_2px_#00BFFF66]" />
                    </div>
                    <div className="flex-1 flex flex-col gap-2">
                        <label className="text-[#00BFFF] font-semibold mb-1">City</label>
                        <input type="text" onChange={(e) => setCity(e.target.value)} value={city} placeholder="City" className="w-full px-4 py-2 rounded-xl bg-white/10 text-white placeholder-white/60 border-2 border-transparent focus:border-[#00BFFF] focus:text-[#00BFFF] focus:shadow-[0_0_12px_2px_#00BFFF99] focus:bg-[#0a192f]/60 focus:backdrop-blur-md transition-all duration-300 hover:border-[#00BFFF] hover:text-[#00BFFF] hover:shadow-[0_0_8px_2px_#00BFFF66]" />
                    </div>
                    <div className="flex-1 flex flex-col gap-2">
                        <label className="text-[#00BFFF] font-semibold mb-1">Country</label>
                        <input type="text" onChange={(e) => setCountry(e.target.value)} value={country} placeholder="Country" className="w-full px-4 py-2 rounded-xl bg-white/10 text-white placeholder-white/60 border-2 border-transparent focus:border-[#00BFFF] focus:text-[#00BFFF] focus:shadow-[0_0_12px_2px_#00BFFF99] focus:bg-[#0a192f]/60 focus:backdrop-blur-md transition-all duration-300 hover:border-[#00BFFF] hover:text-[#00BFFF] hover:shadow-[0_0_8px_2px_#00BFFF66]" />
                    </div>
                </div>
                <div className="w-full flex flex-col gap-2">
                    <label className="text-[#00BFFF] font-semibold mb-1">Email</label>
                    <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Your email address" className="w-full px-4 py-2 rounded-xl bg-white/10 text-white placeholder-white/60 border-2 border-transparent focus:border-[#00BFFF] focus:text-[#00BFFF] focus:shadow-[0_0_12px_2px_#00BFFF99] focus:bg-[#0a192f]/60 focus:backdrop-blur-md transition-all duration-300 hover:border-[#00BFFF] hover:text-[#00BFFF] hover:shadow-[0_0_8px_2px_#00BFFF66]" />
                </div>
                {/* About Me */}
                <div className="w-full flex flex-col gap-2">
                    <label className="text-[#00BFFF] font-semibold mb-1">Bio</label>
                    <textarea onChange={(e) => setBio(e.target.value)} value={bio} placeholder="Write about yourself..." rows={10} className="w-full px-4 py-2 rounded-xl bg-white/10 text-white placeholder-white/60 border-2 border-transparent focus:border-[#00BFFF] focus:text-[#00BFFF] focus:shadow-[0_0_12px_2px_#00BFFF99] focus:bg-[#0a192f]/60 focus:backdrop-blur-md transition-all duration-300 hover:border-[#00BFFF] hover:text-[#00BFFF] hover:shadow-[0_0_8px_2px_#00BFFF66] resize-none" />
                </div>
                {/* Education */}
                <div className="w-full flex flex-col gap-6">
                    <label className="text-[#00BFFF] font-semibold mb-1">Education</label>

                    {educationList.map((edu, index) => (
                        <div
                            key={index}
                            className="p-4 rounded-xl bg-white/5 border border-[#00BFFF44] flex flex-col gap-4"
                        >
                            <div className="flex flex-wrap gap-6">
                                <input
                                    type="text"
                                    placeholder="Bachelor's Degree in Computer Science"
                                    value={edu.degree}
                                    onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                                    className="flex-1 min-w-[140px] px-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/60
            border-2 border-transparent
            focus:border-[#00BFFF] focus:shadow-[0_0_20px_rgba(0,191,255,0.6)] focus:shadow-[#00BFFF]/60
            hover:border-[#00BFFF] hover:shadow-[0_0_15px_rgba(0,191,255,0.4)] hover:shadow-[#00BFFF]/40
            transition-all duration-300 ease-in-out"
                                />
                                <input
                                    type="text"
                                    placeholder="University Name"
                                    value={edu.university}
                                    onChange={(e) => handleEducationChange(index, 'university', e.target.value)}
                                    className="flex-1 min-w-[160px] px-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/60
            border-2 border-transparent
            focus:border-[#00BFFF] focus:shadow-[0_0_20px_rgba(0,191,255,0.6)] focus:shadow-[#00BFFF]/60
            hover:border-[#00BFFF] hover:shadow-[0_0_15px_rgba(0,191,255,0.4)] hover:shadow-[#00BFFF]/40
            transition-all duration-300 ease-in-out"
                                />
                                <input
                                    type="text"
                                    placeholder="2016 - 2020"
                                    value={edu.year}
                                    onChange={(e) => handleEducationChange(index, 'year', e.target.value)}
                                    className="flex-1 min-w-[120px] px-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/60
            border-2 border-transparent
            focus:border-[#00BFFF] focus:shadow-[0_0_20px_rgba(0,191,255,0.6)] focus:shadow-[#00BFFF]/60
            hover:border-[#00BFFF] hover:shadow-[0_0_15px_rgba(0,191,255,0.4)] hover:shadow-[#00BFFF]/40
            transition-all duration-300 ease-in-out"
                                />
                            </div>

                            {educationList.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeEducation(index)}
                                    className="self-end px-2 py-1 bg-red-500/70 hover:bg-red-600 text-white rounded-lg text-xs
            hover:shadow-[0_0_10px_rgba(239,68,68,0.5)] transition-all duration-300"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={addEducation}
                        className="
      mt-3 px-3 py-1.5 rounded-md
      bg-white bg-opacity-20
      border border-white border-opacity-30
      backdrop-blur-md
      text-white font-medium shadow-lg
      transition-all duration-300
      hover:scale-105 hover:shadow-[0_0_15px_rgba(255,255,255,0.4)] hover:shadow-white/40
      focus:shadow-[0_0_20px_rgba(255,255,255,0.6)] focus:shadow-white/60
      w-40 text-xs flex items-center justify-center gap-1.5
    "
                    >
                        <span className="text-base font-bold">+</span> Add Education
                    </button>
                </div>

                {/* Technical Skills */}
                <div className="w-full flex flex-col gap-2">
                    <label className="text-[#00BFFF] font-semibold mb-1">Technical Skills</label>
                    <div className="group">
                        <CreatableSelect
                            onChange={(e) => setSkills(e)}
                            value={skills}
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

                    {experiences.map((exp, index) => (
                        <div
                            key={index}
                            className="p-4 rounded-xl bg-white/5 border border-[#00BFFF44] flex flex-col gap-4"
                        >
                            {/* Top row */}
                            <div className="flex flex-wrap gap-4">
                                <input
                                    type="text"
                                    placeholder="2022 - Present"
                                    value={exp.period}
                                    onChange={(e) =>
                                        handleExperienceChange(index, "period", e.target.value)
                                    }
                                    className="flex-1 min-w-[140px] px-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/60 
                        border-2 border-transparent 
                        focus:border-[#00BFFF] focus:shadow-[0_0_20px_rgba(0,191,255,0.6)] focus:shadow-[#00BFFF]/60
                        hover:border-[#00BFFF] hover:shadow-[0_0_15px_rgba(0,191,255,0.4)] hover:shadow-[#00BFFF]/40
                        transition-all duration-300 ease-in-out"
                                />
                                <input
                                    type="text"
                                    placeholder="Frontend Developer"
                                    value={exp.title}
                                    onChange={(e) =>
                                        handleExperienceChange(index, "title", e.target.value)
                                    }
                                    className="flex-1 min-w-[160px] px-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/60 
                        border-2 border-transparent 
                        focus:border-[#00BFFF] focus:shadow-[0_0_20px_rgba(0,191,255,0.6)] focus:shadow-[#00BFFF]/60
                        hover:border-[#00BFFF] hover:shadow-[0_0_15px_rgba(0,191,255,0.4)] hover:shadow-[#00BFFF]/40
                        transition-all duration-300 ease-in-out"
                                />
                                <input
                                    type="text"
                                    placeholder="Company Name"
                                    value={exp.company}
                                    onChange={(e) =>
                                        handleExperienceChange(index, "company", e.target.value)
                                    }
                                    className="flex-1 min-w-[160px] px-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/60 
                        border-2 border-transparent 
                        focus:border-[#00BFFF] focus:shadow-[0_0_20px_rgba(0,191,255,0.6)] focus:shadow-[#00BFFF]/60
                        hover:border-[#00BFFF] hover:shadow-[0_0_15px_rgba(0,191,255,0.4)] hover:shadow-[#00BFFF]/40
                        transition-all duration-300 ease-in-out"
                                />
                            </div>

                            {/* Description */}
                            <textarea
                                placeholder="Describe your responsibilities..."
                                value={exp.description}
                                onChange={(e) =>
                                    handleExperienceChange(index, "description", e.target.value)
                                }
                                className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/60 
                    border-2 border-transparent 
                    focus:border-[#00BFFF] focus:shadow-[0_0_20px_rgba(0,191,255,0.6)] focus:shadow-[#00BFFF]/60
                    hover:border-[#00BFFF] hover:shadow-[0_0_15px_rgba(0,191,255,0.4)] hover:shadow-[#00BFFF]/40
                    transition-all duration-300 ease-in-out resize-none"
                            />

                            {/* Remove Button */}
                            {experiences.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeExperience(index)}
                                    className="self-end px-2 py-1 bg-red-500/70 hover:bg-red-600 text-white rounded-lg text-xs
                        hover:shadow-[0_0_10px_rgba(239,68,68,0.5)] transition-all duration-300"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    ))}

                    {/* Add Experience */}
                    <button
                        type="button"
                        onClick={addExperience}
                        className="
            mt-3 px-3 py-1.5 rounded-md 
            bg-white bg-opacity-20 
            border border-white border-opacity-30 
            backdrop-blur-md
            text-white font-medium shadow-lg 
            transition-all duration-300 
            hover:scale-105 hover:shadow-[0_0_15px_rgba(255,255,255,0.4)] hover:shadow-white/40
            focus:shadow-[0_0_20px_rgba(255,255,255,0.6)] focus:shadow-white/60
            w-40 text-xs flex items-center justify-center gap-1.5
        "
                    >
                        <span className="text-base font-bold">+</span> Add Experience
                    </button>
                </div>

                <button type="submit" disabled={isLoading} className="mt-8 px-4 py-2 rounded-lg bg-gradient-to-br from-[#0077C8]/60 via-[#00BFFF]/40 to-[#00FFB2]/30 text-white font-semibold shadow-lg border border-[#00BFFF]/30 backdrop-blur-md transition-all duration-500 hover:scale-105 hover:shadow-blue-400/50 hover:bg-gradient-to-br hover:from-[#00BFFF]/80 hover:via-[#0077C8]/60 hover:to-[#00FFB2]/50 sticky bottom-0 z-50 w-48 text-sm">{isLoading ? "Loading..." : "Update Details"}</button>
            </form>


            {/* Optional: a loading spinner
            {isLoading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <ClipLoader color="#00BFFF" loading={true} size={50} />
                </div>
            )} */}
        </>
    );
}
