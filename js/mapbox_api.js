mapboxgl.accessToken = 'pk.eyJ1Ijoic2xhdGVybWNhcmRsZSIsImEiOiJja3lxNHJ6aWowZ2k1Mm9qamR1czF1OWJhIn0.s_73OZ4ECgZnF9CLwtWg2w';

var locationArray = [];
let map;
let geocoder1;
let geocoder2;

 navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {enableHighAccuracy: true});
function setupMap(center, array) {
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
            getApi(e.result.center);
        })
         geocoder2.on('result', function(e) {
             $('.modal').removeClass('is-active')
             getApi(e.result.center);
         })
    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav);
    // map.addControl(geocoder);
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
$('#map').on('click', function(e) {
    console.log(e.target);
});
  
  
  
  
  
  
  
  
  
  
  
  
  