'use client'

import { User, Phone, Mail, Users } from 'lucide-react'

export default function ReporterInformation({
  formData,
  handleChange
}) {
  return (
    <div className="space-y-6">

      <h3 className="text-lg font-bold">
        Reporter Information
      </h3>

      {/* Reporter Name */}
      <div>
        <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
          <User size={16} />
          Your Full Name *
        </label>

        <input
          type="text"
          name="reporterName"
          value={formData.reporterName || ''}
          onChange={handleChange}
          required
          placeholder="Enter your full name"
          className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Phone & Email */}
      <div className="grid md:grid-cols-2 gap-4">

        <div>
          <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
            <Phone size={16} />
            Phone Number *
          </label>

          <input
            type="tel"
            name="reporterPhone"
            value={formData.reporterPhone || ''}
            onChange={handleChange}
            required
            placeholder="+237..."
            className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
            <Mail size={16} />
            Email Address *
          </label>

          <input
            type="email"
            name="reporterEmail"
            value={formData.reporterEmail || ''}
            onChange={handleChange}
            required
            placeholder="example@email.com"
            className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary"
          />
        </div>

      </div>

      {/* Relationship */}
      <div>

        <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
          <Users size={16} />
          Relationship to Missing Person *
        </label>

        <select
          name="relationship"
          value={formData.relationship || ''}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary"
        >
          <option value="">Select Relationship</option>
          <option>Parent</option>
          <option>Sibling</option>
          <option>Spouse</option>
          <option>Relative</option>
          <option>Friend</option>
          <option>Guardian</option>
          <option>Police Officer</option>
          <option>Other</option>
        </select>

      </div>

      <div className="bg-muted border border-border rounded-lg p-4">
        <p className="text-sm text-muted-foreground">
          Your information is kept confidential and is only used to verify the report and contact you if someone reports a sighting.
        </p>
      </div>

    </div>
  )
}