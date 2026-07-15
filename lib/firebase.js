import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";




    const firebaseConfig = {

  apiKey: "AIzaSyBIg03vLynxDvmJbVstekR8Y3RFmKOHpXg",
 
  authDomain: "smart-missing-person-system.firebaseapp.com",

  projectId: "smart-missing-person-system",

  storageBucket: "smart-missing-person-system.firebasestorage.app",

  messagingSenderId: "404457168998",

  appId: "1:404457168998:web:3bae0fd9015e2cb7a0cda7",

  measurementId: "G-G1ZRHR9XDJ"

};
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
 
  

