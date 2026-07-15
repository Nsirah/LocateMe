import {
  doc,
  updateDoc
} from "firebase/firestore";

import { db } from "./firebase";

export async function markPersonFound(id) {

  const personRef = doc(db, "missingPersons", id);

  await updateDoc(personRef, {
    found: true,
    status: "Found",
    foundDate: new Date()
  });

}