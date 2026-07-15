'use client'

import { User, Calendar } from 'lucide-react'
import ImageUploader from './ImageUploader'

export default function PersonalInformation({
  formData,
  handleChange,
  onImageUploaded
}) {
    
  return (
    <div className="space-y-6">

      <ImageUploader
  onImageUploaded={onImageUploaded}
/>

      {/* Full Name */}
      <div>
        <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
          <User size={16} />
          Full Name *
        </label>

        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Enter full name"
          required
          className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Age & Gender */}
      <div className="grid md:grid-cols-2 gap-4">

        <div>
          <label className="block text-sm font-semibold mb-2">
            Age *
          </label>

          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Age"
            required
            className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">
            Gender *
          </label>

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>

      </div>

      {/* Date Missing */}
      <div>
        <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
          <Calendar size={16} />
          Date Missing *
        </label>

        <input
          type="date"
          name="dateMissing"
          value={formData.dateMissing}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Last Seen */}
      <div className="grid md:grid-cols-2 gap-4">

        <div>
          <label className="block text-sm font-semibold mb-2">
            Last Seen Date *
          </label>

          <input
            type="date"
            name="lastSeenDate"
            value={formData.lastSeenDate}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">
            Last Seen Time *
          </label>

          <input
            type="time"
            name="lastSeenTime"
            value={formData.lastSeenTime}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

      </div>

    </div>
  )
}