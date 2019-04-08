import React from "react";
import { connect } from "react-redux";

import { getColumnsCount } from "./utils";
import { makeActionLocationsCatalogBrowserClose } from "../../behavior/actions";
import { makeActionLocationSelected } from "../../behavior/actions";
import { selectIsLocationsCatalogBrowserClosable } from "../../state/selectors";
import { selectWindowWidth } from "../../state/selectors";
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
