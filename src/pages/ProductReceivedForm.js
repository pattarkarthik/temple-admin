import React, { useState } from "react";
// import { formProductData } from "../assets/ProductReceivedData";
import RadioButton from "../components/RadioButton";
import Form from "../components/Form";
import { Box } from "@mui/material";
import TopHeaderTitle from "../components/TopHeaderTitle";

const inhouseFields = [
  // Pulli Id and Names
  { label: "Auction Item", name: "yelamPorul", required: true },
  { label: "Receiving Value", name: "receivingValue", required: true },
  { label: "Pulli ID", name: "pulliID", required: true },
  { label: "Name", name: "name", required: true },
  {
    label: "WhatsApp Number 1",
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
      { label: "Valayapatti", value: "Valayapatti" },
      { label: "Kallal", value: "Kallal" },
      { label: "Kandanur", value: "Kandanur" },
      { label: "Karaikudi", value: "Karaikudi" },
      { label: "Melaisivapuri", value: "Melaisivapuri" },
    ],
  },

  {
    label: "Product Receiving Number",
    name: "productReceivingNumber",
    required: true,
  },

  { label: "Remarks", name: "remark", required: false },
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
      <TopHeaderTitle pagename={" PRODUCT RECEVIED FORM"} />
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
