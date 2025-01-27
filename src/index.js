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
    fontFamily: '"Roboto", "Arial", sans-serif', // Global font family
    fontSize: 14, // Base font size for the entire application
    h1: {
      fontSize: "2.5rem", // Font size for h1 headings
    },
    h2: {
      fontSize: "2rem", // Font size for h2 headings
    },
    body1: {
      fontSize: "1rem", // Default font size for body text
    },
    body2: {
      fontSize: "0.875rem", // Smaller font size for secondary text
    },
    button: {
      fontSize: "0.875rem", // Font size for buttons
      textTransform: "none", // Disable uppercase transformation
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
