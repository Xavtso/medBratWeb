// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcWqkU-NcfrGI55qcm4zxutse2uyqHM54",
  authDomain: "medbrat-e2bb7.firebaseapp.com",
  projectId: "medbrat-e2bb7",
  storageBucket: "medbrat-e2bb7.firebasestorage.app",
  messagingSenderId: "974850844558",
  appId: "1:974850844558:web:2d987c927ab9c23ff4e6df",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
