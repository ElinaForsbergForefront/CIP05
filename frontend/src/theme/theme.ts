import { createTheme } from "@mui/material/styles"

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
})
