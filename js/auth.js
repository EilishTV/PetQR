import { auth, db } from "./firebase.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

import {
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// ELEMENTOS
const loginEmail = document.getElementById("emailInput");
const loginPass = document.getElementById("passwordInput");
const regEmail = document.getElementById("regEmail");
const regPass = document.getElementById("regPassword");

const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const googleBtn = document.getElementById("googleBtn");

// LOGIN EMAIL
loginBtn.onclick = async () => {
  try {
    const res = await signInWithEmailAndPassword(auth, loginEmail.value, loginPass.value);

    if (!res.user.emailVerified) {
      alert("Verificá tu email antes de ingresar.");
      return;
    }

    location.href = "/page/my-pets/";
  } catch (e) {
    alert(e.message);
  }
};

// REGISTER EMAIL
signupBtn.onclick = async () => {
  try {
    const res = await createUserWithEmailAndPassword(auth, regEmail.value, regPass.value);

    await sendEmailVerification(res.user);

    await setDoc(doc(db, "users", res.user.uid), {
      plan: "free",
      pets: 0,
      created: Date.now(),
      email: res.user.email
    });

    alert("Te enviamos un email para verificar tu cuenta.");
  } catch (e) {
    alert(e.message);
  }
};

// LOGIN GOOGLE
googleBtn.onclick = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const res = await signInWithPopup(auth, provider);

    const ref = doc(db, "users", res.user.uid);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      await setDoc(ref, {
        plan: "free",
        pets: 0,
        created: Date.now(),
        email: res.user.email
      });
    }

    location.href = "../page/my-pets/";
  } catch (e) {
    alert(e.message);
  }
};
