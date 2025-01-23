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
import api from "../api.js";
import { ProductData } from "../assets/ProductReceivedData.js";
import CustomButton from "../components/CustomButton.js";
import Loader from "../components/Loader";
import CustomAlert from "../components/CustomAlert";
import Input from "../components/Input.js";
import { number } from "prop-types";

const ProductFields = [
  // { label: "Edit", name: "edit" }, 
  { label: "Yelam Porul", name: "yelamPorul",required:true },
  { label: "Pulli Id", name: "pulliId",required:true },
  { label: "Name", name: "name" },
  { label: "Native", name: "native" },
  { label: "Whatsup Number 1", name: "whatsupNumber1" },
  { label: "Whatsup Number 2", name: "whatsupNumber2" },
  { label: "Product Receiving Number", name: "productReceivingNumber" },
  { label: "Product Value", name: "productValue" },
  { label: "Remark", name: "remark" },
];

function ProductReceivedList( ) {
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
        borderRadius: "4px", // Optional: Add rounded corners
        fontWeight: "bold",
        fontSize: "1.5rem",
      }}
      >
        PRODUCT RECEIVED LIST
      </Typography>

      {loading && <Loader />}

      {/* Alerts */}
      {successAlert && (
        <CustomAlert
          severity="success"
          message="Member updated successfully!"
        />
      )}
      {errorAlert && (
        <CustomAlert
          severity="error"
          message="There was an error updating the member."
        />
      )}

      {/* TableList */}
      <TableList
        openEdit={null}
        fields={ProductFields}
        data={ProductData}
      />

      {/* Edit Dialog */}
      <Dialog open={openEditModal} onClose={handleCloseModal}>
        <Box sx={{ width: "500px" }}>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogContent>
            {/* <Profilepic /> */}
            {ProductFields.map((field) => (
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

export default ProductReceivedList;
