export var ApplicationStates = Object.freeze({
  LOADING: "loading",
  SELECTING_LOCATIONS: "selectingLocations",
  BROWSING_LOCATIONS: "browsingLocations",
  USING_MAP: "usingMap",
});


export var Seasons = Object.freeze({
  SPRING: "spring",
  SUMMER: "summer",
  AUTUMN: "autumn",
  WINTER: "winter",
});


export var TagCategories = Object.freeze({
  NEW: "new",
});


export var Theaters = Object.freeze([{
  id:    "eastern-europe",
  title: "Eastern Europe",
  priority: 1,
  locations: [{
    id:    "balaton",
    title: "Balaton",
    variants: [{
      id:     "summer",
      title:  "summer",
      season: Seasons.SUMMER,
    }, {
      id:     "winter",
      title:  "winter",
      season: Seasons.WINTER,
    }],
  }, {
    id:    "berlin",
    title: "Berlin",
    dimensions: {
      maxX: 195200,
      maxY: 83200,
      maxZ: 441,
    },
    zoom: {
      min: 0,
      max: 3
    },
    variants: [{
      id:     "default",
      title:  undefined,
      season: Seasons.SUMMER,
      air: {
        temperature: undefined,
        pressure:    undefined,
      },
      layers: {
        primary: {
          regular: {formats: ["png"]},
          preview: {formats: ["png"]},
        },
        heights_grey: {
          regular: {formats: ["png"]},
        },
        heights_color: {
          regular: {formats: ["webp", "jpg"]},
          preview: {formats: ["png"]},
        },
      },
    }],
  }, {
    id:    "bessarabia",
    title: "Bessarabia",
    variants: [{
      id:    "full",
      title: "Full",
    }, {
      id:    "iasi",
      title: "Iasi",
    }, {
      id:    "odessa",
      title: "Odessa",
    }],
  }, {
    id:    "black-sea",
    title: "Black Sea",
    variants: [{
      id:    "default",
      title: undefined,
    }],
  }, {
    id:    "crimea",
    title: "Crimea",
    variants: [{
      id:    "default",
      title: undefined,
    }],
  }, {
    id:    "donbass",
    title: "Donbass",
    tags: [{
      category: TagCategories.NEW,
      text: "4.14"
    }],
    variants: [{
      id:    "spring",
      title: "spring",
      season: Seasons.SPRING,
    }, {
      id:    "summer",
      title: "summer",
      season: Seasons.SUMMER,
    }, {
      id:    "autumn",
      title: "autumn",
      season: Seasons.AUTUMN,
    }, {
      id:    "winter",
      title: "winter",
      season: Seasons.WINTER,
    }],
  }, {
    id:    "gulf-of-finland",
    title: "Gulf of Finland",
    variants: [{
      id:     "summer",
      title:  "summer",
      season: Seasons.SUMMER,
    }, {
      id:     "winter",
      title:  "winter",
      season: Seasons.WINTER,
    }],
  }, {
    id:    "kurland",
    title: "Kurland",
    variants: [{
      id:     "default",
      title:  "default",
    }, {
      id:     "online",
      title:  "online",
    }],
  }, {
    id:    "kursk",
    title: "Kursk",
    variants: [{
      id:    "default",
      title: undefined,
    }],
  }, {
    id:    "kyiv",
    title: "Kyiv",
    variants: [{
      id:    "default",
      title: undefined,
    }],
  }, {
    id:    "lviv",
    title: "Lviv",
    variants: [{
      id:    "default",
      title: undefined,
    }],
  }, {
    id:    "moscow",
    title: "Moscow",
    tags: [{
      category: TagCategories.NEW,
      text: "4.14"
    }],
    variants: [{
      id:    "spring",
      title: "spring",
      season: Seasons.SPRING,
    }, {
      id:    "summer",
      title: "summer",
      season: Seasons.SUMMER,
    }, {
      id:    "autumn",
      title: "autumn",
      season: Seasons.AUTUMN,
    }, {
      id:    "winter",
      title: "winter",
      season: Seasons.WINTER,
    }],
  }, {
    id:    "moscow-region",
    title: "Moscow Region",
    variants: [{
      id:     "summer",
      title:  "summer",
      season: Seasons.SUMMER,
    }, {
      id:     "winter",
      title:  "winter",
      season: Seasons.WINTER,
    }],
  }, {
    id:    "murmansk",
    title: "Murmansk",
    variants: [{
      id:     "summer",
      title:  "summer",
      season: Seasons.SUMMER,
    }, {
      id:     "winter",
      title:  "winter",
      season: Seasons.WINTER,
    }],
  }, {
    id:    "prokhorovka",
    title: "Prokhorovka",
    variants: [{
      id:    "default",
      title: undefined,
    }],
  }, {
    id:    "slovakia",
    title: "Slovakia",
    variants: [{
      id:    "summer",
      title: "summer",
      season: Seasons.SUMMER,
    }, {
      id:    "autumn",
      title: "autumn",
      season: Seasons.AUTUMN,
    }, {
      id:    "winter",
      title: "winter",
      season: Seasons.WINTER,
    }, {
      id:    "summer-online",
      title: "online summer",
      season: Seasons.SUMMER,
    }, {
      id:    "winter-online",
      title: "online winter",
      season: Seasons.WINTER,
    }],
  }, {
    id:    "smolensk",
    title: "Smolensk",
    variants: [{
      id:    "default",
      title: undefined,
    }],
  }, {
    id:    "stalingrad",
    title: "Stalingrad",
    variants: [{
      id:     "summer",
      title:  "summer",
      season: Seasons.SUMMER,
    }, {
      id:     "winter",
      title:  "winter",
      season: Seasons.WINTER,
    }],
  }],
}, {
  id:    "pacific",
  title: "Pacific",
  priority: 2,
  locations: [{
    id:    "chichijima",
    title: "Chichijima",
    variants: [{
      id:    "default",
      title: undefined,
    }],
  }, {
    id:    "coral-sea",
    title: "Coral Sea",
    variants: [{
      id:    "online-1",
      title: "Online 1",
    }, {
      id:    "online-2",
      title: "Online 2",
    }],
  }, {
    id:    "guadalcanal",
    title: "Guadalcanal",
    variants: [{
      id:    "default",
      title: "default",
    }, {
      id:    "early",
      title: "Early",
    }],
  }, {
    id:    "hawaii",
    title: "Hawaii",
    variants: [{
      id:    "default",
      title: undefined,
    }],
  }, {
    id:    "iwo-jima",
    title: "Iwo Jima",
    variants: [{
      id:    "default",
      title: undefined,
    }],
  }, {
    id:    "kyushu",
    title: "Kyushu",
    variants: [{
      id:    "default",
      title: undefined,
    }],
  }, {
    id:    "mariana-islands",
    title: "Mariana Islands",
    variants: [{
      id:    "default",
      title: undefined,
    }],
  }, {
    id:    "midway",
    title: "Midway",
    variants: [{
      id:    "default",
      title: undefined,
    }],
  }, {
    id:    "new-guinea",
    title: "New Guinea",
    variants: [{
      id:    "default",
      title: undefined,
    }],
  }, {
    id:    "nbng",
    title: "New Britain & New Guinea",
    variants: [{
      id:    "43-mar",
      title: "1943 March",
    }, {
      id:    "43-sep",
      title: "1943 September",
    }, {
      id:    "44-jan",
      title: "1944 January",
    }, {
      id:    "44-jun",
      title: "1944 June",
    }],
  }, {
    id:    "okinawa",
    title: "Okinawa",
    variants: [{
      id:    "default",
      title: undefined,
    }],
  }, {
    id:    "pacific-islands",
    title: "Pacific Islands",
    tags: [{
      category: TagCategories.NEW,
      text: "4.14"
    }],
    variants: [{
      id:    "default",
      title: undefined,
    }],
  }, {
    id:    "palau",
    title: "Palau",
    variants: [{
      id:    "default",
      title: undefined,
    }],
  }, {
    id:    "singapore",
    title: "Singapore",
    variants: [{
      id:    "v1",
      title: "Variant 1",
    }, {
      id:    "v2",
      title: "Variant 2",
    }],
  }, {
    id:    "solomon-islands",
    title: "Solomon Islands",
    variants: [{
      id:    "42-aug",
      title: "1942 August",
    }, {
      id:    "42-oct",
      title: "1942 October",
    }, {
      id:    "42-dec",
      title: "1942 December",
    }, {
      id:    "43-jul",
      title: "1943 July",
    }, {
      id:    "43-oct",
      title: "1943 October",
    }, {
      id:    "44-jan",
      title: "1944 January",
    }],
  }, {
    id:    "tarawa",
    title: "Tarawa",
    variants: [{
      id:    "default",
      title: undefined,
    }],
  }, {
    id:    "wake",
    title: "Wake",
    variants: [{
      id:    "default",
      title: undefined,
    }],
  }],
}, {
  id:    "europe",
  title: "Europe",
  priority: 3,
  locations: [{
    id:    "ardennes",
    title: "Ardennes",
    variants: [{
      id:     "summer",
      title:  "summer",
      season: Seasons.SUMMER,
    }, {
      id:     "winter",
      title:  "winter",
      season: Seasons.WINTER,
    }],
  }, {
    id:    "normandy",
    title: "Normandy",
    variants: [{
      id:     "v1",
      title:  "Variant 1",
    }, {
      id:     "v2",
      title:  "Variant 2",
    }, {
      id:     "v3",
      title:  "Variant 3",
    }],
  }, {
    id:    "norway",
    title: "Norway",
    variants: [{
      id:    "default",
      title: undefined,
    }],
  }, {
    id:    "svalbard",
    title: "Svalbard",
    variants: [{
      id:    "default",
      title: undefined,
    }],
  }],
}, {
  id: "mediterranean",
  title: "Mediterranean",
  priority: 3,
  locations: [{
    id:    "italy",
    title: "Italy",
    variants: [{
      id:    "default",
      title: undefined,
    }],
  }, {
    id:    "mediterranean",
    title: "Mediterranean",
    variants: [{
      id:     "default",
      title:  "default",
    }, {
      id:     "light",
      title:  "Light",
    }],
  }, {
    id:    "tobruk",
    title: "Tobruk",
    variants: [{
      id:    "default",
      title: undefined,
    }],
  }],
}, {
  id: "southeast-asia",
  title: "Southeast Asia",
  priority: 3,
  locations: [{
    id:    "burma",
    title: "Burma",
    variants: [{
      id:    "default",
      title: undefined,
    }],
  }, {
    id:    "khalkhyn-gol",
    title: "Khalkhyn Gol",
    variants: [{
      id:     "default",
      title:  "default",
    }, {
      id:     "39-summer",
      title:  "1939 summer",
      tags: [{
        category: TagCategories.NEW,
        text: "4.14"
      }],
    }],
  }, {
    id:    "manchuria",
    title: "Manchuria",
    variants: [{
      id:    "default",
      title: undefined,
    }],
  }],
}, {
  id:    "other",
  title: "Other",
  priority: Number.MAX_SAFE_INTEGER,
  locations: [{
    id: "arctic",
    title: "Arctic",
    tags: [{
      category: TagCategories.NEW,
      text: "4.14"
    }],
    variants: [{
      id: "41-summer",
      title: "1941 summer",
    }, {
      id: "41-winter",
      title: "1941 winter",
    }, {
      id: "42-44-summer",
      title: "1942-44 summer",
    }, {
      id: "42-44-winter",
      title: "1942-44 winter",
    }],
  }, {
    id:    "franz-josef-land",
    title: "Franz Josef Land",
    tags: [{
      category: TagCategories.NEW,
      text: "4.14"
    }],
    variants: [{
      id:    "default",
      title: undefined,
    }],
  }, {
    id:    "sands-of-time",
    title: "Sands of Time",
    variants: [{
      id:    "default",
      title: undefined,
    }],
  }, {
    id:    "online-1",
    title: "Online 1",
    variants: [{
      id:    "summer",
      title: "summer",
    }, {
      id:    "winter",
      title: "winter",
    }, {
      id:    "islands",
      title: "islands",
    }],
  }, {
    id:    "online-2",
    title: "Online 2",
    variants: [{
      id:    "summer",
      title: "summer",
    }, {
      id:    "winter",
      title: "winter",
    }],
  }, {
    id:    "online-3",
    title: "Online 3",
    variants: [{
      id:    "default",
      title: undefined,
    }],
  }, {
    id:    "online-4",
    title: "Online 4 (mountains)",
    variants: [{
      id:    "default",
      title: undefined,
    }],
  }, {
    id:    "online-5",
    title: "Online 5",
    variants: [{
      id:    "default",
      title: undefined,
    }],
  }, {
    id:    "online-6",
    title: "Online 6 (islands)",
    variants: [{
      id:    "default",
      title: undefined,
    }],
  }, {
    id:    "online-7",
    title: "Online 7 (islands)",
    variants: [{
      id:    "default",
      title: undefined,
    }],
  }, {
    id:    "online-8",
    title: "Online 8 (Pacific islands)",
    variants: [{
      id:    "default",
      title: undefined,
    }],
  }, {
    id:    "online-8a",
    title: "Online 8a (Pacific islands)",
    variants: [{
      id:    "default",
      title: undefined,
    }],
  }, {
    id:    "online-9a",
    title: "Online 9a (empty)",
    variants: [{
      id:    "summer",
      title: "summer",
    }, {
      id:    "winter",
      title: "winter",
    }],
  }, {
    id:    "online-9b",
    title: "Online 9b (empty)",
    variants: [{
      id:    "summer",
      title: "summer",
    }, {
      id:    "winter",
      title: "winter",
    }],
  }, {
    id:    "online-10a",
    title: "Online 10a (empty)",
    variants: [{
      id:    "summer",
      title: "summer",
    }, {
      id:    "winter",
      title: "winter",
    }],
  }, {
    id:    "online-10b",
    title: "Online 10b (empty)",
    variants: [{
      id:    "summer",
      title: "summer",
    }, {
      id:    "winter",
      title: "winter",
    }],
  }, {
    id:    "online-11a",
    title: "Online 11a (empty)",
    variants: [{
      id:    "default",
      title: undefined,
    }],
  }, {
    id:    "online-11b",
    title: "Online 11b (empty)",
    variants: [{
      id:    "default",
      title: undefined,
    }],
  }],
}]);
