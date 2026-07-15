'use client'

import { Shirt } from 'lucide-react'

export default function PhysicalDescription({
  formData,
  handleChange
}) {
  return (
    <div className="space-y-6">

      {/* Clothing Worn */}
      <div>
        <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
          <Shirt size={16} />
          Clothing Worn *
        </label>

        <textarea
          name="clothing"
          value={formData.clothing}
          onChange={handleChange}
          rows={3}
          required
          placeholder="Describe the clothes the missing person was wearing."
          className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
        />
      </div>

      {/* Height & Weight */}
      <div className="grid md:grid-cols-2 gap-4">

        <div>
          <label className="block text-sm font-semibold mb-2">
            Height
          </label>

          <input
            type="text"
            name="height"
            value={formData.height}
            onChange={handleChange}
            placeholder="170 cm"
            className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">
            Weight
          </label>

          <input
            type="text"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            placeholder="70 kg"
            className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

      </div>

      {/* Hair & Eyes */}
      <div className="grid md:grid-cols-2 gap-4">

        <div>
          <label className="block text-sm font-semibold mb-2">
            Hair Colour
          </label>

          <input
            type="text"
            name="hair"
            value={formData.hair}
            onChange={handleChange}
            placeholder="Black"
            className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">
            Eye Colour
          </label>

          <input
            type="text"
            name="eyes"
            value={formData.eyes}
            onChange={handleChange}
            placeholder="Brown"
            className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

      </div>

      {/* Skin Complexion */}
      <div>
        <label className="block text-sm font-semibold mb-2">
          Skin Complexion
        </label>

        <select
          name="complexion"
          value={formData.complexion}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Select Complexion</option>
          <option>Fair</option>
          <option>Light Brown</option>
          <option>Brown</option>
          <option>Dark Brown</option>
          <option>Black</option>
          <option>Albino</option>
        </select>
      </div>

      {/* Distinguishing Marks */}
      <div>
        <label className="block text-sm font-semibold mb-2">
          Distinguishing Marks
        </label>

        <textarea
          name="marks"
          value={formData.marks}
          onChange={handleChange}
          rows={3}
          placeholder="Scars, tattoos, birthmarks, missing tooth..."
          className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
        />
      </div>

      {/* Physical Description */}
      <div>
        <label className="block text-sm font-semibold mb-2">
          Physical Description *
        </label>

        <textarea
          name="physicalDescription"
          value={formData.physicalDescription}
          onChange={handleChange}
          rows={4}
          required
          placeholder="Describe the person's appearance..."
          className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
        />
      </div>

    </div>
  )
}
      