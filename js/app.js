"use strict";

(function() {
  var filters = {
    original: function() {
      this
        .revert()
    },

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

    oldtv: function() {
      this
        .saturation(-60)
        .contrast(30)
        .noise(20)
        .vignette("50%", 70)
        .render()
    },
  };

  var import_filters = ['crossProcess', 'lomo'];
  for each (var f in import_filters) {
    filters[f] = function() {
      this[f]().render()
    };
  }

  $().ready(function() {
    for (var i in filters) {
      $('#filters').append('<button type="submit" class="btn" data-filter="' + i + '">' + i + '</button>');
    }
  });

  $('#filters button').live('click', function(e) {
    e.preventDefault();
    
    Caman("#canvas").revert();
    Caman("#canvas", filters[$(this).data('filter')]);

    $('#filters button').removeClass('active');
    $(this).addClass('active');
  });

})()
