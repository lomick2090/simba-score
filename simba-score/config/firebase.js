// Import the functions you need from the SDKs you need
import { firebaseConfig } from './firebaseConfig'
import { getFirestore } from 'firebase/firestore'
import { initializeApp } from "firebase/app";
import { getStorage } from '@firebase/storage';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage()
export { db, storage };