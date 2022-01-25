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
  
/*

  window.addEventListener("resize", function (){
      //console.log(window.innerHeight)
    //  console.log(window.innerWidth)
    if (window.innerWidth < 768){
       // $('#mobile-search').modal("show");
        $('#mobile-search').classList.add('is-active');
    }
    else {
      //  $('#mobile-search').modal("hide");
        $('#mobile-search').classList.remove('is-active')

    }
  })
  */