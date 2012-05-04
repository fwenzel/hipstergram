require(['lib/zepto', 'lib/caman', 'camera'], function() {
$(function() {

// Image filters
require(['filters'], function(filters) {
    for (var i in filters) {
        var btn = $('<button type="submit" class="btn">');
        btn.data('filter', i).text(i);
        $('#filters').append(btn);
    }

    $('#filters button').live('click', function(e) {
        e.preventDefault();

        Caman("#canvas").revert();
        Caman("#canvas", filters[$(this).data('filter')]);

        $('#filters button').removeClass('active');
        $(this).addClass('active');
    });
});

// Rotation
require(['rotate'], function(rotate) {
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

}); // DOMReady
}); // require