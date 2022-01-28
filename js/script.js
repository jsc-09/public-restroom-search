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

        if (filteredResults[i].accessible === true) {
          var accessible = "fab fa-accessible-icon";
        } if (filteredResults[i].changing_table === true) {
          var baby = " fas fa-baby";
        } if (filteredResults[i].unisex === true) {
          var gender = " fas fa-transgender-alt";
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
                                <i id="icons" class="${accessible}"></i>
                                <i id="icons" class="${baby}"></i>
                                <i id="icons" class="${gender}"></i>
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
      // console.log(locationArray);

    });
}

// button event listener
fetchButton.addEventListener("click", getApi);