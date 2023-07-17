import { initializeApp, FirebaseApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDiL-Z_F6rMmeJ_FVF9aHTZ3gh6B-06piY",
  authDomain: "gamelist-2797f.firebaseapp.com",
  projectId: "gamelist-2797f",
  storageBucket: "gamelist-2797f.appspot.com",
  messagingSenderId: "377982854948",
  appId: "1:377982854948:web:a6b7fa1733b39af18575b1"
};

const app: FirebaseApp = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);

export { auth, db };