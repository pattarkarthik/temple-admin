import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const theme = createTheme({
  typography: {
    fontFamily: '"Roboto", "Arial", sans-serif', 
    fontSize: 14, 
    h1: {
      fontSize: "2.5rem", 
    },
    h2: {
      fontSize: "2rem", 
    },
    body1: {
      fontSize: "1rem", 
    },
    body2: {
      fontSize: "0.875rem", 
    },
    button: {
      fontSize: "0.875rem", 
      textTransform: "none", 
    },
  },
});

export default theme;

root.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);

reportWebVitals();
