// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzB4FgbAlN_u1vg2DfEZywCtN3wBfxuB0",
  authDomain: "first-firebase-project-73b3b.firebaseapp.com",
  projectId: "first-firebase-project-73b3b",
  storageBucket: "first-firebase-project-73b3b.appspot.com",
  messagingSenderId: "259226374634",
  appId: "1:259226374634:web:c0b24a60884c9d97826293"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app