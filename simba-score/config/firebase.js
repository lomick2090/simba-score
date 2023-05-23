// Import the functions you need from the SDKs you need
import { firebaseConfig } from './firebaseConfig'
import { getFirestore } from 'firebase/firestore'
import { initializeApp } from "firebase/app";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };