import {
  collection,
  getDocs
} from "firebase/firestore";

import { db } from "./firebase";

export async function searchMissingPersons(keyword) {

  const snapshot = await getDocs(collection(db, "missingPersons"));

  const people = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

  return people.filter(person =>
    person.fullName
      ?.toLowerCase()
      .includes(keyword.toLowerCase())
  );

}