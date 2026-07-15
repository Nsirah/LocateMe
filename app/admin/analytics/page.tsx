'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { mockStatistics, mockMonthlyStats, mockRegionalStats } from '@/lib/mock-data'
import { LogOut, Download, TrendingUp, PieChart, BarChart3 } from 'lucide-react'

export default function AnalyticsPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth')
    if (!auth) {
      router.push('/admin')
    } else {
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
          <Link href="/admin/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">LM</span>
            </div>
            <div>
              <h1 className="font-bold">Analytics</h1>
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
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">Analytics Dashboard</h2>
            <p className="text-muted-foreground">Platform statistics and insights</p>
          </div>
          <Button className="gap-2 bg-primary hover:bg-primary/90">
            <Download size={18} />
            Export Data
          </Button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-card border border-border rounded-lg p-6">
            <p className="text-sm text-muted-foreground mb-2">Missing Persons</p>
            <p className="text-3xl font-bold text-primary mb-1">{mockStatistics.totalMissing}</p>
            <p className="text-xs text-muted-foreground">Active cases</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <p className="text-sm text-muted-foreground mb-2">Found Persons</p>
            <p className="text-3xl font-bold text-accent mb-1">{mockStatistics.foundPersons}</p>
            <p className="text-xs text-muted-foreground">Successfully located</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <p className="text-sm text-muted-foreground mb-2">Pending Reports</p>
            <p className="text-3xl font-bold text-secondary mb-1">{mockStatistics.pendingReports}</p>
            <p className="text-xs text-muted-foreground">Awaiting verification</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <p className="text-sm text-muted-foreground mb-2">Community Members</p>
            <p className="text-3xl font-bold text-green-500 mb-1">{mockStatistics.totalUsers}</p>
            <p className="text-xs text-muted-foreground">Active volunteers</p>
          </div>
        </div>

        {/* Charts Placeholder */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Monthly Trends Chart */}
          <div className="bg-card border border-border rounded-lg p-8">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="text-secondary" size={24} />
              <h3 className="text-lg font-bold">Monthly Trends</h3>
            </div>
            <div className="space-y-4">
              {mockMonthlyStats.map(stat => (
                <div key={stat.month}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">{stat.month}</span>
                    <span className="text-sm text-muted-foreground">{stat.reports} reports</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-secondary"
                      style={{ width: `${(stat.reports / 50) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Status Distribution */}
          <div className="bg-card border border-border rounded-lg p-8">
            <div className="flex items-center gap-2 mb-6">
              <PieChart className="text-primary" size={24} />
              <h3 className="text-lg font-bold">Report Status</h3>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Approved</span>
                  <span className="text-sm font-bold text-accent">{mockStatistics.approvedReports}</span>
                </div>
                <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-accent" style={{ width: '60%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Pending</span>
                  <span className="text-sm font-bold text-secondary">{mockStatistics.pendingReports}</span>
                </div>
                <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-secondary" style={{ width: '30%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Rejected</span>
                  <span className="text-sm font-bold text-destructive">{mockStatistics.rejectedReports}</span>
                </div>
                <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-destructive" style={{ width: '10%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Regional Statistics */}
        <div className="bg-card border border-border rounded-lg p-8">
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="text-primary" size={24} />
            <h3 className="text-lg font-bold">Regional Statistics</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-semibold">Region</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold">Missing</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold">Found</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold">Sightings</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold">Coverage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {mockRegionalStats.map(stat => (
                  <tr key={stat.region} className="hover:bg-muted/50 transition-colors">
                    <td className="py-4 px-4 font-semibold">{stat.region}</td>
                    <td className="py-4 px-4">
                      <span className="text-sm font-semibold text-primary">{stat.missing}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm font-semibold text-accent">{stat.found}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm font-semibold text-secondary">{stat.sightings}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary"
                          style={{ width: `${(stat.missing / mockStatistics.totalMissing) * 100}%` }}
                        ></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Export Options */}
        <div className="mt-12 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8 text-center">
          <h3 className="text-xl font-bold mb-4">Export Reports</h3>
          <p className="text-muted-foreground mb-6">
            Download platform data for further analysis
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-primary hover:bg-primary/90 gap-2">
              <Download size={18} />
              Export as PDF
            </Button>
            <Button variant="outline" className="gap-2">
              <Download size={18} />
              Export as CSV
            </Button>
            <Button variant="outline" className="gap-2">
              <Download size={18} />
              Export as Excel
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
