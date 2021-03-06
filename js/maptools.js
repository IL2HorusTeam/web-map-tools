var CELL_SIDE = 100
  , MAX_LETTERS = 26
  , RULER_SIZE = 20
  , RULER_PADDING = 3
  , RULER_STROKE = "#EEE"
  , FEET_COEF = 3.28084;

var map_path = null
  , map_img = null
  , webp_support_present = null
  , info_path = null
  , height_img = null
  , is_wide_map = false
  , map_canvas = null
  , map_ctx = null
  , height_canvas = null
  , height_ctx = null
  , ruler_top_canvas = null
  , ruler_top_ctx = null
  , ruler_left_canvas = null
  , ruler_left_ctx = null
  , current_pos_x = 0
  , current_pos_y = 0
  , current_height = 0
  , text_styles = [
    ["rgba(0, 0, 0, 1.0)",       "rgba(255, 255, 255, 0.8)"], // #000000
    ["rgba(128, 0, 0, 0.8)",     "rgba(248, 244, 227, 0.9)"], // #800000
    ["rgba(0, 128, 0, 0.9)",     "rgba(248, 244, 227, 1.0)"], // #008000
    ["rgba(128, 128, 0, 1.0)",   "rgba(255, 255, 255, 1.0)"], // #808000
    ["rgba(0, 0, 128, 0.8)",     "rgba(255, 255, 255, 0.9)"], // #000080
    ["rgba(128, 0, 128, 0.9)",   "rgba(255, 255, 255, 0.7)"], // #800080
    ["rgba(0, 128, 128, 1.0)",   "rgba(255, 255, 255, 1.0)"], // #008080
    ["rgba(192, 192, 192, 1.0)", "rgba(255, 255, 255, 1.0)"], // #c0c0c0
    ["rgba(192, 220, 192, 1.0)", "rgba(255, 255, 255, 1.0)"], // #c0dcc0
    ["rgba(166, 202, 240, 1.0)", "rgba(255, 255, 255, 1.0)"], // #a6caf0
    ["rgba(255, 251, 240, 1.0)", "rgba(  0,   0,   0, 0.7)"], // #fffbf0
    ["rgba(160, 160, 164, 1.0)", "rgba(255, 255, 255, 1.0)"], // #a0a0a4
    ["rgba(128, 128, 128, 1.0)", "rgba(255, 255, 255, 1.0)"], // #808080
    ["rgba(255, 0, 0, 1.0)",     "rgba(255, 255, 255, 0.9)"], // #ff0000
    ["rgba(0, 255, 0, 1.0)",     "rgba(100, 100, 100, 1.0)"], // #00ff00
    ["rgba(255, 255, 0, 1.0)",   "rgba( 80,  80,  80, 0.9)"], // #ffff00
    ["rgba(0, 0, 255, 0.9)",     "rgba(255, 255, 255, 0.9)"], // #0000ff
    ["rgba(255, 0, 255, 0.8)",   "rgba(255, 255, 255, 0.9)"], // #ff00ff
    ["rgba(0, 255, 255, 1.0)",   "rgba( 60,  60,  60, 0.7)"], // #00ffff
    ["rgba(255, 255, 255, 1.0)", "rgba(  0,   0,   0, 0.6)"], // #ffffff
  ]
  , runway_colors = [
    "white", "red", "lime", "blue",
  ];

function squareName(x) {
    var k = Math.floor(x / CELL_SIDE)
      , name = '';

    if (is_wide_map) {
        var periods = Math.floor(k / MAX_LETTERS);
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

    map_ctx.moveTo(0, bh - 0.5);
    map_ctx.lineTo(bw - 0.5, bh - 0.5);
    map_ctx.lineTo(bw - 0.5, 0);

    map_ctx.strokeStyle = "gray";
    map_ctx.stroke();
}

function drawRotatedImage(image, x, y, angle) {
    map_ctx.save();
    map_ctx.translate(x, y);
    map_ctx.rotate(angle * Math.PI / 180);
    map_ctx.drawImage(image, -(image.width / 2), -(image.height / 2));
    map_ctx.restore();
}

function drawAirbase(airbase) {
    var x = airbase.x / CELL_SIDE
      , y = map_img.height - (airbase.y / CELL_SIDE)
      , old_line_width = map_ctx.lineWidth;

    map_ctx.beginPath();
    map_ctx.arc(x, y, Math.max(11, airbase.radius / CELL_SIDE), 0, 2 * Math.PI, false);
    map_ctx.fillStyle = "black";
    map_ctx.fill();

    map_ctx.lineWidth = 4;

    $.each(airbase.runways, function(i, item) {
        var x1 = item[0][0] / CELL_SIDE
          , y1 = map_img.height - (item[0][1] / CELL_SIDE)
          , x2 = item[1][0] / CELL_SIDE
          , y2 = map_img.height - (item[1][1] / CELL_SIDE);

        map_ctx.strokeStyle = runway_colors[i % runway_colors.length];
        map_ctx.beginPath();
        map_ctx.moveTo(x1, y1);
        map_ctx.lineTo(x2, y2);
        map_ctx.stroke();
    });

    map_ctx.lineWidth = old_line_width;
}

function drawText(text, type, x, y, align, fill, stroke) {
    var metrics = map_ctx.measureText(text);

    switch (type) {
        case 2:
            var font_size = 12 * 1.33; // 12pt
            map_ctx.font = font_size + "px \"Arial Black\"";
            break;
        case 1:
            var font_size = 10 * 1.33; // 10pt
            map_ctx.font = font_size + "px Arial";
            break;
        case 0:
        default:
            var font_size = 8 * 1.33; // 8pt
            map_ctx.font = font_size + "px Arial";
            break;
    }

    switch (align) {
        case 1:
            x -= metrics.width / 2;
            break;
        case 2:
            x -= metrics.width;
            break;
    }
    if (x < 3) {
        x = 3;
    }
    if (x + metrics.width > map_img.width) {
        x = map_img.width - metrics.width - 3;
    }

    y += font_size / 2;

    map_ctx.lineWidth = 2;
    map_ctx.strokeStyle = stroke || "rgba(255, 255, 255, 0.8)";
    map_ctx.strokeText(text, x, y);
    map_ctx.fillStyle = fill || "rgba(0, 0, 0, 0.7)";
    map_ctx.fillText(text, x, y);
}

function drawMapData(){
    $.getJSON(info_path + "data.min.json", {}, function (data) {
        if (data.airbases !== undefined) {
            data.airbases.map(drawAirbase);
        }

        $.each(data.texts, function(i, item) {
            if (item.color === undefined) {
                var fill = undefined
                  , stroke = undefined;
            } else {
                var styles = text_styles[item.color]
                  , fill = styles[0]
                  , stroke = styles[1];
            }

            drawText(
                item.name_en
                , item.type
                , item.x / CELL_SIDE
                , map_img.height - (item.y / CELL_SIDE)
                , item.align
                , fill
                , stroke);
        });

    });
}

function displayMapSize(){
    $("#map_width").text((map_canvas.width*CELL_SIDE / 1000).toFixed(1));
    $("#map_height").text((map_canvas.height*CELL_SIDE / 1000).toFixed(1));
}

function displayCurrentHeight(){
    $("#current_height_m").text(Math.floor(current_height));
    $("#current_height_ft").text(Math.floor(current_height * FEET_COEF));
}

function displayCurrentSquare(){
    $("#current_cell_letter").text(squareName(current_pos_x));
    $("#current_cell_number").text(squareNumber(current_pos_y));
}

function displayCurrentPos(){
    $("#current_pos_x").text((current_pos_x / 1000).toFixed(1));
    $("#current_pos_y").text((current_pos_y / 1000).toFixed(1));
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
    ruler_top_ctx.font = "14px Sans-serif";

    var metrics = null
      , text = null;

    for (var x = 0; x < ruler_top_canvas.width; x += CELL_SIDE) {
        ruler_top_ctx.moveTo(0.5 + x, RULER_PADDING);
        ruler_top_ctx.lineTo(0.5 + x, RULER_SIZE - RULER_PADDING);

        text = squareName(x);
        metrics = ruler_top_ctx.measureText(text);
        ruler_top_ctx.fillText(text, x + (CELL_SIDE / 2) - (metrics.width / 2), 15);
    }

    ruler_top_ctx.strokeStyle = RULER_STROKE;
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

    var metrics = null
      , text = null;

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
        value = $(this).val();
        option = $(this).find('[value=' + value + ']');

        map_path = "maps/" + option.data('img-path') + "/";
        info_path = "maps/" + option.data('info-path') + "/";
        map_format = option.data('img-format');
        if (map_format === 'webp' && !webp_support_present) {
          map_format = option.data('img-format-fallback');
        }

        map_img.src = "";
        height_img.src = "";

        map_img.src = map_path + "Map." + map_format;
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
    drawMapData();
    displayMapSize();
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

function onMouseMove(e) {
    current_pos_x = e.clientX + (window.pageXOffset || document.documentElement.scrollLeft) - 264
    current_pos_y = e.clientY - RULER_SIZE + (window.pageYOffset || document.documentElement.scrollTop);

    var pixel = height_ctx.getImageData(current_pos_x / 2, current_pos_y / 2, 1, 1).data
    current_height = intensityToHeight(pixel[0]);
    displayCurrentHeight();

    current_pos_y = map_img.height - current_pos_y;
    displayCurrentSquare();

    current_pos_x *= CELL_SIDE;
    current_pos_y *= CELL_SIDE;
    displayCurrentPos();
}

function setHandlers() {
    setMapChangeHandler();
    map_img.onload = onMapImageLoad;
    height_img.onload = onHeightMapImageLoad;

    $(window).scroll(onWindowScroll);
    $(map_canvas).mousemove(onMouseMove);
}

function canUseWebP() {
    var elem = document.createElement('canvas');

    if (!!(elem.getContext && elem.getContext('2d'))) {
        // was able or not to get WebP representation
        return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;
    } else {
        // very old browser like IE 8, canvas not supported
        return false;
    }
}

function initVariables() {
    map_img = new Image();
    height_img = new Image();

    webp_support_present = canUseWebP();

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
