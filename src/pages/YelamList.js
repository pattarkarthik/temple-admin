import React, { useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import TableList from "../components/TableList.js";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import api from "../util/api.js";
import CustomButton from "../components/CustomButton.js";
import Loader from "../components/Loader";
import CustomAlert from "../components/CustomAlert";
import Input from "../components/Input.js";
import { number } from "prop-types";
import { YelamData,YelamEditFormFields } from "../assets/Data.js";

const YelamFields = [
  // { label: "Edit", name: "edit" }, 
  { label: "Pulli Id", name: "pulliId" },
  { label: "Name", name: "name" },
  { label: "Whatsup Number 1", name: "whatsupNumber1" },
  { label: "Native", name: "native" },
  {label:"Manual Book Sr No", name:"manualBooksrNo"},
  {label:"Remark",name:"remark"},
  {label:"Guest Name",name:"guestName"},
  {label:"Guest Native",name:"guestNative"},
];

function YelamList(  ) {
  const [openEditModal, setOpenEditModal] = useState(false);

  const [currentRow, setCurrentRow] = useState(null);
  const [originalRow, setOriginalRow] = useState(null); // Original data to compare changes
  const [loading, setLoading] = useState(false); // Loading state
  const [successAlert, setSuccessAlert] = useState(false); // Success alert state
  const [errorAlert, setErrorAlert] = useState(false); // Error alert state


  const openEdit = async (id) => {
    setLoading(true);
    try {
      const res = await api.get(`/api/members/${id}/`);
      setCurrentRow(res.data); // Set API data to currentRow state
      setOriginalRow(res.data); // Store the original data for comparison
    } catch (error) {
      setErrorAlert(true);
      setTimeout(() => setErrorAlert(false), 5000); // Auto-dismiss alert
    } finally {
      setLoading(false);
    }
    setOpenEditModal(true);
  };

  const handleCloseModal = () => {
    setOpenEditModal(false);
    setCurrentRow(null);
    setOriginalRow(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentRow((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDropdownChange = (name) => (event) => {
    setCurrentRow((prevState) => ({
      ...prevState,
      [name]: event.target.value,
    }));
  };

  const openPaymentStatusModal = (row) => {
    setCurrentRow(row); // Store the selected row data
    setOpenEditModal(true); // Open the modal
  };

  const handleSaveChanges = async () => {
    const changedFields = Object.keys(currentRow)
      .filter((key) => currentRow[key] !== originalRow[key])
      .reduce((acc, key) => {
        acc[key] = currentRow[key];
        return acc;
      }, {});
    const data = new FormData();
  };

  return (
    <Box
      sx={{
        display: "flex",
        padding: "10px",
        flexDirection: "column",
        overflow: "hidden",
        maxWidth: "100%",
      }}
    >
      <Typography
       sx={{
        marginBottom: "10px",
        backgroundColor: "rgb(255, 231, 218)", 
        color: "rgb(0, 0, 0)", 
        padding: "10px", // Add padding for spacing
        fontWeight: "bold",
        fontSize: "1.5rem",
      }}
      >
        YELAM LIST
      </Typography>

      {loading && <Loader />}

      {/* Alerts */}
      {successAlert && (
        <CustomAlert
          severity="success"
          message="Payment updated successfully!"
        />
      )}
      {errorAlert && (
        <CustomAlert
          severity="error"
          message="There was an error updating the payment."
        />
      )}

      {/* TableList */}
      <TableList
        openEdit={openEdit}
        fields={YelamFields}
        data={YelamData}
        showPaymentStatus={true} // Show "Payment Status" button
        handlePaymentStatus={(row) => openPaymentStatusModal(row)} // Add handler
      />

      {/* Edit Dialog */}
      <Dialog open={openEditModal} onClose={handleCloseModal}>
        <Box sx={{ width: "500px" }}>
          <DialogTitle>Payment Status</DialogTitle>
          <DialogContent>
            {/* <Profilepic /> */}
            {YelamEditFormFields.map((field) => (
              <div key={field.name}>
                {field.type === "dropdown" ? (
                  <FormControl fullWidth margin="normal">
                    <InputLabel>{field.label}</InputLabel>
                    <Select
                      value={currentRow ? currentRow[field.name] || "" : ""}
                      onChange={handleDropdownChange(field.name)}
                      label={field.label}
                    >
                      {field.options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ) : (
                  <Input
                    label={field.label}
                    name={field.name}
                    value={currentRow ? currentRow[field.name] || "" : ""}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    required={field.required}
                    type={field.type || "text"}
                  />
                )}
              </div>
            ))}
          </DialogContent>
          <DialogActions>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <CustomButton
                inverted={true}
                label="Cancel"
                onclick={handleCloseModal}
              />
              <CustomButton
                inverted={false}
                label="Save Changes"
                type=""
                onclick={handleSaveChanges}
              />
            </Box>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
}

export default YelamList;
