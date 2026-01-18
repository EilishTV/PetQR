import { auth, db } from "./firebase.js";
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const email = document.getElementById("email");
const password = document.getElementById("password");
const errorBox = document.getElementById("authError");

const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const googleBtn = document.getElementById("googleBtn");

function showError(msg){
  errorBox.textContent = msg;
}

// LOGIN
loginBtn.onclick = async () => {
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    location.href = "https://eilishtv.github.io/PetQR/page/pet/";
  } catch (e) {
    showError("Email o contraseña incorrectos");
  }
};

// REGISTER
signupBtn.onclick = async () => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email.value, password.value);

    await setDoc(doc(db, "users", res.user.uid), {
      plan: "free",
      pets: 0,
      created: Date.now()
    });

    location.href = "https://eilishtv.github.io/PetQR/page/pet/";
  } catch (e) {
    showError(e.message);
  }
};

// GOOGLE
googleBtn.onclick = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const res = await signInWithPopup(auth, provider);

    await setDoc(doc(db, "users", res.user.uid), {
      plan: "free",
      pets: 0,
      created: Date.now()
    }, { merge:true });

    location.href = "https://eilishtv.github.io/PetQR/page/pet/";
  } catch (e) {
    showError("No se pudo iniciar sesión con Google");
  }
};
