import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material"
import { useState } from "react"
import SearchIcon from "@mui/icons-material/Search"
import ContentPasteIcon from "@mui/icons-material/ContentPaste"

type InputMode = "icao" | "metar"

export function MetarPage() {
  const [inputMode, setInputMode] = useState<InputMode>("icao")
  const [icaoCode, setIcaoCode] = useState("")
  const [metarString, setMetarString] = useState("")

  const handleModeChange = (_event: React.MouseEvent<HTMLElement>, newMode: InputMode | null) => {
    if (newMode !== null) {
      setInputMode(newMode)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Connect to backend
    console.log(
      inputMode === "icao" ? `Fetching METAR for: ${icaoCode}` : `Parsing METAR: ${metarString}`
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

        <Paper sx={{ p: 3 }}>
          <Stack spacing={3}>
            {/* Toggle between ICAO and METAR input */}
            <ToggleButtonGroup value={inputMode} exclusive onChange={handleModeChange} fullWidth>
              <ToggleButton value="icao">
                <SearchIcon sx={{ mr: 1 }} />
                ICAO Code
              </ToggleButton>
              <ToggleButton value="metar">
                <ContentPasteIcon sx={{ mr: 1 }} />
                Paste METAR
              </ToggleButton>
            </ToggleButtonGroup>

            {/* Input Form */}
            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={2}>
                {inputMode === "icao" ? (
                  <TextField
                    label="ICAO Code"
                    placeholder="e.g. ESSA, ESSB"
                    value={icaoCode}
                    onChange={e => setIcaoCode(e.target.value.toUpperCase().slice(0, 4))}
                    fullWidth
                    slotProps={{
                      htmlInput: { maxLength: 4 },
                    }}
                    helperText="Enter a 4-letter airport code"
                  />
                ) : (
                  <TextField
                    label="METAR String"
                    placeholder="e.g. METAR ESSA 121520Z 36010KT 9999 FEW040 05/M01 Q1023"
                    value={metarString}
                    onChange={e => setMetarString(e.target.value.toUpperCase())}
                    fullWidth
                    multiline
                    rows={3}
                    helperText="Paste a full METAR string"
                  />
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
