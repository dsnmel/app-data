import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"; // 🔥 Gunakan Realtime Database

const firebaseConfig = {
  apiKey: "AIzaSyDRgCnAmFV7UitOB87fhzyeR1isnfz-m-U",
  authDomain: "bppk-data.firebaseapp.com",
  databaseURL: "https://bppk-data-default-rtdb.firebaseio.com", // 🔥 Pastikan URL ini benar
  projectId: "bppk-data",
  storageBucket: "bppk-data.firebasestorage.app",
  messagingSenderId: "802824380101",
  appId: "1:802824380101:web:8227c410adcf95cd6e5aac",
  measurementId: "G-N4P5MJ6NE1"
};

// 🔥 Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app); // 🔥 Gunakan Realtime Database

export { db };
