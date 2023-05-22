// Import the functions you need from the SDKs you need
import { firebaseConfig } from './firebaseConfig'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);