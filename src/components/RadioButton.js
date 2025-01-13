import React, { useState } from "react";
import CardHeader from "@mui/material/CardHeader";
import { styled } from "@mui/material/styles";

import { Radio, RadioGroup, FormControlLabel, Box } from "@mui/material";

function RadioButton({ selectedValue, onSelectionChange, title }) {
  return (
    <RadioGroup
      value={selectedValue}
      onChange={onSelectionChange}
      sx={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <FormControlLabel
        value="form1"
        control={<Radio />}
        label="Inhouse(Pulli)"
      />
      <FormControlLabel
        value="form2"
        control={<Radio />}
        label="External(Guest)"
      />
    </RadioGroup>
  );
}

export default RadioButton;
