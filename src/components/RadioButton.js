import React from "react";
import { Radio, RadioGroup, FormControlLabel } from "@mui/material";

function RadioButton({ selectedValue = "inhouse", onSelectionChange }) {
  return (
    <RadioGroup
      value={selectedValue}
      onChange={(e) => onSelectionChange(e.target.value)}
      sx={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <FormControlLabel
        value="inhouse"
        control={
          <Radio
            sx={{
              color: "#f08001", // Unselected color
              "&.Mui-checked": {
                color: "#f08001", // Selected color
              },
            }}
          />
        }
        label="Inhouse"
        componentsProps={{ typography: { fontSize: "small" } }}
      />
      <FormControlLabel
        value="guest"
        control={
          <Radio
            sx={{
              color: "#f08001", // Unselected color
              "&.Mui-checked": {
                color: "#f08001", // Selected color
              },
            }}
          />
        }
        label="Guest"
        componentsProps={{ typography: { fontSize: "small" } }}
      />
    </RadioGroup>
  );
}

export default RadioButton;
