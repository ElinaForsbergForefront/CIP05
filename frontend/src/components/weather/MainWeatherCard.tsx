import { Card, CardContent, Stack, Box, Typography, useTheme, Grow } from "@mui/material"

interface MainWeatherCardProps {
  temperature: string
  iconClass: string
}

export function MainWeatherCard({ temperature, iconClass }: MainWeatherCardProps) {
  const theme = useTheme()

  return (
    <Grow in timeout={800}>
      <Card
        sx={{
          mb: 3,
          borderRadius: 3,
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          color: "white",
          overflow: "hidden",
          position: "relative",
          "&::before": {
            // eslint-disable-next-line quotes
            content: '""',
            position: "absolute",
            top: 0,
            right: 0,
            width: "200px",
            height: "200px",
            background: "rgba(255,255,255,0.1)",
            borderRadius: "50%",
            transform: "translate(50%, -50%)",
          },
        }}
      >
        <CardContent sx={{ p: 4, position: "relative", zIndex: 1 }}>
          <Stack direction="row" alignItems="center" spacing={3}>
            <Box
              sx={{
                width: 100,
                height: 100,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <i
                className={`wi ${iconClass}`}
                style={{
                  fontSize: "64px",
                }}
              />
            </Box>
            <Box flex={1}>
              <Typography variant="h3" fontWeight={700} mb={1}>
                {temperature}°
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Grow>
  )
}
