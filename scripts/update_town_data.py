#!/usr/bin/env python
# -*- coding: utf-8 -*-

import click
import mmap
import os
import re

from lxml import etree


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

    with open(texts, 'r') as f:
        process_data(tree, f)

    tree.write(
        props,
        pretty_print=True,
        xml_declaration=True,
        encoding="utf-8")


def process_data(tree, texts_file):
    root = tree.xpath("/TBaseMapSettings/Towns")[0]

    if not os.fstat(texts_file.fileno()).st_size:
        root.clear()
        return

    #####
    s = mmap.mmap(texts_file.fileno(), 0, access=mmap.ACCESS_READ)

    for node in root.xpath("MapText"):
        x, y = node.attrib['X'], node.attrib['Y']

        regex = "^%s\\s%s\\s.*$" % (x, y)
        m = re.search(regex, s, re.MULTILINE)

        if not m:
            code = node.attrib['Code']
            print(
                "Removing '%s' (x=%s, y=%s): no coords match in texts file."
                % (code, x, y))
            root.remove(node)

    s.close()

    #####
    regex = r"^(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(.*)"

    for line in texts_file:
        line = line.strip()
        if not line:
            continue

        m = re.match(regex, line)
        x, y, b_level, align, font_type, color, code = m.groups()

        nodes = root.xpath("MapText[@X='%s' and @Y='%s']" % (x, y))
        count = len(nodes)

        if count > 1:
            node = nodes.pop(0)
            for dup in nodes:
                print(
                    "Removing node: code='%s', x=%s, y=%s (duplicate of '%s')."
                    % (dup.attrib['Code'], x, y, code))
                root.remove(dup)
        elif count == 1:
            node = nodes[0]
        else:
            node = etree.Element('MapText')
            root.append(node)
            print("New node: code='%s', x=%s, y=%s." % (code, x, y))

        node.attrib['Code'] = code
        node.attrib['X'] = x
        node.attrib['Y'] = y
        node.attrib['bLevel'] = b_level
        node.attrib['Align'] = align
        node.attrib['Type'] = font_type
        node.attrib['Color'] = color

        if not node.attrib.get('NameEng'):
            node.attrib['NameEng'] = code

        if not node.attrib.get('NameRus'):
            node.attrib['NameRus'] = code


if __name__ == '__main__':
    update_town_data()
