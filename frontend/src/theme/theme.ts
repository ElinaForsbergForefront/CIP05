import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    mode: 'light',

    primary: {
      main: '#0B3C5D',
      light: '#2E5F80',
      dark: '#06263B',
      contrastText: '#FFFFFF',
    },

    secondary: {
      main: '#F4B400',
      light: '#FFD24D',
      dark: '#C49000',
      contrastText: '#0B1C2D',
    },

    background: {
      default: '#F5F7FA',
      paper: '#FFFFFF',
    },

    text: {
      primary: '#0B1C2D',
      secondary: '#4A5D73',
    },
  },
  typography: {
    fontFamily: ['Roboto', 'Arial', 'sans-serif'].join(','),
  },
})
