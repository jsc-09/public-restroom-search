let popupList;
let locationList;
let markerList;
let searchDone = false;
let lastSearch = [];
// asynchronous function that does all of the following:
// 1. polls the refuge API for the top 10nresults based on the input lat/long location
// 2. parses the results
// 3. generates results cards (for the desktop and tablet versions)
// 4. generates map markers nd places them on the map (all versions)
// 5. generates popups that attach to the map markers and can be triggered either by clicking the marker or the corresponding card
// 6. zooms the map in on the results pins appropriately
async function getApi(coordinates) {
  // store the incoming coordinates for later filtering
  lastSearch = coordinates;
  // track that a search is complete so a screen size change no longer activates the search modal
  searchDone = true;
  // loop through any existing popups and close them in case they're open
  if (popupList != undefined && popupList.length < 1) {
    closePopups();
  }
  // Loop through the existing markers and remov them to make way for new search results
  if (markerList != undefined && markerList.length > 0) {
    clearMarkers();
  }
  
  // create the restroom api request url using the passed coordinates
  let requestUrl = `https://www.refugerestrooms.org/api/v1/restrooms/by_location?page=1&per_page=10&offset=0&lat=${coordinates[1]}&lng=${coordinates[0]}`;
  // Send the request and wait for data
  let response = await fetch(requestUrl);
  // Once the data is there, parse it using json
  let data = await response.json();
  // Grab the card container from the webpage
  let restroomInfo = document.getElementById('restroomCard');
  // Clear the container in case there's previous results
  restroomInfo.innerHTML = "";
  // filter the results based on the checkboxes on the page
  let filteredResults = filterResults(data);
  // initialize/clear some global item storage variables
  let pinList = [];
  popupList = [];
  markerList = [];
  if (sharedPosition.length > 0) {
    locationList = [sharedPosition];
  } else {
    locationList = [];
  }
  // Loop through the filtered results
  for (let i = 0; i < filteredResults.length; i++) {
    // grab the necessary data from each result object
    let distanceAway = filteredResults[i].distance;
    let accessible = (filteredResults[i].accessible) ? "fab fa-accessible-icon" : "";
    let baby = (filteredResults[i].changing_table) ? "fas fa-baby" : "";
    let gender = (filteredResults[i].unisex) ? "fas fa-transgender-alt" : "";
    let cardId = 'card-' + [i];
    let navigationURL = `https://www.google.com/maps/dir/${coordinates[1]},${coordinates[0]}/${filteredResults[i].latitude},${filteredResults[i].longitude}/`;

    // create the result card element
    let cardmarkup = `
      <div class="card-content custom-card mt-1">
      <a id="${cardId}" class="cardLink" href="#" onClick="triggerPopUp(${i});"></a>
        <div class="content">
          <h4>${filteredResults[i].name}</h4>
          <div class="row columns">
            <div class="column">
              <p>${filteredResults[i].street + ", " + filteredResults[i].city}</p>
              <p>${"Distance Away: " + Math.round(distanceAway * 100) / 100 + ' miles'}</p>
              <p><a href="${navigationURL}" class="navigationLink" target="_blank">Navigate here</a></p>
            </div>
            <div class="column">
              <i class="${accessible}"></i>
              <i class="${baby}"></i>
              <i class="${gender}"></i>
            </div >
          </div >
          <div class="row">
            <p>${"<strong>Directions: </strong> " + filteredResults[i].directions}</p>
            <p>${"<strong>Comments: </strong> " + filteredResults[i].comment}</p>
          </div>
        </div >
      </div >`
    
    // save the result location in the location list for use setting the map bounding box later
    let location = [filteredResults[i].longitude, filteredResults[i].latitude]
    locationList.push(location);
    
    // add the created card to the results section
    restroomInfo.innerHTML += cardmarkup;
    
    // generate a list of popups to tie into the markers later
    let popUp = new mapboxgl.Popup({ offset: 25 }) // add popups
      .setHTML(
        `<h3>${filteredResults[i].name}</h3>
        <p>${filteredResults[i].street + ", " + filteredResults[i].city}</p>
        <p>${"Distance Away: " + Math.round(distanceAway * 100) / 100 + ' miles'}</p>
        <p><a href="${navigationURL}" target="_blank">Navigate here</a></p>
        `
      )
    popupList.push(popUp);

    // create a HTML element for each feature
    const el = document.createElement('div');
    el.id = 'marker-' + [i];
    el.className = 'marker';

    // make a marker for each feature and add to the map
    let marker = new mapboxgl.Marker(el)
    .setLngLat([filteredResults[i].longitude, filteredResults[i].latitude])
    .setPopup(popUp)
    .addTo(map);
    markerList.push(marker);
    
  };

  // If there's an initial share location position, add a marker for it and add it to the marker list for later removal
  if (sharedPosition.length > 0) {
    marker = new mapboxgl.Marker()
        .setLngLat(sharedPosition[0])
        .addTo(map);
    markerList.push(marker);
  }

  // create a bounding box to set the map view based on the results pins.
  // Start by setting both corners to the first result pin
  let bounds = new mapboxgl.LngLatBounds(
    locationList[0],
    locationList[0]
    );
  // Extend the 'LngLatBounds' to include every coordinate in the bounds result.
  for (let i = 0; i < locationList.length; i++) {
  bounds.extend(locationList[i]);
  }
  // set the map to the bounding box
  map.fitBounds(bounds, {
  padding: 100
  });
};