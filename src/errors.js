export default class IL2MapToolsError extends Error {}


export class InvalidLocationVariantId extends IL2MapToolsError {
  constructor(locationVariantId) {
    super(locationVariantId + "");
    this.name = "InvalidLocationVariantId";
    this.locationVariantId = locationVariantId;
  }
}
