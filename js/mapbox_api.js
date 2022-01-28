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
    map.addControl(geocoder);
    const el = document.createElement('div');
    el.id = 'marker';
    const popup = new mapboxgl.Popup({ offset: 25 }).setText('Construction on the Washington Monument began in 1848.')
    new mapboxgl.Marker(el)
        .setLngLat([-117.379186, 33.194634])
        .setPopup(popup) // sets a popup on this marker
        .addTo(map);
    // const marker = new mapboxgl.Marker().setLngLat([-117.379186, 33.194634]);
    //     marker.addTo(map);
}
function createMarkers(array) {
    for (let i = 0; i < array.length; i++) {
        const marker = new mapboxgl.Marker()
        .setLngLat([-117.379186, 33.194634])
        .setPopup(popup)
        .addTo(map);
    }
}
function successLocation(position) {
    setupMap([-117.379186, 33.194634]);
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
$('#map').on('click', function(e) {
    console.log(e.target);
});
  
  
  
  
  
  
  
  
  
  
  
  
  