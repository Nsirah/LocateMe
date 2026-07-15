'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  mockSightings,
  mockStatistics,
  mockRegionalStats,
  mockMonthlyStats,
  mockMissingPersons,
} from '@/lib/mock-data'
import {
  LogOut,
  BarChart3,
  Users,
  MapPin,
  AlertCircle,
  CheckCircle,
  Clock,
  TrendingUp,
} from 'lucide-react'

export default function AdminDashboardPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [adminEmail, setAdminEmail] = useState('')

  useEffect(() => {
    // Check if user is authenticated
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">LM</span>
            </div>
            <div>
              <h1 className="font-bold">LocateMe Admin</h1>
              <p className="text-xs text-muted-foreground">Dashboard</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-sm text-muted-foreground">
              Logged in as: <span className="font-semibold text-foreground">{adminEmail}</span>
            </div>
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
        {/* Page Title */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-2">Dashboard Overview</h2>
          <p className="text-muted-foreground">Real-time statistics and report management</p>
        </div>

        {/* Key Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Total Missing */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Missing Persons</p>
                <p className="text-3xl font-bold mt-2">{mockStatistics.totalMissing}</p>
              </div>
              <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center">
                <AlertCircle className="text-destructive" size={24} />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Active cases requiring attention</p>
          </div>

          {/* Found Persons */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Found Persons</p>
                <p className="text-3xl font-bold mt-2 text-accent">{mockStatistics.foundPersons}</p>
              </div>
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="text-accent" size={24} />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Successfully reunited</p>
          </div>

          {/* Pending Reports */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Pending Reports</p>
                <p className="text-3xl font-bold mt-2 text-secondary">{mockStatistics.pendingReports}</p>
              </div>
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                <Clock className="text-secondary" size={24} />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Awaiting verification</p>
          </div>

          {/* Total Users */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Community Members</p>
                <p className="text-3xl font-bold mt-2 text-primary">{mockStatistics.totalUsers}</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Users className="text-primary" size={24} />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">{mockStatistics.registeredUsers} registered</p>
          </div>
        </div>

        {/* Two Column Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {/* Pending Sightings */}
          <div className="lg:col-span-2 bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <AlertCircle className="text-secondary" size={20} />
              Pending Report Verification
            </h3>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {mockSightings
                .filter(s => s.status === 'pending')
                .map(sighting => {
                  const person = mockMissingPersons.find(p => p.id === sighting.personId)
                  return (
                    <div key={sighting.id} className="bg-muted/50 rounded-lg p-4 flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-semibold">{person?.name}</p>
                        <p className="text-sm text-muted-foreground">{sighting.location}</p>
                        <p className="text-xs text-muted-foreground mt-1">{sighting.description}</p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button size="sm" className="bg-accent hover:bg-accent/90">
                          Approve
                        </Button>
                        <Button size="sm" variant="outline">
                          Reject
                        </Button>
                      </div>
                    </div>
                  )
                })}
            </div>

          <Link href="/admin/verify-reports">
            <Button 
            className="w-full mt-4">
             View All Reports
            </Button>
            </Link>
          </div>

          {/* Regional Distribution */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <MapPin className="text-primary" size={20} />
              Regional Distribution
            </h3>

            <div className="space-y-3">
              {mockRegionalStats.map(stat => (
                <div key={stat.region}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">{stat.region}</span>
                    <span className="text-xs text-muted-foreground">{stat.missing} missing</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-secondary"
                      style={{ width: `${(stat.missing / mockStatistics.totalMissing) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Monthly Trends */}
        <div className="bg-card border border-border rounded-lg p-6 mb-12">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="text-secondary" size={20} />
            Monthly Activity Trends
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-semibold">Month</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold">Reports</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold">Found</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold">Verified</th>
                </tr>
              </thead>
              <tbody>
                {mockMonthlyStats.map(stat => (
                  <tr key={stat.month} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-4 text-sm font-medium">{stat.month}</td>
                    <td className="py-3 px-4 text-sm">{stat.reports}</td>
                    <td className="py-3 px-4 text-sm">
                      <Badge className="bg-accent/20 text-accent">{stat.found}</Badge>
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <Badge className="bg-green-500/20 text-green-600">{stat.verified}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Link href="/admin/verify-reports">
            <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors cursor-pointer">
              <AlertCircle className="text-secondary mb-3" size={24} />
              <h4 className="font-semibold mb-1">Verify Reports</h4>
              <p className="text-sm text-muted-foreground">Review and approve pending sightings</p>
            </div>
          </Link>

          <Link href="/admin/manage-users">
            <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors cursor-pointer">
              <Users className="text-primary mb-3" size={24} />
              <h4 className="font-semibold mb-1">Manage Users</h4>
              <p className="text-sm text-muted-foreground">View and manage user accounts</p>
            </div>
          </Link>

          <Link href="/admin/analytics">
            <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors cursor-pointer">
              <BarChart3 className="text-secondary mb-3" size={24} />
              <h4 className="font-semibold mb-1">Analytics</h4>
              <p className="text-sm text-muted-foreground">Detailed platform statistics and insights</p>
            </div>
          </Link>
        </div>
      </main>
    </div>
  )
}
