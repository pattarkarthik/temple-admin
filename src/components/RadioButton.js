import React, { useState } from "react";
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
        control={<Radio />}
        label="Inhouse (Pulli)"
        componentsProps={{ typography: { fontSize: "small" } }}
      />
      <FormControlLabel
        value="guest"
        control={<Radio />}
        label="External (Guest)"
        componentsProps={{ typography: { fontSize: "small" } }}
      />
    </RadioGroup>
  );
}

export default RadioButton;
