import { Box, Container, Typography, Button, Stack } from "@mui/material"
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff"

export function HomePage() {
  return (
    <Container>
      <Box sx={{ my: 8, textAlign: "center" }}>
        <FlightTakeoffIcon sx={{ fontSize: 80, color: "primary.main", mb: 2 }} />
        <Typography variant="h2" component="h1" gutterBottom color="primary">
          FlightFront
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom color="text.secondary">
          Flyg Klubb
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 4 }}>
          <Button variant="contained" color="primary" size="large">
            Get Started
          </Button>
        </Stack>
      </Box>
    </Container>
  )
}
