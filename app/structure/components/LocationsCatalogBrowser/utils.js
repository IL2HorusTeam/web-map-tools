export function spreadTheatersAcrossColumns(theaters, columnsCount) {
  theaters = theaters.slice();
  sortTheatersBySizeDescByOrderAscByTitleAsc(theaters);

  let columns = buildEmptyColumns(columnsCount);

  for (var theater of theaters) {
    let column = getMostSuitableColumnForTheater(columns, theater);

    column.items.push(theater);
    column.length = column.length + theater.locations.length;

    if ((Number.MAX_SAFE_INTEGER - theater.order) < column.order) {
      column.order = Number.MAX_SAFE_INTEGER;
    } else {
      column.order += theater.order;
    }
  }

  sortColumnsByOrderAscBySizeDesc(columns);
  return pluckColumnItems(columns);
}


function sortTheatersBySizeDescByOrderAscByTitleAsc(theaters) {
  theaters.sort((a, b) => {
    if (a.locations.length > b.locations.length) {return -1;}
    if (a.locations.length < b.locations.length) {return 1;}

    if (a.order < b.order) {return -1;}
    if (a.order > b.order) {return  1;}

    if (a.title < b.title) {return -1;}
    if (a.title > b.title) {return  1;}

    return 0;
  });
}


function buildEmptyColumns(count) {
  let columns = new Array(count);
  for (var i = 0; i < count; ++i) {
    columns[i] = {
      items:  [],
      length: 0,
      order:  0,
    };
  }
  return columns;
}


function getMostSuitableColumnForTheater(columns, theater) {
  let minResultingLengthValue    = Number.MAX_SAFE_INTEGER;
  let minResultingLengthColumnId = 0;

  for (var columnId = 0; columnId < columns.length; ++columnId) {
    let bin = columns[columnId];
    let resultingLength = bin.length + theater.locations.length;
    if (resultingLength < minResultingLengthValue) {
      minResultingLengthColumnId = columnId;
      minResultingLengthValue = resultingLength;
    }
  }

  return columns[minResultingLengthColumnId];
}


function sortColumnsByOrderAscBySizeDesc(columns) {
  columns.sort((a, b) => {
    if (a.order < b.order) {return -1;}
    if (a.order > b.order) {return  1;}

    if (a.length > b.length) {return -1;}
    if (a.length < b.length) {return  1;}

    return 0;
  });
}


function pluckColumnItems(columns) {
  return columns.map((column) => {
    return column.items;
  });
}


export function extractLocationVariantsTagsAsFlatArray(locationVariants) {
  return (
    locationVariants
    .map(variant => (variant.tags || []))
    .flat()
    .filter(Boolean)
  );
}


export function groupTagsIntoBadges(tags) {
  if (!tags || tags.length == 0) {
    return;
  }

  let counters = new Map();
  for (let tag of tags) {
    counters.set(
      tag.category,
      (counters.get(tag.category) || 0) + 1
    );
  }
  
  return (
    Array
    .from(counters.entries())
    .map(([category, counter]) => ({
      category: category,
      text:     counter + "",
    }))
  );
}
