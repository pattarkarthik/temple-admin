import React, { useState } from "react";
import Form from "../components/Form";
import { Box,  Typography } from "@mui/material";
import api from "../util/api.js"
import { formFields } from "../assets/Data";
import Loader from "../components/Loader";
import CustomAlert from "../components/CustomAlert";
import { useNavigate } from "react-router-dom";

function NewMember() {
  const [loading, setLoading] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const navigate = useNavigate();
  const handleFormSubmit = async (formData) => {
    setLoading(true);
    try {
      const res = await api.post("/api/members/", formData);
      if (res.status === 201) {
        setLoading(false);
        setSuccessAlert(true);
        setTimeout(() => setSuccessAlert(false), 5000);
        navigate("/new-member");
        return true;
      }
    } catch (error) {
      setLoading(false);
      setErrorAlert(true);
      setTimeout(() => setErrorAlert(false), 5000);
      return false;
    } finally {
    }
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
          backgroundColor: "rgb(255, 231, 218)",
          color: "rgb(0, 0, 0)",
          padding: "10px", // Add padding for spacing
          fontWeight: "bold",
          fontSize: "1.5rem",
        }}
      >
        PULLI MEMBER REGISTRATION
      </Typography>
      <Form
        fields={formFields}
        onSubmit={(formData) => handleFormSubmit(formData)}
        profilePic={true}
      />
     
    {loading && <Loader />}
        <CustomAlert  openAlert = {successAlert} message="Member added successfully!" />
        <CustomAlert openAlert={errorAlert} message="There was an error adding the member. Please try again" />
    </Box>
  );
}

export default NewMember;
