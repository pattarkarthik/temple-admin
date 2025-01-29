import React, { useState } from "react";
import Form from "../components/Form";
import { Box } from "@mui/material";
import { newMemberFormFields } from "../assets/Fields.js";
import Loader from "../components/Loader";
import CustomAlert from "../components/CustomAlert";
import { useNavigate } from "react-router-dom";
import TopHeaderTitle from "../components/TopHeaderTitle.js";
import { create } from "../util/fetchUtils.js";
import { NEW_MEMBER_CREATE_URL } from "../util/constants.js";
import {
  MEMBER_ADDED_FAILURE_ALERT_MESSAGE,
  MEMBER_ADDED_SUCCESSFULLY_ALERT_MESSAGE,
} from "../util/alerts.js";

function NewMember() {
  const [loading, setLoading] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();
  const handleFormSubmit = async (formData) => {
    setLoading(true);
    try {
      const res = await create(NEW_MEMBER_CREATE_URL(), formData);
      if (res.status === 201) {
        setLoading(false);
        setSuccessAlert(true);
        setAlertMessage(MEMBER_ADDED_SUCCESSFULLY_ALERT_MESSAGE);
        setTimeout(() => setSuccessAlert(false), 5000);
        navigate("/new-member");
        return true;
      }
    } catch (error) {
      setLoading(false);
      setErrorAlert(true);
      setAlertMessage(MEMBER_ADDED_FAILURE_ALERT_MESSAGE);
      setTimeout(() => setErrorAlert(false), 5000);
      return false;
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
        btnLabel="Add Member"
        fields={newMemberFormFields}
        onSubmit={(formData) => handleFormSubmit(formData)}
        profilePic={true}
      />

      {loading && <Loader />}
      <CustomAlert openAlert={successAlert} message={alertMessage} />
      <CustomAlert openAlert={errorAlert} message={alertMessage} />
    </Box>
  );
}

export default NewMember;
