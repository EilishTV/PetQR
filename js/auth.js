import { auth, db } from "./firebase.js";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

loginBtn.onclick = async () => {
  await signInWithEmailAndPassword(auth, email.value, password.value);
  location.href = "/page/my-pets/";
};

signupBtn.onclick = async () => {
  const res = await createUserWithEmailAndPassword(auth, email.value, password.value);

  await setDoc(doc(db, "users", res.user.uid), {
    plan: "free",
    pets: 0,
    created: Date.now()
  });

  location.href = "/page/my-pets/";
};
