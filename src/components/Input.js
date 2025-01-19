import React from "react";
import { Box } from "@mui/material";

function Input({
  required = false,
  label = "",
  name = "",
  type = "text",
  value = "",
  onChange = () => {},
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center;",
        marginTop: "10px", // Adjust spacing based on size
        position: "relative",
      }}
    >
      {/* Label */}
      {label && (
        <Box
          component="label"
          htmlFor={name}
          sx={{
            fontWeight: "400",
            color: "#262626",
            fontSize: "17px",
            lineHeight: "18px",
            marginBottom: "5px",
            width:"30%"
          }}
        >
          {label} 
          {required && <span style={{ color: "red" }}> *</span>}
        </Box>
      )}

      {/* Input Field */}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        style={{
          all: "unset", // Reset all browser styling
          border: "1px solid rgb(142, 142, 142)",
          borderRadius: "10px",
          width:  "100%" ,
          height:  "40px", // Adjust height based on size
          padding: "5px",
          boxSizing: "border-box", 
          backgroundColor:"rgb(255, 250, 245)",
          width:"65%"
        }}
      />
    </Box>
  );
}

export default Input;
