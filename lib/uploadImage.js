export async function uploadImage(file) {

  const data = new FormData();

  data.append("file", file);
  data.append("upload_preset", "missing_persons");

  const response = await fetch(
    "https://api.cloudinary.com/v1_1/s00vm4wl/image/upload",
    {
      method: "POST",
      body: data,
    }
  );

  const result = await response.json();

  return result.secure_url;
}