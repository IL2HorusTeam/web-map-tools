#!/usr/bin/env python
# -*- coding: utf-8 -*-

import click
import mmap
import re

from lxml import etree


@click.command()
@click.option(
    '-t', '--target',
    type=click.Path(exists=True),
    help="Path to target 'Props.xml'.")
@click.option(
    '-e', '--eng',
    type=click.Path(exists=True),
    help="Path to English properties.")
@click.option(
    '-r', '--rus',
    type=click.Path(exists=True),
    help="Path to Russian properties.")
def update_texts(target, eng, rus):
    """
    Take 'Props.xml' and update texts from '*.properties'.
    """
    with open(target, 'r') as f:
        xml_str = f.read()

    doc = etree.fromstring(xml_str)
    tags = doc.xpath('/TBaseMapSettings/Towns/MapText')

    if eng:
        update_attrs(tags, 'NameEng', eng)

    if rus:
        update_attrs(tags, 'NameRus', rus)

    xml_str = etree.tostring(doc, xml_declaration=True, encoding="utf-8")
    with open(target, 'w') as f:
        f.write(xml_str)


def update_attrs(tags, attr_name, source):
    with open(source, 'r') as f:
        s = mmap.mmap(f.fileno(), 0, access=mmap.ACCESS_READ)

        for tag in tags:
            code = tag.attrib['Code']

            regex = "^\\b%s\\b.*$" % code
            m = re.search(regex, s, re.MULTILINE)
            if not m:
                print("Failed to find '%s'!" % code)
                continue

            line = m.group().decode('unicode-escape')

            value = re.split("\s+", line, 1)[1]
            value = value.strip()
            if not value:
                print("Empty value for '%s'!" % code)
                continue

            tag.attrib[attr_name] = value

        s.close()

if __name__ == '__main__':
    update_texts()
