#!/usr/bin/env python3

import argparse
import math

from pathlib import Path

from PIL import Image


def load_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Inspect a layer image",
    )
    parser.add_argument(
        'src_file_path',
        action="store",
        type=lambda x: Path(x).resolve(),
        help="source image file path",
    )
    parser.add_argument(
        '-t', '--tile-size',
        dest='tile_size',
        type=int,
        default=256,
        help="output tile size (default: 256)",
    )
    args = parser.parse_args()
    return args


def main() -> None:
    args = load_args()
    src_img = Image.open(args.src_file_path)

    max_side_size = max(src_img.size)
    max_side_tiles_n = int(math.ceil(max_side_size / float(args.tile_size)))
    max_zoom = int(math.floor(math.log2(max_side_tiles_n)))

    print("\n".join([
        f"max zoom: {max_zoom}",
    ]))


if __name__ == '__main__':
    main()
