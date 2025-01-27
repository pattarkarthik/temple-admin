import { Typography } from "@mui/material";
import React from "react";

function TopHeaderTitle({ pagename }) {
  return (
    <Typography
      sx={{
        marginBottom: "10px",
        backgroundColor: "rgb(255, 231, 218)",
        color: "rgb(37, 37, 37)",
        padding: "10px", // Add padding for spacing
        fontWeight: "bold",
        fontSize: "1.5rem",
      }}
    >
      {pagename}
    </Typography>
  );
}

export default TopHeaderTitle;
