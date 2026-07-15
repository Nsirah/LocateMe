'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { mockSightings, mockMissingPersons, mockAdminReports } from '@/lib/mock-data'
import { LogOut, CheckCircle, XCircle, AlertCircle, MapPin, User, Phone, Mail, Calendar } from 'lucide-react'

export default function VerifyReportsPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [adminEmail, setAdminEmail] = useState('')
  const [selectedReport, setSelectedReport] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState('all')

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth')
    if (!auth) {
      router.push('/admin')
    } else {
      const authData = JSON.parse(auth)
      setAdminEmail(authData.email)
      setIsAuthenticated(true)
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('adminAuth')
    router.push('/admin')
  }

  if (!isAuthenticated) {
    return null
  }

  const filteredReports = filterStatus === 'all' 
    ? mockAdminReports 
    : mockAdminReports.filter(r => r.status === filterStatus)

  const selectedReportData = selectedReport 
    ? mockAdminReports.find(r => r.id === selectedReport)
    : null

  const selectedSighting = selectedReportData
    ? mockSightings.find(s => s.id === selectedReportData.sightingId)
    : null

  const selectedPerson = selectedReportData
    ? mockMissingPersons.find(p => p.id === selectedReportData.personId)
    : null

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/admin/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">LM</span>
            </div>
            <div>
              <h1 className="font-bold">Verify Reports</h1>
              <p className="text-xs text-muted-foreground">Admin Panel</p>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <LogOut size={16} />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Reports List */}
          <div className="lg:col-span-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Reports</h2>
              <Badge className="bg-primary/20 text-primary">{filteredReports.length}</Badge>
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2 mb-4">
              {['all', 'pending', 'approved', 'rejected'].map(status => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`text-xs px-3 py-2 rounded-lg transition-colors ${
                    filterStatus === status
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>

            {/* Reports List */}
            <div className="space-y-2 max-h-screen overflow-y-auto">
              {filteredReports.map(report => {
                const sighting = mockSightings.find(s => s.id === report.sightingId)
                const person = mockMissingPersons.find(p => p.id === report.personId)
                return (
                  <button
                    key={report.id}
                    onClick={() => setSelectedReport(report.id)}
                    className={`w-full text-left p-4 rounded-lg border transition-all ${
                      selectedReport === report.id
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50 bg-card'
                    }`}
                  >
                    <p className="font-semibold mb-1">{person?.name}</p>
                    <p className="text-xs text-muted-foreground mb-2">{sighting?.location}</p>
                    <Badge className={`text-xs ${
                      report.status === 'pending' ? 'bg-secondary/20 text-secondary' :
                      report.status === 'approved' ? 'bg-accent/20 text-accent' :
                      'bg-destructive/20 text-destructive'
                    }`}>
                      {report.status}
                    </Badge>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Report Details */}
          <div className="lg:col-span-2">
            {selectedReportData && selectedSighting && selectedPerson ? (
              <div className="bg-card border border-border rounded-lg p-8">
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{selectedPerson.name}</h3>
                    <Badge className={`${
                      selectedReportData.status === 'pending' ? 'bg-secondary/20 text-secondary' :
                      selectedReportData.status === 'approved' ? 'bg-accent/20 text-accent' :
                      'bg-destructive/20 text-destructive'
                    }`}>
                      {selectedReportData.status}
                    </Badge>
                  </div>
                  <div className="w-24 h-24 rounded-lg overflow-hidden">
                    <Image
                      src={selectedPerson.photo}
                      alt={selectedPerson.name}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Sighting Information */}
                <div className="mb-8 pb-8 border-b border-border">
                  <h4 className="font-bold mb-4">Sighting Information</h4>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="text-primary flex-shrink-0 mt-1" size={20} />
                      <div>
                        <p className="text-xs text-muted-foreground">Location</p>
                        <p className="font-semibold">{selectedSighting.location}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Calendar className="text-primary flex-shrink-0 mt-1" size={20} />
                      <div>
                        <p className="text-xs text-muted-foreground">Time Reported</p>
                        <p className="font-semibold">{new Date(selectedSighting.timestamp).toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm text-muted-foreground mb-2">Description</p>
                      <p className="text-sm bg-muted/50 p-4 rounded-lg">{selectedSighting.description}</p>
                    </div>
                  </div>
                </div>

                {/* Reporter Information */}
                <div className="mb-8 pb-8 border-b border-border">
                  <h4 className="font-bold mb-4">Reporter Information</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <User size={16} className="text-muted-foreground" />
                      <span>{selectedSighting.reporterName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={16} className="text-muted-foreground" />
                      <span>{selectedSighting.reporterPhone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail size={16} className="text-muted-foreground" />
                      <span>{selectedSighting.reporterEmail}</span>
                    </div>
                  </div>
                </div>

                {/* Missing Person Details */}
                <div className="mb-8 pb-8 border-b border-border">
                  <h4 className="font-bold mb-4">Missing Person Details</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-semibold">Age:</span> {selectedPerson.age} years</p>
                    <p><span className="font-semibold">Region:</span> {selectedPerson.region}</p>
                    <p><span className="font-semibold">Missing Date:</span> {selectedPerson.missingDate}</p>
                    <p><span className="font-semibold">Last Seen:</span> {selectedPerson.lastSeenLocation}</p>
                    <p className="mt-3"><span className="font-semibold">Description:</span></p>
                    <p className="text-muted-foreground">{selectedPerson.description}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                {selectedReportData.status === 'pending' && (
                  <div className="flex gap-4">
                    <Button
                      className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground gap-2"
                      size="lg"
                    >
                      <CheckCircle size={20} />
                      Approve Report
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 gap-2"
                      size="lg"
                    >
                      <XCircle size={20} />
                      Reject Report
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 gap-2"
                      size="lg"
                    >
                      <AlertCircle size={20} />
                      Request Info
                    </Button>
                  </div>
                )}

                {selectedReportData.status === 'approved' && (
                  <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 text-sm">
                    <p className="font-semibold text-accent mb-1">Report Approved</p>
                    <p className="text-muted-foreground">
                      Reviewed by: {selectedReportData.reviewedBy} on {selectedReportData.reviewDate}
                    </p>
                    {selectedReportData.notes && <p className="mt-2 text-muted-foreground">Notes: {selectedReportData.notes}</p>}
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-card border border-border rounded-lg p-12 text-center">
                <AlertCircle className="mx-auto text-muted-foreground mb-4 opacity-50" size={48} />
                <h3 className="font-semibold mb-2">No Report Selected</h3>
                <p className="text-muted-foreground">
                  Select a report from the list to view details and take action.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
