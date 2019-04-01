export function maybeMakeMultipleVariantLocationBadges(variants) {
  let tags = getLocationVariantsTags(variants);
  if (tags && tags.length > 0) {

    let counters = new Map();
    for (let tag of tags) {
      counters.set(
        tag.category,
        (counters.get(tag.category) || 0) + 1
      );
    }

    return Array.from(counters.entries()).map(([category, counter]) => {
      return {
        category: category,
        text:     counter + "",
      }
    });
  }
}


export function getLocationVariantsTags(variants) {
  let tags = [];

  for (let variant of variants) {
    if (variant.tags) {
      tags.push(...variant.tags);
    }
  }

  if (tags.length > 0) {
    return tags;
  }
}
