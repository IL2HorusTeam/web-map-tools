#!/usr/bin/env python3

import argparse
import os

from pathlib import Path

from PIL import Image


def load_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Split an image into tiles at a specified zoom level",
    )
    parser.add_argument(
        'src_file_path',
        action="store",
        type=lambda x: Path(x).resolve(),
        help="source image file path",
    )
    parser.add_argument(
        '-d', '--out-dir',
        dest='out_dir_path',
        type=lambda x: Path(x).resolve(),
        help="output directory path (default: `$(pwd)`)",
        default=Path(os.getcwd()),
    )
    parser.add_argument(
        '-t', '--tile-size',
        dest='tile_size',
        type=int,
        default=256,
        help="output tile size (default: 256)",
    )
    parser.add_argument(
        '-f', '--out-format',
        dest='out_format',
        type=str,
        default='png',
        help="output file format (default: 'png')",
    )
    args = parser.parse_args()
    return args


def main() -> None:
    args = load_args()

    src_img = Image.open(args.src_file_path)
    max_x, max_y = src_img.size

    out_dir_path = args.out_dir_path

    if not out_dir_path.exists():
        out_dir_path.mkdir(parents=True)

    out_format = args.out_format
    tile_size = args.tile_size

    for i, x in enumerate(range(0, max_x, tile_size)):
        for j, y in enumerate(range(0, max_y, tile_size)):
            box = (
                x,
                y,
                x + min(max_x - x, tile_size),
                y + min(max_y - y, tile_size),
            )
            region = src_img.crop(box)
            tile_file_name = out_dir_path / f"{i}_{j}.{out_format}"
            region.save(tile_file_name)


if __name__ == '__main__':
    main()
