import React, { useState } from "react";
import Form from "../components/Form";
import { Grid, Box, Paper } from "@mui/material";
import UploadAvatar from "../components/UploadAvatar";

function NewMember() {
  const [avatar, setAvatar] = useState(null);

  const fields = [

    // Pulli Id and Names
    { label: "Pulli ID (Primary Key)", name: "pulliID", required: true },
    { label: "Family Name", name: "familyName", required: true },
    { label: "Name", name: "name", required: true },
    { label: "Spouse Name", name: "spouseName", required: false },

    // Address & City

    { label: "Address Line 1", name: "addressLine1", required: true,type:"text area" },
    { label: "Address Line 2", name: "addressLine2", required: true },
    { label: "City", name: "city", required: true },
    { label: "State", name: "state", required: true },
    { label: "Pin Code", name: "pinCode", required: true },

    //Mobile Numbers and Whatsapp Numbers
    { label: "Mobile Number 1", name: "mobile1", required: true, type: "tel" },
    {label: "Mobile Number 2(Spouse)", name: "mobile2(spouse)", required: true, type: "tel" },
    {label: "Whatsapp Number 1", name: "Whatsapp1", required: true, type: "tel" },
    {label: "Whatsapp Number 2", name: "Whatsapp2", required: true, type: "tel" },
    { label: "Email ID 1", name: "email1", required: true, type: "email" },


    //Native and Karai
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

  const handleFormSubmit = (values) => {
    console.log("Form submitted:", values);
  };

  return (
    <div>
      <Grid container justifyContent="center" spacing={3}>
        <Grid item xs={12}>
          <Box
            sx={{
              position: "absolute",
              top: "1rem", // Adjust as needed
              right: "1rem", // Adjust as needed
              zIndex: 1, // Ensure it stays on top
            }}
          ></Box>

          {/* Form Section */}
          <Form
            purpose="NewMember.js"
            fields={fields}
            onSubmit={handleFormSubmit}
            title="Add New Member"
          />
        
        </Grid>
      </Grid>
    </div>
  );
}

export default NewMember;
