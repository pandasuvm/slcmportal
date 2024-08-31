// src/firebase/config.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDWVr9XoiWuEIa5s8R5oOCHtObby9tK8jU",
  authDomain: "slcm-9c472.firebaseapp.com",
  projectId: "slcm-9c472",
  storageBucket: "slcm-9c472.appspot.com",
  messagingSenderId: "916953332475",
  appId: "1:916953332475:web:8e5b42f75967de76dd0e5e",
  measurementId: "G-ZNP245Z7L5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Google Auth Provider
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
