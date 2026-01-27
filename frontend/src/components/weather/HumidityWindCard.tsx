// frontend/src/components/weather/HumidityWindCard.tsx
import { Card, CardContent, Stack, Box, Typography, Divider, alpha, Grow } from "@mui/material"

interface HumidityWindCardProps {
  humidity: number
  windDirection: number
  windDirectionText: string
  humidityColor: string
  windColor: string
}

export function HumidityWindCard({
  humidity,
  windDirection,
  windDirectionText,
  humidityColor,
  windColor,
}: HumidityWindCardProps) {
  return (
    <Grow in timeout={1400} style={{ transformOrigin: "bottom center" }}>
      <Card
        sx={{
          borderRadius: 3,
          height: "100%",
          cursor: "pointer",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            transform: "translateY(-8px) scale(1.02)",
            boxShadow: `0 16px 40px ${alpha(humidityColor, 0.3)}`,
            "& .icon-box": {
              transform: "scale(1.1)",
            },
            "& .humidity-icon-box": {
              bgcolor: alpha(humidityColor, 0.2),
            },
            "& .wind-icon-box": {
              bgcolor: alpha(windColor, 0.2),
            },
            "& .main-value": {
              transform: "scale(1.05)",
            },
            "& .humidity-value": {
              color: humidityColor,
            },
            "& .wind-value": {
              color: windColor,
            },
          },
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Stack spacing={3}>
            {/* Humidity */}
            <Box>
              <Stack direction="row" alignItems="center" spacing={2} mb={1.5}>
                <Box
                  className="icon-box humidity-icon-box"
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    bgcolor: alpha(humidityColor, 0.1),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  <i className="wi wi-humidity" style={{ fontSize: 28, color: humidityColor }} />
                </Box>
                <Box flex={1}>
                  <Typography variant="body2" color="text.secondary">
                    Humidity
                  </Typography>
                  <Typography
                    variant="h5"
                    fontWeight={700}
                    className="main-value humidity-value"
                    sx={{
                      transition: "all 0.3s ease",
                      transformOrigin: "left center",
                    }}
                  >
                    {humidity}%
                  </Typography>
                </Box>
              </Stack>
            </Box>

            <Divider />

            {/* Wind Direction */}
            <Box>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box
                  className="icon-box wind-icon-box"
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    bgcolor: alpha(windColor, 0.1),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  <i
                    className={`wi wi-wind towards-${windDirection}-deg`}
                    style={{
                      fontSize: 28,
                      color: windColor,
                      transition: "transform 0.5s ease",
                    }}
                  />
                </Box>
                <Box flex={1}>
                  <Typography variant="body2" color="text.secondary">
                    Wind Direction
                  </Typography>
                  <Typography
                    variant="h5"
                    fontWeight={700}
                    className="main-value wind-value"
                    sx={{
                      transition: "all 0.3s ease",
                      transformOrigin: "left center",
                    }}
                  >
                    {windDirection}° {windDirectionText}
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Grow>
  )
}
