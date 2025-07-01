import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#009688",
    },
    secondary: {
      main: "#37474F",
    },
    background: {
      default: "#f9f9f9",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: "Inter, Roboto, sans-serif",
  },
});
