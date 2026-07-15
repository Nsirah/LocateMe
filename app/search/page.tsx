'use client'

import { useState, useMemo, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { PersonCard } from '@/components/person-card'
import { Button } from '@/components/ui/button'
import { Search, Filter, X } from 'lucide-react'
import { db } from '@/lib/firebase'

export default function SearchPage() {

  const [persons, setPersons] = useState([])

  const [searchTerm, setSearchTerm] = useState('')

  const [selectedRegion, setSelectedRegion] = useState('all')

  const [selectedCity, setSelectedCity] = useState('all')

  const [selectedStatus, setSelectedStatus] = useState('all')

  const [savedReports, setSavedReports] = useState(new Set())

  useEffect(() => {

  const fetchPersons = async () => {

    try {

      const snapshot = await getDocs(
        collection(db, "missingPersons")
      )

      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))

      data.sort((a, b) => {

        if (!a.createdAt || !b.createdAt)
          return 0

        return (
          b.createdAt.seconds -
          a.createdAt.seconds
        )

      })

      setPersons(data)

    } catch (error) {

      console.error(error)

    }

  }

  fetchPersons()

}, [])

const regions = [

  "all",

  ...new Set(

    persons

      .map(person => person.region)

      .filter(Boolean)

  )

]

const cities = [

  "all",

  ...new Set(

    persons

      .map(person => person.city)

      .filter(Boolean)

  )

]

const statuses = [

  "all",

  "Missing",

  "Found"

]
const filteredPersons = useMemo(() => {

  return persons.filter((person) => {

    const search = searchTerm.toLowerCase();

    const matchesSearch =
  (person.fullName || "").toLowerCase().includes(search) ||
  String(person.age || "").includes(searchTerm) ||
  (person.region || "").toLowerCase().includes(search) ||
  (person.city || "").toLowerCase().includes(search) ||
  (person.lastSeenLocation || "").toLowerCase().includes(search) ||
  (person.physicalDescription || "").toLowerCase().includes(search); 

    const matchesRegion =
      selectedRegion === "all" ||
      person.region === selectedRegion;

    const matchesCity =
      selectedCity === "all" ||
      person.city === selectedCity;

    const matchesStatus =
      selectedStatus === "all" ||
      person.status === selectedStatus;

    return (
      matchesSearch &&
      matchesRegion &&
      matchesCity &&
      matchesStatus
    );

  });

}, [
  persons,
  searchTerm,
  selectedRegion,
  selectedCity,
  selectedStatus
]);

const handleSaveReport = (id) => {

  const newSaved = new Set(savedReports)

  if (newSaved.has(id)) {
    newSaved.delete(id)
  } else {
    newSaved.add(id)
  }

  setSavedReports(newSaved)

}

const handleClearFilters = () => {

  setSearchTerm("")

  setSelectedRegion("all")

  setSelectedCity("all")

  setSelectedStatus("all")

}

const hasActiveFilters =
  searchTerm ||
  selectedRegion !== "all" ||
  selectedCity !== "all" ||
  selectedStatus !== "all";

return (
  <div className="flex flex-col min-h-screen">

    <Navbar />

    {/* Header */}
    <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-12">
      <div className="max-w-7xl mx-auto px-4">

        <h1 className="text-4xl font-bold mb-2">
          Search Missing Persons
        </h1>

        <p className="text-muted-foreground">
          Search by name, age, region, city, last seen location or description.
        </p>

      </div>
    </section>

    {/* Search */}
    <section className="py-8 border-b">

      <div className="max-w-7xl mx-auto px-4">

        <div className="relative mb-6">

          <Search
            size={20}
            className="absolute left-4 top-4 text-muted-foreground"
          />

          <input
            type="text"
            placeholder="Search by name, age, city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border rounded-lg"
          />

        </div>

        <div className="grid md:grid-cols-4 gap-4">

          {/* Region */}
        <div>
          <label className="text-sm font-semibold mb-2 block">
            Region
          </label>

          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="w-full p-3 border rounded-lg"
          >
            {regions.map((region) => (
              <option key={region} value={region}>
                {region === "all" ? "All Regions" : region}
              </option>
            ))}
          </select>
        </div>

        {/* City */}
        <div>
          <label className="text-sm font-semibold mb-2 block">
            City
          </label>

          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full p-3 border rounded-lg"
          >
            {cities.map((city) => (
              <option key={city} value={city}>
                {city === "all" ? "All Cities" : city}
              </option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="text-sm font-semibold mb-2 block">
            Status
          </label>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full p-3 border rounded-lg"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {/* Clear */}
        <div className="flex items-end">
          {hasActiveFilters ? (
            <Button
              onClick={handleClearFilters}
              variant="outline"
              className="w-full"
            >
              <X size={18} className="mr-2" />
              Clear Filters
            </Button>
          ) : (
            <div className="w-full text-center text-muted-foreground py-3">
              No active filters
            </div>
          )}
        </div>

      </div>

    </div>

  </section>

  {/* Results */}
    <section className="flex-1 py-12">

      <div className="max-w-7xl mx-auto px-4">

        <div className="mb-8">

          <p className="text-sm text-muted-foreground">

            Showing

            <span className="font-bold text-primary">
              {" "}
              {filteredPersons.length}
            </span>

            {" "}report{filteredPersons.length !== 1 ? "s" : ""}

          </p>

        </div>

        {filteredPersons.length > 0 ? (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {filteredPersons.map((person) => (

              <PersonCard
                key={person.id}
                person={person}
                onSave={handleSaveReport}
                isSaved={savedReports.has(person.id)}
              />

            ))}

          </div>

        ) : (

          <div className="bg-card border border-border rounded-xl p-12 text-center">

            <Filter
              size={60}
              className="mx-auto text-muted-foreground mb-5 opacity-50"
            />

            <h2 className="text-2xl font-bold mb-3">
              No Missing Person Found
            </h2>

            <p className="text-muted-foreground mb-6">
              Try searching using another name, age, city, region or status.
            </p>

            <Button
              onClick={handleClearFilters}
              variant="outline"
            >
              Clear All Filters
            </Button>

          </div>

        )}

      </div>

    </section>

    <Footer />

  </div>
)
}

        
