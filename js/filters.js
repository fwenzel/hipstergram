define(function() {
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

    var import_filters = [
        'crossProcess', 'lomo', 'sinCity', 'sunrise', 'love', 'grungy'
    ];
    for each (var f in import_filters) {
        filters[f] = function(filtername) {
            return function() { this[filtername]().render() };
        }(f);
    }

    return filters;
});