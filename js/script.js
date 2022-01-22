var requestUrl = "https://www.refugerestrooms.org/api/v1/restrooms/by_location?page=1&per_page=10&offset=10&ada=true&unisex=true&lat=32.9185&lng=117.1382";

function getApi() {
    // replace `octocat` with anyone else's GitHub username
    // var requestUrl = 'https://api.github.com/users/octocat/repos';
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        for (var i = 0; i < data.length; i++) {
          var listItem = document.createElement('li');
          listItem.textContent = data[i].html_url;
          repoList.appendChild(listItem);
        }
      });
  }
  
  fetchButton.addEventListener('click', getApi);