import {
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  Stack,
  Typography,
  useTheme,
  Fade,
  Grid,
} from "@mui/material"
import { useState } from "react"

import { AutoCompleteField } from "@/components/forms/AutoCompleteField"
import { MetarInput } from "@/components/forms/MetarInput"
import { InputModeToggle } from "@/components/forms/InputModeToggle"
import { useGetApiMetarIcao } from "@/api/generated/metar/metar"
import { StationHeader } from "@/components/weather/StationHeader"
import { MainWeatherCard } from "@/components/weather/MainWeatherCard"
import { WeatherMetricCard } from "@/components/weather/WeatherMetricCard"
import { CloudLayersCard } from "@/components/weather/CloudLayersCard"
import { HumidityWindCard } from "@/components/weather/HumidityWindCard"
import { useGetApiAirports } from "@/api/generated/airports/airports"

type InputMode = "icao" | "metar"

export function MetarPage() {
  const [inputMode, setInputMode] = useState<InputMode>("icao")
  const [icaoCode, setIcaoCode] = useState("")
  const [metarString, setMetarString] = useState("")
  const [searchIcao, setSearchIcao] = useState("")

  // GET Airports Data
  const { data: airports = [], isLoading: isLoadingAirports } = useGetApiAirports({ limit: 150 })
  const [showResults, setShowResults] = useState(false)
  const theme = useTheme()

  const { data, isLoading, isError, error, refetch } = useGetApiMetarIcao(searchIcao, {
    query: { enabled: false },
  })

  console.log(data)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputMode === "icao" && icaoCode.length === 4) {
      setSearchIcao(icaoCode.toUpperCase())
      setShowResults(true)
      setTimeout(() => refetch(), 0)
    }
  }

  const getFlightCategoryColor = (category: string) => {
    return (
      theme.weather.flightCategories[category as keyof typeof theme.weather.flightCategories] ||
      "#757575"
    )
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom textAlign="center">
          METAR Decoder
        </Typography>
        <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ mb: 4 }}>
          Enter an ICAO code or paste a METAR string to decode weather information
        </Typography>

        <Paper
          sx={{
            p: 3,
            borderRadius: 2,
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.95) 100%)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
          }}
          elevation={3}
        >
          <Stack spacing={3}>
            <InputModeToggle inputMode={inputMode} setInputMode={setInputMode} />
            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={2}>
                {inputMode === "icao" ? (
                  <AutoCompleteField
                    airports={airports}
                    icaoCode={icaoCode}
                    setIcaoCode={setIcaoCode}
                    error={isError}
                    helperText={
                      isError ? error?.message || "Failed to fetch METAR data" : undefined
                    }
                    isLoading={isLoadingAirports}
                  />
                ) : (
                  <MetarInput metarString={metarString} setMetarString={setMetarString} />
                )}

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  disabled={
                    inputMode === "icao" ? icaoCode.length !== 4 : metarString.trim().length === 0
                  }
                >
                  {isLoading ? <CircularProgress size={24} color="inherit" /> : "Decode METAR"}
                </Button>
              </Stack>
            </Box>

            {showResults && (
              <Fade in timeout={600}>
                <Box>
                  <StationHeader
                    station={mockWeatherData.station}
                    stationName={mockWeatherData.stationName}
                    flightCategory={mockWeatherData.flightCategory}
                    observationTime={mockWeatherData.observationTime}
                    rawMetar={mockWeatherData.rawMetar}
                    getFlightCategoryColor={getFlightCategoryColor}
                  />

                  <MainWeatherCard
                    temperature={mockWeatherData.temperature.value}
                    conditions={mockWeatherData.conditions}
                    feelsLike={mockWeatherData.temperature.fahrenheit}
                    iconPath="/src/assets/weathericons/wi-day-cloudy.svg"
                  />

                  <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid size={{ xs: 6, md: 3 }}>
                      <WeatherMetricCard
                        weatherIconClass="wi wi-thermometer"
                        label="Temperature"
                        value={`${mockWeatherData.temperature.value}°C`}
                        subtitle={`Dewpoint: ${mockWeatherData.dewpoint.value}°C`}
                        color={theme.weather.temperature}
                        timeout={700}
                      />
                    </Grid>
                    <Grid size={{ xs: 6, md: 3 }}>
                      <WeatherMetricCard
                        weatherIconClass="wi wi-strong-wind"
                        label="Wind"
                        value={`${mockWeatherData.wind.speed} KT`}
                        subtitle={`${mockWeatherData.wind.direction}° ${mockWeatherData.wind.directionText} • Gusts: ${mockWeatherData.wind.gust} KT`}
                        color={theme.weather.wind}
                        timeout={850}
                      />
                    </Grid>
                    <Grid size={{ xs: 6, md: 3 }}>
                      <WeatherMetricCard
                        weatherIconClass="wi wi-fog"
                        label="Visibility"
                        value={`${mockWeatherData.visibility.value} SM`}
                        subtitle={mockWeatherData.visibility.description}
                        color={theme.weather.visibility}
                        timeout={1000}
                      />
                    </Grid>
                    <Grid size={{ xs: 6, md: 3 }}>
                      <WeatherMetricCard
                        weatherIconClass="wi wi-barometer"
                        label="Pressure"
                        value={`${mockWeatherData.pressure.value}`}
                        subtitle={`${mockWeatherData.pressure.hpa} hPa`}
                        color={theme.weather.pressure}
                        timeout={1150}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <CloudLayersCard
                        clouds={mockWeatherData.clouds}
                        color={theme.weather.clouds}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <HumidityWindCard
                        humidity={mockWeatherData.humidity}
                        windDirection={mockWeatherData.wind.direction}
                        windDirectionText={mockWeatherData.wind.directionText}
                        humidityColor={theme.weather.humidity}
                        windColor={theme.weather.wind}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Fade>
            )}
          </Stack>
        </Paper>
      </Box>
    </Container>
  )
}
