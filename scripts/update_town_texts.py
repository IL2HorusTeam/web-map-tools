#!/usr/bin/env python
# -*- coding: utf-8 -*-

import click
import mmap
import re

from lxml import etree


@click.command()
@click.option(
    '-p', '--props',
    type=click.Path(exists=True),
    required=True,
    help="Path to target 'Props.xml'.")
@click.option(
    '-e', '--eng',
    type=click.Path(exists=True),
    required=False,
    help="Path to English properties.")
@click.option(
    '-r', '--rus',
    type=click.Path(exists=True),
    required=False,
    help="Path to Russian properties.")
def update_town_texts(props, eng, rus):
    """
    Take 'Props.xml' and update texts from '*.properties'.
    """
    with open(props, 'r') as f:
        xml_str = f.read()

    tree = etree.fromstring(xml_str)
    nodes = tree.xpath("/TBaseMapSettings/Towns/MapText")

    if eng:
        update_node_attrs(nodes, 'NameEng', eng)

    if rus:
        update_node_attrs(nodes, 'NameRus', rus)

    xml_str = etree.tostring(tree, xml_declaration=True, encoding="utf-8")
    with open(props, 'w') as f:
        f.write(xml_str)


def update_node_attrs(nodes, attr_name, source):
    with open(source, 'r') as f:
        s = mmap.mmap(f.fileno(), 0, access=mmap.ACCESS_READ)

        for node in nodes:
            code = node.attrib['Code']

            regex = "^\\b%s\\b.*$" % code
            m = re.search(regex, s, re.MULTILINE)
            if not m:
                print("Failed to find '%s' in %s!" % (code, source))
                continue

            line = m.group()

            try:
                line = line.decode('ascii').decode('unicode-escape')
            except UnicodeDecodeError:
                line = line.decode('cp1251')

            value = re.split("\s+", line, 1)[1]
            value = value.strip()
            if not value:
                print("Empty value for '%s'!" % code)
                continue

            node.attrib[attr_name] = value

        s.close()


if __name__ == '__main__':
    update_town_texts()
