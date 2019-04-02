export class InvalidLocationVariantId extends Error {
  constructor(locationVariantId) {
    super(locationVariantId + "");
    this.name = "InvalidLocationVariantId";
    this.locationVariantId = locationVariantId;
  }
}
