#!/usr/bin/env python
from __future__ import unicode_literals

import sys

from slugify import slugify
from transliterate import translit


for line in sys.stdin:
    try:
        line = line.decode('ascii')
        is_eng = True
    except UnicodeDecodeError:
        line = line.decode('cp1251')
        is_eng = False

    line = line.strip()

    if not line:
        continue

    x, y, a1, a2, a3, size_type, code = line.split(' ', 6)
    name = slugify(code, separator=' ')

    if is_eng:
        name_en = name
        name_ru = translit(name, 'ru')
    else:
        name_en = translit(name, 'ru', reversed=True)
        name_ru = name

    size_type = (int(size_type) + 1) * 2
    if size_type > 10:
        size_type = 10

    print(
        "<MapText Code=\"{code}\" NameEng=\"{name_en}\" NameRus=\"{name_ru}\" X=\"{x}\" Y=\"{y}\" Type=\"{size_type}\"/>"
        .format(code=code,
                name_en=name_en,
                name_ru=name_ru,
                x=x,
                y=y,
                size_type=size_type))
