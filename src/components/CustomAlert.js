import React from "react";
import Alert from "@mui/material/Alert";
import { Box } from "@mui/material";

export default function CustomAlert(props) {
  const { severity, message } = props;
  
  return (
    <Box
      sx={{
        position: "fixed",
        top: 16,
        right: 16,
        zIndex: 9999,
      }}
    >
      
        <Alert variant="filled" severity={severity}>
          {message}
        </Alert>
      
    </Box>
  );
}
