/** Node rotation via CSS transform */
define(function() {

return function(node, deg) {
    const rotate_re = /rotate\((-?\d+)deg\)/;

    if (deg === undefined) {
        node.style.MozTransform = '';
        return;
    }

    var rotated = node.style.MozTransform.match(rotate_re);
    // If already rotated, adjust angle.
    if (rotated) {
        deg = (parseInt(rotated[1]) + deg) % 360;
    }

    if ([-270, -90, 90, 270].indexOf(deg) >= 0) {
        node.style.MozTransform = 'rotate(' + deg + 'deg) scale(.7)';
    } else {
        node.style.MozTransform = 'rotate(' + deg + 'deg)';
    }
}

});