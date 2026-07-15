'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Button } from '@/components/ui/button'
import dynamic from "next/dynamic";

const LocationViewer = dynamic(
  () => import("@/components/LocationViewer"),
  { ssr: false }
);

const LocationPicker = dynamic(
  () => import("@/components/LocationPicker"),
  { ssr: false }
);
import ImageUploader from "@/app/report-missing-person/components/ImageUploader";
import { collection, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { AlertCircle, MapPin, User, Phone, Mail, Image as ImageIcon, Check } from 'lucide-react'


export default function SubmitSightingPage() {
  const [formData, setFormData] = useState({
    personId: '',
    location: '',
    description: '',
    reporterName: '',
    reporterPhone: '',
    reporterEmail: '',
     image: '',
    latitude: '',
    longitude: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [persons, setPersons] = useState([]);
  useEffect(() => {

  async function loadPersons() {

    const snapshot = await getDocs(collection(db, "missingPersons"));

    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    setPersons(data);
  }

  loadPersons();

}, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target

   setFormData(prev => ({
  ...prev,
  [name]: value,
  
}));
};

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    setIsLoading(true);

    console.log("Submitting sighting...", formData);

    await addDoc(collection(db, "sightings"), {
      personId: formData.personId,
      location: formData.location,
      description: formData.description,
      reporterName: formData.reporterName,
      reporterPhone: formData.reporterPhone,
      reporterEmail: formData.reporterEmail,
      image: formData.image,
     latitude: formData.latitude,
      longitude: formData.longitude,
      status: "Pending",
      createdAt: serverTimestamp(),
    });

    console.log("Sighting saved successfully!");

    setSubmitted(true);

    setFormData({
      personId: "",
      location: "",
      description: "",
      reporterName: "",
      reporterPhone: "",
      reporterEmail: "",
      image:"",
      latitude: "",
      longitude: "",
    });

  } catch (error) {
    console.error("Firestore Error:", error);
    alert("Failed to submit sighting.");
  } finally {
    setIsLoading(false);
  }
};
  const isFormValid = formData.personId && formData.location && formData.description && 
                      formData.reporterName && formData.reporterPhone && formData.reporterEmail

      useEffect(() => {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by this browser.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      setFormData((prev) => ({
        ...prev,
        latitude: String(position.coords.latitude),
        longitude: String(position.coords.longitude),
      }));
    },
(error) => {
  alert(`GPS Error ${error.code}: ${error.message}`);
  console.log(error);
}
  );
}, []);

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
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Page Header */}
      <section className="bg-gradient-to-r from-secondary/10 to-primary/10 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <AlertCircle className="text-secondary" size={24} />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-2">Report a Sighting</h1>
              <p className="text-muted-foreground">
                Your report could help reunite a family. Please provide detailed information about what you witnessed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="flex-1 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {submitted ? (
            // Success Message
            <div className="bg-card border-2 border-green-500/50 rounded-lg p-12 text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="text-green-500" size={32} />
              </div>
              <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
              <p className="text-muted-foreground mb-6">
                Your sighting report has been submitted successfully. Our team will verify and process it shortly.
              </p>
              <p className="text-sm text-muted-foreground">
                You will receive a confirmation email at <span className="font-semibold">{formData.reporterEmail}</span>
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Step 1: Select Person */}
              <div className="bg-card border border-border rounded-lg p-8">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  Select the Missing Person
                </h2>
                <div>
                  <label className="block text-sm font-semibold mb-3">Who did you see?</label>
                  <select
                    name="personId"
                    value={formData.personId}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">-- Select a person --</option>

{persons.map((person) => (
  <option key={person.id} value={person.id}>
    {person.fullName} ({person.age} yrs, {person.region})
  </option>
))}
</select>

                </div>
              </div>

              {/* Step 2: Sighting Details */}
              <div className="bg-card border border-border rounded-lg p-8">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  Sighting Details
                </h2>
                <div className="space-y-4">
                  {/* Location */}
                  <div>
                    <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
                      <MapPin size={16} />
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="Where did you see this person?"
                      required
                      className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

   <h3 className="font-semibold mt-6 mb-2">
  Select the sighting location
</h3>

<LocationPicker
  onLocationSelect={(coords) => {
    setFormData((prev) => ({
      ...prev,
      latitude: String(coords.lat),
      longitude: String(coords.lng),
    }));
  }}
/>

<h3 className="font-semibold mt-6 mb-2">
  Selected Location
</h3>


                  {/* Description */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">Description of Sighting</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Please describe what you saw. Include details about their appearance, behavior, what they were wearing, etc."
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    />
                  </div>

                  {/* Photo Upload Note */}
                  <div>
  <label className="block font-medium mb-2">
    Upload Sighting Photo
  </label>

  <ImageUploader
    onImageUploaded={(imageUrl) =>
      setFormData((prev) => ({
        ...prev,
        image: imageUrl,
      }))
    }
  />
</div>

                 
                </div>
              </div>

              {/* Step 3: Your Information */}
              <div className="bg-card border border-border rounded-lg p-8">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  Your Information
                </h2>
                <div className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
                      <User size={16} />
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="reporterName"
                      value={formData.reporterName}
                      onChange={handleChange}
                      placeholder="Full name"
                      required
                      className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
                      <Phone size={16} />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="reporterPhone"
                      value={formData.reporterPhone}
                      onChange={handleChange}
                      placeholder="+237...."
                      required
                      className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
                      <Mail size={16} />
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="reporterEmail"
                      value={formData.reporterEmail}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      required
                      className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <p className="text-xs text-muted-foreground">
                    Your contact information will only be used to verify your report and contact you with updates.
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4">
                <Button
                  type="submit"
                  disabled={!isFormValid || isLoading}
                  className="flex-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                  size="lg"
                >
                  {isLoading ? 'Submitting...' : 'Submit Sighting Report'}
                </Button>
                 <Link href="/search">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                >
                  Back to Search
                </Button>
                </Link>
              </div>

              {/* Legal Notice */}
              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <p className="text-xs text-muted-foreground">
                  By submitting this report, you confirm that all information provided is truthful and accurate to the best of your knowledge. 
                  False reports may result in legal consequences. Reports are reviewed by our verification team before publication.
                </p>
              </div>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
