#!/usr/bin/env python
# -*- coding: utf-8 -*-
from __future__ import print_function

import click
import struct
import sys
import ujson as json

from functools import partial
from unipath import Path


VERSION_MAGIC = -65535


class DataInputStream(object):
    """
    Reading from Java DataInputStream format.
    """

    def __init__(self, stream):
        self.stream = stream

    def read_boolean(self):
        return struct.unpack('?', self.stream.read(1))[0]

    def read_byte(self):
        return struct.unpack('b', self.stream.read(1))[0]

    def read_unsigned_byte(self):
        return struct.unpack('B', self.stream.read(1))[0]

    def read_char(self):
        return chr(struct.unpack('>H', self.stream.read(2))[0])

    def read_double(self):
        return struct.unpack('>d', self.stream.read(8))[0]

    def read_float(self):
        return struct.unpack('>f', self.stream.read(4))[0]

    def read_short(self):
        return struct.unpack('>h', self.stream.read(2))[0]

    def read_unsigned_short(self):
        return struct.unpack('>H', self.stream.read(2))[0]

    def read_long(self):
        return struct.unpack('>q', self.stream.read(8))[0]

    def read_utf(self):
        utf_length = struct.unpack('>H', self.stream.read(2))[0]
        return self.stream.read(utf_length)

    def read_int(self):
        return struct.unpack('>i', self.stream.read(4))[0]


@click.command()
@click.option(
    '-s', '--src',
    default="actors.static",
    type=click.Path(exists=True),
    help="Path to source file. Default: 'actors.static'.")
@click.option(
    '-d', '--dst',
    type=click.Path(exists=True),
    help="Path to output directory. Default: directory of source file.")
@click.option(
    '-h', '--height',
    type=int,
    required=True,
    help="Absolute map height in meters.")
def extract_actors(src, dst, height):
    """
    Extracts data from 'actors.static'.

    Based on decompiled Java sources of "Actors Static Lite v0.93".
    """
    src = Path(src)
    dst = Path(dst or src.parent)

    with open(src, 'rb') as f:
        stream = DataInputStream(f)
        validate_version(stream)

        extractors = [
            ("bridges", partial(extract_bridges, stream, height)),
            ("takeoffs", partial(extract_takeoffs, stream)),
            ("buildings", partial(extract_buildings, stream)),
            ("runways", partial(extract_runways, stream)),
            ("taxis", partial(extract_taxis, stream)),
            ("parkings", partial(extract_parkings, stream)),
        ]

        for name, extractor in extractors:
            data = extractor()
            dst_path = dst.child("{0}.{1}.json".format(src.name, name))
            dump_data(data, dst_path)


def validate_version(stream):
    version = stream.read_int()
    if version != VERSION_MAGIC:
        raise ValueError("Version is unknown.")


def dump_data(data, path):
    with open(path, 'w') as f:
        json.dump(data, f, indent=2)
        f.write("\n")


def extract_bridges(stream, height):
    print("Extracting bridges...")

    data = []
    known_types = {32, 64, 128, }
    count = stream.read_int()

    for i in range(count):
        k1 = stream.read_int()
        l2 = stream.read_int()
        k3 = stream.read_int()
        l5 = stream.read_int()
        bridge_type = stream.read_int()
        f3 = stream.read_float()

        if bridge_type not in known_types:
            warning("Unknown bridge type: {0}.".format(bridge_type))

        j8 = k3 - k1
        k8 = l5 - l2

        if k8 == 0:
            k9 = 0
            i9 = -1 if j8 <= 0 else 1
        elif j8 == 0:
            i9 = 0
            k9 = -1 if k8 <= 0 else 1
        else:
            if abs(j8) != abs(k8):
                warning("LongBridge #{0}: wrong direction.".format(i))

            i9 = -1 if j8 <= 0 else 1
            k9 = -1 if k8 <= 0 else 1

        f15 = k1 + 0.5 + float(i9) * f3
        start_x = float(abs(f15 * 200))

        f16 = l2 + 0.5 + float(k9) * f3
        start_y = abs(-1.0 - f16) * 200.0
        start_y = float(height - start_y)

        f17 = float(k3) + 0.5 + float(i9) * f3
        end_x = float(abs(f17 * 200.0))

        f18 = float(l5) + 0.5 + float(k9) * f3
        end_y = abs(-1.0 - f18) * 200.0
        end_y = float(height - end_y)

        data.append({
            'type': bridge_type,
            'start': {
                'x': round(start_x, 4),
                'y': round(start_y, 4),
            },
            'end': {
                'x': round(end_x, 4),
                'y': round(end_y, 4),
            },
        })

    print("Total bridges: {0}.".format(len(data)))
    return data


def extract_takeoffs(stream):
    print("Extracting takeoff points...")

    data = []

    classes_count = stream.read_int()
    print("Total takeoff points classes: {0}.".format(classes_count))

    if classes_count:
        classes = [
            stream.read_utf()
            for _ in range(classes_count)
        ]

        count = stream.read_int()

        for i in range(count):
            class_index = stream.read_int()
            class_name = classes[class_index]  # not used

            x = stream.read_float()
            y = stream.read_float()
            heading = stream.read_float() % 360

            data.append({
                'x': round(x, 4),
                'y': round(y, 4),
                'heading': round(heading, 4),
            })

    print("Total takeoff points: {0}.".format(len(data)))
    return data


def extract_buildings(stream):
    print("Extracting buildings...")

    data = []

    classes_count = stream.read_int()
    print("Total building classes: {0}.".format(classes_count))

    if classes_count:
        classes = [
            stream.read_utf()
            for _ in range(classes_count)
        ]

        count = stream.read_int()

        for i in range(count):
            i3 = stream.read_int()
            i4 = i3 & 0xffff
            i6 = (i3 >> 16) & 0xffff
            j7 = stream.read_int()

            for j in range(j7):
                j9 = stream.read_int()
                l9 = stream.read_int()
                i10 = j9 & 0xffff
                j10 = j9 >> 16
                k10 = l9 & 0xffff
                l10 = (l9 >> 16) & 0xffff

                x = i4 * 200.0 + float(k10 * 200) / 32000.0
                y = i6 * 200.0 + float(l10 * 200) / 32000.0

                azimuth = ((j10 * 360.0) / 32000.0)
                if azimuth != 0:
                    azimuth = -azimuth

                # strip "com.maddox.il2.objects.buildings." at the beginning
                class_name = classes[i10][33:]

                data.append({
                    'class': class_name,
                    'x': round(x, 4),
                    'y': round(y, 4),
                    'azimuth': round(azimuth, 4),
                })

    print("Total buildings: {0}.".format(len(data)))
    return data


def extract_runways(stream):
    print("Extracting runway points...")

    data = []
    runways_count = stream.read_int()

    for i in range(runways_count):
        runway = []
        points_count = stream.read_int()

        for _ in range(points_count):
            x = stream.read_float()
            y = stream.read_float()

            runway.append({
                'x': round(x, 4),
                'y': round(y, 4),
            })

        data.append(runway)

    print("Total runway points: {0}.".format(len(data)))
    return data


def extract_taxis(stream):
    print("Extracting taxi points...")

    data = []
    taxis_count = stream.read_int()

    for i in range(taxis_count):
        taxi = []
        points_count = stream.read_int()

        for _ in range(points_count):
            x = stream.read_float()
            y = stream.read_float()

            taxi.append({
                'x': round(x, 4),
                'y': round(y, 4),
            })

        data.append(taxi)

    print("Total taxi points: {0}.".format(len(data)))
    return data


def extract_parkings(stream):
    print("Extracting parking points...")

    data = []
    parkings_count = stream.read_int()

    for i in range(parkings_count):
        parking = []
        points_count = stream.read_int()

        for _ in range(points_count):
            x = stream.read_float()
            y = stream.read_float()

            parking.append({
                'x': round(x, 4),
                'y': round(y, 4),
            })

        data.append(parking)

    print("Total parking points: {0}.".format(len(data)))
    return data


def warning(*objs):
    print("WARNING: ", *objs, file=sys.stderr)


def error(*objs):
    print("ERROR: ", *objs, file=sys.stderr)


if __name__ == '__main__':
    extract_actors()
