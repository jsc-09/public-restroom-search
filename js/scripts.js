//selectively display the search button and possibly search modal on mobile resize (screen size < 768)
function loadModal() {
  if (window.innerWidth < 768) {
    $('#search-button').attr('display', 'block');
    // If the user hasn't searched anything, automatically open the search modal
      $(".modal").addClass("is-active");
      $(".modal-close").click(function () {
        $(".modal").removeClass("is-active");
      });

      $("#closebtn").click(function () {
        $(".modal").removeClass("is-active");
      });
  }
  else {
    $('#search-button').attr('display', 'none');
    $('.modal').removeClass('is-active')
  }
}

// function to clear markers from previous results
function clearMarkers() {
  for (let i = 0; i < markerList.length; i++) {
    markerList[i].remove();
  }
}

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

// filter the restroom results based on user selected options
function filterResults(results) {
  let ada = $('#ADA').is(':checked');
  let unisex = $('#unisex').is(':checked');
  let changingTable = $('#changingTable').is(':checked');
  let filteredResults = [];
  if (ada && unisex && changingTable) {
    for (let i = 0; i < results.length; i++) {
      if (results[i].accessible && results[i].unisex && results[i].changing_table) {
        filteredResults.push(results[i]);
      }
    }
  } else if (ada && unisex) {
    for (let i = 0; i < results.length; i++) {
      if (results[i].accessible && results[i].unisex) {
        filteredResults.push(results[i]);
      }
    }
  } else if (ada && changingTable) {
    for (let i = 0; i < results.length; i++) {
      if (results[i].accessible && results[i].changing_table) {
        filteredResults.push(results[i]);
      }
    }
  } else if (unisex && changingTable) {
    for (let i = 0; i < results.length; i++) {
      if (results[i].unisex && results[i].changing_table) {
        filteredResults.push(results[i]);
      }
    }
  } else if (ada) {
    for (let i = 0; i < results.length; i++) {
      if (results[i].accessible) {
        filteredResults.push(results[i]);
      }
    }
  } else if (unisex) {
    for (let i = 0; i < results.length; i++) {
      if (results[i].unisex) {
        filteredResults.push(results[i]);
      }
    }
  } else if (changingTable) {
    for (let i = 0; i < results.length; i++) {
      if (results[i].changing_table) {
        filteredResults.push(results[i]);
      }
    }
  } else { filteredResults = results; }
  return (filteredResults);
}

//FOOTER CONTENT
let jokes = [
  {joke: "What did the poop say to the fart? Wow, you really blow me away!"},
  {joke: "What do the starship Enterprise and toilet paper have in common? They both circle Uranus looking for Klingons."},
  {joke: "Did you hear about that film called constipated? It never came out!"},
  {joke: "I don't want to hear any more toilet puns. They always stink!"}
]
let currentJoke = jokes[Math.floor(Math.random()*jokes.length)]

let featuredJoke = document.getElementById('featured-joke');
featuredJoke.innerText = currentJoke.joke;

// #region EVENT LISTENERS
// Add an event listener to selectively add/remove the modal
window.addEventListener('resize', function () {
  if (!searchDone) {
    loadModal();
  }
});

// When the search button is clicked, open the modal
$('#search-button').on('click', function(e) {
  e.preventDefault();
  loadModal();
});

$('#filter-results').on('click', function(e) {
  getApi(lastSearch);
})

// Add event listener to call the lod modal function on page load
window.addEventListener('load', function() {
  populateDropdowns();
  getLocalStorage();
  loadModal();
});

$('.dropdown-content').on('click', function(e) {
  let index = e.target.value;
  let searchCoordinates = recentSearches[index].location;
  getApi(searchCoordinates);
})

let dropdown = document.querySelector('.dropdown');
dropdown.addEventListener('click', function(event) {
    event.stopPropagation();
    dropdown.classList.toggle('is-active');
});

let dropdownModal = document.querySelector('.dropdown-modal');
dropdownModal.addEventListener('click', function(event) {
    event.stopPropagation();
    dropdownModal.classList.toggle('is-active');
});
// #endregion