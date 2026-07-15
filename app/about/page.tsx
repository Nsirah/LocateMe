import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Heart, Globe, Target, Users, Shield, Zap } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            About <span className="text-gradient bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">LocateMe</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Dedicated to reuniting missing persons with their families through technology, community collaboration, and compassionate service.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            {/* Mission */}
            <div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Target className="text-primary" size={24} />
              </div>
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                To create a global platform that empowers communities to help find missing persons and reunite families. We believe that every missing person matters and that technology combined with human compassion can make a real difference.
              </p>
            </div>

            {/* Vision */}
            <div>
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                <Globe className="text-secondary" size={24} />
              </div>
              <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed">
                A world where missing persons are found quickly and safely through coordinated community action. We envision a platform that transcends borders and brings together volunteers, families, and professionals to create hope and reunite loved ones.
              </p>
            </div>
          </div>

          {/* Core Values */}
          <div className="bg-card border border-border rounded-lg p-8 mb-20">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="text-primary" size={32} />
                </div>
                <h3 className="font-bold mb-2">Compassion</h3>
                <p className="text-sm text-muted-foreground">We care deeply about every person and family affected by missing persons cases.</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="text-secondary" size={32} />
                </div>
                <h3 className="font-bold mb-2">Community</h3>
                <p className="text-sm text-muted-foreground">Together, we are stronger. Community collaboration is at the heart of our platform.</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="text-accent" size={32} />
                </div>
                <h3 className="font-bold mb-2">Integrity</h3>
                <p className="text-sm text-muted-foreground">We maintain the highest standards of accuracy and ethical practices in all reports.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Help */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12">How LocateMe Helps</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Zap className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Speed & Efficiency</h3>
              <p className="text-muted-foreground">
                Real-time reporting and verification systems ensure that information reaches those who can help quickly and efficiently.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-8">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                <Globe className="text-secondary" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Global Reach</h3>
              <p className="text-muted-foreground">
                Our platform connects communities across regions and borders, expanding the search network for missing persons internationally.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-8">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Shield className="text-accent" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Data Security</h3>
              <p className="text-muted-foreground">
                We protect sensitive information with industry-leading security practices while ensuring accessibility for authorized users.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-8">
              <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="text-green-600" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Community Power</h3>
              <p className="text-muted-foreground">
                Thousands of volunteers and community members work together to verify reports and help bring people home.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Impact */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Impact</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">1,200+</div>
              <p className="text-muted-foreground">Missing Persons Located</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-secondary mb-2">50K+</div>
              <p className="text-muted-foreground">Active Community Members</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">15+</div>
              <p className="text-muted-foreground">Countries Covered</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-500 mb-2">98%</div>
              <p className="text-muted-foreground">Report Accuracy Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Whether you want to help by searching, reporting sightings, or contributing your skills, every person can make a difference in reuniting families.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/search">
            <Button 
             size="lg" 
             className="bg-primary hover:bg-primary/90">
              Start Searching
            </Button>
            </Link>
            
             <Link href="/submit-sighting">
            <Button 
            size="lg" 
            variant="outline">
             Report a Sighting
            </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
