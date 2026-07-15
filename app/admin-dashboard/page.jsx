'use client'

import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
  addDoc,
  serverTimestamp,
  query,
  where,
} from "firebase/firestore";
import Link from "next/link";

export default function AdminDashboard() {

  const [stats, setStats] = useState({
    totalReports: 0,
    missingCases: 0,
    foundCases: 0,
  });

  const [reports, setReports] = useState([]);
  const [sightings, setSightings] = useState([]);

  
  useEffect(() => {

    async function fetchStats() {

      try {

        const reportsSnapshot = await getDocs(
          collection(db, "missingPersons")
        );

        const reportsData = reportsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setReports(reportsData);
        const sightingsSnapshot = await getDocs(
  collection(db, "sightings")
);

const sightingsData = await Promise.all(
  sightingsSnapshot.docs.map(async (docSnap) => {
    const sighting = {
      id: docSnap.id,
      ...docSnap.data(),
    };

    let personName = "Unknown Person";

    if (sighting.personId) {
      const personDoc = await getDoc(
        doc(db, "missingPersons", sighting.personId)
      );

      if (personDoc.exists()) {
        personName = personDoc.data().fullName;
      }
    }

    return {
      ...sighting,
      personName,
    };
  })
);

setSightings(sightingsData);

        setStats({
          totalReports: reportsData.length,
          missingCases: reportsData.filter(
            report => report.status === "Missing"
          ).length,
          foundCases: reportsData.filter(
            report => report.status === "Found"
          ).length,
        });

      } catch (error) {

        console.error(error);

      }

    }

    fetchStats();

  }, []);

  const handleDelete = async (reportId) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this report?"
  );

  if (!confirmDelete) return;

  try {

    await deleteDoc(doc(db, "missingPersons", reportId));

    const updatedReports = reports.filter(
      report => report.id !== reportId
    );

    setReports(updatedReports);

    setStats({
      totalReports: updatedReports.length,
      missingCases: updatedReports.filter(
        report => report.status === "Missing"
      ).length,
      foundCases: updatedReports.filter(
        report => report.status === "Found"
      ).length,
    });

    alert("Report deleted successfully!");

  } catch (error) {

    console.error(error);

    alert("Failed to delete report.");

  }

};

const handleFollowUp = async (report) => {

  try {

    await addDoc(collection(db, "notifications"), {
  reporterId: report.reporterId,
  reportId: report.id,
  personName: report.fullName,
  message:`It has been approximately 3 months since you reported ${report.fullName} as missing. Has the person been found?`,
  status: "pending",
  createdAt: serverTimestamp(),
});


    alert("Follow-up request sent successfully!");

  } catch (error) {

  console.error("Follow-up Error:", error);

  alert(error.message);

}

};

const handleConfirmSighting = async (sightingId) => {
  try {
    await updateDoc(doc(db, "sightings", sightingId), {
      status: "Confirmed",
    });

    setSightings(
      sightings.map((sighting) =>
        sighting.id === sightingId
          ? { ...sighting, status: "Confirmed" }
          : sighting
      )
    );

    alert("Sighting confirmed successfully!");

  } catch (error) {
    console.error(error);
    alert("Failed to confirm sighting.");
  }
};



const handleMarkAsFound = async (reportId) => {
  try {
    await updateDoc(doc(db, "missingPersons", reportId), {
      status: "Found",
    });

    setReports(
      reports.map((report) =>
        report.id === reportId
          ? { ...report, status: "Found" }
          : report
      )
    );

    alert("Person marked as Found successfully!");

  } catch (error) {
    console.error(error);
    alert("Failed to update status.");
  }
};

  return (
    <div className="min-h-screen bg-background">

      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-10">

        <h1 className="text-4xl font-bold">
          Admin Dashboard
        </h1>

        <p className="text-muted-foreground mt-2">
          Manage reports and monitor the LocateMe system.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

          <div className="bg-card border rounded-xl p-6">
            <h2 className="text-3xl font-bold text-blue-600">
              {stats.totalReports}
            </h2>
            <p>Total Reports</p>
          </div>

          <div className="bg-card border rounded-xl p-6">
            <h2 className="text-3xl font-bold text-red-600">
              {stats.missingCases}
            </h2>
            <p>Missing Cases</p>
          </div>

          <div className="bg-card border rounded-xl p-6">
            <h2 className="text-3xl font-bold text-green-600">
              {stats.foundCases}
            </h2>
            <p>Found Cases</p>
          </div>

        </div>
                  <div className="mt-12">

  <h2 className="text-2xl font-bold mb-6">
    Reported Sightings
  </h2>

  <div className="space-y-4">

    {sightings.map((sighting) => (

      <div
        key={sighting.id}
        className="border rounded-lg p-5 flex justify-between items-center"
      >

        <div>
           <p><strong>Missing Person:</strong> {sighting.personName}</p>
          <p><strong>Location:</strong> {sighting.location}</p>
          <p><strong>Reporter:</strong> {sighting.reporterName}</p>
         
          <div className="flex gap-2 mt-4">
  <button
    onClick={() => handleConfirmSighting(sighting.id)}
    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
  >
    Confirmed
  </button>

  <button
    onClick={() => handleRejectSighting(sighting.id)}
    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
  >
    Rejected
  </button>
</div>
        </div>

        <Link href={`/person/${sighting.personId}`}>
  <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
    View Report
  </button>
</Link>

      </div>

    ))}

  </div>

</div>
        <div className="mt-12">

          <h2 className="text-2xl font-bold mb-6">
            All Missing Person Reports
          </h2>


          <div className="bg-card border rounded-xl p-6">

            {reports.length === 0 ? (

              <p className="text-muted-foreground">
                No reports found.
              </p>

            ) : (

              <div className="space-y-4">

                {reports.map((report) => (

                  <div
                    key={report.id}
                    className="flex items-center justify-between border rounded-lg p-4"
                  >

                    <div>

                      <h3 className="font-bold text-lg">
                        {report.fullName}
                      </h3>

                      <p className="text-sm text-muted-foreground">
                        {report.city}, {report.region}
                      </p>

                      <p className="text-sm">
                        Status: <strong>{report.status}</strong>
                      </p>

                    </div>

                  <div className="flex gap-2">

  <Link href={`/person/${report.id}`}>
    <button className="border rounded px-4 py-2 hover:bg-gray-100">
      View
    </button>
  </Link>

  <Link href={`/edit-report/${report.id}`}>
    <button className="border rounded px-4 py-2 hover:bg-blue-600 hover:text-white">
      Edit
    </button>
  </Link>

  <button
    onClick={() => handleDelete(report.id)}
    className="border rounded px-4 py-2 text-red-600 hover:bg-red-600 hover:text-white"
  >
    Delete
  </button>

 <button
  onClick={() => handleFollowUp(report)}
  className="border rounded px-4 py-2 bg-primary text-white hover:bg-primary/90"
>
  Follow-up
</button>

{report.status !== "Found" && (
  <button
    onClick={() => handleMarkAsFound(report.id)}
    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
  >
    Mark as Found
  </button>
)}

</div>
  </div>
 

 ))}

  </div>

          )}

          </div>

        </div>

      </main>

      <Footer />

    </div>

  );

}