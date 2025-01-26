import React, { useState } from "react";
import Form from "../components/Form";
import { Box } from "@mui/material";
import { formFields } from "../assets/Data";
import Loader from "../components/Loader";
import CustomAlert from "../components/CustomAlert";
import { useNavigate } from "react-router-dom";
import TopHeaderTitle from "../components/TopHeaderTitle.js";
import { create } from "../util/fetchUtils.js";
import { NEW_MEMBER_CREATE_URL } from "../util/constants.js";

function NewMember() {
  const [loading, setLoading] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const navigate = useNavigate();
  const handleFormSubmit = async (formData) => {
    setLoading(true);
    try {
      const res = await create(NEW_MEMBER_CREATE_URL(), formData);
      if (res.status === 201) {
        setLoading(false);
        setSuccessAlert(true);
        setTimeout(() => setSuccessAlert(false), 5000);
        navigate("/new-member");
        return true;
      }
    } catch (error) {
      console.log("er", error);
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
      <TopHeaderTitle pagename={"PULLI MEMBER REGISTRATION"} />
      <Form
        fields={formFields}
        onSubmit={(formData) => handleFormSubmit(formData)}
        profilePic={true}
      />

      {loading && <Loader />}
      <CustomAlert
        openAlert={successAlert}
        message="Member added successfully!"
      />
      <CustomAlert
        openAlert={errorAlert}
        message="There was an error adding the member. Please try again"
      />
    </Box>
  );
}

export default NewMember;
