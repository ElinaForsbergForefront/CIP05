import { ToggleButton, ToggleButtonGroup } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import ContentPasteIcon from "@mui/icons-material/ContentPaste"

type InputMode = "icao" | "metar"

interface InputModeToggleProps {
  inputMode: string
  setInputMode: (mode: InputMode) => void
}

export const InputModeToggle = ({ inputMode, setInputMode }: InputModeToggleProps) => {
  const handleModeChange = (_event: React.MouseEvent<HTMLElement>, newMode: InputMode | null) => {
    if (newMode !== null) {
      setInputMode(newMode)
    }
  }
  return (
    <ToggleButtonGroup
      color="primary"
      value={inputMode}
      exclusive
      onChange={handleModeChange}
      fullWidth
    >
      <ToggleButton value="icao">
        <SearchIcon sx={{ mr: 1 }} />
        ICAO Code
      </ToggleButton>
      <ToggleButton value="metar">
        <ContentPasteIcon sx={{ mr: 1 }} />
        Paste METAR
      </ToggleButton>
    </ToggleButtonGroup>
  )
}
