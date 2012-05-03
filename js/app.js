"use strict";

document.getElementById('filter').addEventListener('click', function(event) {
  Caman("example.jpg", "canvas", function () {
    this
      .saturation(20)
      .gamma(1.4)
      .vintage()
      .contrast(5)
      .exposure(15)
      .vignette(300, 60)
      .render()
  })
})
