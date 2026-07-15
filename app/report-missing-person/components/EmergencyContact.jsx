'use client'

import { Phone, User } from 'lucide-react'

export default function EmergencyContact({
  formData,
  handleChange
}) {
  return (
    <div className="space-y-6">

      <h3 className="text-lg font-bold">
        Emergency Contact
      </h3>

      <div>
        <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
          <User size={16}/>
          Emergency Contact Name *
        </label>

        <input
          type="text"
          name="emergencyName"
          value={formData.emergencyName || ''}
          onChange={handleChange}
          required
          placeholder="Enter contact name"
          className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
          <Phone size={16}/>
          Emergency Contact Number *
        </label>

        <input
          type="tel"
          name="emergencyPhone"
          value={formData.emergencyPhone || ''}
          onChange={handleChange}
          required
          placeholder="+237..."
          className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary"
        />
      </div>

    </div>
  )
}