const admin = require("firebase-admin");
const serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function run() {
    const collectionRef = db.collection("portfolion");

    // ---------------- ABOUT SECTION ----------------
    const aboutRef = collectionRef.doc("about");
    const aboutSnap = await aboutRef.get();
    if (!aboutSnap.exists) {  // ✅ changed from exists()
        await aboutRef.set({
            profileImage: "",
            bio: "I’m a Laravel developer with experience in building scalable web applications, REST APIs, and modern frontend integrations. Passionate about clean code, problem-solving, and creating efficient business solutions.",
            city: "Jaffna",
            country: "Sri Lanka",
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            educationList: [
                { degree: "BSc in Computer Science", university: "University of Jaffna", year: "2010-2015" },
                { degree: "MSc in Software Engineering", university: "University of Colombo", year: "2016-2018" },
            ],
            email: "purus5@gmail.com",
            experiences: [
                {
                    company: "ABC Tech Solutions",
                    description: "Developed and maintained enterprise-level Laravel applications with integrated APIs and frontend dashboards.",
                    period: "2022 - Present",
                    title: "Senior Laravel Developer",
                },
                {
                    company: "XYZ Web Agency",
                    description: "Built responsive web applications using Laravel, Vue.js, and MySQL. Collaborated with clients to deliver custom solutions.",
                    period: "2018 - 2022",
                    title: "Full Stack Developer",
                },
            ],
            firstName: "Kukanenthiran",
            lastName: "Purusothman",
            skills: ["Laravel", "JavaScript", "Tailwind CSS", "HTML5", "REST APIs", "MySQL", "React"],
            title: "Full Stack Developer",
        });
        console.log("✅ About section seeded.");
    } else {
        console.log("⚠️ About section already exists. Skipping.");
    }

    // ---------------- PROJECTS SECTION ----------------
    const projectsRef = collectionRef.doc("projects");
    const projectsSnap = await projectsRef.get();
    if (!projectsSnap.exists) {  // ✅ changed from exists()
        await projectsRef.set({
            projects: [
                {
                    projectName: "Personal Portfolio Website",
                    tags: ["React", "Firebase", "Tailwind CSS"],
                    projectDescription: "A dynamic portfolio website to showcase my projects, skills, and experience. Fully integrated with Firebase for content management.",
                    githubUrl: "https://github.com/username/portfolio",
                    logoFilename: "portfolio-logo.png"
                },
                {
                    projectName: "Task Manager App",
                    tags: ["Laravel", "Vue.js", "MySQL"],
                    projectDescription: "A task management web app with user authentication, CRUD operations, and real-time notifications.",
                    githubUrl: "https://github.com/username/task-manager",
                    logoFilename: "taskmanager-logo.png"
                },
                {
                    projectName: "E-commerce Platform",
                    tags: ["Laravel", "Stripe API", "Bootstrap"],
                    projectDescription: "An online store with product catalog, cart, checkout, and payment integration using Stripe API.",
                    githubUrl: "https://github.com/username/ecommerce-platform",
                    logoFilename: ""
                }
            ]
        });
        console.log("✅ Projects section seeded.");
    } else {
        console.log("⚠️ Projects section already exists. Skipping.");
    }

    process.exit(0);
}

run().catch((e) => {
    console.error("❌ Error seeding data:", e);
    process.exit(1);
});
