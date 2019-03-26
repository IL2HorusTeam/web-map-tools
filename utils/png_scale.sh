#!/usr/bin/env sh

# Positional arguments:
# $1 — source file path
# $2 — output width
# $3 — output file path

convert \
  "$1" \
  -filter Sinc \
  -define png:compression-filter=5 \
  -define png:compression-level=9 \
  -define png:compression-strategy=1 \
  -define png:exclude-chunk=all \
  -strip \
  -interlace none \
  -scale $2 \
  -colors 255 \
  -type Palette \
  "$3"
