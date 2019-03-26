#!/usr/bin/env sh

# Positional arguments:
# $1 — source file path

SCRIPTS_DIR=$(dirname $0)
INSPECT_BIN="$SCRIPTS_DIR/inspect.py"
ZOOMED_SIZE_BIN="$SCRIPTS_DIR/zoomed_size.py"
PNG_SCALE_BIN="$SCRIPTS_DIR/png_scale.sh"

MAX_ZOOM=$($INSPECT_BIN "$1" | grep "max zoom:" | awk -F': ' '{print $2}')

DIR_PATH=$(dirname $1)

for zoom in $(seq 1 $MAX_ZOOM)
do
  width=$($ZOOMED_SIZE_BIN "$1" $zoom | awk -F'x' '{print $1}')
  $PNG_SCALE_BIN "$1" $width "$DIR_PATH/zoom-$zoom.png"
done
