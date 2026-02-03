import {
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  Stack,
  Typography,
  Fade,
  Grid,
} from "@mui/material"
import { useState, useEffect } from "react"

import { AutoCompleteField } from "@/components/forms/AutoCompleteField"
import { MetarInput } from "@/components/forms/MetarInput"
import { InputModeToggle } from "@/components/forms/InputModeToggle"
import { useGetApiMetarIcao, usePostApiMetarDecode } from "@/api/generated/metar/metar"
import { MainWeatherCard } from "@/components/weather/MainWeatherCard"
import { WeatherMetricCard } from "@/components/weather/WeatherMetricCard"
import { CloudLayersCard } from "@/components/weather/CloudLayersCard"
import { useGetApiAirports } from "@/api/generated/airports/airports"
import type { DecodedMetarDto } from "@/api/generated/model"
import { theme } from "@/theme/theme"
import { getWeatherIconClass } from "@/utils/weatherIconMapper"

type InputMode = "icao" | "metar"

export function MetarPage() {
  const [inputMode, setInputMode] = useState<InputMode>("icao")
  const [icaoCode, setIcaoCode] = useState("")
  const [metarString, setMetarString] = useState("")
  const [searchIcao, setSearchIcao] = useState("")
  const [decodedWeatherData, setDecodedWeatherData] = useState<DecodedMetarDto | null>(null)

  // GET Airports Data
  const { data: airports = [], isLoading: isLoadingAirports } = useGetApiAirports({ limit: 150 })

  // GET METAR String Data
  const {
    data: metarData,
    isLoading: isLoadingMetar,
    isError: isMetarError,
    error: metarError,
    refetch: refetchMetar,
  } = useGetApiMetarIcao(searchIcao, {
    query: { enabled: false },
  })

  // POST to decode METAR
  const {
    mutate: decodeMetar,
    isPending: isDecoding,
    isError: isDecodeError,
    error: decodeError,
  } = usePostApiMetarDecode({
    mutation: {
      onSuccess: data => {
        setDecodedWeatherData(data)
        console.log("Decoded METAR Data:", data)
      },
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputMode === "icao" && icaoCode.length === 4) {
      setSearchIcao(icaoCode.toUpperCase())
      setTimeout(() => refetchMetar(), 0)
    } else if (inputMode === "metar" && metarString.trim().length > 0) {
      decodeMetar({ data: metarString })
    }
  }

  useEffect(() => {
    if (metarData?.rawMetar) {
      decodeMetar({ data: metarData.rawMetar })
    }
  }, [metarData?.rawMetar, decodeMetar])

  const isError = isMetarError || isDecodeError
  const error = metarError || decodeError
  const errorMessage = isError
    ? (error?.response?.data as { message?: string })?.message ||
      error?.message ||
      "Failed to fetch METAR data"
    : undefined

  const isLoading = isLoadingMetar || isDecoding

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
                    helperText={errorMessage}
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

            {decodedWeatherData && (
              <Fade in timeout={600}>
                <Box>
                  <MainWeatherCard
                    temperature={
                      decodedWeatherData.temperature
                        ? decodedWeatherData.temperature.temperature || "N/A"
                        : "N/A"
                    }
                    iconClass={getWeatherIconClass(decodedWeatherData)}
                  />

                  {/* <StationHeader
                    station={mockWeatherData.station}
                    stationName={mockWeatherData.stationName}
                    flightCategory={mockWeatherData.flightCategory}
                    observationTime={mockWeatherData.observationTime}
                    rawMetar={mockWeatherData.rawMetar}
                    getFlightCategoryColor={getFlightCategoryColor}
                  />*/}

                  <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid size={{ xs: 6, md: 3 }}>
                      <WeatherMetricCard
                        weatherIconClass="wi wi-thermometer"
                        label="Temperature"
                        value={`${
                          decodedWeatherData.temperature
                            ? decodedWeatherData.temperature.temperature || "N/A"
                            : "N/A"
                        }°C`}
                        subtitle={`Dewpoint: ${
                          decodedWeatherData.temperature
                            ? decodedWeatherData.temperature.dewPoint || "N/A"
                            : "N/A"
                        }°C`}
                        color={theme.weather.temperature}
                        timeout={700}
                      />
                    </Grid>
                    <Grid size={{ xs: 6, md: 3 }}>
                      <WeatherMetricCard
                        weatherIconClass="wi wi-strong-wind"
                        label="Wind"
                        value={`${decodedWeatherData.wind ? decodedWeatherData.wind.speed || "N/A" : "N/A"} KT`}
                        subtitle={`Direction: ${decodedWeatherData.wind ? decodedWeatherData.wind.direction || "N/A" : "N/A"}°`}
                        color={theme.weather.wind}
                        timeout={850}
                      />
                    </Grid>
                    <Grid size={{ xs: 6, md: 3 }}>
                      <WeatherMetricCard
                        weatherIconClass="wi wi-fog"
                        label="Visibility"
                        value={
                          decodedWeatherData.visibility && decodedWeatherData.visibility !== 0
                            ? `${decodedWeatherData.visibility} SM`
                            : "N/A"
                        }
                        color={theme.weather.visibility}
                        timeout={1000}
                      />
                    </Grid>
                    <Grid size={{ xs: 6, md: 3 }}>
                      <WeatherMetricCard
                        weatherIconClass="wi wi-thermometer-exterior"
                        label="Pressure"
                        value={
                          decodedWeatherData.airPressure && decodedWeatherData.airPressure !== "-"
                            ? `${decodedWeatherData.airPressure} hPa`
                            : "N/A"
                        }
                        color={theme.weather.pressure}
                        timeout={1150}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <CloudLayersCard
                        clouds={
                          decodedWeatherData.clouds
                            ? decodedWeatherData.clouds.map(cloud => ({
                              coverage: cloud.cloudCover || "N/A",
                              altitude: cloud.cloudHeight || 0,
                              type:
                                  cloud.cloudType && cloud.cloudType !== "-"
                                    ? cloud.cloudType
                                    : "Unknown",
                            }))
                            : []
                        }
                        color={theme.weather.clouds}
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
