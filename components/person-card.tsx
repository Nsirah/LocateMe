'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Heart, Share2, Eye } from 'lucide-react'
import type { MissingPerson } from '@/lib/mock-data'

interface PersonCardProps {
  person: MissingPerson
  onSave?: (personId: string) => void
  isSaved?: boolean
}

export function PersonCard({ person, onSave, isSaved = false }: PersonCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [saved, setSaved] = useState(isSaved)
  const [showShare, setShowShare] = useState(false);

  const handleSave = () => {
    setSaved(!saved)
    onSave?.(person.id)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Missing':
        return 'bg-destructive text-destructive-foreground'
      case 'Found':
        return 'bg-accent text-accent-foreground'
      case 'confirmed-found':
        return 'bg-green-500 text-white'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

  const daysAgo = Math.floor(
    (new Date().getTime() - new Date(person.dateMissing).getTime()) /
      (1000 * 60 * 60 * 24)
  )
console.log(person);

  return (
    <div
      className="relative bg-card rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative h-48 sm:h-56 bg-muted overflow-hidden">
        <Image
          src={person.image || "/placeholder-logo.png"}
          alt={person.fullName}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
        {/* Overlay on hover */}
        {isHovered && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-2">
            <Link href={`/person/${person.id}`}>
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Eye size={16} className="mr-1" />
                View Details
              </Button>
            </Link>
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          <Badge className={getStatusColor(person.status)}>
            {person.status === 'confirmed-found' ? 'Found' : person.status}
          </Badge>
        </div>

        {/* Days Missing Badge */}
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="bg-background/80 text-foreground">
            {daysAgo} day{daysAgo !== 1 ? "s" : ""} ago
          </Badge>
        </div>
      </div>

      
     {/* Content */}
<div className="p-4">

  <h3 className="font-bold text-xl mb-2 capitalize">
    {person.fullName
  ?.split(" ")
  .map(
    word =>
      word.charAt(0).toUpperCase() +
      word.slice(1).toLowerCase()
  )
  .join(" ")}
  </h3>

  {/* Badges */}
  <div className="flex flex-wrap gap-2 mb-3">

    <Badge variant="outline">
      {person.age} yrs • {person.gender}
    </Badge>

    <Badge variant="outline">
      {person.region} Region
    </Badge>

    <Badge variant="outline">
      {person.complexion}
    </Badge>

  </div>

  {/* Description */}
  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
    {person.physicalDescription}
  </p>

  {/* Last Seen */}
 <div className="space-y-2 text-sm mt-3">

  <p>
    <span className="font-semibold"> Last seen:</span>{" "}
    {person.city}, {person.region}
  </p>

  <p>
    <span className="font-semibold"> Landmark:</span>{" "}
    {person.landmark}
  </p>
  
</div>
    <p>
      <span className="font-semibold">
         Missing since:
      </span>{" "}
      {person.dateMissing}
    </p>

  </div>

  
        {/* Action Buttons */}
        <div className="flex gap-2">
         <Link href={`/person/${person.id}`} className="flex-1">
 
 <Button
  className="w-full rounded-sm bg-primary text-white hover:bg-primary/90"
>
  Learn More
</Button>

 
          </Link>
          <button
            onClick={handleSave}
            className={`px-4 py-2 rounded border transition-colors ${
              saved
                ? 'bg-primary/20 border-primary text-primary'
                : 'border-border text-muted-foreground hover:border-primary hover:text-primary'
            }`}
            aria-label="Save person"
          >
            <Heart size={18} fill={saved ? 'currentColor' : 'none'} />
          </button>
          <button
  onClick={() => setShowShare(!showShare)}
  className="px-4 py-2 rounded border border-border text-muted-foreground"
  aria-label="Share"
>
  <Share2 size={18} />
</button>

{showShare && (

<div className="absolute right-4 bottom-16 bg-white border rounded-xl shadow-lg p-3 z-50">

  <div className="flex flex-col gap-2">

    <a
      href={`https://wa.me/?text=${encodeURIComponent(window.location.origin + "/person/" + person.id)}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      🟢 WhatsApp
    </a>

    <a
      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.origin + "/person/" + person.id)}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      🔵 Facebook
    </a>

    <a
      href={`https://t.me/share/url?url=${encodeURIComponent(window.location.origin + "/person/" + person.id)}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      🔷 Telegram
    </a>

    <a
      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.origin + "/person/" + person.id)}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      ⚫ X
    </a>

  </div>

</div>

)}

        </div>
      </div>
      
  )
}
