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
  { label: "Guest Name", name: "guestname", required: true },
  {
    label: "Guest Whatsapp",
    name: "guestWhatsappNo",
    required: true,
  },
  { label: "Guest Native", name: "guestNative", required: true },
  { label: "Relationship", name: "relationship", required: true },
];

function ProductReceivedForm() {
  const [selectedValue, setSelectedValue] = useState("inhouse");

  const handleFormSubmit = (values) => {
    console.log("Form submitted with values:", values);
  };
  const handleSelectionChange = (value) => {
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
        // purpose="NewMember.js"
        fields={selectedValue === "inhouse" ? inhouseFields : guestFields}
        onSubmit={handleFormSubmit}
        btnLabel="Submit"
        // title="Add New Member"
      />
    </Box>
  );
}

export default ProductReceivedForm;
