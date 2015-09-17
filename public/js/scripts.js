var App = {
  path: "http://camp.efigence.com/camp/api/places?page=",
  facilities: {
          'airport':  'icon-clock2',
          'food':     'icon-spoon-knife',
          'parking':  'icon-bookmark',
          'paypass':  'icon-credit-card',
          'swimimng': 'icon-cross',
          'tv':       'icon-unlocked',
          'wifi':     'icon-connection'
        },

  init: function(){
    var that = this;
    $.ajax({
      url: this.path,
      success: function(data){
        for (var i=1; i <= data.total_pages; i++) {
          $('.page-list').append('<li class="page-num">' + i + '</li>');
        }
      }
    })
    this.load_page(1);
    $('.btn-next-offers').click(function(){
      that.change_page();
    });
  },

  load_page: function(pagenum){
    var facilities = this.facilities;
    $.ajax({
    url: this.path + pagenum,
    success: function(data){
      var n = 0,
          row_num = 2,
          sel_path = '.offers-table .row:nth-child(' + row_num.toString() + ') ',
          sc,
          ocena,
          table_html = [];

      for (n=1; n<data.places.length; n++) {
          var fac_html = [],
              stars_html = [];
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

          for (f in facilities) {
            if (data.places[n][f]) {
              fac_html.push('<span class="' + facilities[f] + ' icons"></span>');
            }
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
            <div class="col-md-1">'
              + fac_html.join("") + 
            '</div> \
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

      $('.page-num').attr('class','page-num');
      $('.page-num:nth-of-type(' + data.page + ')').attr('class','page-num active-page');

      $('.btn-next-offers').attr('page_data',data.page+1);
      $('.btn-prev-offers').attr('page_data',data.page-1);

      $('.offers-table').html(table_html.join(""));
      return data.page
    } // success function end
    }) // AJAX request end
  }, // load_page end
  
  change_page: function(){
    this.load_page(2);
  }

}; // App end

$(document).ready(function(){
  App.init()
});