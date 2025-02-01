import React from "react";
import Form from "../components/Form";
import { Box } from "@mui/material";
import { newMemberFormFields } from "../assets/Fields.js";
import Loader from "../components/Loader";
import CustomAlert from "../components/CustomAlert";
import { useNavigate } from "react-router-dom";
import TopHeaderTitle from "../components/TopHeaderTitle.js";
import { useApiRequest } from "../util/customHooks/useApiRequest.js";
import { NEW_MEMBER_CREATE_URL } from "../util/constants.js";
import {
  MEMBER_ADDED_FAILURE_ALERT_MESSAGE,
  MEMBER_ADDED_SUCCESSFULLY_ALERT_MESSAGE,
} from "../util/alerts.js";

function NewMember() {
  const navigate = useNavigate();
  const { loading, errorAlert, successAlert, alertMessage, postData } =
    useApiRequest();

  const handleFormSubmit = async (formData) => {
    const response = await postData(
      NEW_MEMBER_CREATE_URL(),
      formData,
      MEMBER_ADDED_SUCCESSFULLY_ALERT_MESSAGE,
      MEMBER_ADDED_FAILURE_ALERT_MESSAGE,
      () => navigate("/new-member")
    );
    return response !== null; // Return true if successful, false otherwise
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
        onSubmit={handleFormSubmit}
        profilePic={true}
      />

      {loading && <Loader />}
      <CustomAlert openAlert={successAlert} message={alertMessage} />
      <CustomAlert openAlert={errorAlert} message={alertMessage} />
    </Box>
  );
}

export default NewMember;
