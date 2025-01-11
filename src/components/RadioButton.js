import React, { useState } from "react";
import CardHeader from "@mui/material/CardHeader";
import { styled } from "@mui/material/styles";

import { Radio, RadioGroup, FormControlLabel } from "@mui/material";

const StyledCardHeader = styled(CardHeader)(({ theme }) => ({
  backgroundColor: "rgba(38, 198, 218)", // Background color for the header
  color: theme.palette.common.white, // White text color
  borderRadius: "8px 8px 0 0", // Rounded corners at the top
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Shadow effect
  padding: theme.spacing(2), // Padding inside the header
  position: "relative", // Set position to relative for overlapping
  top: "-20px", // Move the header upwards to overlap the card content
  zIndex: 10,
  right: 0, // Ensure the header stays on top
}));

function RadioButton({ selectedValue, onSelectionChange,title }) {
  return (
    <div>
      <StyledCardHeader title="Yelam Entry Form" />
      <RadioGroup value={selectedValue} onChange={onSelectionChange}>
        <FormControlLabel value="form1" control={<Radio />} label="Inhouse(Pulli)" />
        <FormControlLabel value="form2" control={<Radio />} label="External(Guest)" />
      </RadioGroup>
    </div>
  );
}

export default RadioButton;
