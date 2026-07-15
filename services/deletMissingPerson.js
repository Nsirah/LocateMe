import {
  deleteDoc,
  doc
} from "firebase/firestore";

import { db } from "./firebase";

export async function deleteMissingPerson(id) {

  await deleteDoc(doc(db, "missingPersons", id));

}