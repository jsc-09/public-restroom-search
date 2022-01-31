// #region global variables
mapboxgl.accessToken = 'pk.eyJ1Ijoic2xhdGVybWNhcmRsZSIsImEiOiJja3lxNHJ6aWowZ2k1Mm9qamR1czF1OWJhIn0.s_73OZ4ECgZnF9CLwtWg2w';
let map;
let geocoder1;
let geocoder2;
let sharedPosition = [];
// #endregion

navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {enableHighAccuracy: true});
function setupMap(center) {
    map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: center,
        zoom: 12
        });
        geocoder1 = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl
        })
         geocoder2 = new MapboxGeocoder({
             accessToken: mapboxgl.accessToken,
             mapboxgl: mapboxgl
         })
        document.getElementById('geoCoder-1').appendChild(geocoder1.onAdd(map));
         document.getElementById('geoCoder-2').appendChild(geocoder2.onAdd(map));
        geocoder1.on('result', function(e) {
            sharedPosition = [];
            getApi(e.result.center);
        })
         geocoder2.on('result', function(e) {
             $('.modal').removeClass('is-active')
             sharedPosition = [];
             getApi(e.result.center);
         })
    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav);
}
function successLocation(position) {
    setupMap([position.coords.longitude, position.coords.latitude]);
    sharedPosition = [[position.coords.longitude, position.coords.latitude]];
    getApi([position.coords.longitude, position.coords.latitude]);
}
function errorLocation() {
    setupMap([-2.34, 53.48]);
}
  
  
  
  
  
  
  
  
  
  
  
  
  