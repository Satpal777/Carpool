// Creating map options
console.log("hello")
var mapOptions = {
   center: [17.385044, 78.486671],
   zoom: 10
}
// Creating a map object
var map = new L.map('map', mapOptions);

// Creating a Layer object
var layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
   attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
});

// Adding layer to the map
map.addLayer(layer);

// Creating a marker
var marker = L.marker([17.385044, 78.486671]);
marker.bindPopup('Hi Welcome to Tutorialspoint').openPopup();
// Adding marker to the map
marker.addTo(map);

