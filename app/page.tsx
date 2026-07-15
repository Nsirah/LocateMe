'use client'

import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { PersonCard } from '@/components/person-card'
import { Search, AlertCircle, } from 'lucide-react'
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { FileText } from "lucide-react"; 

export default function Home() {
  const [featuredPersons, setFeaturedPersons] = useState([]);
  const [stats, setStats] = useState({
  missing: 0,
  found: 0,
  members: 0,
  reports: 0,
});

useEffect(() => {
  const fetchMissingPersons = async () => {
    try {
      const snapshot = await getDocs(collection(db, "missingPersons"));

      const persons = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setFeaturedPersons(persons);
    } catch (error) {
      console.error("Error loading missing persons:", error);
    }
  };

  fetchMissingPersons();
}, []);
  useEffect(() => {
  const fetchStats = async () => {
    const personsSnapshot = await getDocs(collection(db, "missingPersons"));
    const usersSnapshot = await getDocs(collection(db, "users"));

    const persons = personsSnapshot.docs.map(doc => doc.data());

    const missing = persons.filter(
      person => person.status === "Missing"
    ).length;

    const found = persons.filter(
      person => person.status === "Found"
    ).length;

    setStats({
      missing,
      found,
      members: usersSnapshot.size,
      reports: personsSnapshot.size,
    });
  };

  fetchStats();
}, []);  

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl opacity-20"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/20 rounded-full blur-3xl opacity-20"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Help Reunite Families
              </span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
              LocateMe is a humanitarian platform dedicated to finding missing persons and reuniting families. Search for loved ones, report sightings, and help bring people home.
            </p>

            {/* CTA Buttons */}
 
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link href="/report-missing-person">
             <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
              Report Missing Person
             </Button>
            </Link>

              <Link href="/search">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground group"
              >
                  <Search size={20} />
                  Search for Someone
              </Button>
               </Link>

               <Link href="/submit-sighting">
              <Button
                size="lg"
                variant="outline"
                className="border-secondary/50 hover:border-secondary hover:bg-secondary/5"
              >
    
                  <AlertCircle size={20} />
                  Report a Sighting
              </Button>
               </Link>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-card p-4 rounded-lg border border-border">
                <div className="text-2xl font-bold text-primary">{stats.missing}</div>
                <div className="text-xs text-muted-foreground">Missing Persons</div>
              </div>
              <div className="bg-card p-4 rounded-lg border border-border">
                <div className="text-2xl font-bold text-accent">{stats.found}</div>
                <div className="text-xs text-muted-foreground">Found</div>
              </div>
              <div className="bg-card p-4 rounded-lg border border-border">
                <div className="text-2xl font-bold text-secondary">{stats.members}</div>
                <div className="text-xs text-muted-foreground">Community Members</div>
              </div>
              <div className="bg-card p-4 rounded-lg border border-border">
                <div className="text-2xl font-bold text-green-500">{stats.reports}</div>
                <div className="text-xs text-muted-foreground">Reports</div>
              </div>
            </div>
          </div>   
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">How LocateMe Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-card p-8 rounded-lg border border-border hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Search className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Search Safely</h3>
              <p className="text-muted-foreground">
                Browse our comprehensive database of missing persons. Use advanced filters to search by region, age, and description.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-card p-8 rounded-lg border border-border hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                <AlertCircle className="text-secondary" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Report Sightings</h3>
              <p className="text-muted-foreground">
                If you spot someone missing, share your report instantly. Include photos and location details to help verify.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-card p-8 rounded-lg border border-border hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
              <FileText className="text-accent" size={24} />
              
              </div>
              <h3 className="text-xl font-bold mb-2">
  Report a Missing Person
</h3>

<p className="text-muted-foreground">
  Quickly submit a missing person report with photos, last known location, and identifying details to help the community locate them faster.
</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Missing Persons */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-2">Featured Cases</h2>
              <p className="text-muted-foreground">Recently reported missing persons</p>
            </div>
            <Link href="/search">
              <Button variant="outline">View All</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPersons.map((person) => (
              <PersonCard key={person.id} person={person} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Every Report Matters
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            You could be the one who helps reunite a family. Join our community of volunteers dedicated to bringing people home safely.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <Link href="/submit-sighting">Report a Sighting 
            <Button
              size="lg"
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
            >
            </Button>
            </Link>
             <Link href="/about">Learn More About Us
            <Button
              size="lg"
              variant="outline"
              className="border-primary/50"
            >
            </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
