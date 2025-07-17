import { Box, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";

function CustomSelect({ value, onChange, name, fields, label, width }) {
  const [selectedValue, setSelectedValue] = useState("");
  console.log(`${label} selected value:`, value, fields); // Debugging log

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  const handleChange = (event) => {
    const newValue = event.target.value;
    console.log("Selected value:", newValue); // Debugging log
    setSelectedValue(newValue); // Update local state
    if (onChange) {
      onChange(newValue); // Call the parent-provided onChange
    }
  };

  return (
    <>
      {label && <Box sx={{ width: "30%", fontSize: "15px" }}>{label}</Box>}
      <Select
        sx={{
          width: width || "65%",
          backgroundColor: "rgb(255, 250, 245)",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#f08001",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#f08001",
          },
          "& .MuiSvgIcon-root": {
            color: "#f08001",
          },
        }}
        value={selectedValue}
        onChange={(e) => {
          handleChange(e);
        }}
        name={name} // Pass name for debugging or form context
      >
        {fields.map((option, idx) => (
          <MenuItem key={idx} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </>
  );
}

export default CustomSelect;
