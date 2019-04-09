import { InvalidLocationVariantId } from "./errors";


export function buildLocationVariantIdValidator(locationVariantsIds) {
  const ids = new Set(locationVariantsIds);

  return function locationIdValidator(locationVariantId) {
    if (!ids.has(locationVariantId)) {
      throw new InvalidLocationVariantId(locationVariantId);
    }
  };
}
