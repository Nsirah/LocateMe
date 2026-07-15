'use client'

import { useRef, useState } from 'react'
import { Upload, Image as ImageIcon, X } from 'lucide-react'
import { uploadImage } from "../../../lib/uploadImage";

export default function ImageUploader({
  onImageUploaded
}) {

  const [image, setImage] = useState(null)
  const fileInputRef = useRef(null)
  const [selectedFile, setSelectedFile] = useState(null);
const [imageUrl, setImageUrl] = useState("");

 const handleImage = async (file) => {
  if (!file) return

  if (!file.type.startsWith("image/")) {
    alert("Please select a valid image.")
    return
  }

  if (file.size > 5 * 1024 * 1024) {
    alert("Image must be less than 5MB.")
    return
  }

  setSelectedFile(file)

  const url = await uploadImage(file)
  
  console.log("Cloudinary URL:", url);


  setImageUrl(url)

  onImageUploaded(url)

  setImage(URL.createObjectURL(file))
}

  const handleChange = (e) => {
    const file = e.target.files[0]
    handleImage(file)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    handleImage(file)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const removeImage = () => {
    setImage(null)
  }

  return (
    <div className="space-y-4">

      <label className="block text-sm font-semibold">
        Missing Person Photo *
      </label>

      {!image ? (
        <div
          onClick={() => fileInputRef.current.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="border-2 border-dashed border-border rounded-xl p-10 text-center cursor-pointer hover:border-primary transition-colors bg-muted/30"
        >
          <Upload
            size={45}
            className="mx-auto text-primary mb-4"
          />

          <h3 className="font-semibold text-lg">
            Drag & Drop Photo Here
          </h3>

          <p className="text-sm text-muted-foreground mt-2">
            or click to browse
          </p>

          <p className="text-xs text-muted-foreground mt-3">
            JPG • PNG • WEBP (Maximum 5MB)
          </p>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={handleChange}
          />
        </div>
      ) : (
        <div className="relative">

          <div className="flex justify-center">
  <div className="relative w-64 aspect-[4/5]">
    <img
      src={image}
      alt="Preview"
      className="w-full h-full object-cover rounded-xl border border-border shadow-md"
    />

    <button
      type="button"
      onClick={removeImage}
      className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2"
    >
      <X size={16} />
    </button>
  </div>
</div>

          <button
            type="button"
            onClick={removeImage}
            className="absolute top-3 right-3 bg-red-500 text-white rounded-full p-2 hover:bg-red-600"
          >
            <X size={18} />
          </button>

        </div>
      )}

      <div className="bg-muted/50 border border-border rounded-lg p-4 flex gap-3">

        <ImageIcon
          className="text-primary mt-1"
          size={20}
        />

        <div>

          <p className="font-semibold">
            Upload Tips
          </p>

          <p className="text-sm text-muted-foreground">
            Upload a clear front-facing photograph of the missing person.
            Avoid blurry or cropped images.
          </p>

        </div>

      </div>

    </div>
  )
}