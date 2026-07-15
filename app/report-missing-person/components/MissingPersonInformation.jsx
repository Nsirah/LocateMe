'use client'

import { useState } from 'react'

import PersonalInformation from './PersonalInformation'
import PhysicalDescription from './PhysicalDescription'
import LocationInformation from './LocationInformation'
import ReporterInformation from './ReporterInformation'
import EmergencyContact from './EmergencyContact'
import MedicalInformation from './MedicalInformation'
import PoliceInformation from './PoliceInformation'
import SubmitSection from './SubmitSection'
import MissingDays from './MissingDays'
import { saveMissingPerson } from '@/lib/missingPersonServices'

export default function MissingPersonInformation() {

  const [formData, setFormData] = useState({

    fullName: '',
    age: '',
    gender: '',
    dateMissing: '',
    lastSeenDate: '',
    lastSeenTime: '',
    clothing: '',
    height: '',
    weight: '',
    hair: '',
    eyes: '',
    complexion: '',
    marks: '',
    physicalDescription: '',
    lastSeenLocation: '',
     landmark: '',
    city: '',
    street: '',
    region: '',
    reporterName: '',
    reporterPhone: '',
    reporterEmail: '',
    relationship: '',
    emergencyName:'',
    emergencyPhone:'',
    medicalCondition:'',
    medication:'',
    caseNumber:'',
    policeStation:'',
    latitude: '',
    longitude: '',
    status: 'Missing',
    image: '',
  
  })
   const [isLoading, setIsLoading] = useState(false)
    

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageUploaded = (imageUrl) => {
  setFormData(prev => ({
    ...prev,
    image: imageUrl
  }))
}

  const handleSubmit = async (e) => {
  e.preventDefault()

  try {
    setIsLoading(true)
    console.log(formData);

    await saveMissingPerson({ 
     ... formData
 })
    alert("Missing person reported successfully!")

    setFormData({
      fullName: '',
      age: '',
      gender: '',
      dateMissing: '',
      lastSeenDate: '',
      lastSeenTime: '',
      clothing: '',
      height: '',
      weight: '',
      hair: '',
      eyes: '',
      complexion: '',
      marks: '',
      physicalDescription: '',
      location: '',
      policeCaseNumber: '',
      medicalCondition: '',
      emergencyContactName: '',
      emergencyContactPhone: '',
       latitude: '',
    longitude: '',
    })
    }

catch (error) {
  console.error("Firebase Error:", error.code, error.message);
  alert(error.message);
}
 finally {
    setIsLoading(false);
}
}

  const isFormValid =
formData.fullName &&
formData.age &&
formData.gender &&
formData.dateMissing &&
formData.lastSeenDate &&
formData.lastSeenTime &&
formData.clothing &&
formData.physicalDescription &&
formData.lastSeenLocation &&
formData.city &&
formData.region &&
formData.landmark &&
formData.reporterName &&
formData.reporterPhone &&
formData.reporterEmail &&
formData.relationship &&
formData.emergencyName &&
formData.emergencyPhone &&
formData.latitude &&
formData.longitude 

  return (
    <form
  onSubmit={handleSubmit}
  className="bg-card border border-border rounded-lg p-8"
>

      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">

        <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
          1
        </span>

        Missing Person Information

      </h2>

     <PersonalInformation
  formData={formData}
  handleChange={handleChange}
  onImageUploaded={handleImageUploaded}
/>

      <div className="my-8 border-t border-border"></div>

      <PhysicalDescription
        formData={formData}
        handleChange={handleChange}
      />

      <div className="my-8 border-t border-border"></div>

      <LocationInformation
        formData={formData}
        handleChange={handleChange}
      />
      <div className="my-8 border-t border-border"></div>

      <ReporterInformation
       formData={formData}
       handleChange={handleChange}
     />
     <div className="my-8 border-t border-border"></div>

    <EmergencyContact
     formData={formData}
    handleChange={handleChange}
    />
  <div className="my-8 border-t border-border"></div>

    <MedicalInformation
     formData={formData}
     handleChange={handleChange}
    />

   <div className="my-8 border-t border-border"></div>

    <PoliceInformation
      formData={formData}
      handleChange={handleChange}
    />

    <div className="my-8 border-t border-border"></div>

    <MissingDays
 dateMissing={formData.dateMissing}
/>

    <div className="my-8 border-t border-border"></div>

    <SubmitSection
     isFormValid={isFormValid}
     isLoading={false}  
    />

{/*
<LocationInformation
  formData={formData}
  handleChange={handleChange}
/>
*/}
    
    </form>
  )
}