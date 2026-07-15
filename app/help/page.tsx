import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { ChevronRight, Search, AlertCircle, Shield, Phone } from 'lucide-react'

export default function HelpPage() {
  const faqs = [
    {
      question: 'How do I search for a missing person?',
      answer: 'Visit our Search page and use our comprehensive database. You can filter by name, age, region, and other details to find the person you\'re looking for. Click on any profile card for detailed information.',
      category: 'Getting Started',
    },
    {
      question: 'How do I report a sighting?',
      answer: 'Go to the "Report a Sighting" page and fill out the form with details about when and where you saw the person, what they were wearing, and their behavior. Include your contact information so we can follow up with you.',
      category: 'Reporting',
    },
    {
      question: 'How long does it take to verify a report?',
      answer: 'Our team typically verifies reports within 24-48 hours. For urgent cases, we prioritize them for faster verification. You\'ll receive email updates on the status of your report.',
      category: 'Reporting',
    },
    {
      question: 'Is my personal information safe?',
      answer: 'Yes. We use industry-leading security practices to protect all personal information. Your contact details are only used for report verification and follow-up, and are never shared publicly.',
      category: 'Safety & Privacy',
    },
    {
      question: 'Can I save reports for later?',
      answer: 'Yes! Click the heart icon on any person\'s card to save it to your profile. You can access your saved reports anytime from your profile page.',
      category: 'Getting Started',
    },
    {
      question: 'What should I do if I find a missing person?',
      answer: 'If you encounter someone you believe is missing, report the sighting immediately through our platform. If it\'s an emergency, also contact local police right away.',
      category: 'Emergencies',
    },
  ]

  const resources = [
    {
      title: 'Safety Tips for Reporting',
      description: 'Learn how to safely report a sighting and protect your personal information.',
      icon: Shield,
    },
    {
      title: 'Search Strategies',
      description: 'Tips and techniques for effectively searching our missing persons database.',
      icon: Search,
    },
    {
      title: 'Emergency Contacts',
      description: 'Important phone numbers and resources for different regions and situations.',
      icon: Phone,
    },
    {
      title: 'Fraud Prevention',
      description: 'How to identify and report fraudulent reports and scams on our platform.',
      icon: AlertCircle,
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Help Center</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Find answers to common questions and learn how to use LocateMe effectively.
          </p>
        </div>
      </section>

      {/* Quick Search */}
      <section className="py-12 border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 text-muted-foreground" size={20} />
            <input
              type="text"
              placeholder="Search help articles..."
              className="w-full pl-12 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-card"
            />
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12">Frequently Asked Questions</h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="bg-card border border-border rounded-lg p-6 cursor-pointer group hover:border-primary/50 transition-colors"
              >
                <summary className="flex items-center justify-between font-semibold">
                  <span>{faq.question}</span>
                  <ChevronRight className="text-muted-foreground group-open:rotate-90 transition-transform" size={20} />
                </summary>
                <p className="text-muted-foreground mt-4">{faq.answer}</p>
                <div className="mt-4">
                  <span className="text-xs bg-muted px-3 py-1 rounded-full text-muted-foreground">
                    {faq.category}
                  </span>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Resource Guides */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12">Help Resources</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resources.map((resource, index) => {
              const Icon = resource.icon
              return (
                <div
                  key={index}
                  className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="text-primary" size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold mb-2">{resource.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {resource.description}
                      </p>
                      <Link href="#" className="text-primary text-sm font-semibold hover:underline">
                        Read More →
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12">Quick Actions</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Link href="/search">
              <div className="bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer h-full">
                <Search className="text-primary mx-auto mb-4" size={32} />
                <h3 className="font-bold mb-2">Search Database</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Find information about missing persons
                </p>
                <div className="inline-block text-primary text-sm font-semibold">
                  Go to Search →
                </div>
              </div>
            </Link>

            <Link href="/submit-sighting">
              <div className="bg-gradient-to-br from-secondary/20 to-secondary/5 border border-secondary/20 rounded-lg p-8 text-center hover:border-secondary/50 transition-colors cursor-pointer h-full">
                <AlertCircle className="text-secondary mx-auto mb-4" size={32} />
                <h3 className="font-bold mb-2">Report a Sighting</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Share important information you&apos;ve witnessed
                </p>
                <div className="inline-block text-secondary text-sm font-semibold">
                  Report Now →
                </div>
              </div>
            </Link>

            <Link href="/contact">
              <div className="bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 rounded-lg p-8 text-center hover:border-accent/50 transition-colors cursor-pointer h-full">
                <Phone className="text-accent mx-auto mb-4" size={32} />
                <h3 className="font-bold mb-2">Contact Support</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Get help from our support team
                </p>
                <div className="inline-block text-accent text-sm font-semibold">
                  Contact Us →
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Support CTA */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Still need help?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Our support team is here to assist you. Contact us anytime.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <Link href="/contact">
            <Button
             size="lg" 
             className="bg-primary hover:bg-primary/90">
              Contact Support
            </Button>
            </Link>

             <Link href="/">
            <Button  size="lg" 
            variant="outline">
              Back to Home
            </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
