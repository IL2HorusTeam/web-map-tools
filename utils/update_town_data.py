#!/usr/bin/env python
# -*- coding: utf-8 -*-
from __future__ import print_function

import click
import mmap
import os
import re
import sys

from lxml import etree
from slugify import Slugify
from transliterate import translit


DATA_REGEX = r"^(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(.*)"


slugify = Slugify()
slugify.safe_chars = "-.'\""
slugify.separator = ' '


@click.command()
@click.option(
    '-p', '--props',
    type=click.Path(exists=True),
    required=True,
    help="Path to target 'Props.xml'.")
@click.option(
    '-t', '--texts',
    type=click.Path(exists=True),
    required=True,
    help="Path to 'texts.txt'.")
def update_town_data(props, texts):
    """
    Take 'Props.xml' and update data from 'texts.txt'.
    """
    parser = etree.XMLParser(remove_blank_text=True)
    tree = etree.parse(props, parser)
    process_data(tree, texts)
    tree.write(props,
               pretty_print=True,
               xml_declaration=True,
               encoding="utf-8")


def file_is_empty(filename):
    return os.stat(filename).st_size == 0


def process_data(tree, texts):
    root = tree.xpath("/TBaseMapSettings/Towns")[0]

    if file_is_empty(texts):
        root.clear()
    else:
        with open(texts, 'r') as f:
            remove_unknown_towns(root, f)
            update_data(root, f)


def remove_unknown_towns(root, texts_file):
    file_view = mmap.mmap(texts_file.fileno(), 0, access=mmap.ACCESS_READ)

    try:
        for node in root.xpath("MapText"):
            if town_is_absent_in_texts(node, file_view):
                code = node.attrib.get('Code')
                warning("Removing town '{0}': no coords match in texts file."
                        .format(code))
                root.remove(node)
    finally:
        file_view.close()


def town_is_absent_in_texts(node, file_view):
    try:
        x = node.attrib['X']
        y = node.attrib['Y']
    except KeyError:
        return False

    regex = r"^{0}\s+{1}\s+.*$".format(x, y)
    match = re.search(regex, file_view, re.MULTILINE)
    return match is None


def update_data(root, texts_file):
    for line in texts_file:
        line = line.strip()
        if not line:
            continue

        x, y, b_level, align, size_type, color, code = parse_data_string(line)
        node = get_or_create_node_by_coords(root, code, x, y)

        node.attrib['Code'] = code
        node.attrib['X'] = x
        node.attrib['Y'] = y
        node.attrib['bLevel'] = b_level
        node.attrib['Align'] = align
        node.attrib['Type'] = size_type
        node.attrib['Color'] = color

        if not node.attrib.get('NameEng'):
            node.attrib['NameEng'] = slugify(code)

        if not node.attrib.get('NameRus'):
            name = slugify(code)
            node.attrib['NameRus'] = translit(name, 'ru')


def parse_data_string(s):
    match = re.match(DATA_REGEX, s)
    return match.groups()


def get_or_create_node_by_coords(root, code, x, y):
    nodes = root.xpath("MapText[@X='%s' and @Y='%s']" % (x, y))
    count = len(nodes)

    if count > 1:
        node = nodes.pop(0)
        for dup in nodes:
            warning(
                "Removing node: code='{0}', x={1}, y={2} (duplicate of '{3}')."
                .format(dup.attrib['Code'], x, y, code))
            root.remove(dup)
    elif count == 1:
        node = nodes[0]
    else:
        node = etree.Element('MapText')
        root.append(node)
        info("New node: code='{0}', x={1}, y={2}."
             .format(code, x, y))

    return node


def info(*objs):
    print("INFO: ", *objs)


def warning(*objs):
    print("WARNING: ", *objs, file=sys.stderr)


if __name__ == '__main__':
    update_town_data()
