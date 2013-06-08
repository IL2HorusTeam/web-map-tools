function initUI() {
    $(document).tooltip();
    $('#map_selector').chosen().trigger('change');
    // airplane_img.src = "../img/airplane.png";
}

$(function() {
    initUI();
});
