import { auth, db } from "./firebase.js";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// ELEMENTOS
const email = document.getElementById("email");
const password = document.getElementById("password");
const emailReg = document.getElementById("emailReg");
const passwordReg = document.getElementById("passwordReg");
const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");

// LOGIN
loginBtn.onclick = async () => {
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    location.href = "/page/my-pets/";
  } catch (e) {
    alert(e.message);
  }
};

// REGISTER
signupBtn.onclick = async () => {
  try {
    const res = await createUserWithEmailAndPassword(auth, emailReg.value, passwordReg.value);

    await setDoc(doc(db, "users", res.user.uid), {
      plan: "free",
      pets: 0,
      created: Date.now()
    });

    location.href = "/page/my-pets/";
  } catch (e) {
    alert(e.message);
  }
};
