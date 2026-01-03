// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-storage.js";


const firebaseConfig = {
    apiKey: "AIzaSyB2HeAfOZmYZ57UuQddEXdlKf8o8fttpC0",
    authDomain: "disc-ea51a.firebaseapp.com",
    projectId: "disc-ea51a",
    storageBucket: "disc-ea51a.appspot.com",
    messagingSenderId: "908961851183",
    appId: "1:908961851183:web:3cafc0875ceb497e7e23da",
    measurementId: "G-BNZSZCFP9L"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, ref, uploadBytes, getDownloadURL, doc, setDoc };
