import React from "react";
import Form from "../components/Form";
import { Box, Paper, Typography } from "@mui/material";
import api from "../api";
import { Navigate } from "react-router-dom";
import { formFields } from "../assets/Data";

function NewMember() {
  const handleFormSubmit = async (formData) => {
    try {
      const res = await api.post("/api/members/", formData);
      if (res.status === 201) {
        alert("Member added successfully");
        Navigate("/new-member");
      }
    } catch (error) {
    } finally {
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        padding: "10px",
        flexDirection:"column",
       
      }}
    >
      <Typography  sx={{
      marginBottom:"10px"
       
      }}>ADD NEW MEMBER</Typography>
      <Form
        fields={formFields}
        onSubmit={(formData) => handleFormSubmit(formData)}
      />
    </Box>
  );
}

export default NewMember;
