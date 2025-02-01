import { Button } from "@mui/material";
import React from "react";

function CustomButton(props) {
  const { label, onclick, type, inverted, endIcon, width } = props;
  const style = inverted
    ? {
        backgroundColor: "rgb(255, 250, 245)",
        border: "1px solid #f08001",
        color: "#f08001",
        boxShadow: "none",
      }
    : {
        backgroundColor: "#f08001",
        color: "white",
        boxShadow: "none",
      };
  return (
    <Button
      variant="contained"
      sx={style}
      onClick={onclick}
      type={type}
      endIcon={endIcon}
    >
      {label}
    </Button>
  );
}

export default CustomButton;
