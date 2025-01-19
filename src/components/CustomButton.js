import { Label, Margin } from "@mui/icons-material";
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
        marginRight:"20px"
      }
    : { backgroundColor: "#f08001", color: "white", boxShadow: "none", marginRight:"20px" };
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
