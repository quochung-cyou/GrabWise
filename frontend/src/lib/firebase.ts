import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyAOU98axaXVWLvi5EF3HHiQ1i5z3-B2-ac",
  authDomain: "qqqaa-fc845.firebaseapp.com",
  databaseURL: "https://qqqaa-fc845.firebaseio.com",
  projectId: "qqqaa-fc845",
  storageBucket: "qqqaa-fc845.firebasestorage.app",
  messagingSenderId: "104437424760",
  appId: "1:104437424760:web:6fc8e4d4974ac90a0cc38d",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
export const googleProvider = new GoogleAuthProvider();
