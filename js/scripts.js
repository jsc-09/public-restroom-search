//selectively display the search button and possibly search modal on mobile resize (screen size < 768)
window.addEventListener('resize', function () {
  if (window.innerWidth < 768) {
    $('#search-button').attr('display', 'block');
    // If the user hasn't searched anything, automatically open the search modal
    if (!searchDone) {
      $(".modal").addClass("is-active");
    }
  }
  else {
    $('#search-button').attr('display', 'none');
    $('.modal').removeClass('is-active')
  }
});

// When the search button is clicked, open the modal
$('#search-button').on('click', function(e) {
  e.preventDefault();
  $(".modal").addClass("is-active");
});

window.addEventListener('load', function () {
  if (window.innerWidth < 768) {
    $(document).ready(function () {
      $(".modal").addClass("is-active");
      $("#launchModal").click(function () {
        $(".modal").addClass("is-active");
      });

      $(".modal-close").click(function () {
        $(".modal").removeClass("is-active");
      });

      $("#closebtn").click(function () {
        $(".modal").removeClass("is-active");
      });
    });
    // load the search button to activate the modal later if need be
    $('#search-button').attr('display', 'block');
  }
});

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