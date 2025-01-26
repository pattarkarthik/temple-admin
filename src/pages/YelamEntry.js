import React, { useState } from "react";
import RadioButton from "../components/RadioButton";
import Form from "../components/Form";
import { Box } from "@mui/material";
import TopHeaderTitle from "../components/TopHeaderTitle";

const inhouseFields = [
  { label: "புல்லி ஐடி", name: "pulli_id", required: true },
  { label: "பெயர்", name: "name", required: true },
  { label: "தொலைபேசி", name: "mobile_1", required: true },
  {
    label: "குடும்பப் பெயர்",
    name: "family_name",
    required: true,
    type: "tel",
  },
  { label: "பொருள்", name: "product", required: true },
  { label: "ஏல தொகை", name: "bid_amount", required: true },
  { label: "இருப்பு தொகை", name: "balance_amount", required: true },
  { label: "கையேடு புத்தகம் Sr எண்", name: "manual_book_srno", required: true },
  { label: "கருத்துக்கள்", name: "remarks", required: false },
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
];
function YelamEntry() {
  const [selectedValue, setSelectedValue] = useState("inhouse");

  const handleSelectionChange = (value) => {
    console.log(value);
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
        flexDirection: "column",
      }}
    >
      <TopHeaderTitle pagename={"YELAM ENTRY"} />
      <Box>
        <RadioButton
          selectedValue={selectedValue}
          onSelectionChange={handleSelectionChange}
        />
      </Box>

      <Form
        fields={selectedValue === "inhouse" ? inhouseFields : guestFields}
        onSubmit={handleFormSubmit}
        title="Add New Member"
      />
    </Box>
  );
}

export default YelamEntry;
