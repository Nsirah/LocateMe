import {
  collection,
  getDocs
} from "firebase/firestore";

import { db } from "./firebase";

export async function getMissingPersons() {

  const snapshot = await getDocs(collection(db, "missingPersons"));

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

}