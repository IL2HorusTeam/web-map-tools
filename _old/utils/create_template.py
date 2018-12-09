#!/usr/bin/env python
# -*- coding: utf-8 -*-

import click

from lxml import etree


@click.command()
@click.option(
    '-o', '--output',
    default="Props.xml",
    help="Path to output file. Default: 'Props.xml'.")
@click.option(
    '-c', '--code',
    default="NONAME",
    help="Code name of map. Default: 'NONAME'.")
@click.option(
    '-w', '--width',
    type=int,
    default=0,
    help="Absolute map width. Default: 0.")
@click.option(
    '-h', '--height',
    type=int,
    default=0,
    help="Absolute map height. Default: 0.")
def create_template(output, code, width, height):
    """
    Create basic template of 'Props.xml'.
    """
    root = etree.Element("TBaseMapSettings")

    etree.SubElement(root, "MisCode").text = code
    etree.SubElement(root, "Width").text = str(width)
    etree.SubElement(root, "Height").text = str(height)
    etree.SubElement(root, "Towns").text = ""
    etree.SubElement(root, "Airfields").text = ""
    etree.SubElement(root, "AdvTexts").text = ""

    tree_str = etree.tostring(
        root,
        pretty_print=True,
        xml_declaration=True,
        encoding="utf-8")

    with open(output, 'w') as f:
        f.write(tree_str)


if __name__ == '__main__':
    create_template()
