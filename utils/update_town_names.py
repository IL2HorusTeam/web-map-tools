#!/usr/bin/env python
# -*- coding: utf-8 -*-
from __future__ import print_function

import click
import mmap
import re
import sys

from lxml import etree


class TownNameError(Exception):
    pass


class TownNotFoundError(TownNameError):
    pass


class EmptyTownNameError(TownNameError):
    pass


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
def update_town_names(props, eng, rus):
    """
    Take 'Props.xml' and update texts from '*.properties'.
    """
    parser = etree.XMLParser(remove_blank_text=True)
    tree = etree.parse(props, parser)

    nodes = tree.xpath("/TBaseMapSettings/Towns/MapText")

    if eng:
        update_all_nodes_attr(nodes, 'NameEng', eng)

    if rus:
        update_all_nodes_attr(nodes, 'NameRus', rus)

    tree.write(props,
               pretty_print=True,
               xml_declaration=True,
               encoding="utf-8")


def update_all_nodes_attr(nodes, attr_name, source):
    with open(source, 'r') as f:
        file_view = mmap.mmap(f.fileno(), 0, access=mmap.ACCESS_READ)
        try:
            _update_all_nodes_attr(nodes, attr_name, file_view)
        finally:
            file_view.close()


def _update_all_nodes_attr(nodes, attr_name, file_view):
    for node in nodes:
        code = node.attrib['Code']
        try:
            node.attrib[attr_name] = get_single_node_attr_value(code, file_view)
        except TownNotFoundError:
            warning("Failed to find '{attr}' for town '{code}'."
                    .format(attr=attr_name, code=code))
        except EmptyTownNameError:
            warning("Value of '{attr}' for town '{code}' is empty."
                    .format(attr=attr_name, code=code))


def get_single_node_attr_value(code, file_view):
    s = find_string_by_town_code(code, file_view)
    s = decode_string(s)
    return extract_value_from_property_string(s)


def find_string_by_town_code(code, file_view):
    regex = r"^{0}\b.*$".format(code)
    match = re.search(regex, file_view, re.MULTILINE)

    if not match:
        raise TownNotFoundError

    return match.group()


def decode_string(s):
    try:
        return s.decode('ascii').decode('unicode-escape')
    except UnicodeDecodeError:
        return s.decode('cp1251')


def extract_value_from_property_string(s):
    try:
        value = re.split(r"\s+", s, 1)[1]
    except IndexError:
        raise EmptyTownNameError

    value = value.strip()

    if not value:
        raise EmptyTownNameError

    return value


def warning(*objs):
    print("WARNING: ", *objs, file=sys.stderr)


if __name__ == '__main__':
    update_town_names()
