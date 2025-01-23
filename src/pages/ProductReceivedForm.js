import React, { useState } from "react";
// import { formProductData } from "../assets/ProductReceivedData";
import RadioButton from "../components/RadioButton";
import Form from "../components/Form";
import { Box, Typography } from "@mui/material";

const inhouseFields = [
  // Pulli Id and Names
  { label: "ஏலம் பொருள்", name: "yelamPorul", required: true },
  { label: "பெறுதல் மதிப்பு", name: "receivingValue", required: true },
  { label: "புல்லி ஐடி", name: "pulliID", required: true },
  { label: "பெயர்", name: "name", required: true },
  {
    label: "வாட்ஸ்அப் எண் 1",
    name: "Whatsapp1",
    required: true,
    type: "tel",
  },
  {
    label: "பூர்வீகம்",
    name: "Native",
    required: true,
    type: "dropdown",
    options: [
      { label: "வலையபட்டி", value: "Valayapatti" },
      { label: "கல்லல்", value: "Kallal" },
      { label: "கண்டனூர்", value: "Kandanur" },
      { label: "காரைக்குடி", value: "Karaikudi" },
      { label: "மேலைசிவபுரி", value: "Melaisivapuri" },
    ],
  },

  {
    label: "தயாரிப்பு பெறுதல் எண்",
    name: "productReceivingNumber",
    required: true,
  },

  { label: "கருத்துக்கள்", name: "remark", required: false },
];
const guestFields = [
  ...inhouseFields,
  { label: "விருந்தினர் பெயர்", name: "guestname", required: true },
  {
    label: "விருந்தினர் வாட்ஸ்அப் எண்",
    name: "guestWhatsappNo",
    required: true,
  },
  { label: "விருந்தினர் பூர்வீகம்", name: "guestNative", required: true },
  { label: "உறவு", name: "relationship", required: true },
];

function ProductReceivedForm() {
  const [selectedValue, setSelectedValue] = useState("inhouse");

  const handleFormSubmit = (values) => {
    console.log("Form submitted with values:", values);
  };
  const handleSelectionChange = (value) => {
    console.log(value);
    setSelectedValue(value);
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
        borderRadius: "4px", // Optional: Add rounded corners
        fontWeight: "bold",
        fontSize: "1.5rem",
      }}
      >
        PRODUCT RECEVIED FORM
      </Typography>
      <Box>
        <RadioButton
          selectedValue={selectedValue}
          onSelectionChange={handleSelectionChange}
        />
      </Box>
      <Form
        purpose="NewMember.js"
        fields={selectedValue === "inhouse" ? inhouseFields : guestFields}
        onSubmit={handleFormSubmit}
        title="Add New Member"
      />
    </Box>
  );
}

export default ProductReceivedForm;
