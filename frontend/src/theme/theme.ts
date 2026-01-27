import { createTheme } from "@mui/material/styles"

declare module "@mui/material/styles" {
  interface Theme {
    weather: {
      temperature: string
      wind: string
      visibility: string
      pressure: string
      clouds: string
      humidity: string
      flightCategories: {
        VFR: string
        MVFR: string
        IFR: string
        LIFR: string
      }
    }
  }

  interface ThemeOptions {
    weather?: {
      temperature?: string
      wind?: string
      visibility?: string
      pressure?: string
      clouds?: string
      humidity?: string
      flightCategories?: {
        VFR?: string
        MVFR?: string
        IFR?: string
        LIFR?: string
      }
    }
  }
}

export const theme = createTheme({
  palette: {
    mode: "light",

    primary: {
      main: "#7653ff",
      light: "#9579ff",
      dark: "#5c42cc",
      contrastText: "#ffffff",
    },

    secondary: {
      main: "#f76031",
      light: "#ff8a61",
      dark: "#d64a1f",
      contrastText: "#ffffff",
    },

    background: {
      default: "#ffffff",
      paper: "#f5f5f5",
    },

    text: {
      primary: "#1a1a1a",
      secondary: "#666666",
    },
  },
  typography: {
    fontFamily: ["Alberto Sans", "Roboto", "Arial", "sans-serif"].join(","),
  },
  weather: {
    temperature: "#ff5722",
    wind: "#4caf50",
    visibility: "#2196f3",
    pressure: "#00bcd4",
    clouds: "#9c27b0",
    humidity: "#009688",
    flightCategories: {
      VFR: "#4caf50",
      MVFR: "#2196f3",
      IFR: "#ff9800",
      LIFR: "#f44336",
    },
  },
})
