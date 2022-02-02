// #region global variables
mapboxgl.accessToken =
  "pk.eyJ1Ijoic2xhdGVybWNhcmRsZSIsImEiOiJja3lxNHJ6aWowZ2k1Mm9qamR1czF1OWJhIn0.s_73OZ4ECgZnF9CLwtWg2w";
let map;
let geocoder1;
let geocoder2;
let sharedPosition = [];
let storedSearchLocation = [];
let recentSearches = [];
// #endregion

// get the user's location if they consent.
navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
  enableHighAccuracy: true,
});

// function to initialize the vector map, add geocoders and nav elements, and load the geocoder event listeners once the map has been loaded
function setupMap(center) {
  map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    center: center,
    zoom: 12,
  });
  geocoder1 = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
  });
  geocoder2 = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
  });
  document.getElementById("geoCoder-1").appendChild(geocoder1.onAdd(map));
  document.getElementById("geoCoder-2").appendChild(geocoder2.onAdd(map));
  geocoder1.on("result", function (e) {
    let recentSearch = {
      place_name: e.result.place_name,
      location: e.result.center,
    };
    populateDropdowns();
    $(".modal").removeClass("is-active");
    sharedPosition = [];
    getApi(e.result.center);
    setLocalStorage(recentSearch);
  });
  geocoder2.on("result", function (e) {
    let recentSearch = {
      place_name: e.result.place_name,
      location: e.result.center,
    };
    populateDropdowns();
    sharedPosition = [];
    getApi(e.result.center);
    $(".modal").removeClass("is-active");
    setLocalStorage(recentSearch);
  });
  const nav = new mapboxgl.NavigationControl();
  map.addControl(nav);
  map.on("idle", function () {
    $(".mapboxgl-canvas").removeAttr("style");
    map.resize();
  });
}

// function to load the map at the user's shared location with search results by default
function successLocation(position) {
  setupMap([position.coords.longitude, position.coords.latitude]);
  sharedPosition = [[position.coords.longitude, position.coords.latitude]];
  getApi([position.coords.longitude, position.coords.latitude]);
}

// function to load the map at a default location with no results.
// defaults to UC San Diego campus
function errorLocation() {
  setupMap([-117.234, 32.8803]);
}

// Update the recent searches list with the most recent object at the top. remove any objects over the 3 most recent.
// save the list to local storage
function setLocalStorage(recent) {
  if (recentSearches != null) {
    recentSearches.unshift(recent);
  } else {
    recentSearches = [recent];
  }
  if (recentSearches.length > 3) {
    recentSearches.pop();
  }
  console.log("here");
  localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
}

// populate the recent search dropdown elements based on the recent search results
function populateDropdowns() {
  $(".dropdown-content").empty();
  if (recentSearches != null) {
    for (let i = 0; i < recentSearches.length; i++) {
      console.log("test");
      let searchText = recentSearches[i].place_name;
      console.log(searchText);
      let dropdownElement = `<a href="#" value="${i}" class="dropdown-item">${searchText}</a>`;
      $(".dropdown-content").append(dropdownElement);
    }
  }
}

// get the stored recent search results out of local storage
function getLocalStorage() {
  let searches = localStorage.getItem("recentSearches");
  recentSearches = JSON.parse(searches);
}
