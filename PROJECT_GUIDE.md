# LocateMe - Missing Persons Platform

A production-ready humanitarian platform built with Next.js 16, Tailwind CSS, and shadcn/ui. The platform facilitates the search for missing persons through community collaboration and professional verification processes.

## Platform Overview

LocateMe enables both citizens and administrators to participate in reuniting missing persons with their families through a modern, user-friendly interface.

### Key Features

**Citizen Features:**
- Search comprehensive database of missing persons
- Report sightings with location and photo details
- Save and share missing person reports
- Manage personal profile and saved reports
- Browse recent cases and regional statistics

**Administrator Features:**
- Verify and approve sighting reports
- Manage user accounts and permissions
- Real-time dashboard with statistics
- Analytics and trend analysis
- Regional distribution tracking

## Project Structure

```
/app
├── page.tsx                 # Home page with featured cases
├── search/                  # Search missing persons
├── submit-sighting/         # Report sighting form
├── profile/                 # User profile and saved reports
├── about/                   # About mission and values
├── contact/                 # Contact and support
├── help/                    # Help center & FAQs
├── not-found.tsx            # 404 page
├── admin/
│   ├── page.tsx             # Admin login
│   ├── dashboard/           # Admin dashboard
│   ├── verify-reports/      # Verify sightings
│   ├── manage-users/        # User management
│   └── analytics/           # Analytics dashboard
├── globals.css              # Theme & design tokens
└── layout.tsx               # Root layout

/components
├── navbar.tsx               # Navigation bar
├── footer.tsx               # Footer
├── person-card.tsx          # Missing person card component
└── ui/                      # shadcn/ui components

/lib
└── mock-data.ts             # Mock data for demo
```

## Design System

### Color Palette
- **Primary**: Vibrant Blue (oklch(0.55 0.28 264)) - Main actions and branding
- **Secondary**: Warm Orange (oklch(0.72 0.2 34)) - Accents and warnings
- **Accent**: Emerald Green (oklch(0.65 0.25 158)) - Success states
- **Background**: Off-white (oklch(0.98 0.01 240))
- **Foreground**: Near black (oklch(0.1 0.02 240))

### Typography
- **Heading Font**: Geist Sans (system default)
- **Body Font**: Geist Sans
- **Monospace**: Geist Mono

## Getting Started

### Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

### Demo Credentials

**Admin Login:**
- Email: `admin@example.com`
- Password: `admin123`

## Key Pages

### Home (/)
- Hero section highlighting the platform's mission
- Quick statistics
- Featured missing person cases
- Feature highlights explaining how LocateMe works

### Search (/search)
- Advanced search with filters
- Filter by region and status
- Save/unsave reports for later

### Submit Sighting (/submit-sighting)
- Step-by-step form to report sightings
- Verify person from database
- Capture location, time, and description
- Reporter contact information

### Profile (/profile)
- User account information
- Saved missing person reports
- Sighting submission history

### Admin Dashboard (/admin/dashboard)
- Real-time statistics
- Pending report verification queue
- Regional distribution
- Monthly activity trends

### Verify Reports (/admin/verify-reports)
- Detailed sighting review interface
- Reporter information verification
- Approve/reject/request more info
- Evidence viewer

### Manage Users (/admin/manage-users)
- User account management
- Role-based access control
- Search and filter users
- Deactivate/delete accounts

### Analytics (/admin/analytics)
- Platform statistics
- Monthly trends
- Regional breakdown
- Export data functionality

## Mock Data Structure

The app uses mock data stored in `/lib/mock-data.ts`:

```typescript
// Missing persons database
mockMissingPersons: MissingPerson[]

// Sighting reports
mockSightings: Sighting[]

// User accounts
mockUsers: User[]

// Admin verification records
mockAdminReports: AdminReport[]

// Statistics & analytics
mockStatistics: Statistics
mockRegionalStats: RegionalStats[]
mockMonthlyStats: MonthlyStats[]
```

## Backend Integration Notes

This app is designed to be easily connected to an ASP.NET Core + MySQL backend:

1. **API Routes**: Create Next.js API routes in `/app/api/` to proxy requests
2. **Data Models**: Match the TypeScript interfaces in `/lib/mock-data.ts` to your backend models
3. **Authentication**: Replace localStorage-based demo auth with proper JWT/session authentication
4. **Image Handling**: Replace Unsplash placeholder URLs with your image server

### Example API Integration:

```typescript
// /app/api/persons/route.ts
export async function GET() {
  const response = await fetch('https://your-backend.com/api/persons')
  return Response.json(await response.json())
}
```

## Responsive Design

The platform is fully responsive:
- **Mobile**: Single column layout, hamburger menu
- **Tablet**: 2-column grid for content
- **Desktop**: 3-column layouts with sidebars

## Accessibility

- Keyboard navigation supported
- ARIA labels on interactive elements
- High contrast color scheme (WCAG AA compliant)
- Semantic HTML structure
- Screen reader friendly

## Performance

- Server-side rendering with Next.js
- Optimized images with Next.js Image component
- CSS-in-JS with Tailwind for minimal CSS
- Component-based architecture

## Development Workflow

1. **Modify components** in `/components`
2. **Create new pages** in `/app/[route]/page.tsx`
3. **Update styles** using Tailwind classes or design tokens in `/globals.css`
4. **Replace mock data** with API calls as backend is built
5. **Test responsiveness** using browser devtools

## Future Enhancements

- Real-time notifications for new sightings
- Map integration for location tracking
- Photo upload and verification
- Email notifications for report updates
- Multi-language support
- Mobile app (React Native)
- Social media integration
- AI-powered image matching

## License

This project is for humanitarian purposes. Please contact the development team for licensing information.

## Support

For questions or issues, please refer to the Help Center (/help) or contact us at info@locateme.org
