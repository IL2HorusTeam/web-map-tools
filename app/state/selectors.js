export function selectAppIsLoading(state) {
  return !(
       selectLocationIsSelected(state)
    || state.locationsCatalogBrowser.isOpen
  );
}


export function selectLocationsCatalogBrowserIsOpen(state) {
  return state.locationsCatalogBrowser.isOpen;
}


export function selectLocationVariantId(state) {
  return state.workspace.locationVariantId;
}


export function selectLocationIsSelected(state) {
  return selectLocationVariantId(state) !== undefined;
}


export function selectLocationsCatalogBrowserIsClosable(state) {
  return selectLocationIsSelected(state);
}


export function selectWindowWidth(state) {
  return state.window.width;
}


export function selectArguments(state) {
  return {
    locationVariantId: selectLocationVariantId(state),
  }
}
