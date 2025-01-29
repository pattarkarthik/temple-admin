import React from "react";
import { Box } from "@mui/material";
import "../assets/styles/GeneralStyles.css";
function Input({
  required = false,
  label = "",
  name = "",
  type = "text",
  value = "",
  placeholder = "",
  width,
  error,
  errorMessage,
  readonly,
  onInvalid,
  onInput,
  onChange = () => {},
}) {
  return (
    <>
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
              fontSize: "15px",
              lineHeight: "18px",
              marginBottom: "5px",
              width: "30%",
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
          placeholder={placeholder}
          disabled={readonly ? "disabled" : ""}
          {...(type === "tel" && {
            pattern: "^(\\+?\\d{13}|0\\d{10}|\\d{10})$",
          })}
          onInvalid={onInvalid}
          onInput={onInput}
          style={{
            all: "unset", // Reset all browser styling
            border: "1px solid #f08001",
            width: "100%",
            height: "40px", // Adjust height based on size
            padding: "8px",
            boxSizing: "border-box",
            backgroundColor: "rgb(255, 250, 245)",
            width: width || "65%",
            borderRadius: "3px",
          }}
        />
      </Box>
      {error && (
        <Box
          sx={{
            marginLeft: "30%",
            fontSize: " x-small",
            color: "red",
          }}
        >
          {errorMessage}
        </Box>
      )}
    </>
  );
}

export default Input;
