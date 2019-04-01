export function sortTheatersByPriorityAscByTitleAsc(theaters) {
  theaters.sort((a, b) => {
    if (a.priority < b.priority) {return -1;}
    if (a.priority > b.priority) {return  1;}

    if (a.title < b.title) {return -1;}
    if (a.title > b.title) {return  1;}

    return 0;
  });
}
