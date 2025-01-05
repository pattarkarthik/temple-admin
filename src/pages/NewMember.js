import React from "react";
import Form from "../components/Form";

function NewMember() {

  const fields = [
    { label: "Family Name", name: "familyName", required: true },
    { label: "Name", name: "name", required: true },
    { label: "Spouse Name", name: "spouseName", required: false },
  

    // Communication Address fields
    { label: "Address Line 1", name: "addressLine1", required: true },
    { label: "Address Line 2", name: "addressLine2", required: false },
    { label: "City", name: "city", required: true },
    { label: "State", name: "state", required: true },
    { label: "Pin Code", name: "pinCode", required: true },

    // Mobile Numbers
    { label: "Mobile 1", name: "mobile1", required: true, type: "tel" },
    {
      label: "Mobile 2 (Spouse)",
      name: "mobile2Spouse",
      required: false,
      type: "tel",
    },

    // WhatsApp Numbers
    { label: "WhatsApp No 1", name: "whatsapp1", required: false, type: "tel" },
    { label: "WhatsApp No 2", name: "whatsapp2", required: false, type: "tel" },

    // Email IDs
    { label: "Email ID 1", name: "email1", required: true, type: "email" },
    { label: "Email ID 2", name: "email2", required: false, type: "email" },

    // Primary Key (Pulli ID)
    { label: "Pulli ID (Primary Key)", name: "pulliID", required: true },

    // Native and Karai
    {
      label: "Native",
      name: "Native",
      required: true,
      type: "dropdown", // Specify that this is a dropdown field
      options: [
        { value: "valayapatti", label: "valayapatti" },
        { value: "Kallal", label: "Kallal" },
        { value: "Kandanur", label: "Kandanur" },
        { value: "Karaikudi", label: "Karaikudi" },
        { value: "Melaisivapuri", label: "Melaisivapuri" },
        { value: "Ponnamaravathi", label: "Ponnamaravathi" },
        { value: "Venthampatti", label: "Venthampatti" },
        { value: "Mahivalambatti", label: "Mahivalambatti" },
        { value: "A.thekkur", label: "A.thekkur" },
        { value: "Rangiem", label: "Rangiem" },
        { value: "Nerkuppai", label: "Nerkuppai" },
      ],
    },
    {
      label: "Karai",
      name: "karai",
      required: true,
      type: "dropdown", // Specify that this is a dropdown field
      options: [
        { value: "Panaivaikum Karai", label: "Panaivaikum Karai" },
        { value: "Samiyadi karai", label: "Samiyadi karai" },
        { value: "Poosari karai", label: "Poosari karai" },
      ],
    },

    // Custom Columns
    {
      label: "Custom Column 1 - Year",
      name: "customColumn1Year",
      required: false,
    },
    {
      label: "Custom Column 1 - Allowed Number",
      name: "customColumn1Number",
      required: false,
      type: "number",
    },
    { label: "Custom Column 1", name: "customColumn1", required: false },
  ];
  const handleFormSubmit = (values) => {
    // This will log the submitted form values
    console.log(values);
   
  };

  return (
    <div>
          

      <Form
        fields={fields}
        onSubmit={handleFormSubmit}
        title="Add New Member"
      />
    </div>
  );
}

export default NewMember;
