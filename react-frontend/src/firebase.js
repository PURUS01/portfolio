import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAZ7PVb45uzhnZbIGxk_B_6xe3Hr0Q09DQ",
    authDomain: "portfolio-b1f1a.firebaseapp.com",
    projectId: "portfolio-b1f1a",
    storageBucket: "portfolio-b1f1a.firebasestorage.app",
    messagingSenderId: "746683498663",
    appId: "1:746683498663:web:c594265427759a814e5b82"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const auth = getAuth(app);