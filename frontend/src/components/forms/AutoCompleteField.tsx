import { Autocomplete, Box, CircularProgress, TextField } from "@mui/material"
import type { AirportDto } from "@/api/generated/model"

interface AutoCompleteFieldProps {
  airports: AirportDto[]
  icaoCode: string
  setIcaoCode: (code: string) => void
  error?: boolean
  helperText?: string
  isLoading?: boolean
}

export const AutoCompleteField = ({
  airports,
  icaoCode,
  setIcaoCode,
  error,
  helperText,
  isLoading,
}: AutoCompleteFieldProps) => {
  return (
    <Autocomplete
      freeSolo
      disablePortal
      autoHighlight
      options={airports}
      value={airports.find(option => option.icao === icaoCode) || null}
      onChange={(_event, value) => {
        if (typeof value === "string") {
          setIcaoCode(value.toUpperCase())
        } else {
          setIcaoCode(value?.icao || "")
        }
      }}
      onInputChange={(_event, newInputValue, reason) => {
        if (reason === "input") {
          setIcaoCode(newInputValue.toUpperCase())
        }
      }}
      getOptionLabel={option => (typeof option === "string" ? option : option.icao || "")}
      isOptionEqualToValue={(option, value) =>
        typeof value === "string" ? option.icao === value : option.icao === value.icao
      }
      loading={isLoading}
      renderOption={(props, airport) => {
        const { key, ...airportProps } = props
        const countryCode = airport.country?.toLowerCase().slice(0, 2) || "un"
        return (
          <Box
            key={key}
            component="li"
            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            {...airportProps}
          >
            <img
              loading="lazy"
              width="20"
              srcSet={`https://flagcdn.com/w40/${countryCode}.png 2x`}
              src={`https://flagcdn.com/w20/${countryCode}.png`}
              alt=""
              onError={e => {
                e.currentTarget.style.display = "none"
              }}
            />
            {airport.name} ({airport.icao}){airport.municipality && ` - ${airport.municipality}`}
          </Box>
        )
      }}
      renderInput={params => (
        <TextField
          {...params}
          label="Choose ICAO Code"
          error={error}
          helperText={helperText}
          slotProps={{
            htmlInput: {
              ...params.inputProps,
              autoComplete: "new-password",
            },
            input: {
              ...params.InputProps,
              endAdornment: (
                <>
                  {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            },
          }}
        />
      )}
    />
  )
}
