// Initialize the map and set its view to a geographical location (latitude, longitude) and zoom level
const map = L.map("map").setView([51.505, -0.09], 13);

// Set up the OpenStreetMap layer
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// Create a custom icon for the luggage
const luggageIcon = L.icon({
    iconUrl: 'luggage-bag.png',
    iconSize: [50, 50], // Size of the icon
    iconAnchor: [25, 50], // Point of the icon which will correspond to marker's location
    popupAnchor: [0, -50] // Point from which the popup should open relative to the iconAnchor
});

// Add an initial marker at a default location with the custom icon
let marker = L.marker([51.505, -0.09], { icon: luggageIcon }).addTo(map);

// Function to fetch and update the GPS location periodically
function updateGPSLocation() {
  fetch("https://your-server-url.com/get_gps")  // Replace with your server URL
    .then(response => response.json())
    .then(data => {
      const lat = data.latitude;
      const lng = data.longitude;

      // Update the marker position
      marker.setLatLng([lat, lng]);

      // Center the map to the new GPS location
      map.setView([lat, lng], 13);
    })
    .catch(error => console.error('Error fetching GPS data:', error));
}

// Update the GPS location every 5 seconds
setInterval(updateGPSLocation, 5000);