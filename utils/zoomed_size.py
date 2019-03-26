#!/usr/bin/env python3

import argparse

from pathlib import Path

from PIL import Image


def load_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Get layer image size for a given zoom level",
    )
    parser.add_argument(
        'src_file_path',
        action="store",
        type=lambda x: Path(x).resolve(),
        help="source image file path",
    )
    parser.add_argument(
        'zoom_level',
        action="store",
        type=int,
        help="zoom level",
    )
    parser.add_argument(
        '-t', '--tile-size',
        dest='tile_size',
        type=int,
        default=256,
        help="tile size (default: 256)",
    )
    args = parser.parse_args()
    return args


def main() -> None:
    args = load_args()
    src_img = Image.open(args.src_file_path)
    src_max_x, src_max_y = src_img.size

    max_side_tiles_n = pow(2, args.zoom_level)
    max_side_size = max_side_tiles_n * args.tile_size

    if src_max_x > src_max_y:
        max_x = min(src_max_x, max_side_size)
        max_y = int(src_max_y / (src_max_x / float(max_x)))
    else:
        max_y = min(src_max_y, max_side_size)
        max_x = int(src_max_x / (src_max_y / float(max_y)))

    print(f"{max_x}x{max_y}")


if __name__ == '__main__':
    main()
