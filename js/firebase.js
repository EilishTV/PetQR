import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAxSFPeRLN24lufFFiTImSm1uQNykzp1jM",
  authDomain: "petqr-app.firebaseapp.com",
  projectId: "petqr-app",
  storageBucket: "petqr-app.firebasestorage.app",
  messagingSenderId: "477860143078",
  appId: "1:477860143078:web:a734fa654f68b9bd12c027"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
