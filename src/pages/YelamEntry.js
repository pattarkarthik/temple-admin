import React, { useState } from "react";
import RadioButton from "../components/RadioButton";
import Form from "../components/Form";
import { Box, Paper, Typography } from "@mui/material";
const inhouseFields = [
  // Pulli Id and Names
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

  { label: "கையேடு புத்தகம் Sr எண்", name: "manualBookSrNo", required: true },
  
  { label: "கருத்துக்கள்", name: "reamarks", required: false },

];
const guestFields = [...inhouseFields,
  { label: "விருந்தினர் பெயர்", name: "guestname", required: true },
  { label: "விருந்தினர் வாட்ஸ்அப் எண்", name: "guestWhatsappNo", required: true },
  { label: "விருந்தினர் பூர்வீகம்", name: "guestNative", required: true },

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
