'use client'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  collection,
  query,
  where,
  updateDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

export default function DashboardPage() {
    const [myReports, setMyReports] = useState([]);
    const [notifications, setNotifications] = useState([]);
useEffect(() => {
   

  const unsubscribe = onAuthStateChanged(auth, async (user) => {

    if (!user) {
      setMyReports([]);
      return;
    }
    console.log("Logged in UID:", user.uid);

    const q = query(
      collection(db, "missingPersons"),
      where("reporterId", "==", user.uid)
    );

    const querySnapshot = await getDocs(q);
    console.log("Number of reports:", querySnapshot.size);
console.log(querySnapshot.docs.map(doc => doc.data()));


    const reports = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    setMyReports(reports);

    const notificationQuery = query(
  collection(db, "notifications"),
  where("reporterId", "==", user.uid)
);

const notificationSnapshot = await getDocs(notificationQuery);

const notificationData = notificationSnapshot.docs.map(doc => ({
  id: doc.id,
  ...doc.data(),
}));

setNotifications(notificationData);

  });

  return () => unsubscribe();

}, []);

    const handleDelete = async (reportId) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this report?"
  );

  if (!confirmDelete) return;

  try {

    await deleteDoc(doc(db, "missingPersons", reportId));

    setMyReports(
      myReports.filter(report => report.id !== reportId)
    );

    alert("Report deleted successfully!");

  } catch (error) {

    console.error(error);

    alert("Failed to delete report.");

  }

};

const handleFound = async (notification) => {

  try {

    await updateDoc(
      doc(db, "missingPersons", notification.reportId),
      {
        status: "Found",
      }
    );

    await deleteDoc(
      doc(db, "notifications", notification.id)
    );

    setNotifications(prev =>
      prev.filter(n => n.id !== notification.id)
    );

    alert("Case updated successfully!");

  } catch (error) {

    console.error(error);

    alert("Failed to update case.");

  }

};

const router = useRouter();

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (!user) {
      router.push("/login");
    }
  });

  return () => unsubscribe();
}, [router]);


  return (



    <div className="min-h-screen bg-background">

      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-10">

        {notifications.length > 0 && (

  <div className="mb-10 bg-yellow-50 border border-yellow-300 rounded-xl p-6">

    <h2 className="text-xl font-bold mb-4">
      🔔 Follow-up Notifications
    </h2>

    {notifications.map((notification) => (

      <div
        key={notification.id}
        className="border rounded-lg p-4 mb-4 bg-white"
      >

        <p className="mb-4">
          {notification.message}
        </p>

        <div className="flex gap-3">

        <button
  onClick={() => handleFound(notification)}
  className="bg-green-600 text-white px-4 py-2 rounded-lg"
>
  Yes, Found
</button>

          <button
            className="bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            No, Still Missing
          </button>

        </div>

      </div>

    ))}

  </div>

)}


        {/* Page Title */}
        <h1 className="text-4xl font-bold">
          Reporter Dashboard
        </h1>

        <p className="text-muted-foreground mt-2">
          Manage your reports and help reunite families.
        </p>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">

          <div className="bg-card border border-border rounded-xl p-6">
           <h2 className="text-3xl font-bold text-primary">
  {myReports.length}
</h2>
            <p className="text-muted-foreground mt-2">
              My Reports
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-3xl font-bold text-red-500">{myReports.filter(report => report.status === "Missing").length}
                </h2>
            <p className="text-muted-foreground mt-2">
              Active Cases
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-3xl font-bold text-green-500">{myReports.filter(report => report.status === "Found").length}
                </h2>
            <p className="text-muted-foreground mt-2">
              Found Cases
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-3xl font-bold text-blue-500">0</h2>
            <p className="text-muted-foreground mt-2">
              Sighting Reports
            </p>
          </div>

        </div>

        {/* Quick Actions */}
        <div className="mt-12">

          <h2 className="text-2xl font-bold mb-6">
            Quick Actions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <a
              href="/report-missing-person"
              className="bg-card border border-border rounded-xl p-6 min-h-[170px] hover:border-primary transition"
            >
              <h3 className="font-bold text-lg">
                Report Missing Person
              </h3>

              <p className="text-sm text-muted-foreground mt-2">
                Submit a new missing person report.
              </p>
            </a>

            <a
              href="/submit-sighting"
              className="bg-card border border-border rounded-xl p-6 min-h-[170px] hover:border-primary transition"
            >
              <h3 className="font-bold text-lg">
                Report a Sighting
              </h3>

              <p className="text-sm text-muted-foreground mt-2">
                Report where you have seen a missing person.
              </p>
            </a>

            <a
              href="/profile"
              className="bg-card border border-border rounded-xl p-6 min-h-[170px] hover:border-primary transition"
            >
              <h3 className="font-bold text-lg">
                My Profile
              </h3>

              <p className="text-sm text-muted-foreground mt-2">
                Update your account information.
              </p>
            </a>

            <a
              href="/search"
              className="bg-card border border-border rounded-xl p-6 min-h-[170px] hover:border-primary transition"
            >
              <h3 className="font-bold text-lg">
                Search Cases
              </h3>

              <p className="text-sm text-muted-foreground mt-2">
                Browse missing person reports.
              </p>
            </a>

          </div>

        </div>
          {/* My Reports */}
<div className="mt-16">

  <h2 className="text-2xl font-bold mb-6">
    My Reports
  </h2>

  <div className="bg-card border border-border rounded-xl p-6">

  {myReports.length === 0 ? (

    <p className="text-center text-muted-foreground">
      You haven't reported any missing persons yet.
    </p>

  ) : (

    <div className="space-y-4">

      {myReports.map((report) => (

        <div
          key={report.id}
          className="flex items-center justify-between border border-border rounded-lg p-4"
        >

          <div>
            <h3 className="font-bold text-lg">
              {report.fullName}
            </h3>

            <p className="text-sm text-muted-foreground">
              {report.city}, {report.region}
            </p>

            <p className="text-sm">
              Status: {report.status}
            </p>
          </div>

          <div className="flex gap-2">

            <button className="px-4 py-2 rounded border">
              View
            </button>

            <Link href={`/edit-report/${report.id}`}>
  <button className="px-4 py-2 rounded border hover:bg-primary hover:text-white transition">
    Edit
  </button>
</Link>

           <button
  onClick={() => handleDelete(report.id)}
  className="px-4 py-2 rounded border text-red-600 hover:bg-red-600 hover:text-white transition"
>
  Delete
</button>

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
  )
}