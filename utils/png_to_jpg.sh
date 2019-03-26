#!/usr/bin/env sh

# Positional arguments:
# $1 — source file path
# $2 — output file path
# $3 — output quality

convert \
  -strip \
  -interlace Plane \
  -quality $3 \
  "$1" \
  "$2"
