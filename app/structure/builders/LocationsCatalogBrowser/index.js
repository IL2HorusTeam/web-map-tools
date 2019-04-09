import React from "react";
import { connect } from "react-redux";

import { calculateColumnsCount } from "./utils";

import { buildLocationsCatalogBrowserCloseAction } from "../../../behavior/actions";
import { buildLocationSelectedAction } from "../../../behavior/actions";

import { selectLocationsCatalogBrowserIsClosable } from "../../../state/selectors";
import { selectWindowWidth } from "../../../state/selectors";

import LocationsCatalogBrowserComponent from "../../components/LocationsCatalogBrowser";

import StylesVariables from "../../../styles/variables.scss";


function mapStateToProps(state) {
  let columnsCount = calculateColumnsCount(
    selectWindowWidth(state),
    StylesVariables.contentWidthMax,
    StylesVariables.screenWidthStep,
    StylesVariables.contentColsCountMax,
  );
  return {
    isClosable: selectLocationsCatalogBrowserIsClosable(state),
    columnsCount: columnsCount,
  };
}


function mapDispatchToProps(dispatch, ownProps) {
  const onClose = () => dispatch(buildLocationsCatalogBrowserCloseAction());
  const onLocationSelected = (locationVariantId) => dispatch(
    buildLocationSelectedAction(locationVariantId)
  );
  return {
    onClose: onClose,
    onLocationSelected: onLocationSelected,
  };
}


function mergeProps(stateProps, dispatchProps, ownProps) {
  const onClose = stateProps.isClosable ? dispatchProps.onClose : undefined;
  return Object.assign({}, ownProps, {
    onClose: onClose,
    onLocationSelected: dispatchProps.onLocationSelected,
    columnsCount: stateProps.columnsCount,
  });
}


export const LocationsCatalogBrowserContainer = connect(
  mapStateToProps, mapDispatchToProps, mergeProps,
)(
  LocationsCatalogBrowserComponent
);


export default function buildLocationsCatalogBrowser(locationsCatalogSkeleton) {
  const props = {
    locationsCatalogSkeleton: locationsCatalogSkeleton,
  };
  return React.createElement(LocationsCatalogBrowserContainer, props);
}
