import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions'

const firebaseConfig = {
  apiKey: "AIzaSyB2h7GKFlmDJa_fCVz4Bd9Gndh2FCtHeR4",
  authDomain: "homework-proj.firebaseapp.com",
  projectId: "homework-proj",
  storageBucket: "homework-proj.appspot.com",
  messagingSenderId: "386972130889",
  appId: "1:386972130889:web:bb783565cf666889b62998"
};


export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const fbFunctions = getFunctions(app);

if (process.env.NODE_ENV === 'development') {
  connectAuthEmulator(auth, 'http://localhost:9099');
  connectFirestoreEmulator(db, 'localhost', 8080);
  connectFunctionsEmulator(fbFunctions, 'localhost', 5001)
}