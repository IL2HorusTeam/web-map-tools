#!/usr/bin/env python
from __future__ import unicode_literals

import sys

from slugify import Slugify
from transliterate import translit


slugify = Slugify()
slugify.safe_chars = "-.'\""


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

    x, y, a1, a2, size_type, color, code = line.split(' ', 6)
    name = slugify(code, separator=' ')

    if is_eng:
        name_en = name
        name_ru = translit(name, 'ru')
    else:
        name_en = translit(name, 'ru', reversed=True)
        name_ru = name

    color = int(color)
    size_type = int(size_type) + 1

    code = code.replace("\"", "&quot;")
    code = code.replace("'", "&apos;")

    name_en = name_en.replace("\"", "&quot;")
    name_en = name_en.replace("'", "&apos;")

    name_ru = name_ru.replace("\"", "&quot;")
    name_ru = name_ru.replace("'", "&apos;")

    print(
        "<MapText Code=\"{code}\" Color=\"{color}\" NameEng=\"{name_en}\" NameRus=\"{name_ru}\" X=\"{x}\" Y=\"{y}\" Type=\"{size_type}\"/>"
        .format(code=code,
                color=color,
                name_en=name_en,
                name_ru=name_ru,
                x=x,
                y=y,
                size_type=size_type))
