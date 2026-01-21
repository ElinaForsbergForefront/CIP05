import { TextField } from "@mui/material"

interface MetarInputProps {
  metarString: string
  setMetarString: (metar: string) => void
}

export const MetarInput = ({ metarString, setMetarString }: MetarInputProps) => {
  return (
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
  )
}
