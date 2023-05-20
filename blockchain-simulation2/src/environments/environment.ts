// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const environment = {
  production: false,
  firebase : {
    apiKey: "AIzaSyB-7ukPz_mA519yZ5_n-2w02Fv8zx8Plxk",
    authDomain: "blockchain-simulation.firebaseapp.com",
    projectId: "blockchain-simulation",
    storageBucket: "blockchain-simulation.appspot.com",
    messagingSenderId: "1052729484172",
    appId: "1:1052729484172:web:d6386064f7791f41f26ca9",
    measurementId: "G-6VFLY67XW3"
  }
};

// Initialize Firebase
const app = initializeApp(environment.firebase);
const analytics = getAnalytics(app);
