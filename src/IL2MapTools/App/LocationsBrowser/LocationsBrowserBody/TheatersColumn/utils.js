export function sortTheatersByOrderAscByTitleAsc(theaters) {
  theaters.sort((a, b) => {
    if (a.order < b.order) {return -1;}
    if (a.order > b.order) {return  1;}

    if (a.title < b.title) {return -1;}
    if (a.title > b.title) {return  1;}

    return 0;
  });
}
