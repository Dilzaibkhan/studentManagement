import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// console.log(import.meta.env.VITE_FIREBASE_API_KEY, "===key");
const firebaseConfig = {
  apiKey: "AIzaSyCaOsZqBXQf4NeiGCfua8d5twGr_5IQROo",
  authDomain: "studentmanagement-98c35.firebaseapp.com",
  projectId: "studentmanagement-98c35",
  storageBucket: "studentmanagement-98c35.firebasestorage.app",
  messagingSenderId: "169412823709",
  appId: "1:169412823709:web:876a48349ededd57586274",
  measurementId: "G-Y47KQMV68N"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };