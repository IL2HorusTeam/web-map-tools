#!/usr/bin/env python
# -*- coding: utf-8 -*-
from __future__ import print_function

import click
import mmap
import re
import sys
import ujson as json


class TextError(Exception):
    pass


class TextNotFoundError(TextError):
    pass


class EmptyTextTranslationError(TextError):
    pass


@click.command()
@click.option(
    '-d', '--data-path',
    type=click.Path(exists=True),
    required=True,
    help="Path to target 'data.json'.")
@click.option(
    '-e', '--en-path',
    type=click.Path(exists=True),
    required=False,
    help="Path to English properties.")
@click.option(
    '-r', '--ru-path',
    type=click.Path(exists=True),
    required=False,
    help="Path to Russian properties.")
def update_texts_translations(data_path, en_path, ru_path):
    """
    Take 'data.json' and update texts from '*.properties'.
    """
    with open(data_path, 'r') as f:
        data = json.load(f)

    texts = data['texts']

    if en_path:
        update_all_texts_attr(texts, 'name_en', en_path)

    if ru_path:
        update_all_texts_attr(texts, 'name_ru', ru_path)

    data['texts'] = texts

    with open(data_path, 'w') as f:
        json.dump(data, f, indent=2)


def update_all_texts_attr(texts, attr_name, source):
    with open(source, 'r') as f:
        file_view = mmap.mmap(f.fileno(), 0, access=mmap.ACCESS_READ)
        try:
            _update_all_texts_attr(texts, attr_name, file_view)
        finally:
            file_view.close()


def _update_all_texts_attr(texts, attr_name, file_view):
    for text in texts:
        code = text['code']
        try:
            text[attr_name] = get_single_text_attr_value(code, file_view)
        except TextNotFoundError:
            warning("Failed to find '{attr}' for text '{code}'."
                    .format(attr=attr_name, code=code))
        except EmptyTextTranslationError:
            warning("Value of '{attr}' for text '{code}' is empty."
                    .format(attr=attr_name, code=code))


def get_single_text_attr_value(code, file_view):
    s = find_string_by_text_code(code, file_view)
    s = decode_string(s)
    return extract_value_from_property_string(s)


def find_string_by_text_code(code, file_view):
    regex = r"^{0}\b.*$".format(code).encode('utf-8')
    match = re.search(regex, file_view, re.MULTILINE)

    if not match:
        raise TextNotFoundError

    return match.group()


def decode_string(s):
    try:
        return s.decode('unicode-escape')
    except UnicodeDecodeError:
        return s.decode('cp1251')


def extract_value_from_property_string(s):
    try:
        value = re.split(r"\s+", s, 1)[1]
    except IndexError:
        raise EmptyTextTranslationError

    value = value.strip()

    if not value:
        raise EmptyTextTranslationError

    return value


def warning(*objs):
    print("WARNING: ", *objs, file=sys.stderr)


if __name__ == '__main__':
    update_texts_translations()
