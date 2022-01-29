async function getApi(coordinates) {
  console.log(typeof coordinates);
  let requestUrl =
    `https://www.refugerestrooms.org/api/v1/restrooms/by_location?page=1&per_page=10&offset=0&lat=${coordinates[1]}&lng=${coordinates[0]}`;

  let response = await fetch(requestUrl);
  let data = await response.json();
  let restroomInfo = document.getElementById('restroomCard');
  restroomInfo.innerHTML = "";
  let filteredResults = filterResults(data);

  for (let i = 0; i < filteredResults.length; i++) {
    let distanceAway = filteredResults[i].distance;
    let accessible = (filteredResults[i].accessible) ? "fab fa-accessible-icon" : "";
    let baby = (filteredResults[i].changing_table) ? "fas fa-baby" : "";
    let gender = (filteredResults[i].unisex) ? "fas fa-transgender-alt" : "";

    let cardmarkup = `
                    <div class="card-content custom-card mt-1">
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

    restroomInfo.innerHTML += cardmarkup;
    const marker = new mapboxgl.Marker().setLngLat([filteredResults[i].longitude, filteredResults[i].latitude]);
    marker.addTo(map);
  }
};