import React, { useEffect, useState } from "react";
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
import Profilepic from "../components/Profilepic.js";
import api from "../util/api.js"
import { newMembersData } from "../assets/Data.js";
import { newMembersFields } from "../assets/Data.js";
import { editFormFields } from "../assets/Data.js";
import CustomButton from "../components/CustomButton.js";
import Loader from "../components/Loader";
import CustomAlert from "../components/CustomAlert";
import Input from "../components/Input.js";

function AllMembers() {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [data, setData] = useState([]);
  const [currentRow, setCurrentRow] = useState(null);
  const [originalRow, setOriginalRow] = useState(null); // Original data to compare changes
  const [loading, setLoading] = useState(false); // Loading state
  const [successAlert, setSuccessAlert] = useState(false); // Success alert state
  const [errorAlert, setErrorAlert] = useState(false); // Error alert state

  const fetchMembers = async () => {
    try {
      const res = await api.get(`/api/members/`);
      setData(res.data);
      setLoading(true);
    } catch (error) {
      setLoading(false);
      setErrorAlert(true);
      setTimeout(() => setErrorAlert(false), 5000); // Auto-dismiss alert
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // fetchMembers();
  }, []);
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

    Object.keys(changedFields).forEach((key) => {
      if (changedFields[key] !== undefined) {
        data.append(key, changedFields[key]);
      }
    });

    setLoading(true);
    try {
      const res = await api.patch(`/api/members/${currentRow.id}/`, data);
      if (res.status === 200) {
        setSuccessAlert(true);
        setTimeout(() => setSuccessAlert(false), 5000); // Auto-dismiss alert
        alert("Member updated successfully");
      }
    } catch (error) {
      setErrorAlert(true);
      setTimeout(() => setErrorAlert(false), 5000); // Auto-dismiss alert
    } finally {
      setLoading(false);
    }

    setOpenEditModal(false);
    setCurrentRow(null);
    setOriginalRow(null);
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
        ALL MEMBERS
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

      <TableList
        openEdit={openEdit}
        data={newMembersData}
        fields={newMembersFields}
        showEdit={true} 
      />

      <Dialog open={openEditModal} onClose={handleCloseModal}>
        <Box sx={{ width: "500px" }}>
          <DialogTitle>Edit Member</DialogTitle>
          <DialogContent>
            <Profilepic />
            {editFormFields.map((field) => (
              <div key={field.name}>
                {field.type === "dropdown" ? (
                  <FormControl
                    fullWidth
                    size="small"
                    sx={{
                      marginTop: "10px",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <Box sx={{ width: "30%", fontSize: "17px" }}>
                      {field.label}
                    </Box>
                    <Select
                      sx={{
                        width: "65%",
                        backgroundColor: "rgb(255, 250, 245)",
                        borderRadius: "10px",
                      }}
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

export default AllMembers;
