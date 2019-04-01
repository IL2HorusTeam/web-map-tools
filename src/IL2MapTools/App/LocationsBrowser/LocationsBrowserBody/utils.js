export function spreadTheatersAcrossColumns(theaters, columnsCount) {
  theaters = theaters.slice();
  sortTheatersBySizeDescByPriorityAscByTitleAsc(theaters);

  let columns = makeEmptyColumns(columnsCount);

  for (var theater of theaters) {
    let column = getMostSuitableColumnForTheater(columns, theater);

    column.items.push(theater);
    column.length = column.length + theater.locations.length;

    if ((Number.MAX_SAFE_INTEGER - theater.priority) < column.priority) {
      column.priority = Number.MAX_SAFE_INTEGER;
    } else {
      column.priority += theater.priority;
    }
  }

  sortColumnsByPriorityAscBySizeDesc(columns);
  return pluckColumnItems(columns);
}


function sortTheatersBySizeDescByPriorityAscByTitleAsc(theaters) {
  theaters.sort((a, b) => {
    if (a.locations.length > b.locations.length) {return -1;}
    if (a.locations.length < b.locations.length) {return 1;}

    if (a.priority < b.priority) {return -1;}
    if (a.priority > b.priority) {return  1;}

    if (a.title < b.title) {return -1;}
    if (a.title > b.title) {return  1;}

    return 0;
  });
}


function makeEmptyColumns(count) {
  let columns = new Array(count);
  for (var i = 0; i < count; ++i) {
    columns[i] = {
      items:    [],
      length:   0,
      priority: 0,
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


function sortColumnsByPriorityAscBySizeDesc(columns) {
  columns.sort((a, b) => {
    if (a.priority < b.priority) {return -1;}
    if (a.priority > b.priority) {return  1;}

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
