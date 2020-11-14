
// Creating map object
var myMap = L.map("map", {
  center: [37.7749, -122.4194],
  zoom: 12
});

// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
tileSize: 512,
zoomOffset: -1,
id: "mapbox/streets-v11",
accessToken: API_KEY
}).addTo(myMap);

// geoJson data link
var link = "static/pd.geojson";

// district colors
function chooseColor(district) {
  switch (district) {
  case "SOUTHERN":
    return "yellow";
  case "CENTRAL":
    return "red";
  case "NORTHERN":
    return "orange";
  case "PARK":
    return "green";
  case "TARAVAL":
    return "purple";
  case "INGLESIDE":
    return "blue";
  case "BAYVIEW":
    return "grey";
  case "MISSION":
    return "turquoise";
  case "TENDERLOIN":
    return "pink";
  case "RICHMOND":
    return "brown";
  default:
    return "black";
  }
}

// adding geoJson layer

d3.json(link, function(data){
  L.geoJson(data, {
    style: function(feature) {
      return {
        color: "white",
        fillColor: chooseColor(feature.properties.district),
        fillOpacity: 0.3,
      }; 
    },
    onEachFeature: function(feature, layer){
      layer.on({
        mouseover: function(event){
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.6
          });
        },
        mouseout: function(event){
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.3
          });
        },
      });
      layer.bindPopup("<h2>" + feature.properties.district + "</h2>");
    }
  }).addTo(myMap);
});