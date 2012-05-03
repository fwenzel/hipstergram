"use strict";

(function() {
  var filters = {
    filter1: function() {
      this
        .saturation(20)
        .gamma(1.4)
        .vintage()
        .contrast(5)
        .exposure(15)
        .vignette(300, 60)
        .render()
    }
  };

  $('#filters button').click(function(e) {
    e.preventDefault();
    Caman("example.jpg", "canvas", filters[$(this).data('filter')]);
  });

})()
