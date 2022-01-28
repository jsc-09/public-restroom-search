
//Display location search modal on mobile (screen size < 768)
window.addEventListener('resize', function(){
  if (window.innerWidth < 768){
    $(document).ready(function(){
      $(".modal").addClass("is-active");
      $("#lanuchModal").click(function() {
        $(".modal").addClass("is-active");  
      });
      
      $(".modal-close").click(function() {
         $(".modal").removeClass("is-active");
      });
      
      $("#closebtn").click(function() {
         $(".modal").removeClass("is-active");
      });
      });
    }
    else {
            //  $('#mobile-search').modal("hide");
            $('.modal').classList.removeClass('is-active')
    }
});

let sampleResults = [
  {
    "id": 17666,
    "name": "That Boy Good",
    "street": "207 N Coast Hwy",
    "city": "Oceanside",
    "state": "ca",
    "accessible": true,
    "unisex": true,
    "directions": "In back of restaurant - non-gendered and very roomy accessible restroom",
    "comment": "TBG are also supporters of local LGBTQ center and pride - staff is super nice",
    "latitude": 33.1960428,
    "longitude": -117.3800083,
    "created_at": "2015-06-07T19:06:02.557Z",
    "updated_at": "2015-06-07T19:06:02.557Z",
    "downvote": 0,
    "upvote": 0,
    "country": "US",
    "changing_table": true,
    "edit_id": 17666,
    "approved": true,
    "distance": 0.10832920952059977,
    "bearing": "329.728392990011"
  },
  {
    "id": 17473,
    "name": "That Boy Good",
    "street": "207 North Coast Highway",
    "city": "Oceanside",
    "state": "California",
    "accessible": true,
    "unisex": true,
    "directions": "In back of restaurant - single stall, very roomy, restroom",
    "comment": "restaurant supports local LGBTQ center and has all welcome policy ",
    "latitude": 33.1960428,
    "longitude": -117.3800083,
    "created_at": "2015-05-17T00:32:57.665Z",
    "updated_at": "2015-05-17T00:32:57.665Z",
    "downvote": 0,
    "upvote": 0,
    "country": "US",
    "changing_table": false,
    "edit_id": 17473,
    "approved": true,
    "distance": 0.10832920952059977,
    "bearing": "329.728392990011"
  },
  {
    "id": 46653,
    "name": "Dija Mara",
    "street": "232 South Coast Hwy",
    "city": "Oceanside ",
    "state": "CA",
    "accessible": false,
    "unisex": true,
    "directions": "In back to left of kitchen ",
    "comment": "",
    "latitude": 33.1934055,
    "longitude": -117.377094,
    "created_at": "2018-12-28T04:33:58.979Z",
    "updated_at": "2018-12-28T04:33:59.081Z",
    "downvote": 0,
    "upvote": 0,
    "country": "US",
    "changing_table": false,
    "edit_id": 46653,
    "approved": true,
    "distance": 0.1477679812502166,
    "bearing": "120.423036170802"
  },
  {
    "id": 4130,
    "name": "Oceanside LGBT Resource Center",
    "street": "510 North Coast Highway ",
    "city": "Oceanside",
    "state": "CA",
    "accessible": true,
    "unisex": true,
    "directions": "It's in the back, on the right. You'll see it when your go through the front door. ",
    "comment": "Everyone is really nice and helpful. ",
    "latitude": 33.1987248,
    "longitude": -117.381548,
    "created_at": "2014-02-02T20:55:13.000Z",
    "updated_at": "2014-02-02T20:55:13.000Z",
    "downvote": 1,
    "upvote": 2,
    "country": "US",
    "changing_table": false,
    "edit_id": 4130,
    "approved": true,
    "distance": 0.3139091936960499,
    "bearing": "329.99815630286"
  },
  {
    "id": 16464,
    "name": "Hill Street Cafe",
    "street": "524 South Coast Highway",
    "city": "Oceanside",
    "state": "CA",
    "accessible": true,
    "unisex": true,
    "directions": "There are two gender neutral restrooms available - one in lobby, one off of patio.  ",
    "comment": "LGBT Friendly restaurant ",
    "latitude": 33.1901957,
    "longitude": -117.3744811,
    "created_at": "2015-03-10T02:22:24.911Z",
    "updated_at": "2015-03-10T02:22:24.911Z",
    "downvote": 0,
    "upvote": 1,
    "country": "US",
    "changing_table": false,
    "edit_id": 16464,
    "approved": true,
    "distance": 0.40992967316746176,
    "bearing": "133.329826720871"
  },
  {
    "id": 17977,
    "name": "Bagby Beer Co",
    "street": "601 S Coast HWY",
    "city": "Oceanside",
    "state": "CA",
    "accessible": true,
    "unisex": true,
    "directions": "",
    "comment": "Outside Restoom (Floor Level) has 2 gender neutral single stall restroom",
    "latitude": 33.189225,
    "longitude": -117.374257,
    "created_at": "2015-07-13T06:50:52.453Z",
    "updated_at": "2015-07-13T06:50:52.453Z",
    "downvote": 0,
    "upvote": 0,
    "country": "US",
    "changing_table": false,
    "edit_id": 17977,
    "approved": true,
    "distance": 0.46999301059660775,
    "bearing": "137.658370710285"
  },
  {
    "id": 18636,
    "name": "Extra Mile Chevron",
    "street": "North Coast Highway",
    "city": "Oceanside",
    "state": "CA",
    "accessible": false,
    "unisex": false,
    "directions": "restrooms in back to right ",
    "comment": "two single stall unisex, no key required ",
    "latitude": 33.2008001,
    "longitude": -117.3836599,
    "created_at": "2015-09-08T23:04:09.379Z",
    "updated_at": "2015-09-08T23:04:09.379Z",
    "downvote": 0,
    "upvote": 1,
    "country": "US",
    "changing_table": false,
    "edit_id": 18636,
    "approved": true,
    "distance": 0.4984117702348734,
    "bearing": "324.036713546759"
  },
  {
    "id": 36685,
    "name": "Rockin Baja Lobster Oceanside",
    "street": "258 Harbor Dr",
    "city": "Oceanside",
    "state": "California",
    "accessible": false,
    "unisex": true,
    "directions": "Directly down the front of the building in the green hallway to the right of the employees only door",
    "comment": "You should probably be a customer",
    "latitude": 33.2047244,
    "longitude": -117.3897699,
    "created_at": "2017-07-29T03:31:59.122Z",
    "updated_at": "2017-07-29T03:31:59.122Z",
    "downvote": 0,
    "upvote": 0,
    "country": "US",
    "changing_table": false,
    "edit_id": 36685,
    "approved": true,
    "distance": 0.9276265823748037,
    "bearing": "313.632597066269"
  },
  {
    "id": 18984,
    "name": "Chevron Gas Station",
    "street": "1601 N Coast Hwy",
    "city": "Oceanside",
    "state": "CA",
    "accessible": true,
    "unisex": true,
    "directions": "",
    "comment": "",
    "latitude": 33.2091635,
    "longitude": -117.387333,
    "created_at": "2015-10-10T15:47:24.207Z",
    "updated_at": "2015-10-10T15:47:24.207Z",
    "downvote": 0,
    "upvote": 0,
    "country": "US",
    "changing_table": false,
    "edit_id": 18984,
    "approved": true,
    "distance": 1.1088939613341844,
    "bearing": "330.719722519406"
  },
  {
    "id": 30333,
    "name": "Einstein Bros. Bagels",
    "street": "2183 Vista Way",
    "city": "Oceanside",
    "state": "CA",
    "accessible": true,
    "unisex": false,
    "directions": "Directly to the back, to the right",
    "comment": "",
    "latitude": 33.182633,
    "longitude": -117.3409135,
    "created_at": "2017-02-26T09:51:03.043Z",
    "updated_at": "2020-04-14T21:10:38.124Z",
    "downvote": 0,
    "upvote": 0,
    "country": "US",
    "changing_table": false,
    "edit_id": 30333,
    "approved": true,
    "distance": 2.3632491039737125,
    "bearing": "107.409712787234"
  }
]

// filter the restroom results based on user selected options
function filterResults(results) {
  let ada = $('#ADA').is(':checked');
  let unisex = $('#unisex').is(':checked');
  let changingTable = $('#changingTable').is(':checked');
  console.log(changingTable);
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
  } else { filteredResults = results;}
  return(filteredResults);
}