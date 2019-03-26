const IMAGE_SCALE = 100;
const VALUE_NOT_AVAILABLE = "N/A";

var STATES = Object.freeze({
    INITIAL: "initial"
  , BROWSE_LOCATIONS: "browseLocations"
  , USE_MAP: "useMap"
});

var DISTANCE_UNITS_CODES = Object.freeze({
    METRIC:   "m"
  , IMPERIAL: "i"
});

var DISTANCE_UNITS_NAMES = {};
DISTANCE_UNITS_NAMES[DISTANCE_UNITS_CODES.METRIC]   = {large: "km", short: "m"};
DISTANCE_UNITS_NAMES[DISTANCE_UNITS_CODES.IMPERIAL] = {large: "mi", short: "ft"};
DISTANCE_UNITS_NAMES = Object.freeze(DISTANCE_UNITS_NAMES);

var TEMPERATURE_UNITS_CODES = Object.freeze({
    CELSIUS:    "c"
  , FAHRENHEIT: "f"
});

var TEMPERATURE_UNITS_NAMES = {};
TEMPERATURE_UNITS_NAMES[TEMPERATURE_UNITS_CODES.CELSIUS]    = "°C";
TEMPERATURE_UNITS_NAMES[TEMPERATURE_UNITS_CODES.FAHRENHEIT] = "°F";
TEMPERATURE_UNITS_NAMES = Object.freeze(TEMPERATURE_UNITS_NAMES);

function metersToKm(x)    {return x / 1000};
function metersToMiles(x) {return x / 1609.34};
function metersToFeet(x)  {return x * 3.28084};

function celsiusToFahrenheits(x) {return (x * 1.8) + 32};

var LOCATIONS = Object.freeze({
  "arctic-41-summer": {
    title: "Arctic / 1941 / summer"
  }
  , "arctic-41-winter": {
    title: "Arctic / 1941 / winter"
  }
  , "arctic-42-44-summer": {
    title: "Arctic / 1942-44 / summer"
  }
  , "arctic-42-44-winter": {
    title: "Arctic / 1942-44 / winter"
  }
  , "ardennes-summer": {
    title: "Ardennes / summer"
  }
  , "ardennes-winter": {
    title: "Ardennes / winter"
  }
  , "balaton-summer": {
    title: "Balaton / summer"
  }
  , "balaton-winter": {
    title: "Balaton / winter"
  }
  , "berlin": {
      title: "Berlin"
    , name:  "Berlin"
    , description: null
    , air: {
        temperature: null
      , pressure:    null
    }
    , dimensions: {
        maxX: 195200
      , maxY: 83200
      , maxZ: 441
    }
    , layers: {
        minZoomLevel: 0
      , maxZoomLevel: 3
      , imagesBaseDir: "locations/berlin"
      , dataBaseDir:   "locations/berlin"
      , primary: {
          regular: {formats: ["png"]}
        , preview: {formats: ["png"]}
      }
      , heights_grey:  {
          regular: {formats: ["png"]}
      }
      , heights_color: {
          regular: {formats: ["webp", "jpg"]}
        , preview: {formats: ["png"]}
      }
    }
  }
  , "bessarabia-full": {
    title: "Bessarabia"
  }
  , "bessarabia-iasi": {
    title: "Bessarabia / Iasi"
  }
  , "bessarabia-odessa": {
    title: "Bessarabia / Odessa"
  }
  , "black-sea": {
    title: "Black Sea"
  }
  , "burma": {
    title: "Burma"
  }
  , "chichijima": {
    title: "Chichijima"
  }
  , "coral-sea-online-1": {
    title: "Coral Sea / online 1"
  }
  , "coral-sea-online-2": {
    title: "Coral Sea / online 2"
  }
  , "crimea": {
    title: "Crimea"
  }
  , "donbass-autumn": {
    title: "Donbass / autumn"
  }
  , "donbass-spring": {
    title: "Donbass / spring"
  }
  , "donbass-summer": {
    title: "Donbass / summer"
  }
  , "donbass-winter": {
    title: "Donbass / winter"
  }
  , "franz-josef-land": {
    title: "Franz Josef Land"
  }
  , "guadalcanal-default": {
    title: "Guadalcanal / default"
  }
  , "guadalcanal-early": {
    title: "Guadalcanal / early"
  }
  , "gulf-of-finland-summer": {
    title: "Gulf of Finland / summer"
  }
  , "gulf-of-finland-winter": {
    title: "Gulf of Finland / winter"
  }
  , "hawaii": {
    title: "Hawaii"
  }
  , "italy": {
    title: "Italy"
  }
  , "iwo-jima": {
    title: "Iwo Jima"
  }
  , "khalkhyn-gol-1939-summer": {
    title: "Khalkhyn Gol / 1939 / summer"
  }
  , "khalkhyn-gol-default": {
    title: "Khalkhyn Gol / default"
  }
  , "kurland-default": {
    title: "Kurland / default"
  }
  , "kurland-online": {
    title: "Kurland / online"
  }
  , "kursk": {
    title: "Kursk"
  }
  , "kyiv": {
    title: "Kyiv"
  }
  , "kyushu": {
    title: "Kyushu"
  }
  , "lviv": {
    title: "Lviv"
  }
  , "manchuria": {
    title: "Manchuria"
  }
  , "mariana-islands": {
    title: "Mariana Islands"
  }
  , "mediterranean-default": {
    title: "Mediterranean / default"
  }
  , "mediterranean-light": {
    title: "Mediterranean / light"
  }
  , "midway": {
    title: "Midway"
  }
  , "moscow-region-summer": {
    title: "Moscow Region / summer"
  }
  , "moscow-region-winter": {
    title: "Moscow Region / winter"
  }
  , "moscow-autumn": {
    title: "Moscow / autumn"
  }
  , "moscow-spring": {
    title: "Moscow / spring"
  }
  , "moscow-summer": {
    title: "Moscow / summer"
  }
  , "moscow-winter": {
    title: "Moscow / winter"
  }
  , "murmansk-summer": {
    title: "Murmansk / summer"
  }
  , "murmansk-winter": {
    title: "Murmansk / winter"
  }
  , "nbng-43-mar": {
    title: "New Britain & New Guinea / 1943 / March"
  }
  , "nbng-43-sep": {
    title: "New Britain & New Guinea / 1943 / September"
  }
  , "nbng-44-jan": {
    title: "New Britain & New Guinea / 1944 / January"
  }
  , "nbng-44-jun": {
    title: "New Britain & New Guinea / 1944 / June"
  }
  , "new-guinea": {
    title: "New Guinea"
  }
  , "normandy-1": {
    title: "Normandy / variant 1"
  }
  , "normandy-2": {
    title: "Normandy / variant 2"
  }
  , "normandy-3": {
    title: "Normandy / variant 3"
  }
  , "norway": {
    title: "Norway"
  }
  , "okinawa": {
    title: "Okinawa"
  }
  , "online-1-islands": {
    title: "Online 1 / islands"
  }
  , "online-1-summer": {
    title: "Online 1 / summer"
  }
  , "online-1-winter": {
    title: "Online 1 / winter"
  }
  , "online-2-summer": {
    title: "Online 2 / summer"
  }
  , "online-2-winter": {
    title: "Online 2 / winter"
  }
  , "online-3": {
    title: "Online 3"
  }
  , "online-4": {
    title: "Online 4 (mountains)"
  }
  , "online-5": {
    title: "Online 5"
  }
  , "online-6": {
    title: "Online 6 (islands)"
  }
  , "online-7": {
    title: "Online 7 (islands)"
  }
  , "online-8": {
    title: "Online 8 (Pacific islands)"
  }
  , "online-8a": {
    title: "Online 8a (Pacific islands)"
  }
  , "online-9a-summer": {
    title: "Online 9a (empty) / summer"
  }
  , "online-9a-winter": {
    title: "Online 9a (empty) / winter"
  }
  , "online-9b-summer": {
    title: "Online 9b (empty) / summer"
  }
  , "online-9b-winter": {
    title: "Online 9b (empty) / winter"
  }
  , "online-10a-summer": {
    title: "Online 10a (empty) / summer"
  }
  , "online-10a-winter": {
    title: "Online 10a (empty) / winter"
  }
  , "online-10b-summer": {
    title: "Online 10b (empty) / summer"
  }
  , "online-10b-winter": {
    title: "Online 10b (empty) / winter"
  }
  , "online-11a-empty": {
    title: "Online 11a (empty)"
  }
  , "online-11b-empty": {
    title: "Online 11b (empty)"
  }
  , "pacific-islands": {
    title: "Pacific Islands"
  }
  , "palau": {
    title: "Palau"
  }
  , "prokhorovka": {
    title: "Prokhorovka"
  }
  , "sands-of-time": {
    title: "Sands of Time"
  }
  , "singapore-1": {
    title: "Singapore / variant 1"
  }
  , "singapore-2": {
    title: "Singapore / variant 2"
  }
  , "slovakia-autumn": {
    title: "Slovakia / autumn"
  }
  , "slovakia-summer-online": {
    title: "Slovakia (online) / summer"
  }
  , "slovakia-summer": {
    title: "Slovakia / summer"
  }
  , "slovakia-winter-online": {
    title: "Slovakia (online) / winter"
  }
  , "slovakia-winter": {
    title: "Slovakia / winter"
  }
  , "solomon-islands-42-aug": {
    title: "Solomon Islands / 1942 / August"
  }
  , "solomon-islands-42-dec": {
    title: "Solomon Islands / 1942 / December"
  }
  , "solomon-islands-42-oct": {
    title: "Solomon Islands / 1942 / October"
  }
  , "solomon-islands-43-jul": {
    title: "Solomon Islands / 1943 / July"
  }
  , "solomon-islands-43-oct": {
    title: "Solomon Islands / 1943 / October"
  }
  , "solomon-islands-44-jan": {
    title: "Solomon Islands / 1944 / January"
  }
  , "stalingrad-summer": {
    title: "Stalingrad / summer"
  }
  , "stalingrad-winter": {
    title: "Stalingrad / winter"
  }
  , "svalbard": {
    title: "Svalbard"
  }
  , "tarawa": {
    title: "Tarawa"
  }
  , "tobruk": {
    title: "Tobruk"
  }
  , "wake": {
    title: "Wake"
  }
});

function onLocationsBrowserOpen(state) {
  var browseLocationsWnd = document.getElementById('locations-browser');
  browseLocationsWnd.classList.add("active");
  state.name = STATES.BROWSE_LOCATIONS;
  return false;
}

function locationsBrowserClose(state) {
  var browseLocationsWnd = document.getElementById('locations-browser');
  browseLocationsWnd.classList.remove("active");
}

function onLocationsBrowserClose(state) {
  locationsBrowserClose(state);
  return false;
}

function renderDistanceUnitsNames(state) {
  var names = DISTANCE_UNITS_NAMES[state.units.distance];

  var name = names.large;
  var items = document.getElementsByClassName("unit-distance-large");
  for (var i = 0; i < items.length; ++i) {
    items[i].innerText = name;
  }

  name = names.short;
  items = document.getElementsByClassName("unit-distance-short");
  for (var i = 0; i < items.length; ++i) {
    items[i].innerText = name;
  }
}

function renderTemperatureUnitsNames(state) {
  var name = TEMPERATURE_UNITS_NAMES[state.units.temperature];
  var items = document.getElementsByClassName("unit-air-temperature");
  for (var i = 0; i < items.length; ++i) {
    items[i].innerText = name;
  }
}

function renderNumber(value) {
  return value.replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

function renderInteger(value) {
  return renderNumber(value.toFixed(0));
}

function renderFloat(value) {
  return renderNumber(value.toFixed(2));
}

function renderLargeDistance(valueMeters, unitCode) {
  var value = valueMeters;

  switch(unitCode) {
    case DISTANCE_UNITS_CODES.METRIC:
      value = metersToKm(value);
      break;
    case DISTANCE_UNITS_CODES.IMPERIAL:
      value = metersToMiles(value);
      break;
  }

  return renderFloat(value);
}

function renderShortDistance(valueMeters, unitCode) {
  value = valueMeters;

  if (unitCode === DISTANCE_UNITS_CODES.IMPERIAL) {
    value = metersToFeet(value);
  }

  return renderFloat(value);
}

function renderTemperature(valueCelsius, unitCode) {
  value = valueCelsius;

  if (unitCode === TEMPERATURE_UNITS_CODES.FAHRENHEIT) {
    value = celsiusToFahrenheits(value);
  }

  return renderInteger(value);
}

function renderLocationInfoDimensions(state) {
  var dimensions = (state.activeLocation.info.dimensions || {});
  var unitCode   = state.units.distance;

  var valueContainer = document.getElementById("location-info-dim-max-x-value");
  var unitContainer  = document.getElementById("location-info-dim-max-x-unit");
  if (dimensions.maxX === null || dimensions.maxX === undefined) {
    valueContainer.innerText = VALUE_NOT_AVAILABLE;
    if (!unitContainer.classList.contains("d-invisible")) {
      unitContainer.classList.add("d-invisible");
    }
  } else {
    valueContainer.innerText = renderLargeDistance(dimensions.maxX, unitCode);
    if (unitContainer.classList.contains("d-invisible")) {
      unitContainer.classList.remove("d-invisible");
    }
  }

  valueContainer = document.getElementById("location-info-dim-max-y-value");
  unitContainer  = document.getElementById("location-info-dim-max-y-unit");
  if (dimensions.maxY === null || dimensions.maxY === undefined) {
    valueContainer.innerText = VALUE_NOT_AVAILABLE;
    if (!unitContainer.classList.contains("d-invisible")) {
      unitContainer.classList.add("d-invisible");
    }
  } else {
    valueContainer.innerText = renderLargeDistance(dimensions.maxY, unitCode);
    if (unitContainer.classList.contains("d-invisible")) {
      unitContainer.classList.remove("d-invisible");
    }
  }

  valueContainer = document.getElementById("location-info-dim-max-z-value");
  unitContainer  = document.getElementById("location-info-dim-max-z-unit");
  if (dimensions.maxZ === null || dimensions.maxZ === undefined) {
    valueContainer.innerText = VALUE_NOT_AVAILABLE;
    if (!unitContainer.classList.contains("d-invisible")) {
      unitContainer.classList.add("d-invisible");
    }
  } else {
    valueContainer.innerText = renderShortDistance(dimensions.maxZ, unitCode);
    if (unitContainer.classList.contains("d-invisible")) {
      unitContainer.classList.remove("d-invisible");
    }
  }

}

function renderLocationInfoAirPressure(state) {
  var value = (state.activeLocation.info.air || {}).pressure;
  var valueContainer = document.getElementById("location-info-air-pressure-value");
  var unitContainer  = document.getElementById("location-info-air-pressure-unit");

  if (value === null || value === undefined) {
    valueContainer.innerText = VALUE_NOT_AVAILABLE;
    if (!unitContainer.classList.contains("d-invisible")) {
      unitContainer.classList.add("d-invisible");
    }
  } else {
    valueContainer.innerText = value;
    if (unitContainer.classList.contains("d-invisible")) {
      unitContainer.classList.remove("d-invisible");
    }
  }
}

function renderLocationInfoAirTemperature(state) {
  var value    = (state.activeLocation.info.air || {}).temperature;
  var unitCode = state.units.temperature;

  var valueContainer = document.getElementById("location-info-air-temperature-value");
  var unitContainer  = document.getElementById("location-info-air-temperature-unit");

  if (value === null || value === undefined) {
    valueContainer.innerText = VALUE_NOT_AVAILABLE;
    if (!unitContainer.classList.contains("d-invisible")) {
      unitContainer.classList.add("d-invisible");
    }
  } else {
    valueContainer.innerText = renderTemperature(value, unitCode);
    if (unitContainer.classList.contains("d-invisible")) {
      unitContainer.classList.remove("d-invisible");
    }
  }
}

function onDistanceMeasurementUnitCtrlChange(state) {
  state.units.distance = (
    this.checked
    ? DISTANCE_UNITS_CODES.IMPERIAL
    : DISTANCE_UNITS_CODES.METRIC
  );
  updateWindowHash(state);
  renderDistanceUnitsNames(state);
  renderLocationInfoDimensions(state);
  return false;
}

function onTemperatureMeasurementUnitCtrlChange(state) {
  state.units.temperature = (
    this.checked
    ? TEMPERATURE_UNITS_CODES.FAHRENHEIT
    : TEMPERATURE_UNITS_CODES.CELSIUS
  );
  updateWindowHash(state);
  renderTemperatureUnitsNames(state);
  renderLocationInfoAirTemperature(state);
  return false;
}

function updateWindowHash(state) {
  var hash = ("#" + [
      state.units.distance
    , state.units.temperature
    , state.activeLocation.id
    ].join("/")
  );
  if (history.pushState) {
    history.pushState(null, null, hash);
  } else {
    window.location.hash = hash;
  }
}

function resetWindowHash(state) {
  if (state.activeLocation.id === null) {
    if (history.pushState) {
      history.pushState("", document.title, window.location.pathname);
    } else {
      window.location.href = "";
    }
  } else {
    updateWindowHash(state);
  }
}

function disposeGreetings(state) {
  var locationsBrowserOpenBtn = document.getElementById("locations-browser-open-btn")
    , locationsBrowserOpenBtnPlaceholder = document.getElementById("locations-browser-open-btn-placeholder")
    , welcomePane = document.getElementById("welcome-pane")
    , instrumentPanel = document.getElementById("instrument-panel")
    ;

  locationsBrowserOpenBtnPlaceholder.appendChild(locationsBrowserOpenBtn);
  instrumentPanel.classList.remove("d-none");
  welcomePane.remove();
  locationsBrowserOpenBtn.innerHTML = '<i class="fas fa-globe"></i>';
}

function initMap(state) {
  var data = state.activeLocation.info
    , locationTitle = document.getElementById("location-title")
    , locationName = document.getElementById("location-name")
    , locationDescription = document.getElementById("location-description")
    ;

  locationTitle.innerText = data.title || "";
  locationName.innerText  = data.name  || "";

  if (data.description) {
    if (locationDescription.classList.contains("d-none")) {
      locationDescription.classList.remove("d-none");
    }
    locationDescription.innerText = data.description;
  } else {
    if (!locationDescription.classList.contains("d-none")) {
      locationDescription.classList.add("d-none");
    }
    locationDescription.innerText = "";
  }

  renderDistanceUnitsNames(state);
  renderTemperatureUnitsNames(state);
  renderLocationInfoDimensions(state);
  renderLocationInfoAirTemperature(state);
  renderLocationInfoAirPressure(state);
}

function maybeSetDistanceUnits(state, distanceUnitsCodes) {
  if (Object.values(DISTANCE_UNITS_CODES).indexOf(distanceUnitsCodes) === -1) {
    return;
  }
  state.units.distance = distanceUnitsCodes;
}

function maybeSetTemperatureUnits(state, temperatureUnitsCodes) {
  if (Object.values(TEMPERATURE_UNITS_CODES).indexOf(temperatureUnitsCodes) === -1) {
    return;
  }
  state.units.temperature = temperatureUnitsCodes;
}

function maybeSetLocation(state, locationId) {
  var locationInfo = LOCATIONS[locationId];
  if (locationInfo === undefined) {
    return;
  }
  if (state.activeLocation.id === locationId) {
    return;
  }
  state.activeLocation.id = locationId;
  state.activeLocation.info = locationInfo;
}

function maybeSelectDistanceUnits(state, distanceUnitsCodes) {
  maybeSetDistanceUnits(state, distanceUnitsCodes);
  var ctrl = document.getElementById("distance-measurement-unit-ctrl");
  ctrl.checked = (state.units.distance === DISTANCE_UNITS_CODES.IMPERIAL);
}

function maybeSelectTemperatureUnits(state, temperatureUnitsCodes) {
  maybeSetTemperatureUnits(state, temperatureUnitsCodes);
  var ctrl = document.getElementById("temperature-measurement-unit-ctrl");
  ctrl.checked = (state.units.temperature === TEMPERATURE_UNITS_CODES.FAHRENHEIT);
}

function maybeSelectLocation(state, locationId) {
  var oldLocationId = state.activeLocation.id;
  maybeSetLocation(state, locationId);
  if (state.activeLocation.id === null) {
    state.name = STATES.INITIAL;
  } else {
    state.name = STATES.USE_MAP;
    if (oldLocationId !== state.activeLocation.id) {
      if (oldLocationId === null) {
        disposeGreetings(state);
        document.getElementById("viewport").classList.remove("d-none");
      }
      initMap(state);
    }
  }
}

function onLocationsListItemSelect(state) {
  var locationId = this.getAttribute("href").substring(1);
  maybeSelectLocation(state, locationId);
  resetWindowHash(state);
  locationsBrowserClose(state);
  return false;
}

function maybeSelectInitialParams(state) {
  var hash = window.location.hash;
  if (!hash) {
    return;
  }
  hash = hash.substring(1);

  var params = hash.split("/");
  if (params.length !== 3) {
    return;
  }

  var distanceUnitsCodes = params[0]
    , temperatureUnitsCodes = params[1]
    , locationId = params[2]
    ;

  maybeSelectDistanceUnits(state, distanceUnitsCodes);
  maybeSelectTemperatureUnits(state, temperatureUnitsCodes);
  maybeSelectLocation(state, locationId);
  resetWindowHash(state);
}

function initAll() {
  var state = {
      name: STATES.INITIAL
    , activeLocation: {
        id: null
      , info: null
    }
    , units: {
        distance: DISTANCE_UNITS_CODES.METRIC
      , temperature: TEMPERATURE_UNITS_CODES.CELSIUS
    }
  };

  var locationsBrowserOpenBtn = document.getElementById("locations-browser-open-btn");
  locationsBrowserOpenBtn.onclick = onLocationsBrowserOpen.bind(locationsBrowserOpenBtn, state);

  var locationsBrowserCloseBtn = document.getElementById("locations-browser-close-btn");
  locationsBrowserCloseBtn.onclick = onLocationsBrowserClose.bind(locationsBrowserCloseBtn, state);

  var locationsListContainer = document.getElementById("locations-list");
  var locationsListItems = locationsListContainer.getElementsByClassName("locations-list-item");
  for (var i = 0; i < locationsListItems.length; ++i) {
    var locationsListItem = locationsListItems[i];
    locationsListItem.onclick = onLocationsListItemSelect.bind(locationsListItem, state);
  }

  var distanceMeasurementUnitCtrl = document.getElementById("distance-measurement-unit-ctrl");
  distanceMeasurementUnitCtrl.onchange = onDistanceMeasurementUnitCtrlChange.bind(distanceMeasurementUnitCtrl, state);

  var temperatureMeasurementUnitCtrl = document.getElementById("temperature-measurement-unit-ctrl");
  temperatureMeasurementUnitCtrl.onchange = onTemperatureMeasurementUnitCtrlChange.bind(temperatureMeasurementUnitCtrl, state);

  maybeSelectInitialParams(state);
}


document.addEventListener("DOMContentLoaded", function(event) {
  initAll();
});
