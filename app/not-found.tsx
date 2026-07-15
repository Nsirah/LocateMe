import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AlertCircle, Home, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center px-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/20 rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="relative text-center max-w-md mx-auto">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <AlertCircle className="text-primary" size={48} />
          </div>
          <h1 className="text-6xl sm:text-7xl font-bold mb-2">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              404
            </span>
          </h1>
        </div>

        {/* Message */}
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">
          We couldn&apos;t find the page you were looking for. It might have been moved, deleted, or the link might be broken.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
  <Button
    size="lg"
    className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center justify-center gap-2"
  >
    <Home size={20} />
    Go Home
  </Button>
</Link>
         <Link href="/search">
  <Button
    size="lg"
    variant="outline"
    className="flex items-center justify-center gap-2"
  >
    <Search size={20} />
    Search
  </Button>
</Link> 
          
        </div>

        {/* Additional Links */}
        <div className="mt-12 pt-12 border-t border-border">
          <p className="text-sm text-muted-foreground mb-6">You might want to check:</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/"
              className="text-sm text-primary hover:text-primary/80 font-semibold transition"
            >
              Home
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link
              href="/search"
              className="text-sm text-primary hover:text-primary/80 font-semibold transition"
            >
              Search
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link
              href="/about"
              className="text-sm text-primary hover:text-primary/80 font-semibold transition"
            >
              About
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link
              href="/contact"
              className="text-sm text-primary hover:text-primary/80 font-semibold transition"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
