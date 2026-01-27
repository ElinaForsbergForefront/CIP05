import { alpha, Box, Chip, Divider, Paper, Stack, Typography, useTheme } from "@mui/material"
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff"
import AccessTimeIcon from "@mui/icons-material/AccessTime"

interface StationHeaderProps {
  station: string
  stationName: string
  flightCategory: string
  observationTime: string
  rawMetar: string
  getFlightCategoryColor: (category: string) => string
}

export const StationHeader = ({
  station,
  stationName,
  flightCategory,
  observationTime,
  rawMetar,
  getFlightCategoryColor,
}: StationHeaderProps) => {
  const theme = useTheme()

  return (
    <Paper
      sx={{
        p: 3,
        mb: 3,
        borderRadius: 3,
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
        border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
      }}
    >
      <Stack direction="row" alignItems="center" spacing={2} mb={2}>
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: 2,
            bgcolor: alpha(theme.palette.primary.main, 0.15),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FlightTakeoffIcon sx={{ fontSize: 32, color: theme.palette.primary.main }} />
        </Box>
        <Box flex={1}>
          <Typography variant="h5" fontWeight={700}>
            {station}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {stationName}
          </Typography>
        </Box>
        <Chip
          label={flightCategory}
          sx={{
            bgcolor: alpha(getFlightCategoryColor(flightCategory), 0.15),
            color: getFlightCategoryColor(flightCategory),
            fontWeight: 700,
            fontSize: "1rem",
            height: 36,
          }}
        />
      </Stack>
      <Divider sx={{ my: 2 }} />
      <Stack direction="row" alignItems="center" spacing={1} mb={1}>
        <AccessTimeIcon sx={{ fontSize: 18, color: "text.secondary" }} />
        <Typography variant="body2" color="text.secondary">
          {observationTime}
        </Typography>
      </Stack>
      <Paper
        sx={{
          p: 2,
          bgcolor: alpha(theme.palette.primary.main, 0.05),
          borderRadius: 2,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            fontFamily: "monospace",
            color: theme.palette.primary.main,
            wordBreak: "break-word",
          }}
        >
          {rawMetar}
        </Typography>
      </Paper>
    </Paper>
  )
}
