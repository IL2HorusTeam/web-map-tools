#!/usr/bin/env python
# -*- coding: utf-8 -*-

import click
import ujson as json


@click.command()
@click.argument(
    'path',
    type=click.Path(exists=True))
@click.option(
    '-i', '--indent',
    default=0,
    type=int)
def min_json(path, indent):
    """
    Minify json with given indent.
    """
    with open(path, 'r') as f:
        data = json.load(f)

    output_path = "{}.min.{}".format(*path.rsplit('.', 1))

    print("Minifying {} to {}.".format(path, output_path))

    with open(output_path, 'w') as f:
        json.dump(data, f, indent=indent)
        f.write('\n')


if __name__ == '__main__':
    min_json()
