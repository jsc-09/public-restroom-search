
var fetchButton = document.querySelector("#fetch-button");
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
      for (var i = 0; i < data.length; i++) {
        var locationName = document.createElement("h3");
        var city = document.createElement("p");
        var icons = document.createElement("i");

        
        if (data[i].accessible === true) {
           icons.append("Wheel chairs accessible")
        } else if (data[i].changing_table === true) {
            icons.append("Changin table")
        } else if (data[i].unisex === true) {
            icons.append("Unisex")
        }

        locationName.textContent = data[i].name;
        city.textContent = data[i].city;

        dataField.append(locationName);
        dataField.append(city);

        // locationArray.lat = data[i].latitude;
        // locationArray.long = data[i].longitude;
        // console.log(locationArray);

        let locationObject = {'lat': data[i].latitude, 'long': data[i].longitude};
            locationArray.push(locationObject)
      }
      console.log(locationArray);
    });
}

fetchButton.addEventListener("click", getApi);
