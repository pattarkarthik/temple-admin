import React, { useState } from "react";
import { formProductData } from "../assets/ProductReceivedData";
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
      <Form fields={formProductData} onSubmit={handleFormSubmit} />
    </Box>
  );
}

export default ProductReceivedForm;
