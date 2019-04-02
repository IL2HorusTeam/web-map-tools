export function locationsBrowserTheatersFromTree(theaters) {
  return theaters.map((theater) => {

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
}
