export const mockWeatherData = {
  station: "KJFK",
  stationName: "John F. Kennedy International Airport",
  observationTime: "23 Jan 2026, 18:51 UTC",
  rawMetar: "KJFK 231851Z 27015G25KT 10SM FEW050 SCT250 22/14 A3012 RMK AO2",
  temperature: {
    value: 22,
    unit: "°C",
    fahrenheit: 72,
  },
  dewpoint: {
    value: 14,
    unit: "°C",
    fahrenheit: 57,
  },
  wind: {
    direction: 270,
    speed: 15,
    gust: 25,
    unit: "KT",
    directionText: "W",
  },
  visibility: {
    value: 10,
    unit: "SM",
    description: "Excellent",
  },
  clouds: [
    { coverage: "FEW", altitude: 5000, type: "Few clouds" },
    { coverage: "SCT", altitude: 25000, type: "Scattered clouds" },
  ],
  pressure: {
    value: 30.12,
    unit: "inHg",
    hpa: 1020,
  },
  humidity: 62,
  conditions: "Partly Cloudy",
  flightCategory: "VFR",
}
