import React, { useState } from "react";
import RadioButton from "../components/RadioButton";
import Form from "../components/Form";
import { Box, Paper } from "@mui/material";

function YelamEntry() {
  // const fields = [
  //   { label: "Family Name", name: "familyName", required: true },
  //   { label: "Name", name: "name", required: true },
  //   { label: "Spouse Name", name: "spouseName", required: false },

  //   // Communication Address fields
  //   { label: "Address Line 1", name: "addressLine1", required: true },
  //   { label: "Address Line 2", name: "addressLine2", required: false },
  //   { label: "City", name: "city", required: true },
  //   { label: "State", name: "state", required: true },
  //   { label: "Pin Code", name: "pinCode", required: true },

  //   // Mobile Numbers
  //   { label: "Mobile 1", name: "mobile1", required: true, type: "tel" },
  //   {
  //     label: "Mobile 2 (Spouse)",
  //     name: "mobile2Spouse",
  //     required: false,
  //     type: "tel",
  //   },

  //   // WhatsApp Numbers
  //   { label: "WhatsApp No 1", name: "whatsapp1", required: false, type: "tel" },

  //   // Primary Key (Pulli ID)
  //   { label: "Pulli ID (Primary Key)", name: "pulliID", required: true },

  //   // Native and Karai
  //   { label: "Native", name: "native", required: true },
  //   { label: "Karai", name: "karai", required: true },
  // ];
  // const [selectedForm, setSelectedForm] = useState("");

  // const handleSelectionChange = (event) => {
  //   const selectedValue = event.target.value;
  //   setSelectedForm(selectedValue);
  // };

  // const handleFormSubmit = (values) => {
  //   // This will log the submitted form values
  //   console.log(values);
  // };

  // return (
  //   <div>
  //     <RadioButton
  //       selectedValue={selectedForm}
  //       onSelectionChange={handleSelectionChange}
  //     />
  //     <div style={{ marginTop: "20px" }}>
  //       <Form
  //         fields={fields}
  //         formType={selectedForm}
  //         onSubmit={handleFormSubmit}
  //         title="Yelam Entry Form"
  //       />
  //     </div>
  //   </div>
  // );
  const [selectedForm, setSelectedForm] = useState("");

  const fields = [
    // Pulli Id and Names
    { label: "Pulli ID (Primary Key)", name: "pulliID", required: true },
    { label: "Family Name", name: "familyName", required: true },
    { label: "Name", name: "name", required: true },
    { label: "Spouse Name", name: "spouseName", required: false },

    {
      label: "Address Line 1",
      name: "addressLine1",
      required: true,
      type: "text area",
    },
    { label: "Address Line 2", name: "addressLine2", required: true },
    { label: "City", name: "city", required: true },
    { label: "State", name: "state", required: true },
    { label: "Pin Code", name: "pinCode", required: true },

    //Mobile Numbers and Whatsapp Numbers
    {
      label: "Mobile Number 1",
      name: "mobile1",
      required: true,
      type: "tel",
    },
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
  const fieldsForForm2 = [
    { label: "Yelam Poral/Product", name: "Product", required: true },
    { label: "Value", name: "value", required: true },
    { label: "Pulli ID (Primary Key)", name: "pulliID", required: true },

    { label: "Family Name", name: "familyName", required: true },
    { label: "Name", name: "name", required: true },
    { label: "Spouse Name", name: "spouseName", required: false },

    { label: "Address Line 1", name: "addressLine1", required: true },
    { label: "City", name: "city", required: true },
    { label: "Mobile 1", name: "mobile1", required: true, type: "tel" },
    { label: "WhatsApp No 1", name: "whatsapp1", required: false, type: "tel" },

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

    { label: "Manual Book Sr.no", name: "Manual Book Sr.no", required: true },
    { label: "Remark", name: "Remark", required: true },

    { label: "Guest Name", name: "guestname", required: true },
    {
      label: "Guest WhatsApp Number",
      name: "GuestWhatsappNumber",
      required: true,
      type: "tel",
    },
    {
      label: "Guest Native",
      name: "GuestNative",
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
    { label: "Reference / Relationship ", name: "Reference", required: false },
  ];

  const handleSelectionChange = (event) => {
    setSelectedForm(event.target.value);
  };

  const handleFormSubmit = (values) => {
    console.log("Form submitted with values:", values);
  };

  return (
    <Paper
      sx={{
        display: "flex",
        marginTop: "5%",
        marginLeft: "3%",
        marginRight: "5%",
        padding: "10px",
        flexDirection: "column",
      }}
    >
      <Box>
        <RadioButton />
      </Box>

      <Form
        purpose="NewMember.js"
        fields={fields}
        onSubmit={handleFormSubmit}
        title="Add New Member"
      />
    </Paper>
  );
}

export default YelamEntry;
