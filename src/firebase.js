import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC505Or0rFxCINm-kPOfYYtL2-2V_vEMls",
  authDomain: "freedom-wall-eb0a2.firebaseapp.com",
  projectId: "freedom-wall-eb0a2",
  storageBucket: "freedom-wall-eb0a2.firebasestorage.app",
  messagingSenderId: "731250924132",
  appId: "1:731250924132:web:cff24d2e0994a9c17bdd71",
  measurementId: "G-HDYRJ6V041"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, signInAnonymously };