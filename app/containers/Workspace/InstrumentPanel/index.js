import React from "react";

import InstrumentPanelComponent from "../../../components/Workspace/InstrumentPanel";
import makeLocationsCatalogBrowserOpenButtonContainer from "./LocationsCatalogBrowserOpenButton";
import makeLocationTitleDisplayContainer from "./LocationTitleDisplay";


export default function makeInstrumentPanelContainer(locationsVariantsMap) {
  return React.createElement(
    InstrumentPanelComponent,
    {
      makeLocationsCatalogBrowserOpenButton: makeLocationsCatalogBrowserOpenButtonContainer,
      makeLocationTitleDisplay: () => makeLocationTitleDisplayContainer(locationsVariantsMap),
    },
  );
}
