import React from "react";
import { connect } from "react-redux";

import { selectLocationVariantId } from "../../../../state/selectors";
import LocationTitleDisplayComponent from "../../../components/Workspace/InstrumentPanel/LocationTitleDisplay";


const buildMapStateToProps = (locationsVariantsMap) => (state) => {
  const locationVariantId = selectLocationVariantId(state);
  const locationVariant = locationsVariantsMap.get(locationVariantId);

  return {
    locationFullTitle: locationVariant.fullTitle,
  };
};


export function buildLocationTitleDisplayContainer(locationVariantsMap) {
  const mapStateToProps = buildMapStateToProps(locationVariantsMap);
  return connect(
    mapStateToProps,
  )(
    LocationTitleDisplayComponent
  );
}


export function buildLocationTitleDisplay(locationTitleDisplayContainer) {
  return React.createElement(locationTitleDisplayContainer, null);
}
