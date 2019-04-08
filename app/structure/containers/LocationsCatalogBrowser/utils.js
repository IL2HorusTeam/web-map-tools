export function getColumnsCount(
  widthActual,
  widthMax,
  widthStep,
  countMax,
) {
  let width = Math.min(widthActual, widthMax);
  let columnsCount = Math.floor(width / widthStep);
  columnsCount = Math.min(columnsCount, countMax);
  columnsCount = Math.max(columnsCount, 1);
  return columnsCount;
}
