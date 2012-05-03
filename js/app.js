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
    }
  };

  $('#filters button').click(function(e) {
    e.preventDefault();
    Caman("example.jpg", "canvas", filters[$(this).data('filter')]);
  });

})()
