import { Box, Button, Container, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

export function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <Container>
      <Box sx={{ my: 8, textAlign: "center" }}>
        <Typography variant="h1" component="h1" gutterBottom color="primary">
          404
        </Typography>
        <Typography variant="h5" gutterBottom color="text.secondary">
          Page Not Found
        </Typography>
        <Button variant="contained" onClick={() => navigate("/")} sx={{ mt: 2 }}>
          Go Home
        </Button>
      </Box>
    </Container>
  )
}
