'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { mockUsers, mockMissingPersons } from '@/lib/mock-data'
import { User, Mail, Phone, Edit2, LogOut, Heart, Share2 } from 'lucide-react'

export default function ProfilePage() {
  const [currentUser] = useState(mockUsers[0])
  const [editMode, setEditMode] = useState(false)
  
  const savedPersons = mockMissingPersons.filter(p => currentUser.savedReports.includes(p.id))

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Page Header */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">My Profile</h1>
          <p className="text-muted-foreground">Manage your account and saved reports</p>
        </div>
      </section>

      {/* Profile Content */}
      <section className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Profile Card */}
              <div className="bg-card border border-border rounded-lg p-8 text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto mb-4 flex items-center justify-center text-white">
                  <User size={48} />
                </div>
                <h2 className="text-2xl font-bold mb-1">{currentUser.name}</h2>
                <p className="text-muted-foreground mb-6">Member since 2024</p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail size={16} />
                    <span className="text-sm">{currentUser.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone size={16} />
                    <span className="text-sm">{currentUser.phone}</span>
                  </div>
                </div>

                <Button
                  onClick={() => setEditMode(!editMode)}
                  className="w-full mb-2 gap-2 bg-primary hover:bg-primary/90"
                >
                  <Edit2 size={16} />
                  {editMode ? 'Cancel' : 'Edit Profile'}
                </Button>
                 <Link href="/">
                <Button
                  variant="outline"
                  className="w-full gap-2"
                >
                    <LogOut size={16} />
                    Logout
                </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-card border border-border rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-primary">{currentUser.submittedSightings.length}</div>
                  <p className="text-xs text-muted-foreground mt-1">Sightings Reported</p>
                </div>
                <div className="bg-card border border-border rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-accent">{currentUser.savedReports.length}</div>
                  <p className="text-xs text-muted-foreground mt-1">Saved Reports</p>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Saved Reports Section */}
              <div>
                <h3 className="text-2xl font-bold mb-6">Saved Reports ({currentUser.savedReports.length})</h3>

                {savedPersons.length > 0 ? (
                  <div className="space-y-4">
                    {savedPersons.map(person => (
                      <div key={person.id} className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
                        <div className="flex gap-6">
                          {/* Avatar */}
                          <div className="w-20 h-20 bg-muted rounded-lg flex-shrink-0 overflow-hidden">
                            <img 
                              src={person.photo} 
                              alt={person.name}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {/* Info */}
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h4 className="font-bold text-lg">{person.name}</h4>
                                <p className="text-sm text-muted-foreground">{person.age} years old, {person.region} Region</p>
                              </div>
                              <span className={`text-xs px-3 py-1 rounded-full ${
                                person.status === 'missing' ? 'bg-destructive/20 text-destructive' :
                                person.status === 'found' ? 'bg-accent/20 text-accent' :
                                'bg-green-500/20 text-green-600'
                              }`}>
                                {person.status === 'confirmed-found' ? 'Found' : person.status}
                              </span>
                            </div>

                            <p className="text-sm text-muted-foreground mb-4">
                              Last seen: {person.lastSeenLocation}
                            </p>

                            <div className="flex gap-2">
                               <Link href={`/person/${person.id}`}>
                              <Button
                               size="sm" 
                               variant="outline">
                                  View Details
                              </Button>
                              </Link>
                              <Button size="sm" variant="outline" className="gap-1">
                                <Share2 size={14} />
                                Share
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-card border border-border rounded-lg p-12 text-center">
                    <Heart className="mx-auto text-muted-foreground mb-4 opacity-50" size={48} />
                    <h4 className="font-semibold mb-2">No Saved Reports</h4>
                    <p className="text-muted-foreground mb-6">
                      You haven&apos;t saved any reports yet. Start by exploring our database.
                    </p>
                     <Link href="/search">
                    <Button 
                    >
                      Browse Missing Persons
                    </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
