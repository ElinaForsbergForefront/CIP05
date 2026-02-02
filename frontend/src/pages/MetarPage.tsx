import { Box, Button, CircularProgress, Container, Paper, Stack, Typography } from "@mui/material"
import { useState } from "react"

import { AutoCompleteField } from "@/components/forms/AutoCompleteField"
import { MetarInput } from "@/components/forms/MetarInput"
import { InputModeToggle } from "@/components/forms/InputModeToggle"
import { useGetApiMetarIcao } from "@/api/generated/metar/metar"
import { useGetApiAirports } from "@/api/generated/airports/airports"

type InputMode = "icao" | "metar"

export function MetarPage() {
  const [inputMode, setInputMode] = useState<InputMode>("icao")
  const [icaoCode, setIcaoCode] = useState("")
  const [metarString, setMetarString] = useState("")
  const [searchIcao, setSearchIcao] = useState("")

  // GET Airports Data
  const { data: airports = [], isLoading: isLoadingAirports } = useGetApiAirports({ limit: 150 })

  // GET METAR Data
  const { data, isLoading, isError, error, refetch } = useGetApiMetarIcao(searchIcao, {
    query: {
      enabled: false,
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputMode === "icao" && icaoCode.length === 4) {
      setSearchIcao(icaoCode.toUpperCase())
      setTimeout(() => refetch(), 0)
    }
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
            {/* Toggle between ICAO and METAR input */}
            <InputModeToggle inputMode={inputMode} setInputMode={setInputMode} />

            {/* Input Form */}
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
            <>
              {data && (
                <Paper sx={{ p: 2, bgcolor: "success.light" }}>
                  <Typography variant="h6" gutterBottom>
                    METAR Result for {searchIcao}:
                  </Typography>
                  <Typography
                    component="pre"
                    sx={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
                  >
                    {JSON.stringify(data, null, 2)}
                  </Typography>
                </Paper>
              )}
            </>
          </Stack>
        </Paper>
      </Box>
    </Container>
  )
}
