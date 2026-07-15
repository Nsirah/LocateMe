export async function getCoordinates(address) {

  const response = await fetch(

    https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=YOUR_GOOGLE_API_KEY

  );

  return await response.json();

}