let markerList;

async function getApi(coordinates) {
  let requestUrl =
    `https://www.refugerestrooms.org/api/v1/restrooms/by_location?page=1&per_page=10&offset=0&lat=${coordinates[1]}&lng=${coordinates[0]}`;

  let response = await fetch(requestUrl);
  let data = await response.json();
  let restroomInfo = document.getElementById('restroomCard');
  restroomInfo.innerHTML = "";
  let filteredResults = filterResults(data);
  let pinList = [];

  markerList = [];

  for (let i = 0; i < filteredResults.length; i++) {
    let distanceAway = filteredResults[i].distance;
    let accessible = (filteredResults[i].accessible) ? "fab fa-accessible-icon" : "";
    let baby = (filteredResults[i].changing_table) ? "fas fa-baby" : "";
    let gender = (filteredResults[i].unisex) ? "fas fa-transgender-alt" : "";
    let cardId = 'card-' + [i];

    let cardmarkup = `
                    <div id=${cardId} class="card-content custom-card mt-1">
                      <div class="content">
                          <h4>${filteredResults[i].name}</h4>
                            <div class="row columns">
                              <div class="column">
                                <p>${filteredResults[i].street + ", " + filteredResults[i].city}</p>
                                <p>${"Distance Away: " + Math.round(distanceAway * 100) / 100 + ' miles'}</p>
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
                    </div >
        `

    let locationObject = { 'lat': filteredResults[i].latitude, 'long': filteredResults[i].longitude };
    locationArray.push(locationObject)

    const popup = new mapboxgl.Popup({ offset: 25 }).setText(filteredResults[i].name)
    restroomInfo.innerHTML += cardmarkup;
    
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
    pinList.push(pinItem);
  };
  let geojson = {
    type: 'FeatureCollection',
    features: pinList
  };
  for (const feature of geojson.features) {
    // create a HTML element for each feature
    const el = document.createElement('div');
    el.id = feature.properties.id;
    el.className = 'marker';
    
    let navigationURL = `https://www.google.com/maps/dir/${coordinates[1]},${coordinates[0]}/${feature.geometry.coordinates[1]},${feature.geometry.coordinates[0]}/`;
    // make a marker for each feature and add to the map
    let marker = new mapboxgl.Marker(el)
    .setLngLat(feature.geometry.coordinates)
    .setPopup(
      new mapboxgl.Popup({ offset: 25 }) // add popups
        .setHTML(
          `<h3>${feature.properties.title}</h3>
          <p>${feature.properties.address}</p>
          <p>${feature.properties.distance}</p>
          <p><a href="${navigationURL}" target="_blank">Navigate here</a></p>
          `
        )
    )
    .addTo(map);
    markerList.push(marker);
  };
};
