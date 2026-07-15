'use client'

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import dynamic from "next/dynamic";

const LocationPicker = dynamic(
  () => import("@/components/LocationPicker"),
  { ssr: false }
);

import { db } from "@/lib/firebase";

import {
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

export default function EditReportPage() {

  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    gender: "",
    region: "",
    city: "",
    physicalDescription: "",
    status: "Missing",
  });
  useEffect(() => {

    async function fetchReport() {

      try {

        const docRef = doc(db, "missingPersons", id);

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {

          const data = docSnap.data();

         setFormData({
  fullName: data.fullName || "",
  age: data.age || "",
  gender: data.gender || "",
  region: data.region || "",
  city: data.city || "",
  lastSeenLocation: data.lastSeenLocation || "",
  landmark: data.landmark || "",
  physicalDescription: data.physicalDescription || "",
  latitude: data.latitude || "",
  longitude: data.longitude || "",
  status: data.status || "Missing",
});

        }

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    }

    if (id) {
      fetchReport();
    }

  }, [id]);
  const handleSave = async (e) => {

    e.preventDefault();

    try {

      const docRef = doc(db, "missingPersons", id);

      await updateDoc(docRef, {
        ...formData,
      });

      alert("Report updated successfully!");

      router.push("/dashboard");

    } catch (error) {

      console.error(error);

      alert("Failed to update report.");

    }

  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-background">

      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-10">

        <h1 className="text-4xl font-bold mb-2">
          Edit Missing Person Report
        </h1>

        <p className="text-muted-foreground mb-8">
          Update the information below and save your changes.
        </p>

        <form
          onSubmit={handleSave}
          className="bg-card border border-border rounded-xl p-8 space-y-6"
        >

          <div>
            <label className="block font-medium mb-2">
              Full Name
            </label>

            <input
              type="text"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  fullName: e.target.value,
                })
              }
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              Age
            </label>

            <input
              type="number"
              value={formData.age}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  age: e.target.value,
                })
              }
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              Gender
            </label>

            <select
              value={formData.gender}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  gender: e.target.value,
                })
              }
              className="w-full border rounded-lg p-3"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-2">
              Region
            </label>

            <input
              type="text"
              value={formData.region}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  region: e.target.value,
                })
              }
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              City
            </label>

            <input
              type="text"
              value={formData.city}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  city: e.target.value,
                })
              }
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
  <label className="block font-medium mb-2">
    Last Seen Location
  </label>

  <input
    type="text"
    value={formData.lastSeenLocation}
    onChange={(e) =>
      setFormData({
        ...formData,
        lastSeenLocation: e.target.value,
      })
    }
    className="w-full border rounded-lg p-3"
  />
</div>

<div>
  <label className="block font-medium mb-2">
    Landmark
  </label>

  <input
    type="text"
    value={formData.landmark}
    onChange={(e) =>
      setFormData({
        ...formData,
        landmark: e.target.value,
      })
    }
    className="w-full border rounded-lg p-3"
  />
</div>

<div>

  <label className="block font-medium mb-2">
    Update Last Seen Location on Map
  </label>

  <LocationPicker
    onLocationSelect={(coords) =>

      setFormData({
        ...formData,
        latitude: coords.lat,
        longitude: coords.lng,
      })

    }
  />

</div>

          <div>
            <label className="block font-medium mb-2">
              Physical Description
            </label>

            <textarea
              rows={4}
              value={formData.physicalDescription}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  physicalDescription: e.target.value,
                })
              }
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              Status
            </label>

            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value,
                })
              }
              className="w-full border rounded-lg p-3"
            >
              <option value="Missing">Missing</option>
              <option value="Found">Found</option>
            </select>
          </div>

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={() => router.push("/dashboard")}
              className="px-6 py-3 border rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Save Changes
            </button>

          </div>

        </form>

      </main>

      <Footer />

    </div>
  );
}
