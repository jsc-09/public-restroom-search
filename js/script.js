var fetchButton = document.querySelector(".fetch-button");
var dataField = document.querySelector(".data");
// var icons = document.querySelector(".icon");
var locationArray = [
  {
    "lat": "",
    "long": ""
  }
];

// console.log("hello world");

function getApi() {
  // console.log("hello world");
  var requestUrl =
    "https://www.refugerestrooms.org/api/v1/restrooms/by_location?page=1&per_page=10&offset=0&lat=33.194634&lng=-117.379186";

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      let restroomInfo = document.getElementById('restroomCard');
      restroomInfo.innerHTML = "";
      for (var i = 0; i < 5; i++) {
        console.log(data[i])
        var locationName = document.createElement("h3");
        var city = document.createElement("p");
        var icons = document.createElement("i");
        let distanceAway = data[i].distance;



        if (data[i].accessible === true) {
          icons.append("Wheel chairs accessible")
        } else if (data[i].changing_table === true) {
          icons.append("Changing table")
        } else if (data[i].unisex === true) {
          icons.append("Unisex")
        }

        let cardmarkup = `
                    <div class="card-content custom-card mt-1">
                    <div class="content">
                        <h4>${data[i].name}</h4>
                          <div class="row columns">
                            <div class="column">
                            <p>${data[i].street + ", " + data[i].city}</p>
                            <p>${"<strong>Distance Away:</strong> " + Math.round(distanceAway * 100) / 100 + ' miles'}</p>
                            </div>
                            <div class="column">
                            <p>ICONS GO HERE</p>
                            </div>
                          </div>
                        <div class="row">
                          <p>${"<strong>Directions: </strong> " + data[i].directions}</p>
                          <p>${"<strong>Comments: </strong> " + data[i].comment}</p>
                        </div>
                    </div>
                    </div>
        `

        locationName.textContent = data[i].name;
        city.textContent = data[i].city;

        //        dataField.append(locationName);
        //        dataField.append(city);

        // locationArray.lat = data[i].latitude;
        // locationArray.long = data[i].longitude;
        // console.log(locationArray);

        let locationObject = { 'lat': data[i].latitude, 'long': data[i].longitude };
        locationArray.push(locationObject)

        restroomInfo.innerHTML += cardmarkup;

      }
      console.log(locationArray);

    });
}

fetchButton.addEventListener("click", getApi);
