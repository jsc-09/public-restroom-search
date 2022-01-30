//Display location search modal on mobile (screen size < 768)
window.addEventListener('resize', function () {
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
  }
  else {
    $('.modal').classList.removeClass('is-active')
  }
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