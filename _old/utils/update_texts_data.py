#!/usr/bin/env python
# -*- coding: utf-8 -*-
from __future__ import print_function

import click
import mmap
import os
import re
import sys
import ujson as json

from slugify import Slugify
from transliterate import translit


DATA_REGEX = r"^(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(.*)"


slugify = Slugify()
slugify.safe_chars = "-.'\""
slugify.separator = ' '


@click.command()
@click.option(
    '-d', '--data-path',
    type=click.Path(exists=True),
    required=True,
    help="Path to target 'data.json'.")
@click.option(
    '-t', '--texts-path',
    type=click.Path(exists=True),
    required=True,
    help="Path to 'texts.txt'.")
def update_texts_data(data_path, texts_path):
    """
    Take 'data.json' and update data from 'texts.txt'.
    """
    with open(data_path, 'r') as f:
        data = json.load(f)

    process_data(data, texts_path)

    with open(data_path, 'w') as f:
        json.dump(data, f, indent=2)


def process_data(data, texts_path):
    texts = data['texts']

    if file_is_empty(texts_path):
        texts = []
    else:
        with open(texts_path, 'r') as f:
            remove_unknown_texts(texts, f)
            update_data(texts, f)

    data['texts'] = texts


def file_is_empty(filename):
    return os.stat(filename).st_size == 0


def remove_unknown_texts(texts, texts_file):
    file_view = mmap.mmap(texts_file.fileno(), 0, access=mmap.ACCESS_READ)

    try:
        for text in texts[:]:
            if town_is_absent_in_texts(text, file_view):
                code = text.get('code')
                warning("Removing text '{0}': no coords match in texts file."
                        .format(code))
                texts.remove(text)
    finally:
        file_view.close()


def town_is_absent_in_texts(text, file_view):
    try:
        x = text['x']
        y = text['y']
    except KeyError:
        return True

    if not isinstance(x, int) or not isinstance(y, int):
        return True

    regex = r"^{0}\s+{1}\s+.*$".format(x, y).encode('utf-8')
    match = re.search(regex, file_view, re.MULTILINE)
    return match is None


def update_data(texts, texts_file):
    for line in texts_file:
        line = line.strip()
        if not line:
            continue

        x, y, b_level, align, size_type, color, code = parse_data_string(line)

        x = int(x)
        y = int(y)
        b_level = int(b_level)
        align = int(align)
        size_type = int(size_type)
        color = int(color)

        text = get_or_create_text_by_coords(texts, code, x, y)

        text['code'] = code
        text['x'] = x
        text['y'] = y
        text['zoom'] = b_level
        text['align'] = align
        text['type'] = size_type
        text['color'] = color

        if 'name_en' not in text:
            text['name_en'] = slugify(code)

        if 'name_ru' not in text:
            name = slugify(code)
            text['name_ru'] = translit(name, 'ru')


def parse_data_string(s):
    match = re.match(DATA_REGEX, s)
    return match.groups()


def get_or_create_text_by_coords(texts, code, x, y):
    nodes = [
        text for text in texts
        if text['x'] == x and text['y'] == y
    ]
    count = len(nodes)

    if count > 1:
        node = nodes.pop(0)
        for dup in nodes:
            warning(
                "Removing node: code='{0}', x={1}, y={2} (duplicate of '{3}')."
                .format(dup['code'], x, y, code))
            texts.remove(dup)
    elif count == 1:
        node = nodes[0]
    else:
        node = {}
        texts.append(node)
        info("New node: code='{0}', x={1}, y={2}."
             .format(code, x, y))

    return node


def info(*objs):
    print("INFO: ", *objs)


def warning(*objs):
    print("WARNING: ", *objs, file=sys.stderr)


if __name__ == '__main__':
    update_texts_data()
