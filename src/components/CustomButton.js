import { Button } from "@mui/material";
import React from "react";

function CustomButton(props) {
  const { label, onclick, type, inverted } = props;
  const style = inverted
    ? {
        backgroundColor: "white",
        border: "1px solid #f08001",
        color: "#f08001",
        boxShadow: "none",
      }
    : { backgroundColor: "#f08001", color: "white", boxShadow: "none" };
  return (
    <Button
      variant="contained"
      sx={style}
      onClick={onclick}
      type={type}
    >
      {label}
    </Button>
  );
}

export default CustomButton;
