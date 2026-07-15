'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter();

const [user, setUser] = useState(null);

useEffect(() => {

  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {

    setUser(currentUser);

  });

  return () => unsubscribe();

}, []);

const handleLogout = async () => {

  await signOut(auth);

  router.push("/");

};

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">LM</span>
            </div>
            <span className="font-bold text-xl hidden sm:inline bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">LocateMe</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-foreground hover:text-primary transition">
              Home
            </Link>
            <Link href="/search" className="text-foreground hover:text-primary transition">
              Search
            </Link>
            <Link href="/report-missing-person" className="text-foreground hover:text-primary transition"
            >
             Report Missing
           </Link>
            <Link href="/submit-sighting" className="text-foreground hover:text-primary transition">
              Report Sighting
            </Link>
            <Link href="/about" className="text-foreground hover:text-primary transition">
              About
            </Link>
            <Link href="/contact" className="text-foreground hover:text-primary transition">
              Contact
            </Link>
          </div>

          {/* Desktop Buttons */}
         <div className="hidden md:flex items-center gap-4">
  {!user ? (
    <>
      <Link href="/login">
        <Button variant="outline">
          Login
        </Button>
      </Link>

      <Link href="/register">
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          Register
        </Button>
      </Link>

    </>
  ) : (
    <>

      <Link href="/dashboard">
        <Button variant="outline">
          Dashboard
        </Button>
      </Link>

      <Button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 text-white"
      >
        Logout
      </Button>

    </>
  )}

</div>
          {/* Mobile Menu Button */}
      
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-border">
            <div className="flex flex-col gap-4 pt-4">
              <Link href="/" className="text-foreground hover:text-primary transition">
                Home
              </Link>
              <Link href="/search" className="text-foreground hover:text-primary transition">
                Search
              </Link>
              <Link href="/report-missing-person"  className="text-foreground hover:text-primary transition"
                >
                Report Missing
              </Link>
              <Link href="/submit-sighting" className="text-foreground hover:text-primary transition">
                Report Sighting
              </Link>

              <Link href="/about" className="text-foreground hover:text-primary transition">
                About
              </Link>
              <Link href="/contact" className="text-foreground hover:text-primary transition">
                Contact
              </Link>
            <div className="flex flex-col gap-2 pt-2">

  {!user ? (
    <>
      <Link href="/login">
        <Button variant="outline" className="w-full">
          Login
        </Button>
      </Link>

      <Link href="/register">
        <Button className="w-full bg-primary hover:bg-primary/90">
          Register
        </Button>
      </Link>
    </>
  ) : (
    <>
      <Link href="/dashboard">
        <Button variant="outline" className="w-full">
          Dashboard
        </Button>
      </Link>

      <Button
        onClick={handleLogout}
        className="w-full bg-red-600 hover:bg-red-700 text-white"
      >
        Logout
      </Button>
    </>
  )}

</div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
