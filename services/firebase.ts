import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// =================================================================
// 🔴 IMPORTANT: REPLACE THE CONFIG BELOW WITH YOUR FIREBASE KEYS
// 1. Go to console.firebase.google.com
// 2. Create a new project -> Add Web App
// 3. Copy the config object
// 4. Ensure Realtime Database is created in "Test Mode" (read/write: true)
// =================================================================

const firebaseConfig = {
  apiKey: "AIzaSyBCaroF-x4UEjVmUy7oj_3Gv7cbwWLEa-A",
  authDomain: "project-3267052082802282798.firebaseapp.com.firebaseapp.com",
  databaseURL: "https://project-3267052082802282798-default-rtdb.firebaseio.com",
  projectId: "project-3267052082802282798",
  storageBucket: "project-3267052082802282798.firebasestorage.app.appspot.com",
  messagingSenderId: "985052901998",
  appId: "1:985052901998:web:0f429e3a89dcf70bfb2c7f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and export it
export const db = getDatabase(app);