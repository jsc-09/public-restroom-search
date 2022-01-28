var fetchButton = document.querySelector(".fetch-button");
var locationArray = [];

// fetch request
function getApi() {
  var requestUrl =
    "https://www.refugerestrooms.org/api/v1/restrooms/by_location?page=1&per_page=10&offset=0&lat=33.194634&lng=-117.379186";

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      let restroomInfo = document.getElementById('restroomCard');
      restroomInfo.innerHTML = "";
      let filteredResults = filterResults(data);

      for (var i = 0; i < filteredResults.length; i++) {
        var locationName = document.createElement("h3");
        var city = document.createElement("p");
        var icons = document.createElement("i");
        let distanceAway = filteredResults[i].distance;
        var accessible = '<i></i>';
        var baby = '<i></i>';
        var gender = '<i></i>';
        if (filteredResults[i].accessible) {
          accessible = '<i class="fab fa-accessible-icon"></i>';
        } if (filteredResults[i].changing_table) {
          baby = '<i class="fas fa-baby"></i>';
        } if (filteredResults[i].unisex) {
          gender = '<i class="fas fa-transgender-alt"></i>';
        }

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
                              ${accessible}
                              ${baby}
                              ${gender}
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

      }

    });
}

// button event listener
fetchButton.addEventListener("click", getApi);