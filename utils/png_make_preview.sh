#!/usr/bin/env sh

# Positional arguments:
# $1 — source file path

SCRIPTS_DIR=$(dirname $0)
PNG_SCALE_BIN="$SCRIPTS_DIR/png_scale.sh"

DIR_PATH=$(dirname $1)

FULL_TILE_SIZE=256
PREVIEW_TILE_SIZE=16

ORIGINAL_WIDTH=$(
    magick identify "$1" \
  | awk '{print $3}' \
  | awk -F'x' '{print $1}'
)

WIDTH_TILES_N=$(( (ORIGINAL_WIDTH + FULL_TILE_SIZE - 1) / FULL_TILE_SIZE ))
PREVIEW_WIDTH=$(( WIDTH_TILES_N * PREVIEW_TILE_SIZE ))

$PNG_SCALE_BIN "$1" $PREVIEW_WIDTH "$DIR_PATH/preview.png"
