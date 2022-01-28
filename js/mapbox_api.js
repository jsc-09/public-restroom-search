mapboxgl.accessToken = 'pk.eyJ1Ijoic2xhdGVybWNhcmRsZSIsImEiOiJja3lxNHJ6aWowZ2k1Mm9qamR1czF1OWJhIn0.s_73OZ4ECgZnF9CLwtWg2w';

var locationArray = [];
let map;
const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl
})

 navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {enableHighAccuracy: true});
//setupMap([-117.379186, 33.194634]);
setGeoCoder();
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
function setGeoCoder() {
    map.addControl(geocoder);
}
geocoder.on('result', function(e) {
    console.log(e.result.center[0]);
})
  
  
  
  
  
  
  
  
  
  
  
  
  