#!/usr/bin/env python
# -*- coding: utf-8 -*-

import click
import subprocess
import sys

from PIL import Image
from unipath import Path, DIRS_NO_LINKS
from configparser import ConfigParser


@click.command()
@click.argument('root', type=click.Path(exists=True))
def extract_all_actors(root):
    """
    Extract data from 'actors.static' from all maps extracted from SFS files.
    """
    extractor = Path("extract_actors.py").absolute()

    for map_dir in Path(root).listdir(filter=DIRS_NO_LINKS):
        print("### Processing '{0}' map".format(map_dir.name))

        data = {}

        for loader in map_dir.listdir(pattern="*load*.ini"):
            parser = ConfigParser(allow_no_value=True)
            parser.read(loader)

            map_name = parser['MAP']['HeightMap']
            with Image.open(map_dir.child(map_name)) as im:
                width, height = im.size

            height *= 200
            static_name = list(parser['static'].keys())[0]

            # Usage of dict will remove duplicates
            data[static_name] = height

        for static, height in data.items():
            static = map_dir.child(static)
            print("--- Processing '{0}/{1}'".format(map_dir.name, static.name))
            subprocess.call([
                extractor, "-s", static, "-h", str(height),
            ], stdout=sys.stdout)

        print()


if __name__ == '__main__':
    extract_all_actors()
