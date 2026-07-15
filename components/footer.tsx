import Link from 'next/link'
import { Share2, MessageSquare, Heart, Mail, Phone } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded flex items-center justify-center">
                <span className="text-white text-sm font-bold">LM</span>
              </div>
              <h3 className="font-bold text-lg">LocateMe</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              A humanitarian platform dedicated to reuniting missing persons with their families through community collaboration.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm text-muted-foreground hover:text-primary transition">Home</Link></li>
              <li><Link href="/search" className="text-sm text-muted-foreground hover:text-primary transition">Search</Link></li>
              <li><Link href="/submit-sighting" className="text-sm text-muted-foreground hover:text-primary transition">Report Sighting</Link></li>
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition">About Us</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><Link href="/help" className="text-sm text-muted-foreground hover:text-primary transition">Help Center</Link></li>
              <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition">Contact Us</Link></li>
              <li><Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone size={16} />
                <span>+1-555-LOCATE-1</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail size={16} />
                <span>info@locateme.org</span>
              </div>
              <div className="flex gap-4 mt-4">
                <a href="#" className="text-primary hover:text-primary/80 transition">
                  <Share2 size={20} />
                </a>
                <a href="#" className="text-primary hover:text-primary/80 transition">
                  <MessageSquare size={20} />
                </a>
                <a href="#" className="text-primary hover:text-primary/80 transition">
                  <Heart size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © 2024 LocateMe. All rights reserved. Dedicated to reuniting families.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-xs text-muted-foreground hover:text-primary transition">
                Privacy
              </Link>
              <Link href="/terms" className="text-xs text-muted-foreground hover:text-primary transition">
                Terms
              </Link>
              <Link href="/sitemap" className="text-xs text-muted-foreground hover:text-primary transition">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
