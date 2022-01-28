// grab variables
var fetchButton = document.querySelector(".button");
var dataField = document.querySelector(".content");
var showMore = document.querySelector(".showMore");
var icons = document.querySelector(".images");
var locationName = document.getElementsByTagName("h3");
var address = document.getElementsByTagName("p");
var icons = document.getElementById("icons");

// lat lon array
var locationArray = [
  {
    lat: "",
    long: "",
  },
];

// fetch request
function getApi() {
  var requestUrl =
    "https://www.refugerestrooms.org/api/v1/restrooms/by_location?page=1&per_page=10&offset=0&lat=33.194634&lng=-117.379186";

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
     
      for (var i = 0; i < data.length; i++) {
        locationName = data[i].name;
        address = data[i].street;
        distance = data[i].distance;
        accessible = data[i].accessible;
        gender = data[i].unisex;
        baby = data[i].changing_table;
        console.log(locationName, address, distance, accessible, baby, gender);

        if (data[i].accessible === true) {
            var accessible = "fab fa-accessible-icon";
          } if (data[i].changing_table === true) {
            var baby = " fas fa-baby";
          } if (data[i].unisex === true) {
            var gender = " fas fa-transgender-alt";
          }

        var html = `<div class="card">
          <div class="card-content">
          <div class="content">
          <h3>${locationName}</h3>
          <p id="address">${address}</p>
          <p id="distance">${distance}</p>
          <i id="icons" class="${accessible}"></i>
          <i id="icons" class="${baby}"></i>
          <i id="icons" class="${gender}"></i>`

          console.log(html);
          dataField.innerHTML += html;

      }
      return html;
      
    });
}

// button event listener
fetchButton.addEventListener("click", getApi);