import React from "react";
import CreatableSelect from 'react-select/creatable';
import ProfileImageUpload from './ProfileImageUpload';
import { useState, useEffect } from "react";
import { firestore } from "../firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-hot-toast";

export default function AboutSection() {
    const [isLoading, setIsLoading] = useState(false);
    const [isDataLoading, setIsDataLoading] = useState(true);

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

    // Fetch existing data on component mount
    useEffect(() => {
        const fetchExistingData = async () => {
            try {
                setIsDataLoading(true);
                const docRef = doc(firestore, "portfolion", "about");
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();

                    // Set all the state values with existing data
                    setFirstName(data.firstName || '');
                    setLastName(data.lastName || '');
                    setTitle(data.title || '');
                    setCity(data.city || '');
                    setCountry(data.country || '');
                    setEmail(data.email || '');
                    setBio(data.bio || '');

                    // Handle skills array - convert strings to objects for CreatableSelect
                    if (data.skills && Array.isArray(data.skills)) {
                        const skillsFormatted = data.skills.map(skill => ({
                            value: skill,
                            label: skill
                        }));
                        setSkills(skillsFormatted);
                    }

                    // Handle experiences array
                    if (data.experiences && Array.isArray(data.experiences) && data.experiences.length > 0) {
                        setExperiences(data.experiences);
                    }

                    // Handle education array
                    if (data.educationList && Array.isArray(data.educationList) && data.educationList.length > 0) {
                        setEducationList(data.educationList);
                    }
                } else {
                    console.log("No existing data found");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                toast.error("Failed to load existing data");
            } finally {
                setIsDataLoading(false);
            }
        };

        fetchExistingData();
    }, []);

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        // Your async function that returns a promise for updating
        const updateSettings = () => {
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
                updatedAt: new Date(),
            };

            // Return the promise from Firestore updateDoc
            const docRef = doc(firestore, "portfolion", "about");
            return updateDoc(docRef, data);
        };

        toast.promise(
            updateSettings(),
            {
                loading: 'Updating...',
                success: <b>Details updated successfully!</b>,
                error: <b>Failed to update details.</b>,
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
                <span className="ml-4 text-[#00BFFF]">Loading your details...</span>
            </div>
        );
    }

    return (
        <>
            <h3 className="hidden md:block text-2xl font-bold mb-8 text-[#00BFFF] drop-shadow-lg">About</h3>
            <ProfileImageUpload />
            <form onSubmit={handleSubmit} className="w-full max-w-3xl flex flex-col gap-8 md:gap-10 items-center">
                {/* Personal Info */}
                <div className="w-full flex flex-col md:flex-row gap-6 md:gap-6">
                    <div className="flex-1 flex flex-col gap-3">
                        <label className="text-[#00BFFF] font-semibold mb-1 text-base">First Name</label>
                        <input type="text" onChange={(e) => setFirstName(e.target.value)} value={firstName} placeholder="Enter your first name" className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/60 border-2 border-transparent focus:border-[#00BFFF] focus:text-[#00BFFF] focus:shadow-[0_0_12px_2px_#00BFFF99] focus:bg-[#0a192f]/60 focus:backdrop-blur-md transition-all duration-300 hover:border-[#00BFFF] hover:text-[#00BFFF] hover:shadow-[0_0_8px_2px_#00BFFF66] text-base" />
                    </div>
                    <div className="flex-1 flex flex-col gap-3">
                        <label className="text-[#00BFFF] font-semibold mb-1 text-base">Last Name</label>
                        <input type="text" onChange={(e) => setLastName(e.target.value)} value={lastName} placeholder="Enter your last name" className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/60 border-2 border-transparent focus:border-[#00BFFF] focus:text-[#00BFFF] focus:shadow-[0_0_12px_2px_#00BFFF99] focus:bg-[#0a192f]/60 focus:backdrop-blur-md transition-all duration-300 hover:border-[#00BFFF] hover:text-[#00BFFF] hover:shadow-[0_0_8px_2px_#00BFFF66] text-base" />
                    </div>
                </div>
                <div className="w-full flex flex-col md:flex-row gap-6 md:gap-6">
                    <div className="flex-1 flex flex-col gap-3">
                        <label className="text-[#00BFFF] font-semibold mb-1 text-base">Title</label>
                        <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} placeholder="Your professional title" className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/60 border-2 border-transparent focus:border-[#00BFFF] focus:text-[#00BFFF] focus:shadow-[0_0_12px_2px_#00BFFF99] focus:bg-[#0a192f]/60 focus:backdrop-blur-md transition-all duration-300 hover:border-[#00BFFF] hover:text-[#00BFFF] hover:shadow-[0_0_8px_2px_#00BFFF66] text-base" />
                    </div>
                    <div className="flex-1 flex flex-col gap-3">
                        <label className="text-[#00BFFF] font-semibold mb-1 text-base">City</label>
                        <input type="text" onChange={(e) => setCity(e.target.value)} value={city} placeholder="City" className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/60 border-2 border-transparent focus:border-[#00BFFF] focus:text-[#00BFFF] focus:shadow-[0_0_12px_2px_#00BFFF99] focus:bg-[#0a192f]/60 focus:backdrop-blur-md transition-all duration-300 hover:border-[#00BFFF] hover:text-[#00BFFF] hover:shadow-[0_0_8px_2px_#00BFFF66] text-base" />
                    </div>
                    <div className="flex-1 flex flex-col gap-3">
                        <label className="text-[#00BFFF] font-semibold mb-1 text-base">Country</label>
                        <input type="text" onChange={(e) => setCountry(e.target.value)} value={country} placeholder="Country" className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/60 border-2 border-transparent focus:border-[#00BFFF] focus:text-[#00BFFF] focus:shadow-[0_0_12px_2px_#00BFFF99] focus:bg-[#0a192f]/60 focus:backdrop-blur-md transition-all duration-300 hover:border-[#00BFFF] hover:text-[#00BFFF] hover:shadow-[0_0_8px_2px_#00BFFF66] text-base" />
                    </div>
                </div>
                <div className="w-full flex flex-col gap-3">
                    <label className="text-[#00BFFF] font-semibold mb-1 text-base">Email</label>
                    <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Your email address" className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/60 border-2 border-transparent focus:border-[#00BFFF] focus:text-[#00BFFF] focus:shadow-[0_0_12px_2px_#00BFFF99] focus:bg-[#0a192f]/60 focus:backdrop-blur-md transition-all duration-300 hover:border-[#00BFFF] hover:text-[#00BFFF] hover:shadow-[0_0_8px_2px_#00BFFF66] text-base" />
                </div>
                {/* About Me */}
                <div className="w-full flex flex-col gap-3">
                    <label className="text-[#00BFFF] font-semibold mb-1 text-base">Bio</label>
                    <textarea onChange={(e) => setBio(e.target.value)} value={bio} placeholder="Write about yourself..." rows={6} className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/60 border-2 border-transparent focus:border-[#00BFFF] focus:text-[#00BFFF] focus:shadow-[0_0_12px_2px_#00BFFF99] focus:bg-[#0a192f]/60 focus:backdrop-blur-md transition-all duration-300 hover:border-[#00BFFF] hover:text-[#00BFFF] hover:shadow-[0_0_8px_2px_#00BFFF66] resize-none text-base" />
                </div>
                {/* Education */}
                <div className="w-full flex flex-col gap-6 md:gap-6">
                    <label className="text-[#00BFFF] font-semibold mb-1 text-base">Education</label>

                    {educationList.map((edu, index) => (
                        <div
                            key={index}
                            className="relative p-4 rounded-xl bg-white/5 border border-[#00BFFF44] flex flex-col gap-3"
                        >
                            {/* Remove Button - positioned absolutely in top-right */}
                            {educationList.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeEducation(index)}
                                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg hover:shadow-[0_0_10px_rgba(239,68,68,0.5)] transition-all duration-300 z-10"
                                >
                                    ✕
                                </button>
                            )}

                            {/* Education Content */}
                            <div className="flex flex-col sm:flex-row gap-3">
                                <input
                                    type="text"
                                    placeholder="Bachelor's Degree in Computer Science"
                                    value={edu.degree}
                                    onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                                    className="flex-1 min-w-[140px] px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/60
            border-2 border-transparent
            focus:border-[#00BFFF] focus:shadow-[0_0_20px_rgba(0,191,255,0.6)] focus:shadow-[#00BFFF]/60
            hover:border-[#00BFFF] hover:shadow-[0_0_15px_rgba(0,191,255,0.4)] hover:shadow-[#00BFFF]/40
            transition-all duration-300 ease-in-out text-base"
                                />
                                <input
                                    type="text"
                                    placeholder="University Name"
                                    value={edu.university}
                                    onChange={(e) => handleEducationChange(index, 'university', e.target.value)}
                                    className="flex-1 min-w-[160px] px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/60
            border-2 border-transparent
            focus:border-[#00BFFF] focus:shadow-[0_0_20px_rgba(0,191,255,0.6)] focus:shadow-[#00BFFF]/60
            hover:border-[#00BFFF] hover:shadow-[0_0_15px_rgba(0,191,255,0.4)] hover:shadow-[#00BFFF]/40
            transition-all duration-300 ease-in-out text-base"
                                />
                                <input
                                    type="text"
                                    placeholder="2016 - 2020"
                                    value={edu.year}
                                    onChange={(e) => handleEducationChange(index, 'year', e.target.value)}
                                    className="flex-1 min-w-[120px] px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/60
            border-2 border-transparent
            focus:border-[#00BFFF] focus:shadow-[0_0_20px_rgba(0,191,255,0.6)] focus:shadow-[#00BFFF]/60
            hover:border-[#00BFFF] hover:shadow-[0_0_15px_rgba(0,191,255,0.4)] hover:shadow-[#00BFFF]/40
            transition-all duration-300 ease-in-out text-base"
                                />
                            </div>
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
      w-32 md:w-40 text-xs flex items-center justify-center gap-1.5
    "
                    >
                        <span className="text-base font-bold">+</span> Add Education
                    </button>
                </div>

                {/* Technical Skills */}
                <div className="w-full flex flex-col gap-3">
                    <label className="text-[#00BFFF] font-semibold mb-1 text-base">Technical Skills</label>
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
                <div className="w-full flex flex-col gap-6 md:gap-6">
                    <label className="text-[#00BFFF] font-semibold mb-1 text-base">Professional Experience</label>

                    {experiences.map((exp, index) => (
                        <div
                            key={index}
                            className="relative p-4 rounded-xl bg-white/5 border border-[#00BFFF44] flex flex-col gap-3"
                        >
                            {/* Remove Button - positioned absolutely in top-right */}
                            {experiences.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeExperience(index)}
                                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg hover:shadow-[0_0_10px_rgba(239,68,68,0.5)] transition-all duration-300 z-10"
                                >
                                    ✕
                                </button>
                            )}

                            {/* Experience Content */}
                            <div className="flex flex-col gap-3">
                                {/* Period and Title Row */}
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <input
                                        type="text"
                                        placeholder="2018 - 2022"
                                        value={exp.period}
                                        onChange={(e) =>
                                            handleExperienceChange(index, "period", e.target.value)
                                        }
                                        className="flex-1 min-w-[120px] px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/60 
                            border-2 border-transparent 
                            focus:border-[#00BFFF] focus:shadow-[0_0_20px_rgba(0,191,255,0.6)] focus:shadow-[#00BFFF]/60
                            hover:border-[#00BFFF] hover:shadow-[0_0_15px_rgba(0,191,255,0.4)] hover:shadow-[#00BFFF]/40
                            transition-all duration-300 ease-in-out text-base"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Full Stack Developer"
                                        value={exp.title}
                                        onChange={(e) =>
                                            handleExperienceChange(index, "title", e.target.value)
                                        }
                                        className="flex-1 min-w-[160px] px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/60 
                            border-2 border-transparent 
                            focus:border-[#00BFFF] focus:shadow-[0_0_20px_rgba(0,191,255,0.6)] focus:shadow-[#00BFFF]/60
                            hover:border-[#00BFFF] hover:shadow-[0_0_15px_rgba(0,191,255,0.4)] hover:shadow-[#00BFFF]/40
                            transition-all duration-300 ease-in-out text-base"
                                    />
                                </div>

                                {/* Company Name */}
                                <input
                                    type="text"
                                    placeholder="XYZ Web Agency"
                                    value={exp.company}
                                    onChange={(e) =>
                                        handleExperienceChange(index, "company", e.target.value)
                                    }
                                    className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/60 
                        border-2 border-transparent 
                        focus:border-[#00BFFF] focus:shadow-[0_0_20px_rgba(0,191,255,0.6)] focus:shadow-[#00BFFF]/60
                        hover:border-[#00BFFF] hover:shadow-[0_0_15px_rgba(0,191,255,0.4)] hover:shadow-[#00BFFF]/40
                        transition-all duration-300 ease-in-out text-base"
                                />

                                {/* Description */}
                                <textarea
                                    placeholder="Built responsive web applications using Laravel, Vue.js, and MySQL. Collaborated with clients to deliver custom solutions."
                                    value={exp.description}
                                    onChange={(e) =>
                                        handleExperienceChange(index, "description", e.target.value)
                                    }
                                    className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/60 
                        border-2 border-transparent 
                        focus:border-[#00BFFF] focus:shadow-[0_0_20px_rgba(0,191,255,0.6)] focus:shadow-[#00BFFF]/60
                        hover:border-[#00BFFF] hover:shadow-[0_0_15px_rgba(0,191,255,0.4)] hover:shadow-[#00BFFF]/40
                        transition-all duration-300 ease-in-out resize-none text-base"
                                    rows={3}
                                />
                            </div>
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
            w-32 md:w-40 text-xs flex items-center justify-center gap-1.5
        "
                    >
                        <span className="text-base font-bold">+</span> Add Experience
                    </button>
                </div>

                <button type="submit" disabled={isLoading} className="mt-6 md:mt-8 px-6 py-4 rounded-lg bg-gradient-to-br from-[#0077C8]/60 via-[#00BFFF]/40 to-[#00FFB2]/30 text-white font-semibold shadow-lg border border-[#00BFFF]/30 backdrop-blur-md transition-all duration-500 hover:scale-105 hover:shadow-blue-400/50 hover:bg-gradient-to-br hover:from-[#00BFFF]/80 hover:via-[#0077C8]/60 hover:to-[#00FFB2]/50 w-full md:w-48 text-base">{isLoading ? "Updating..." : "Update Details"}</button>
            </form>
        </>
    );
}