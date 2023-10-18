// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCah_uWTHUCO0mExl8p7WHL3oShZNgJy_4",
  authDomain: "my-best-shop-project.firebaseapp.com",
  projectId: "my-best-shop-project",
  storageBucket: "my-best-shop-project.appspot.com",
  messagingSenderId: "664316251344",
  appId: "1:664316251344:web:fa6ae3e58139559244e2d5",
  measurementId: "G-W5Z1ZNLGQP"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
