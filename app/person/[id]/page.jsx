'use client'

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "@/lib/firebase";
import Image from "next/image";
import Link from "next/link";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import dynamic from "next/dynamic";

const LocationViewer = dynamic(
  () => import("@/components/LocationViewer"),
  { ssr: false }
);

export default function PersonDetails() {
  const { id } = useParams();

  const [person, setPerson] = useState(null);
  const [sightings, setSightings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showShare, setShowShare] = useState(false);

  useEffect(() => {
    async function fetchPerson() {
      try {
        const docRef = doc(db, "missingPersons", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setPerson({
            id: docSnap.id,
            ...docSnap.data(),
          });
        }

        const sightingsQuery = query(
  collection(db, "sightings"),
  where("personId", "==", id)
);

const sightingsSnapshot = await getDocs(sightingsQuery);

const sightingsData = sightingsSnapshot.docs.map((doc) => ({
  id: doc.id,
  ...doc.data(),
}));

setSightings(sightingsData);


      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchPerson();
    }
  }, [id]);

  if (loading) return <p className="p-8">Loading...</p>;

  if (!person) return <p className="p-8">Person not found.</p>;

  
   return (
  <div className="min-h-screen bg-background">

    <div className="max-w-6xl mx-auto px-6 py-10">

      <Link
        href="/"
        className="inline-flex items-center text-primary hover:underline mb-8"
      >
        ← Back to Home
      </Link>

      <div className="bg-card rounded-2xl shadow-xl border border-border overflow-hidden">

        <div className="space-y-8 ">

          {/* Image Section */}
          <div className="lg:col-span-2 bg-muted p-6 flex justify-center items-start">

           <img
  src={person.image || "/placeholder-logo.png"}
  alt={person.fullName}
  className="w-full max-w-sm h-[420px] object-cover rounded-xl shadow-lg"
/>

          </div>

          {/* Information */}
          <div className="lg:col-span-3 p-8">

            <span
  className={`inline-block px-4 py-1 rounded-full text-sm font-semibold mb-4 ${
    person.status === "Found"
      ? "bg-green-600 text-white"
      : "bg-red-600 text-white" 
  }`}
>
  {person.status}
</span>

            <h1 className="text-4xl font-bold mb-8">
               <p className="font-semibold">{person.fullName}</p>
            </h1>

            <div className="grid grid-cols-2 gap-4 mb-8">

              <div>
                <p className="text-gray-500">Age</p>
                <p className="font-semibold">{person.age}</p>
              </div>

              <div>
                <p className="text-gray-500">Gender</p>
                <p className="font-semibold">{person.gender}</p>
              </div>

              <div>
                <p className="text-gray-500">Date Missing</p>
                <p className="font-semibold">{person.dateMissing}</p>
              </div>

              <div>
                <p className="text-gray-500">Last Seen</p>
                <p className="font-semibold">{person.lastSeenLocation}</p>
              </div>

              <div>
  <p className="text-gray-500">Last Seen Date</p>
  <p className="font-semibold">{person.lastSeenDate || "Not Available"}</p>
</div>

<div>
  <p className="text-gray-500">Last Seen Time</p>
  <p className="font-semibold">{person.lastSeenTime || "Not Available"}</p>
</div>

<div>
  <p className="text-gray-500">City</p>
  <p className="font-semibold">{person.city || "Not Available"}</p>
</div>

<div>
  <p className="text-gray-500">Region</p>
  <p className="font-semibold">{person.region || "Not Available"}</p>
</div>

<div>
  <p className="text-gray-500">Nearest Landmark</p>
  <p className="font-semibold">{person.landmark || "Not Available"}</p>
</div>

<div>
  <p className="text-gray-500">Height</p>
  <p className="font-semibold">{person.height || "Not Available"} cm</p>
</div>

<div>
  <p className="text-gray-500">Weight</p>
  <p className="font-semibold">{person.weight || "Not Available"} kg</p>
</div>

<div>
  <p className="text-gray-500">Hair</p>
  <p className="font-semibold">{person.hair || "Not Available"}</p>
</div>

<div>
  <p className="text-gray-500">Eyes</p>
  <p className="font-semibold">{person.eyes || "Not Available"}</p>
</div>

<div>
  <p className="text-gray-500">Complexion</p>
  <p className="font-semibold">{person.complexion || "Not Available"}</p>
</div>

<div>
  <p className="text-gray-500">Distinguishing Marks</p>
  <p className="font-semibold">{person.marks || "None"}</p>
</div>

              <div>
                <p className="text-gray-500">Clothing</p>
                <p className="font-semibold">{person.clothing}</p>
              </div>

              <div>
                <p className="text-gray-500">Medical Condition</p>
                <p className="font-semibold">{person.medicalCondition || "None"}</p>
              </div>

            </div>

            <div className="mb-6">

              <h3 className="font-bold text-xl mb-2">
                Physical Description
              </h3>

              <p className="text-muted-foreground">
                {person.physicalDescription}
              </p>

            </div>

            <div className="mt-8">

  <h3 className="font-bold text-xl mb-4">
    Last Seen Location on Map
  </h3>

  <LocationViewer
    latitude={Number(person.latitude)}
    longitude={Number(person.longitude)}
  />

</div>

</div>


            <div className="border-t pt-8 mt-8">

              <h3 className="font-bold text-xl mb-4">
                Reporter Information
              </h3>

              <p><strong>Name:</strong> {person.reporterName}</p>
              <p><strong>Phone:</strong> {person.reporterPhone}</p>
              <p><strong>Email:</strong> {person.reporterEmail}</p>

            </div>

            <div className="border-t pt-8 mt-8">

  <h3 className="font-bold text-xl mb-4">
    Emergency Contact
  </h3>

  <p><strong>Name:</strong> {person.emergencyName || "Not Available"}</p>
  <p><strong>Phone:</strong> {person.emergencyPhone || "Not Available"}</p>

</div>

<div className="mt-10 border-t pt-10">
  <h3 className="font-bold text-2xl mb-6">
    Recent Sightings
  </h3>
{sightings.length === 0 ? (
  <p className="text-gray-500">
    No sightings have been reported yet.
  </p>
) : (
 sightings
  .filter((sighting) => sighting.status === "Confirmed")
  .map((sighting) => ( 
    <div
      key={sighting.id}
      className="border rounded-xl p-5 mb-6 bg-card"
    >
      {sighting.image && (
        <img
          src={sighting.image}
          alt="Sighting"
          className="w-full max-w-md rounded-lg mb-4"
        />
      )}

      <p><strong>Location:</strong> {sighting.location}</p>

<p><strong>Description:</strong> {sighting.description}</p>

<p><strong>Reported by:</strong> {sighting.reporterName}</p>

<p><strong>Phone:</strong> {sighting.reporterPhone}</p>

<p><strong>Email:</strong> {sighting.reporterEmail}</p>


      {sighting.latitude && sighting.longitude && (
        <div className="mt-4">
          <LocationViewer
            latitude={Number(sighting.latitude)}
            longitude={Number(sighting.longitude)}
          />
        </div>
      )}
    </div>
  ))
)}
 
</div>
 
            <div className="flex justify-center gap-4 mt-10">

              <Link
  href={`/submit-sighting?personId=${person.id}`}
  className="bg-primary text-white px-6 py-3 rounded-lg hover:opacity-90 transition"
>
  Report Sighting
</Link>

           <button
  type="button"
  onClick={() => setShowShare(!showShare)}
  className="border border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary hover:text-white transition"
>
  Share
</button>

{showShare && (

  <div className="mt-4 border rounded-xl p-4 bg-card shadow-lg">

    <h3 className="font-semibold mb-3">
      Share this report
    </h3>

    <div className="flex flex-wrap gap-3">

      <a
        href={`https://wa.me/?text=${encodeURIComponent(window.location.href)}`}
        target="_blank"
        className="px-4 py-2 rounded bg-green-600 text-white"
      >
        WhatsApp
      </a>

      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
        target="_blank"
        className="px-4 py-2 rounded bg-blue-600 text-white"
      >
        Facebook
      </a>

      <a
        href={`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}`}
        target="_blank"
        className="px-4 py-2 rounded bg-sky-500 text-white"
      >
        Telegram
      </a>

      <a
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`}
        target="_blank"
        className="px-4 py-2 rounded bg-black text-white"
      >
        X
      </a>

    </div>

  </div>

)}
            </div>

          </div>

        </div>

      </div>

    </div>


)
}
 