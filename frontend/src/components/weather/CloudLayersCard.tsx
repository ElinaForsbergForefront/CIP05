// frontend/src/components/weather/CloudLayersCard.tsx
import { Card, CardContent, Stack, Box, Typography, Paper, alpha, Grow } from "@mui/material"

interface CloudLayer {
  coverage: string
  altitude: number
  type: string
}

interface CloudLayersCardProps {
  clouds: CloudLayer[]
  color: string
}

export function CloudLayersCard({ clouds, color }: CloudLayersCardProps) {
  return (
    <Grow in timeout={1300} style={{ transformOrigin: "bottom center" }}>
      <Card
        sx={{
          borderRadius: 3,
          height: "100%",
          cursor: "pointer",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            transform: "translateY(-8px) scale(1.02)",
            boxShadow: `0 16px 40px ${alpha(color, 0.3)}`,
            "& .icon-box": {
              transform: "scale(1.1)",
              bgcolor: alpha(color, 0.2),
            },
            "& .card-title": {
              transform: "scale(1.05)",
              color: color,
            },
          },
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Stack direction="row" alignItems="center" spacing={2} mb={2}>
            <Box
              className="icon-box"
              sx={{
                width: 48,
                height: 48,
                borderRadius: 2,
                bgcolor: alpha(color, 0.1),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <i className="wi wi-cloud" style={{ fontSize: 28, color }} />
            </Box>
            <Typography
              variant="h6"
              fontWeight={600}
              className="card-title"
              sx={{ transition: "all 0.3s ease" }}
            >
              Cloud Layers
            </Typography>
          </Stack>
          <Stack spacing={1.5}>
            {clouds.map((cloud, index) => (
              <Paper
                key={index}
                sx={{
                  p: 2,
                  bgcolor: alpha(color, 0.05),
                  borderRadius: 2,
                  border: `1px solid ${alpha(color, 0.1)}`,
                }}
              >
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="body2" fontWeight={600}>
                      {cloud.type}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {cloud.coverage}
                    </Typography>
                  </Box>
                  <Typography variant="h6" fontWeight={700} color={color}>
                    {cloud.altitude.toLocaleString()} ft
                  </Typography>
                </Stack>
              </Paper>
            ))}
          </Stack>
        </CardContent>
      </Card>
    </Grow>
  )
}
