const ARGS_DELIMITER = "/";


export function parseArgumentsString(str) {
  var [locationVariantId, ...rest] = str.split(ARGS_DELIMITER);

  return {
    locationVariantId: locationVariantId,
  }
}


export function formatArgumentsString({locationVariantId}) {
  let parts = [];

  if (locationVariantId) {
    parts.push(locationVariantId);
  }

  return parts.join(ARGS_DELIMITER);
}
