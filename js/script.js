let popupList;
let locationList;

async function getApi(coordinates) {
  if (popupList != undefined && popupList.length < 1) {
    closePopups();
  }
  let requestUrl = `https://www.refugerestrooms.org/api/v1/restrooms/by_location?page=1&per_page=10&offset=0&lat=${coordinates[1]}&lng=${coordinates[0]}`;
  let response = await fetch(requestUrl);
  let data = await response.json();
  let restroomInfo = document.getElementById('restroomCard');
  restroomInfo.innerHTML = "";
  let filteredResults = filterResults(data);
  let pinList = [];
  popupList = [];
  locationList = [];

  for (let i = 0; i < filteredResults.length; i++) {
    let distanceAway = filteredResults[i].distance;
    let accessible = (filteredResults[i].accessible) ? "fab fa-accessible-icon" : "";
    let baby = (filteredResults[i].changing_table) ? "fas fa-baby" : "";
    let gender = (filteredResults[i].unisex) ? "fas fa-transgender-alt" : "";
    let cardId = 'card-' + [i];
    let navigationURL = `https://www.google.com/maps/dir/${coordinates[1]},${coordinates[0]}/${filteredResults[i].latitude},${filteredResults[i].longitude}/`;

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
    
    let location = [filteredResults[i].longitude, filteredResults[i].latitude]
    locationList.push(location);
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
    
    // add the created card to the results section
    restroomInfo.innerHTML += cardmarkup;
    
    // create a geojson feature for each result to use for pin generation
    let pinItem = {'type': 'Feature',
     'geometry': {
        'type': 'Point',
        'coordinates': [filteredResults[i].longitude, filteredResults[i].latitude]
      },
      'properties': {
        'title': filteredResults[i].name,
        'id': 'marker-' + [i],
        'address': "address: " + filteredResults[i].street + ", " + filteredResults[i].city,
        'distance': "Distance Away: " + Math.round(distanceAway * 100) / 100 + ' miles'
      }
    };
    // add the feature to the feature list
    pinList.push(pinItem);
  };

  for (let i = 0; i < pinList.length; i++) {
    // create a HTML element for each feature
    const el = document.createElement('div');
    el.id = pinList[i].properties.id;
    el.className = 'marker';
    // make a marker for each feature and add to the map
    let marker = new mapboxgl.Marker(el)
    .setLngLat(pinList[i].geometry.coordinates)
    .setPopup(popupList[i])
    .addTo(map);
  };
  console.log('test');
  let bounds = new mapboxgl.LngLatBounds(
    locationList[0],
    locationList[0]
    );
  // Extend the 'LngLatBounds' to include every coordinate in the bounds result.
  for (let i = 0; i < locationList.length; i++) {
  bounds.extend(locationList[i]);
  }
  map.fitBounds(bounds, {
  padding: 20
  });
};

// function to close any open popups. use before opening a new one or when generating new search results
function closePopups() {
  for (let i = 0; i < popupList.length; i++) {
    popupList[i].remove();
  }
}

// function called by result card anchor tags to trigger a popup on the corresponding map pin
function triggerPopUp(index) {
  closePopups();
  popupList[index].addTo(map);
}
