import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";
import { auth } from "./firebase";

export async function saveMissingPerson(data) {
  return await addDoc(
    collection(db, "missingPersons"),
    {
      ...data,
   reporterId: auth.currentUser ? auth.currentUser.uid : null,
      status: "Missing",
      found: false,
      createdAt: serverTimestamp()
    }
  );
}