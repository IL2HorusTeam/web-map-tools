#!/usr/bin/env python
# -*- coding: utf-8 -*-
from __future__ import print_function

import click
import os
import ujson as json

from lxml import etree


@click.command()
@click.option(
    '-s', '--source',
    type=click.Path(exists=True),
    default='Props.xml',
    help="Path to source file. Default: 'Props.xml'.")
@click.option(
    '-d', '--destination',
    type=click.Path(),
    default='data.json',
    help="Path to output file. Default: 'data.json'.")
@click.option(
    '-i', '--indent',
    type=int,
    default=2,
    help="Indent for output JSON. Default: 2.")
@click.option(
    '-m', '--minimize',
    is_flag=True,
    help="Also create minified json. Default: False.")
def xml2json(source, destination, indent, minimize):
    """
    Convert 'Props.xml' to 'data.json'.
    """
    parser = etree.XMLParser(remove_blank_text=True)
    tree = etree.parse(source, parser)
    data = get_data(tree)

    with open(destination, 'w') as f:
        json.dump(data, f, indent=indent)
        f.write('\n')

    if minimize:
        destination_min = os.path.splitext(destination)[0] + ".min.json"
        print(destination_min)
        with open(destination_min, 'w') as f:
            json.dump(data, f, indent=0)
            f.write('\n')


def get_data(tree):
    return {
        'map_code': get_map_code(tree),
        'geomentry': get_geometry(tree),
        'texts': get_texts(tree),
        'airfields': get_airfields(tree),
    }


def get_map_code(tree):
    return tree.xpath("/TBaseMapSettings/MisCode/text()")[0]


def get_geometry(tree):
    return {
        'width': int(tree.xpath("/TBaseMapSettings/Width/text()")[0]),
        'height': int(tree.xpath("/TBaseMapSettings/Height/text()")[0]),
    }


def get_texts(tree):
    return [
        get_single_text(node)
        for node in tree.xpath("/TBaseMapSettings/Towns/MapText")
    ]


def get_single_text(node):
    return {
        'code': node.attrib.get('Code'),
        'name_en': node.attrib.get('NameEng'),
        'name_ru': node.attrib.get('NameRus'),
        'x': int(node.attrib.get('X', 0)),
        'y': int(node.attrib.get('Y', 0)),
        'zoom': min(int(node.attrib.get('bLevel', 7)), 7),
        'align': min(int(node.attrib.get('Align', 1)), 2),
        'type': min(int(node.attrib.get('Type', 0)), 2),
        'color': min(int(node.attrib.get('Color', 0)), 19),
    }


def get_airfields(tree):
    return [
        get_single_airfield(node)
        for node in tree.xpath("/TBaseMapSettings/Airfields/Airfield")
    ]


def get_single_airfield(node):
    return {
        'id': int(node.attrib.get('ID', 0)),
        'x': float(node.attrib.get('X', 0)),
        'y': float(node.attrib.get('Y', 0)),
        'azimuth': int(node.attrib.get('A', 0)),
        'type': int(node.attrib.get('T1', 0)),
        'res': node.attrib.get('Res'),
    }


if __name__ == '__main__':
    xml2json()
