import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBA07JCGBSJxkFeaHdoNR9kHlXa6_mnTCQ",
  authDomain: "dp-prueba.firebaseapp.com",
  databaseURL: "https://dp-prueba-default-rtdb.firebaseio.com",
  projectId: "dp-prueba",
  storageBucket: "dp-prueba.firebasestorage.app",
  messagingSenderId: "495901505213",
  appId: "1:495901505213:web:3e92dfc5f14ffacfe929d4"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getDatabase(app)