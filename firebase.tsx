// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCp8UF56DUVkEJG4cOflGTEFl1ivQjzWJY",
  authDomain: "sexeducation-c0902.firebaseapp.com",
  projectId: "sexeducation-c0902",
  storageBucket: "sexeducation-c0902.appspot.com",
  messagingSenderId: "305914583809",
  appId: "1:305914583809:web:587408614de793c339d900",
  measurementId: "G-65YF35TNK6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log("Firebase App object:", app);
const analytics = getAnalytics(app);
const auth = getAuth(app);
console.log("Firebase Auth object:", auth);
const db = getFirestore(app);
console.log("Firebase DB object:", db);
export {auth, db,};