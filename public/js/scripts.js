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

  $.ajax({
    url: path,
    success: function(data){

      var n = 0;
      var row_num = 2;
      var sel_path = '.offers-table .row:nth-child(' + row_num.toString() + ') '

      var sc,
      ocena,
      badges_html = [],
      table_html = [];

      for (n=1; n<data.places.length; n++) {
        var stars_html = [];
        sc = data.places[n].score;

        if (sc > 9) {
          ocena = "Znakomity ";
        } else if (sc > 8) {
          ocena = "Bardzo dobry ";
        } else if (sc > 7) {
          ocena = "Dobry ";
        } else if (sc > 5) {
          ocena = "Średni ";
        } else {
          ocena = "Słaby ";
        }

        for (var i=0; i < data.places[n].starts; i++) {
           stars_html.push("<span class='icon-star-full'></span>");
        }
          
          table_html.push(
          '<div class="row"> \
            <div class="col-md-3 img-col"> \
              <img src="' + data.places[n].image + '"> \
            </div> \
            <div class="col-md-4"> \
              <h3>' + data.places[n].name + '</h3> \
              <h4><span>' + data.places[n].place + '</span>, <span>' + data.places[n].district + '</span></h4> \
              <div>' + stars_html.join("") + '</div> \
              <p>' + data.places[n].description + '</p> \
              <a href="">Szczegóły</a> \
            </div> \
            <div class="col-md-1"> \
              <span class="icon-connection icons"></span> \
              <span class="icon-credit-card icons"></span> \
              <span class="icon-spoon-knife"></span> \
            </div> \
            <div class="col-md-3"> \
              <h5><span class="ocena">' + ocena + '</span><span class="score">' + sc.toString().split('.').join(',') + '</span>/10</h5> \
              <p>Ocena na podstawie <span>'+ data.places[n].opinion_count + '</span> opinii</p> \
              <p><span class="oldprice">' + data.places[n].oldprice + '</span>PLN</p> \
              <p><span class="price">' + data.places[n].price + '</span>PLN</p> \
              <p>Cena za <span class="bold">3 noce</span></p> \
            <button>Zarezerwuj teraz</button> \
          </div>'
          );

        
      }

      $('.offers-table').append(table_html.join(""));
      
    }    
  });

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