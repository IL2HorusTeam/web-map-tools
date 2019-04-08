export function selectIsAppLoading(state) {
  return !(
       state.workspace.locationVariantId
    || state.locationsCatalogBrowser.isOpen
  );
}


export function selectIsLocationsCatalogBrowserOpen(state) {
  return state.locationsCatalogBrowser.isOpen;
}



export function selectLocationVariantId(state) {
  return state.workspace.locationVariantId;
}


export function selectIsLocationsCatalogBrowserClosable(state) {
  return selectLocationVariantId(state) !== undefined;
}


export function selectWindowWidth(state) {
  return state.window.width;
}


export function selectArguments(state) {
  return {
    locationVariantId: selectLocationVariantId(state),
  }
}
