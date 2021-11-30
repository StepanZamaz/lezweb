// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWbkWWCfPVRPNbbdpN9aL8kpefayPdLcM",
  authDomain: "lezweb.firebaseapp.com",
  projectId: "lezweb",
  storageBucket: "lezweb.appspot.com",
  messagingSenderId: "132835258887",
  appId: "1:132835258887:web:c6c8d0396177094c7230a2",
  measurementId: "G-E6KDD07M0S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default getFirestore();