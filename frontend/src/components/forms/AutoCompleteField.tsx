import icaoCodeOptions from "@/lib/icao_mock"
import { Autocomplete, Box, TextField } from "@mui/material"

interface AutoCompleteFieldProps {
  icaoCodeOptions: typeof icaoCodeOptions
  icaoCode: string
  setIcaoCode: (code: string) => void
  error?: boolean
  helperText?: string
}

export const AutoCompleteField = ({
  icaoCodeOptions,
  icaoCode,
  setIcaoCode,
  error,
  helperText,
}: AutoCompleteFieldProps) => {
  return (
    <Autocomplete
      disablePortal
      autoHighlight
      options={icaoCodeOptions}
      value={icaoCodeOptions.find(option => option.code === icaoCode) || null}
      onChange={(_event, value) => setIcaoCode(value?.code || "")}
      getOptionLabel={icaoCodeOption => `${icaoCodeOption.code}`}
      renderOption={(props, icaoCodeOption) => {
        const { key, ...icaoCodeProps } = props
        return (
          <Box
            key={key}
            component="li"
            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            {...icaoCodeProps}
          >
            <img
              loading="lazy"
              width="20"
              srcSet={`https://flagcdn.com/w40/${icaoCodeOption.iso.toLowerCase()}.png 2x`}
              src={`https://flagcdn.com/w20/${icaoCodeOption.iso.toLowerCase()}.png`}
              alt=""
            />
            {icaoCodeOption.name} ({icaoCodeOption.code})
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
          }}
        />
      )}
    />
  )
}
