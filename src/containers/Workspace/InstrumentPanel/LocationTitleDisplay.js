import React from "react";
import { connect } from "react-redux";

import LocationTitleDisplayComponent from "../../../components/Workspace/InstrumentPanel/LocationTitleDisplay";
import { selectLocationVariantId } from "../../../selectors";


function makeMapStateToProps(locationsVariantsMap) {
  return function mapStateToProps(state) {
    let locationVariantId = selectLocationVariantId(state);
    let locationFullTitle = (
      locationVariantId
      ? locationsVariantsMap.get(locationVariantId).fullTitle
      : ""
    );

    return {
      locationFullTitle: locationFullTitle,
    };
  }
}


export default function makeLocationTitleDisplayContainer(locationsVariantsMap) {
  let mapStateToProps = makeMapStateToProps(locationsVariantsMap);
  let container = connect(mapStateToProps)(LocationTitleDisplayComponent);
  return React.createElement(container, null);
};
