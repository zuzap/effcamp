$(document).ready(function(){
  var path = "http://camp.efigence.com/camp/api/places?page=1",
      btn = $("#right-btn"),
      e = 0,
      path1,
      path2,
      path3,
      new_place,
      place1,
      place2,
      place3,
      new_path;

  btn.click(function(){
      path1 = $(".testimonials-pic-1").attr("src");
      path2 = $(".testimonials-pic-2").attr("src");
      // place1 = $(".header-1").attr("src");
      // place2 = $(".header-2").attr("src");

      $.ajax({
        url: path, 
        success: function(data){
          new_path = data.places[e].image;
          e += 1;

          $(".testimonials-pic-3").attr("src",path2);
          $(".testimonials-pic-2").attr("src",path1);
          $(".testimonials-pic-1").attr("src",new_path);

      }});


  });

});