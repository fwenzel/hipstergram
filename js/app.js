"use strict";

(function() {
  var filters = {
    age: function() {
      this
        .saturation(20)
        .gamma(1.4)
        .vintage()
        .contrast(5)
        .exposure(15)
        .vignette(300, 60)
        .render()
    },

    blackAndWhite: function() {
      this
        .gamma(100)
        .contrast(30)
        .saturation(-100)
        .render()
    },

    lomo: function() {
      this
        .brightness(15)
        .exposure(15)
        .curves('rgb', [0, 0], [200, 0], [155, 255], [255, 255])
        .saturation(-20)
        .gamma(1.8)
        .vignette("50%", 60)
        .brightness(5)
        .render()
    },

    oldtv: function() {
      this
        .saturation(-60)
        .contrast(30)
        .noise(20)
        .vignette("50%", 70)
        .render()
    }
  };

  $('#filters button').click(function(e) {
    e.preventDefault();
    
    Caman("#canvas").revert();
    Caman("#canvas", filters[$(this).data('filter')]);

    $('#filters button').removeClass('active');
    $(this).addClass('active');
  });

})()
