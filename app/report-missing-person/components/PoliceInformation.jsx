'use client'

export default function PoliceInformation({
formData,
handleChange
}){

return(

<div className="space-y-6">

<h3 className="text-lg font-bold">
Police Report
</h3>

<div>

<label className="block text-sm font-semibold mb-2">
Police Case Number (Optional)
</label>

<input
type="text"
name="caseNumber"
value={formData.caseNumber || ''}
onChange={handleChange}
placeholder="Example: BPD-2026-00145"
className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary"
/>

</div>

<div>

<label className="block text-sm font-semibold mb-2">
Police Station
</label>

<input
type="text"
name="policeStation"
value={formData.policeStation || ''}
onChange={handleChange}
placeholder="Commisariat 12eme douala"
className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary"
/>

</div>

</div>

)

}