"use strict";

$(function() {
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
    filters[f] = function(filtername) {
      return function() { this[filtername]().render() }
    }(f);
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

  /* Rotation */
  function rotate(node, deg) {
    const rotate_re = /rotate\((-?\d+)deg\)/;

    if (deg === undefined) {
        node.style.MozTransform = '';
        return;
    }

    var rotated = node.style.MozTransform.match(rotate_re);
    if (rotated) {
        // If already rotated, adjust angle.
        deg = (parseInt(rotated[1]) + deg) % 360;
    }

    if ([-270, -90, 90, 270].indexOf(deg) >= 0) {
        node.style.MozTransform = 'rotate(' + deg + 'deg) scale(.7)';
    } else {
        node.style.MozTransform = 'rotate(' + deg + 'deg)';
    }
  }

  $('#rotate button').click(function(e) {
    var degrees;

    e.preventDefault();
    switch ($(this).data('dir')) {
    case 'left':
      degrees = -90;
      break;
    case 'right':
      degrees = 90;
      break;
    }
    rotate($('#canvas')[0], degrees);
  });
});
