// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCswoGTAHfhh0zjkCnmXB-OzO9QAdsmfy0",
  authDomain: "cloak-77634.firebaseapp.com",
  projectId: "cloak-77634",
  storageBucket: "cloak-77634.appspot.com",
  messagingSenderId: "623909430526",
  appId: "1:623909430526:web:2dc1eeeb4577c31999b1af",
  measurementId: "G-8FKQW3FWGM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db= getFirestore(app)