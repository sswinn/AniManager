// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, setPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCaFWnEzlZSD_ju_P_6sbfsoMR2TZESYo",
  authDomain: "animanager-4074c.firebaseapp.com",
  projectId: "animanager-4074c",
  storageBucket: "animanager-4074c.appspot.com",
  messagingSenderId: "482619569264",
  appId: "1:482619569264:web:5637dd10bf2a8e6a07f0b5",
  measurementId: "G-RB303FY03R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);