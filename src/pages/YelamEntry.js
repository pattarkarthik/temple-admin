import React, { useState } from "react";
import RadioButton from "../components/RadioButton";
import Form from "../components/Form";
import { Box, Paper, Typography } from "@mui/material";
const inhouseFields = [
  // Pulli Id and Names
  { label: "Pulli ID (Primary Key)", name: "pulliID", required: true },
  { label: "Name", name: "name", required: true },
  {
    label: "Whatsapp Number 1",
    name: "Whatsapp1",
    required: true,
    type: "tel",
  },
  {
    label: "Native",
    name: "Native",
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

  { label: "Manual Book Sr No", name: "manualBookSrNo", required: true },
  
  { label: "Reamarks", name: "reamarks", required: false },

];
const guestFields = [...inhouseFields,
  { label: "Guest Name", name: "guestname", required: true },
  { label: "Guest Whatsapp No", name: "guestWhatsappNo", required: true },
  { label: "Guest Native", name: "guestNative", required: true },

];
function YelamEntry() {
 
  const [selectedValue, setSelectedValue] = useState("inhouse");


  const handleSelectionChange = (value) => {
    console.log(value)
    setSelectedValue(value);
  };

  const handleFormSubmit = (values) => {
    console.log("Form submitted with values:", values);
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
     
    }}>YELAM ENTRY</Typography>
      <Box>
        <RadioButton selectedValue={selectedValue} onSelectionChange={handleSelectionChange}/>
      </Box>

      <Form
        purpose="NewMember.js"
        fields={selectedValue==="inhouse"? inhouseFields : guestFields}
        onSubmit={handleFormSubmit}
        title="Add New Member"
      />
    </Box>
  );
}

export default YelamEntry;
