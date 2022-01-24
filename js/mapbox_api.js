mapboxgl.accessToken = 'pk.eyJ1Ijoic2xhdGVybWNhcmRsZSIsImEiOiJja3lxNHJ6aWowZ2k1Mm9qamR1czF1OWJhIn0.s_73OZ4ECgZnF9CLwtWg2w';

var locationArray = [];
let map;

navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {enableHighAccuracy: true});

function setupMap(center, array) {
    map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: center,
        zoom: 12
        });
    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav);
}
function createMarkers(array) {
    for (let i = 0; i < array.length; i++) {
        const marker = new mapboxgl.Marker()
        .setLngLat([array[i].long, array[i].lat])
        .addTo(map);
    }
}
function successLocation(position) {
    setupMap([-117.379186, 33.194634]);
    getApi();
}
function errorLocation() {
    setupMap([-2.34, 53.48]);
}
function getApi() {
    var requestUrl =
      "https://www.refugerestrooms.org/api/v1/restrooms/by_location?page=1&per_page=10&offset=0&lat=33.194634&lng=-117.379186";
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // console.log(data);
        for (var i = 0; i < data.length; i++) {
          var locationName = document.createElement("h3");
          var city = document.createElement("p");
          locationName.textContent = data[i].name;
          city.textContent = data[i].city;
          dataField.append(locationName);
          dataField.append(city);
            let locationObject = {'lat': data[i].latitude, 'long': data[i].longitude};
            locationArray.push(locationObject);
        }
        createMarkers(locationArray);
      });
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  