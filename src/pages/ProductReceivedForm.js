import React, { useState } from "react";
import { formFields } from "../assets/Data";
import Form from "../components/Form";
import { Box, Typography } from "@mui/material";

function ProductReceivedForm() {
  const handleFormSubmit = (values) => {
    console.log("Form submitted with values:", values);
  };

  return (
    <Box
      sx={{
        display: "flex",
        padding: "10px",
        flexDirection: "column",
      }}
    >
      <Typography
        sx={{
          marginBottom: "10px",
        }}
      >
        PRODUCT RECEVIED FORM
      </Typography>
      <Form fields={formFields} onSubmit={handleFormSubmit} />
    </Box>
  );
}

export default ProductReceivedForm;
