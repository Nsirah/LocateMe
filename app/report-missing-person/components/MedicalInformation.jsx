'use client'

export default function MedicalInformation({
    formData,
    handleChange
}){

return(

<div className="space-y-6">

<h3 className="text-lg font-bold">
Medical Information
</h3>

<div>

<label className="block text-sm font-semibold mb-2">
Medical Condition (Optional)
</label>

<textarea
name="medicalCondition"
value={formData.medicalCondition || ''}
onChange={handleChange}
rows={3}
placeholder="Epilepsy, Diabetes, Autism, Alzheimer's, Mental illness..."
className="w-full px-4 py-3 border border-border rounded-lg bg-background resize-none focus:ring-2 focus:ring-primary"
/>

</div>

<div>

<label className="block text-sm font-semibold mb-2">
Medication Being Taken
</label>

<textarea
name="medication"
value={formData.medication || ''}
onChange={handleChange}
rows={3}
placeholder="Current medication..."
className="w-full px-4 py-3 border border-border rounded-lg bg-background resize-none focus:ring-2 focus:ring-primary"
/>

</div>

</div>

)

}