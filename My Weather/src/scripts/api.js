const key = '5399c219f8c11c581e46cb42e73c00fa'

export async function getWeather(city) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
    const response = await fetch(url)
    const data = await response.json()
    return data
  } catch (e) {
    throw e
  }
}

async function getCityFromCoords(lat, lon) {
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`);
    const data = await response.json();
    
 //  console.log("🔍 Full Response from API:", data); // Debugging

    let city =
      data.address.city ||       
      data.address.county ||     
      data.address.state_district || 
      data.address.state ||      
      "Unknown Location";

    // Normalize city name to remove diacritics (e.g., "Khalīlābād" → "Khalilabad")
    city = city.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  //  console.log("📍 Normalized City:", city);
    return city;
  } catch (error) {
   // console.log("❌ Error fetching city name:", error);
    return "Unknown Location"; // Handle errors gracefully
  }
}
export async function getUserLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        let city = await getCityFromCoords(lat, lon);
        
        if (city && city !== "Unknown Location") {
          resolve(city);
        } else {
        // console.log("❌ Unable to detect city, defaulting to Delhi");
          resolve("Delhi"); // Fallback
        }
      },
      (error) => {
       // console.log("❌ Geolocation error:", error);
        resolve("Delhi"); // Default if user denies location
      }
    );
  });
}