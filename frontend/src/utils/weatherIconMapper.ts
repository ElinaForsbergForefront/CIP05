import type { DecodedMetarDto } from "@/api/generated/model"

/**
 * Maps METAR weather data to a weather-icons class name.
 * @see https://erikflowers.github.io/weather-icons/
 */
export function getWeatherIconClass(data: DecodedMetarDto | null): string {
  if (!data) return "wi-na"

  const weather = data.weather?.toUpperCase() || ""
  const clouds = data.clouds || []

  // Check weather phenomena first (precipitation, etc.)
  if (weather.includes("TS")) return "wi-thunderstorm"
  if (weather.includes("SN") || weather.includes("SG")) return "wi-snow"
  if (weather.includes("RA") || weather.includes("DZ")) return "wi-rain"
  if (weather.includes("FZ")) return "wi-snowflake-cold" // Freezing
  if (weather.includes("FG")) return "wi-fog"
  if (weather.includes("BR")) return "wi-fog" // Mist
  if (weather.includes("HZ")) return "wi-dust"
  if (weather.includes("GR") || weather.includes("GS")) return "wi-hail"

  // Check cloud coverage
  const maxCoverage = getMaxCloudCoverage(clouds)

  switch (maxCoverage) {
  case "OVC":
    return "wi-cloudy"
  case "BKN":
    return "wi-day-cloudy-high"
  case "SCT":
    return "wi-day-cloudy"
  case "FEW":
    return "wi-day-sunny-overcast"
  case "CLR":
  case "SKC":
  case "NCD":
  case "NSC":
  default:
    return "wi-day-sunny"
  }
}

function getMaxCloudCoverage(clouds: { cloudCover?: string | null }[]): string | null {
  const coveragePriority = ["OVC", "BKN", "SCT", "FEW", "CLR", "SKC", "NCD", "NSC"]

  for (const coverage of coveragePriority) {
    if (clouds.some(c => c.cloudCover?.toUpperCase() === coverage)) {
      return coverage
    }
  }

  return null
}
