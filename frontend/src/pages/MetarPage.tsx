import { Box, Button, Container, Paper, Stack, Typography } from "@mui/material"
import { useState } from "react"

import icaoCodeOptions from "../lib/icao_mock"
import { AutoCompleteField } from "@/components/forms/AutocompleteField"
import { MetarInput } from "@/components/forms/MetarInput"
import { InputModeToggle } from "@/components/forms/InputModeToggle"

type InputMode = "icao" | "metar"

export function MetarPage() {
  const [inputMode, setInputMode] = useState<InputMode>("icao")
  const [icaoCode, setIcaoCode] = useState("")
  const [metarString, setMetarString] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Connect to backend
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
                    icaoCodeOptions={icaoCodeOptions}
                    icaoCode={icaoCode}
                    setIcaoCode={setIcaoCode}
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
                  Decode METAR
                </Button>
              </Stack>
            </Box>
          </Stack>
        </Paper>
      </Box>
    </Container>
  )
}
