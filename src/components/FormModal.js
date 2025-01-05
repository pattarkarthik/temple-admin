import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Form from "./Form";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function FormModal({ open, handleClose, rowData, fields }) {
  const handleFormSubmit = (values) => {
    console.log("Updated values:", values); // Handle updated values
    handleClose(); // Close the modal
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <Form
          title="Edit This Entry"
          fields={fields}
          onSubmit={handleFormSubmit}
          initialValues={rowData} // Pass updated formValues
          maxHeight={500}
        />
      </Box>
    </Modal>
  );
}
