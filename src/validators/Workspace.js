import { InvalidLocationVariantId } from "../errors/Workspace";


export function makeLocationVariantIdValidator(locationVariantsIds) {
  const ids = new Set(locationVariantsIds);

  return function locationIdValidator(locationVariantId) {
    if (!ids.has(locationVariantId)) {
      throw new InvalidLocationVariantId(locationVariantId);
    }
  };
}
