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
    $('.btn-nav').click(function(){
      that.change_page($(this).attr('page-data'));
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
              fac_html.push('<span class="' + facilities[f] + ' icons"></span><br>');
            }
          }
            
          table_html.push(
          '<div class="row"> \
            <div class="col-md-1"></div> \
            <div class="col-md-3 img-col"> \
              <img src="' + data.places[n].image + '"> \
            </div> \
            <div class="col-md-4 details-col"> \
              <h3>' + data.places[n].name + '</h3> \
              <h4><span>' + data.places[n].place + '</span>, <span>' + data.places[n].district + '</span></h4> \
              <div class="stars">' + stars_html.join("") + '</div> \
              <p>' + data.places[n].description + '</p> \
              <div class="details"> \
                <a href="">Szczegóły</a> \
              </div> \
            </div> \
            <div class="col-md-1 fac-col">'
              + fac_html.join("") + 
            '</div> \
            <div class="col-md-3 score-col"> \
              <h5><span class="ocena">' + ocena + '</span><span class="score">' + sc.toString().split('.').join(',') + '</span>/10</h5> \
              <p class="opinions">Ocena na podstawie <span>'+ data.places[n].opinion_count + '</span> opinii</p> \
              <p class="oldprice"><span>' + data.places[n].oldprice + '</span>PLN</p> \
              <p class="p-price"><span class="price">' + parseFloat(data.places[n].price).toFixed(2).split('.').join(',') + '</span>PLN</p> \
              <p class="nights">Cena za <span class="bold">3 noce</span></p> \
              <button>Zarezerwuj teraz</button> \
            </div> \
          </div>'
          );  
        }

      $('.page-num').attr('class','page-num');
      $('.page-num:nth-of-type(' + data.page + ')').attr('class','page-num active-page');

      if (data.page == 1) {
        $('.btn-next-offers').attr('class','btn-nav btn-next-offers btn-active');
        $('.btn-prev-offers').attr('class','btn-nav btn-prev-offers');
      } else if (data.page == data.total_pages) {
        $('.btn-prev-offers').attr('class','btn-nav btn-prev-offers btn-active');
        $('.btn-next-offers').attr('class','btn-nav btn-next-offers');
      } else {
        $('.btn-prev-offers').attr('class','btn-nav btn-prev-offers btn-active');
        $('.btn-next-offers').attr('class','btn-nav btn-next-offers btn-active');
      }

      $('.btn-next-offers').attr('page-data',data.page+1);
      $('.btn-prev-offers').attr('page-data',data.page-1);

      $('.offers-table').html(table_html.join(""));
      return data.total_pages;
    } // success function end
    }) // AJAX request end
  }, // load_page end
  
  change_page: function(p){
    var total = 4; // TODO: data.total_pages !!
    if (p > 0 && p <= total) {
      this.load_page(p);
    }
  }

}; // App end

$(document).ready(function(){
  App.init()
});