// #region global variables
mapboxgl.accessToken = 'pk.eyJ1Ijoic2xhdGVybWNhcmRsZSIsImEiOiJja3lxNHJ6aWowZ2k1Mm9qamR1czF1OWJhIn0.s_73OZ4ECgZnF9CLwtWg2w';
let map;
let geocoder1;
let geocoder2;
let sharedPosition = [];
let storedSearchLocation = [];
let recentSearches = [];
// #endregion

navigator.geolocation.getCurrentPosition(successLocation, errorLocation, { enableHighAccuracy: true });
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
    geocoder1.on('result', function (e) {
        let recentSearch = {'place_name': e.result.place_name, 'location': e.result.center};
        setLocalStorage(recentSearch);
        populateDropdowns();
        $('.modal').removeClass('is-active')
        sharedPosition = [];
        getApi(e.result.center);
    })
    geocoder2.on('result', function (e) {
        let recentSearch = {'place_name': e.result.place_name, 'location': e.result.center};
        setLocalStorage(recentSearch);
        populateDropdowns();
        sharedPosition = [];
        getApi(e.result.center);
        $('.modal').removeClass('is-active')
    })
    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav);
    map.on('idle', function() {
        $('.mapboxgl-canvas').removeAttr('style');
        map.resize();
    });
}
function successLocation(position) {
    setupMap([position.coords.longitude, position.coords.latitude]);
    sharedPosition = [[position.coords.longitude, position.coords.latitude]];
    getApi([position.coords.longitude, position.coords.latitude]);
}
function errorLocation() {
    setupMap([-117.2340, 32.8803]);
}

function setLocalStorage(recent) {
    recentSearches.unshift(recent);
    if (recentSearches.length > 3) {
        recentSearches.pop();
    }
    console.log('here');
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
}

function populateDropdowns() {
    $('.dropdown-content').empty();
    for (let i = 0; i < recentSearches.length; i++) {
    console.log('test');
        let searchText = recentSearches[i].place_name;
        console.log(searchText);
        let dropdownElement = `<a href="#" value="${i}" class="dropdown-item">${searchText}</a>`
        $('.dropdown-content').append(dropdownElement);
    }
}

function getLocalStorage() {
    let searches = localStorage.getItem('recentSearches')
    recentSearches = JSON.parse(searches);
    console.log(recentSearches.place_name);
}












