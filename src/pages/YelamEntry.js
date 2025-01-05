import React, { useState } from "react";
import RadioButton from "../components/RadioButton";
import Form from "../components/Form";

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

  // Form fields for different forms
  const fieldsForForm1 = [
    { label: "Pulli ID (Primary Key)", name: "pulliID", required: true },
    { label: "Native", name: "native", required: true },
    { label: "Karai", name: "karai", required: true },
    { label: "WhatsApp No 1", name: "whatsapp1", required: false, type: "tel" },
    { label: "Email", name: "email", required: true, type: "email" },
  ];
  const fieldsForForm2 = [
    
    { label: "Family Name", name: "familyName", required: true },
    { label: "Name", name: "name", required: true },
    { label: "Spouse Name", name: "spouseName", required: false },
    { label: "Address Line 1", name: "addressLine1", required: true },
    { label: "City", name: "city", required: true },
    { label: "Mobile 1", name: "mobile1", required: true, type: "tel" },
  ];
  

  const handleSelectionChange = (event) => {
    setSelectedForm(event.target.value);
  };

  const handleFormSubmit = (values) => {
    console.log("Form submitted with values:", values);
  };

  // Dynamically select fields based on the selected form
  const getFields = () => {
    if (selectedForm === "form1") return fieldsForForm1;
    if (selectedForm === "form2") return fieldsForForm2;
    return [];
  };

  return (
    <div>
      {/* Radio buttons for form selection */}
      <RadioButton
        selectedValue={selectedForm}
        onSelectionChange={handleSelectionChange}
      />

      {/* Render the selected form */}
      <div style={{ marginTop: "20px" }}>
        {selectedForm && (
          <Form
            fields={getFields()}
            onSubmit={handleFormSubmit}
            title={`Yelam Entry - ${selectedForm === "form1" ? "Inhouse(Pulli)" : "External(Guest)"}`}
          />
        )}
      </div>
    </div>
  );
}


export default YelamEntry;
