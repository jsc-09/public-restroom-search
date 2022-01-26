
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
