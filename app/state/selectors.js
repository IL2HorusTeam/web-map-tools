export function selectIsAppLoading(state) {
  return !(
       selectIsLocationSelected(state)
    || state.locationsCatalogBrowser.isOpen
  );
}


export function selectIsLocationsCatalogBrowserOpen(state) {
  return state.locationsCatalogBrowser.isOpen;
}


export function selectLocationVariantId(state) {
  return state.workspace.locationVariantId;
}


export function selectIsLocationSelected(state) {
  return selectLocationVariantId(state) !== undefined;
}


export function selectIsLocationsCatalogBrowserClosable(state) {
  return selectIsLocationSelected(state);
}


export function selectWindowWidth(state) {
  return state.window.width;
}


export function selectArguments(state) {
  return {
    locationVariantId: selectLocationVariantId(state),
  }
}
