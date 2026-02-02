import { Card, CardContent, Box, Typography, alpha, Grow } from "@mui/material"
import type { ReactNode } from "react"

interface WeatherMetricCardProps {
  weatherIconClass: string
  label: string
  value: string
  subtitle?: string | ReactNode
  color: string
  timeout: number
}

export function WeatherMetricCard({
  weatherIconClass,
  label,
  value,
  subtitle,
  color,
  timeout,
}: WeatherMetricCardProps) {
  return (
    <Grow in timeout={timeout} style={{ transformOrigin: "bottom center" }}>
      <Card
        sx={{
          height: "100%",
          borderRadius: 3,
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          cursor: "pointer",
          "&:hover": {
            transform: "translateY(-8px) scale(1.02)",
            boxShadow: `0 16px 40px ${alpha(color, 0.3)}`,
            "& .icon-box": {
              transform: "scale(1.1)",
              bgcolor: alpha(color, 0.2),
            },
            "& .main-value": {
              transform: "scale(1.05)",
              color: color,
            },
          },
        }}
      >
        <CardContent sx={{ p: 2.5 }}>
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
              mb: 1.5,
              transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <i
              className={weatherIconClass}
              style={{
                fontSize: 28,
                color: color,
                transition: "all 0.3s ease",
              }}
            />
          </Box>
          <Typography variant="body2" color="text.secondary" mb={0.5}>
            {label}
          </Typography>
          <Typography
            variant="h5"
            fontWeight={700}
            className="main-value"
            sx={{ transition: "all 0.3s ease" }}
          >
            {value}
          </Typography>
          {subtitle && (
            <Typography variant="caption" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Grow>
  )
}
