import React from "react";
import { connect } from "react-redux";

import { getColumnsCount } from "./utils";
import { makeActionLocationsCatalogBrowserClose } from "../../actions";
import { makeActionLocationSelected } from "../../actions";
import { selectIsLocationsCatalogBrowserClosable } from "../../selectors";
import { selectWindowWidth } from "../../selectors";
import LocationsCatalogBrowserComponent from "../../components/LocationsCatalogBrowser";
import StylesVariables from "../../styles/variables.scss";


function mapStateToProps(state) {
  let columnsCount = getColumnsCount(
    selectWindowWidth(state),
    StylesVariables.contentWidthMax,
    StylesVariables.screenWidthStep,
    StylesVariables.contentColsCountMax,
  );
  return {
    isClosable: selectIsLocationsCatalogBrowserClosable(state),
    columnsCount: columnsCount,
  };
}


function mapDispatchToProps(dispatch) {
  return {
    onClose: () => dispatch(makeActionLocationsCatalogBrowserClose()),
    onLocationSelected: (locationVariantId) => dispatch(makeActionLocationSelected(locationVariantId)),
  };
}


export const LocationsCatalogBrowserContainer = (
  connect(mapStateToProps, mapDispatchToProps)
  (LocationsCatalogBrowserComponent)
);


export default function makeLocationsCatalogBrowserContainer(locationsCatalogSkeleton) {
  return React.createElement(LocationsCatalogBrowserContainer, {
    locationsCatalogSkeleton: locationsCatalogSkeleton,
  });
};
