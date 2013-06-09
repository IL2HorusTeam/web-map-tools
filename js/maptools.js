var CELL_SIDE = 100
    , MAX_LETTERS = 26
    , RULER_SIZE = 20
    , RULER_PADDING = 3
    , RULER_STROKE = "AAA";

var map_path = null
    , map_img = null
    , height_img = null
    , airplane_img = null
    , is_wide_map = false
    , map_canvas = null
    , map_ctx = null
    , height_canvas = null
    , height_ctx = null
    , ruler_top_canvas = null
    , ruler_top_ctx = null
    , ruler_left_canvas = null
    , ruler_left_ctx = null;

function squareName(x) {
    var k = Math.floor(x / CELL_SIDE);
    var name = '';
    if (is_wide_map) {
        var periods = Math.floor(k / MAX_LETTERS)
        name += String.fromCharCode(65 + periods);
    }
    name += String.fromCharCode(65 + (k % MAX_LETTERS));
    return name;
}

function squareNumber(y) {
    return Math.floor(y / CELL_SIDE) + 1;
}

function intensityToHeight(intensity) {
    if (intensity < 64) return intensity;
    else if (intensity < 96) return 64 + (intensity - 64) * 2;
    else if (intensity < 128) return 128 + (intensity - 96) * 4;
    else if (intensity < 160) return 256 + (intensity - 128) * 8;
    else if (intensity < 192) return 512 + (intensity - 160) * 16;
    else if (intensity < 224) return 1024 + (intensity - 192) * 32;
    else return 2048 + (intensity - 224) * 64;
}

function drawBoard(bw, bh, p){
    for (var x = 0; x < bw; x += CELL_SIDE) {
        map_ctx.moveTo(0.5 + x + p, p);
        map_ctx.lineTo(0.5 + x + p, bh + p);
    }

    for (var y = bh; y > 0; y -= CELL_SIDE) {
        map_ctx.moveTo(p, 0.5 + y + p);
        map_ctx.lineTo(bw + p, 0.5 + y + p);
    }

    map_ctx.moveTo(0, bh-0.5);
    map_ctx.lineTo(bw-0.5, bh-0.5);
    map_ctx.lineTo(bw-0.5, 0);

    map_ctx.strokeStyle = "gray";
    map_ctx.stroke();
}

function drawTopRuler() {
    ruler_top_canvas.style.left = '0px';

    $('#top_ruler_wrap').width(map_canvas.width+RULER_SIZE);
    $('#top_ruler').width(map_canvas.width);
    ruler_top_canvas.width = map_canvas.width;

    ruler_top_ctx.clearRect(0, 0, ruler_top_canvas.width, ruler_top_canvas.height);

    ruler_top_ctx.fillStyle = '#333';
    ruler_top_ctx.fillRect(0, 0, ruler_top_canvas.width, ruler_top_canvas.height);

    ruler_top_ctx.fillStyle = RULER_STROKE;
    ruler_top_ctx.strokeStyle = RULER_STROKE;
    ruler_top_ctx.font = "14px Sans-serif";

    var metrics = null;
    var text = null;

    for (var x = 0; x < ruler_top_canvas.width; x += CELL_SIDE) {
        ruler_top_ctx.moveTo(0.5 + x, RULER_PADDING);
        ruler_top_ctx.lineTo(0.5 + x, RULER_SIZE-RULER_PADDING);

        text = squareName(x);
        metrics = ruler_top_ctx.measureText(text);
        ruler_top_ctx.fillText(text, x+(CELL_SIDE/2)-(metrics.width/2), 15);
    }

    ruler_top_ctx.stroke();
}

function drawLeftRuler() {
    ruler_left_canvas.style.top = '0px';

    $('#left_ruler_wrap').height(map_canvas.height);
    $('#left_ruler').height(map_canvas.height);
    ruler_left_canvas.height = map_canvas.height;

    ruler_left_ctx.clearRect(0, 0, ruler_left_canvas.width, ruler_left_canvas.height);

    ruler_left_ctx.fillStyle = '#333';
    ruler_left_ctx.fillRect(0, 0, ruler_left_canvas.width, ruler_left_canvas.height);

    ruler_left_ctx.fillStyle = RULER_STROKE;
    ruler_left_ctx.strokeStyle = RULER_STROKE;
    ruler_left_ctx.font = "14px Sans-serif";

    var metrics = null;
    var text = null;

    for (var y = ruler_left_canvas.height; y > 0; y -= CELL_SIDE) {
        ruler_left_ctx.moveTo(RULER_PADDING, 0.5 + y);
        ruler_left_ctx.lineTo(RULER_SIZE-RULER_PADDING, 0.5 + y);

        text = squareNumber(map_img.height-y);
        metrics = ruler_left_ctx.measureText(text);
        ruler_left_ctx.fillText(text, (RULER_SIZE/2)-(metrics.width/2), y-(CELL_SIDE/2)+7);
    }

    ruler_left_ctx.moveTo(RULER_PADDING, 0.5);
    ruler_left_ctx.lineTo(RULER_SIZE-RULER_PADDING, 0.5);

    ruler_left_ctx.stroke();
}

function drawRullers() {
    drawTopRuler();
    drawLeftRuler();
}

function drawMapContainer() {
    $('#map_holder_wrap').height(map_canvas.height);
    drawRullers();
}

function setMapChangeHandler() {
    $("#map_selector").change(function () {
        map_path = "../maps/" + $(this).val() + "/";
        map_img.src = map_path + "Map.png";
        $("#display_loading").css('visibility', 'visible');
    });
}

function onMapImageLoad() {
    height_img.src = map_path + "Map_h.png";

    /* Init canvas and containers geometry */
    map_canvas.width = this.width;
    map_canvas.height = this.height;

    is_wide_map = Math.floor(this.width / CELL_SIDE) > MAX_LETTERS;

    drawMapContainer();

    /* Draw image */
    map_ctx.drawImage(this, 0, 0, this.width, this.height);
    drawBoard(map_canvas.width, map_canvas.height, 0);
    drawMapContainer();
    // drawMapData();
    // displayMapSize();
};

function onHeightMapImageLoad() {
    height_canvas.width  = height_img.width;
    height_canvas.height = height_img.height;
    height_ctx.drawImage(height_img, 0, 0, height_img.width, height_img.height);
    $("#display_loading").css('visibility', 'hidden');
}


function onWindowScroll() {
    $('#top_ruler').css('margin-left', -$(window).scrollLeft()+RULER_SIZE);
    $('#left_ruler').css('margin-top', -$(window).scrollTop());
};

function setHandlers() {
    setMapChangeHandler();
    map_img.onload = onMapImageLoad;
    height_img.onload = onHeightMapImageLoad;

    $(window).scroll(onWindowScroll);
}

function initVariables() {
    map_img = new Image()
    height_img = new Image()

    airplane_img = new Image();
    airplane_img.src = "../img/airplane.png";

    map_canvas = document.getElementById("map_holder");
    map_ctx = map_canvas.getContext("2d");
    height_canvas = document.createElement('canvas');
    height_ctx = height_canvas.getContext("2d");

    ruler_top_canvas = document.getElementById("top_ruler");
    ruler_top_ctx = ruler_top_canvas.getContext("2d");
    ruler_left_canvas = document.getElementById("left_ruler");
    ruler_left_ctx = ruler_left_canvas.getContext("2d");

    ruler_top_canvas.height = RULER_SIZE;
    ruler_left_canvas.width = RULER_SIZE;
}

function initUI() {
    initVariables();
    setHandlers();
    $(document).tooltip();
    $('#map_selector').chosen().trigger('change');
}

$(function() {
    initUI();
});
