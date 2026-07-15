import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "./firebase";

export async function saveMissingPerson(data) {

  await addDoc(
    collection(db, "missingPersons"),
    {
      ...data,
      status: "Missing",
      createdAt: serverTimestamp(),
      found: false
    }
  );

}