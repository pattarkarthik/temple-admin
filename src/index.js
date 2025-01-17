import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from "@mui/material/styles";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const theme = createTheme({
  
});

export default theme;


root.render( <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById("root"));

reportWebVitals();
