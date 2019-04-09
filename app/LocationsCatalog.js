import { TheatersList } from "../locations/catalog.yaml";


export default class LocationsCatalog {
  constructor(theaters) {
    this.theaters = theaters;
  }

  toFlatArray() {
    let flatLocations = this.theaters.map(theater => theater.locations).flat();

    let locationsVariants = flatLocations.map(location => {
      if (location.variants && location.variants.length) {
        return location.variants.map(variant => Object.freeze({
          title:      variant.title,
          fullTitle:  variant.fullTitle,
          id:         variant.id,
          zoom:       location.zoom,
          dimensions: location.dimensions,
          subregion:  variant.subregion,
          tags:       maybeMergeLocationVariantTags(location.tags, variant.tags),
          season:     variant.season || location.season,
        }));
      }
      return Object.freeze(Object.assign(
        {
          fullTitle: location.title,
        },
        location,
      ));
    });

    return locationsVariants.flat();
  }

  toFlatMap() {
    return new Map(this.toFlatArray().map(item => [item.id, item]));
  }

  getSkeleton() {
    let theaters = this.theaters.map((theater) => {

      return {
        title: theater.title,
        id:    theater.id,
        order: theater.displayOrder,

        locations: theater.locations.map((location) => {
          return {
            title: location.title,
            id:    location.id,
            tags:  location.tags,

            variants: (
                 location.variants
              && location.variants.map((locationVariant) => {
                return {
                  title: locationVariant.title,
                  id:    locationVariant.id,
                  tags:  locationVariant.tags,
                };
              })
            ),

          };
        }),

      };
    });

    return {theaters: theaters};
  }

  getLocationVariantIds() {
    return this.toFlatArray().map(locationVariant => locationVariant.id);
  }
}


export function loadLocationsCatalog() {
  let theaters = TheatersList.map(theater => Object.freeze({
    title:        theater.title,
    id:           theater.id,
    displayOrder: theater.displayOrder,
    locations:    theater.locations.map(location => Object.freeze({

      title:      location.title,
      id:         location.id,
      tags:       location.tags,
      zoom:       location.zoom,
      dimensions: location.dimensions,
      season:     location.season,
      variants: (
           location.variants
        && location.variants.map(variant => Object.freeze({

          id:        buildLocationVariantFullId(location.id, variant.id),
          title:     variant.title,
          fullTitle: buildLocationVariantFullTitle(location.title, variant.title),
          tags:      variant.tags,
          season:    variant.season,
          subregion: variant.subregion,
        }))
      ),
    })),
  }));

  return new LocationsCatalog(theaters);
}


function buildLocationVariantFullId(locationId, locationVariantId) {
  return `${locationId}:${locationVariantId}`;
}


function buildLocationVariantFullTitle(locationTitle, locationVariantTitle) {
  return `${locationTitle} / ${locationVariantTitle}`;
}


function maybeMergeLocationVariantTags(locationTags, locationVariantTags) {
  if (
       (!locationTags || locationTags.length == 0)
    && (!locationVariantTags || locationVariantTags.length == 0)
  ) {
    return;
  }

  let merged = (locationTags || []).concat(locationVariantTags || []);

  let unique = merged.filter(function excludeDuplicates(item, pos, self) {
    return self.indexOf(item) == pos;
  })

  return unique;
}
