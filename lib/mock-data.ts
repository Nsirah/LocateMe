export interface MissingPerson {
  id: string
  name: string
  age: number
  gender: 'male' | 'female' | 'other'
  description: string
  photo: string
  missingDate: string
  lastSeenLocation: string
  status: 'missing' | 'found' | 'confirmed-found'
  region: string
  contactPhone: string
  contactEmail: string
  additionalInfo: string
}

export interface Sighting {
  id: string
  personId: string
  location: string
  description: string
  photos: string[]
  timestamp: string
  reporterName: string
  reporterPhone: string
  reporterEmail: string
  status: 'pending' | 'verified' | 'rejected'
}

export interface User {
  id: string
  email: string
  name: string
  phone: string
  role: 'citizen' | 'admin'
  savedReports: string[]
  submittedSightings: string[]
}

export interface AdminReport {
  id: string
  sightingId: string
  personId: string
  status: 'pending' | 'approved' | 'rejected'
  reviewedBy?: string
  reviewDate?: string
  notes?: string
}

// Mock missing persons data
export const mockMissingPersons: MissingPerson[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    age: 24,
    gender: 'female',
    description: 'Blonde hair, blue eyes, 5\'6", athletic build',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    missingDate: '2024-01-15',
    lastSeenLocation: 'Downtown District, City Center',
    status: 'missing',
    region: 'Central',
    contactPhone: '+1-555-0101',
    contactEmail: 'contact@example.com',
    additionalInfo: 'Was heading to work. Last seen wearing blue jacket.',
  },
  {
    id: '2',
    name: 'Michael Chen',
    age: 31,
    gender: 'male',
    description: 'Black hair, brown eyes, 5\'9", glasses',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    missingDate: '2024-01-10',
    lastSeenLocation: 'Riverside Park',
    status: 'missing',
    region: 'North',
    contactPhone: '+1-555-0102',
    contactEmail: 'contact@example.com',
    additionalInfo: 'Elderly parent. Frequent visitor to parks. May be confused.',
  },
  {
    id: '3',
    name: 'Emma Thompson',
    age: 16,
    gender: 'female',
    description: 'Brown curly hair, green eyes, 5\'4", petite',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    missingDate: '2024-01-18',
    lastSeenLocation: 'Central Shopping Mall',
    status: 'missing',
    region: 'Central',
    contactPhone: '+1-555-0103',
    contactEmail: 'contact@example.com',
    additionalInfo: 'High school student. Left home without notice.',
  },
  {
    id: '4',
    name: 'James Martinez',
    age: 45,
    gender: 'male',
    description: 'Dark hair with gray, brown eyes, 6\'0", athletic',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    missingDate: '2024-01-05',
    lastSeenLocation: 'Business District',
    status: 'found',
    region: 'South',
    contactPhone: '+1-555-0104',
    contactEmail: 'contact@example.com',
    additionalInfo: 'Business professional. Family concerned about welfare.',
  },
]

export const mockSightings: Sighting[] = [
  {
    id: 's1',
    personId: '1',
    location: 'Train Station, Sector 5',
    description: 'Saw someone matching Sarah description getting on evening train',
    photos: [],
    timestamp: '2024-01-18T14:30:00Z',
    reporterName: 'John Doe',
    reporterPhone: '+1-555-0201',
    reporterEmail: 'witness@example.com',
    status: 'pending',
  },
  {
    id: 's2',
    personId: '2',
    location: 'Coffee Shop near Oak Street',
    description: 'Regular customer spotted. Appeared confused and disoriented.',
    photos: [],
    timestamp: '2024-01-17T10:15:00Z',
    reporterName: 'Jane Smith',
    reporterPhone: '+1-555-0202',
    reporterEmail: 'witness@example.com',
    status: 'verified',
  },
]

export const mockUsers: User[] = [
  {
    id: 'user1',
    email: 'citizen@example.com',
    name: 'Alex Rodriguez',
    phone: '+1-555-0301',
    role: 'citizen',
    savedReports: ['1', '2', '3'],
    submittedSightings: ['s1'],
  },
  {
    id: 'admin1',
    email: 'admin@example.com',
    name: 'Admin User',
    phone: '+1-555-0999',
    role: 'admin',
    savedReports: [],
    submittedSightings: [],
  },
]

export const mockAdminReports: AdminReport[] = [
  {
    id: 'ar1',
    sightingId: 's1',
    personId: '1',
    status: 'pending',
  },
  {
    id: 'ar2',
    sightingId: 's2',
    personId: '2',
    status: 'approved',
    reviewedBy: 'admin1',
    reviewDate: '2024-01-17T16:00:00Z',
    notes: 'Verified by multiple sources',
  },
]

// Statistics for admin dashboard
export const mockStatistics = {
  totalMissing: 47,
  foundPersons: 12,
  pendingReports: 18,
  approvedReports: 23,
  rejectedReports: 5,
  totalUsers: 342,
  registeredUsers: 285,
  pendingSightings: 18,
}

// Regional statistics
export const mockRegionalStats = [
  { region: 'Central', missing: 15, found: 4, sightings: 12 },
  { region: 'North', missing: 12, found: 3, sightings: 8 },
  { region: 'South', missing: 10, found: 3, sightings: 6 },
  { region: 'East', missing: 8, found: 2, sightings: 4 },
  { region: 'West', missing: 2, found: 0, sightings: 2 },
]

// Monthly statistics for charts
export const mockMonthlyStats = [
  { month: 'Jan', reports: 24, found: 8, verified: 12 },
  { month: 'Feb', reports: 18, found: 6, verified: 10 },
  { month: 'Mar', reports: 32, found: 10, verified: 18 },
  { month: 'Apr', reports: 28, found: 9, verified: 15 },
  { month: 'May', reports: 35, found: 12, verified: 20 },
  { month: 'Jun', reports: 42, found: 15, verified: 25 },
]
