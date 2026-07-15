'use client'

import { MapPin, Navigation } from 'lucide-react'
import dynamic from "next/dynamic";

const LocationPicker = dynamic(
  () => import("@/components/LocationPicker"),
  { ssr: false }
);
export default function LocationInformation({
  formData,
  handleChange
}) {
  return (
    <div className="space-y-6">

      <h3 className="text-lg font-bold">
        Last Seen Location
      </h3>

      {/* Last Seen Place */}
      <div>
        <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
          <MapPin size={16} />
          Last Seen Location *
        </label>

        <input
          type="text"
          name="lastSeenLocation"
          value={formData.lastSeenLocation || ''}
          onChange={handleChange}
          placeholder="Example: Carrefour des immeubles, Douala"
          required
          className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* City & Region */}
      <div className="grid md:grid-cols-2 gap-4">

        <div>
          <label className="block text-sm font-semibold mb-2">
            City *
          </label>

          <input
            type="text"
            name="city"
            value={formData.city || ''}
            onChange={handleChange}
            placeholder="Douala"
            required
            className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
  <label className="block text-sm font-semibold mb-2">
    Region *
  </label>

  <select
    name="region"
    value={formData.region}
    onChange={handleChange}
    className="w-full border border-border rounded-lg px-4 py-3"
    required
  >
    <option value="">Select Region</option>
    <option value="Adamawa">Adamawa</option>
    <option value="Centre">Centre</option>
    <option value="East">East</option>
    <option value="Far North">Far North</option>
    <option value="Littoral">Littoral</option>
    <option value="North">North</option>
    <option value="North West">North West</option>
    <option value="South">South</option>
    <option value="South West">South West</option>
    <option value="West">West</option>
  </select>
</div>


      </div>

      {/* Landmark */}
      <div>
        <label className="block text-sm font-semibold mb-2">
          Nearest Landmark *
        </label>

        <input
          type="text"
          name="landmark"
          value={formData.landmark || ''}
          onChange={handleChange}
          placeholder="Church, School, Market..."
          required
          className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Google Maps Placeholder */}
      <div className="space-y-3">

  <label className="block text-sm font-semibold">
    Select Last Seen Location on Map
  </label>

 <LocationPicker
  onLocationSelect={(coords) => {

    console.log("Coordinates:", coords);

    handleChange({
      target: {
        name: "latitude",
        value: coords.lat,
      },
    });

    handleChange({
      target: {
        name: "longitude",
        value: coords.lng,
      },
    });

  }}
/>


  <p className="text-sm text-muted-foreground">
    Click anywhere on the map to save the exact last seen location.
  </p>

</div>
   

      </div>

  )
}