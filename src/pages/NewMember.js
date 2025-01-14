import React, { useState } from "react";
import Form from "../components/Form";
import { Grid, Box, Paper, Alert } from "@mui/material";
import api from "../api";
import { Navigate } from "react-router-dom";

function NewMember() {
  const [loading, setLoading] = useState(false);

  const fields = [
    { label: "Pulli ID (Primary Key)", name: "pulli_id", required: true },
    { label: "Family Name", name: "family_name", required: true },
    { label: "Name", name: "name", required: true },
    { label: "Spouse Name", name: "spouse_name", required: false },
    {
      label: "Address Line 1",
      name: "address_line_1",
      required: true,
      type: "text area",
    },
    { label: "Address Line 2", name: "addressLine2", required: true },
    { label: "City", name: "city", required: true },
    { label: "State", name: "state", required: true },
    { label: "Pin Code", name: "pin_code", required: true },
    { label: "Mobile Number 1", name: "mobile_1", required: true, type: "tel" },
    {
      label: "Mobile Number 2(Spouse)",
      name: "mobile2(spouse)",
      required: true,
      type: "tel",
    },
    {
      label: "Whatsapp Number 1",
      name: "Whatsapp1",
      required: true,
      type: "tel",
    },
    {
      label: "Whatsapp Number 2",
      name: "Whatsapp2",
      required: true,
      type: "tel",
    },
    { label: "Email ID 1", name: "email_id_1", required: true, type: "email" },
    {
      label: "Native",
      name: "native",
      required: true,
      type: "dropdown",
      options: [
        { value: "valayapatti", label: "valayapatti" },
        { value: "Kallal", label: "Kallal" },
        { value: "Kandanur", label: "Kandanur" },
        { value: "Karaikudi", label: "Karaikudi" },
        { value: "Melaisivapuri", label: "Melaisivapuri" },
      ],
    },
    {
      label: "Karai",
      name: "karai",
      required: true,
      type: "dropdown",
      options: [
        { value: "Panaivaikum Karai", label: "Panaivaikum Karai" },
        { value: "Samiyadi karai", label: "Samiyadi karai" },
        { value: "Poosari karai", label: "Poosari karai" },
      ],
    },
  ];

  const handleFormSubmit = async (formData) => {
    try {
      const res = await api.post("/api/members/", formData);
      if (res.status === 201) {
        alert("Member added successfully");
        Navigate("/new-member");
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Paper
        sx={{
          display: "flex",
          marginTop: "5%",
          marginLeft: "3%",
          marginRight: "5%",
          padding: "10px",
        }}
      >
        <Form
          fields={fields}
          onSubmit={(formData) => handleFormSubmit(formData)}
        />
      </Paper>
    </>
  );
}

export default NewMember;
