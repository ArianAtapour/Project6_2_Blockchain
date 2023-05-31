// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const environment = {
  production: true,
  firebase : {
    apiKey: "AIzaSyBUlCZRiF3kU64sVWQ94Fl-4MkaRnCc4sY",
    authDomain: "blockchain-simulation2.firebaseapp.com",
    databaseURL: "https://blockchain-simulation2-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "blockchain-simulation2",
    storageBucket: "blockchain-simulation2.appspot.com",
    messagingSenderId: "507010350585",
    appId: "1:507010350585:web:939910d86a3a5610709128",
    measurementId: "G-TZLR3S8EG7"
  }
};

// Initialize Firebase
// const app = initializeApp(environment.firebase);
// const analytics = getAnalytics(app);
