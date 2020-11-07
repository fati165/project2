// Creating map object
var myMap = L.map("map", {
    center: [37.7749, -122.4194],
    zoom: 12.5
});
  
// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

var link = "../../data/pd.geojson";

// adding pd district layer

// d3.json(link, function(data){
//   L.geojson(data, {
//     style: function(feature){
//       return {
//         color: black,
//         fillColor: white,
//         fillOpacity: .5,
//       };
//     },
//     onEachFeature: function(feature, layer){
//       layer.bindPopup("<h1" + feature.properties.district + "<h1>");
//     }
//   }).addTo(myMap)
// });



  