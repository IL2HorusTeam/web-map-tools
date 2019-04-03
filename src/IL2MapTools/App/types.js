export var APPLICATION_STATES = Object.freeze({
  LOADING:             "loading",
  SELECTING_LOCATIONS: "selectingLocations",
  BROWSING_LOCATIONS:  "browsingLocations",
  USING_MAP:           "usingMap",
});

export const APPLICATION_LOADED = "APPLICATION_LOADED";

export const LOCATION_VARIANT_SELECTED        = "LOCATION_VARIANT_SELECTED";
export const LOCATION_VARIANT_SELECTED_ACK    = "LOCATION_VARIANT_SELECTED_ACK";
export const LOCATION_VARIANT_SELECTED_REJECT = "LOCATION_VARIANT_SELECTED_REJECT";
