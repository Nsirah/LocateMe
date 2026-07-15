'use client'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import MissingPersonInformation from './components/MissingPersonInformation'

export default function ReportMissingPersonPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="py-12">
        <div className="container mx-auto max-w-5xl px-4">

          {/* Page Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold">
              Report a Missing Person
            </h1>

            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              Help reunite families by providing accurate information about a missing person.
              Fields marked <span className="text-destructive font-semibold">*</span> are required.
            </p>
          </div>

          {/* Step 1 */}
          <MissingPersonInformation />

        </div>
      </section>

      <Footer />
    </div>
  )
}