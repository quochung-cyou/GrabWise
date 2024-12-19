export const MAP_STYLES = {
    light: "mapbox://styles/mapbox/light-v11",
    streets: "mapbox://styles/mapbox/streets-v12",
    satellite: "mapbox://styles/mapbox/satellite-streets-v12",
  } as const;
  export const routeLayer = {
    id: "route",
    type: "line",
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
    paint: {
      "line-color": "#0EA5E9",
      "line-width": 4,
      "line-opacity": 0.8,
    },
  } as const;