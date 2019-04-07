import IL2MapToolsError from ".";

export class WorkspaceError extends IL2MapToolsError {}

export class InvalidLocationVariantId extends WorkspaceError {
  constructor(locationVariantId) {
    super(locationVariantId + "");
    this.name = "InvalidLocationVariantId";
    this.locationVariantId = locationVariantId;
  }
}
