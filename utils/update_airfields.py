#!/usr/bin/env python
# -*- coding: utf-8 -*-
from __future__ import print_function

import click
import itertools
import ujson as json
import sys

from shapely.geometry import Point, LineString, MultiPoint, Polygon


@click.command()
@click.option(
    '-s', '--source',
    default="actors.static",
    type=click.Path(exists=True),
    help="Path to 'actors.static' file. Used as a relative root for finding "
         "extracted data. Default: 'actors.static'.")
@click.option(
    '-d', '--destination',
    default="data.json",
    type=click.Path(exists=True),
    help="Path to destination file. Default: 'data.json'.")
def update_airfields(source, destination):
    """
    Take data extracted from 'actors.static' and update airfields in
    'data.json'.
    """
    with open(destination, 'r') as f:
        data = json.load(f)

    data.pop('airfields', None)  # remove data of old format if present
    data['airbases'] = get_airbases(source)

    with open(destination, 'w') as f:
        json.dump(data, f, indent=2)
        f.write('\n')


def get_airbases(source):
    with open("{}.takeoffs.json".format(source), 'r') as f:
        takeoffs = json.load(f)

    with open("{}.runways.json".format(source), 'r') as f:
        runways = json.load(f)

    takeoffs = normalize_takeoffs(takeoffs)
    takeoffs = group_takeoffs(takeoffs)

    runways = normalize_runways(runways)
    runways = group_runways(runways)
    runways = add_missing_runways(runways, takeoffs)

    return [make_airbase(runway_group) for runway_group in runways]


def normalize_runways(runways):
    result = []

    for points in runways:
        points = [(p['x'], p['y']) for p in points]

        if len(points) > 2:
            points = take_most_distant_points(points)

        result.append(LineString(points))

    return result


def take_most_distant_points(points):
    points = [Point(p) for p in points]
    max_distance = 0
    p1, p2 = None, None

    for i in range(len(points)):
        current = points[i]

        for other in points[i + 1:]:
            distance = current.distance(other)

            if distance > max_distance:
                max_distance = distance
                p1, p2 = current, other

    return (p1, p2)


def normalize_takeoffs(takeoffs):
    return [
        Point((p['x'], p['y']))
        for p in takeoffs
    ]


def group_runways(runways):
    """
    Group nearest runways within 1.5km.
    """
    groups = []

    while runways:
        current = runways.pop(0)
        current_centroid = current.centroid

        group_runways = [current, ]

        for other in runways[:]:
            if current_centroid.distance(other.centroid) <= 1500:
                group_runways.append(other)
                runways.remove(other)

        points = MultiPoint(list(itertools.chain(*[
            runway.coords for runway in group_runways
        ])))
        minx, miny, maxx, maxy = points.bounds

        center = Point(
            minx + ((maxx - minx) / 2),
            miny + ((maxy - miny) / 2),
        )

        groups.append({
            'runways': group_runways,
            'center': center,
        })

    return groups


def group_takeoffs(takeoffs):
    """
    Group nearest takeoff points within 3km.
    """
    groups = []

    while takeoffs:
        current = takeoffs.pop(0)

        group_takeoffs = [current, ]

        for other in takeoffs[:]:
            if current.distance(other) <= 3000:
                group_takeoffs.append(other)
                takeoffs.remove(other)

        if len(group_takeoffs) == 1:
            center = group_takeoffs[0]
        else:
            minx, miny, maxx, maxy = MultiPoint(group_takeoffs).bounds
            center = Point(
                minx + ((maxx - minx) / 2),
                miny + ((maxy - miny) / 2),
            )

        groups.append({
            'takeoffs': group_takeoffs,
            'center': center,
        })

    return groups


def add_missing_runways(runway_groups, takeoff_groups):
    for takeoff_group in takeoff_groups[:]:
        current_center = takeoff_group['center']
        has_runway = False

        for runway_group in runway_groups:
            if current_center.distance(runway_group['center']) <= 1500:
                has_runway = True
                break

        if has_runway:
            takeoff_groups.remove(takeoff_group)

    for takeoff_group in takeoff_groups:
        if len(takeoff_group['takeoffs']) == 2:
            runway = LineString([
                p.coords[0] for p in takeoff_group['takeoffs']
            ])
            runway_group = {
                'runways': [runway, ],
                'center': takeoff_group['center'],
            }
            runway_groups.append(runway_group)
        else:
            warning("Found detached group of takeoff points which has "
                    "more than 2 points!")
            for point in takeoff_group['takeoffs']:
                print("{} {}".format(point.x, point.y))

    return runway_groups


def make_airbase(runways_group):
    runways = [r.coords for r in runways_group['runways']]

    center = runways_group['center']
    radius = max(itertools.chain(*[
        [
            center.distance(Point(r.coords[0])),
            center.distance(Point(r.coords[1]))
        ]
        for r in runways_group['runways']
    ])) + 300

    return {
        'x': round(center.x, 2),
        'y': round(center.y, 2),
        'runways': runways,
        'radius': radius,
    }


def warning(*objs):
    print("WARNING: ", *objs, file=sys.stderr)


def error(*objs):
    print("ERROR: ", *objs, file=sys.stderr)


if __name__ == '__main__':
    update_airfields()
