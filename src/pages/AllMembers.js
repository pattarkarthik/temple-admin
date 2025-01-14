import { useState } from "react";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import TableList from "../components/TableList.js";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Profilepic from "../components/Profilepic.js";
import api from "../api.js";
import { editFormFields } from "../assets/Data.js";

const AllMembers = () => {
  const [openEditModal, setOpenEditModal] = useState(false); // Modal visibility
  const [currentRow, setCurrentRow] = useState(null); // Row data for editing
  const [originalRow, setOriginalRow] = useState(null); // Original data to compare changes

  const openEdit = async (id) => {
    try {
      const res = await api.get(`/api/members/${id}/`);
      setCurrentRow(res.data); // Set API data to currentRow state
      setOriginalRow(res.data); // Store the original data for comparison
    } catch (error) {
      // Handle error
    }
    setOpenEditModal(true);
  };

  const handleCloseModal = () => {
    setOpenEditModal(false);
    setCurrentRow(null); // Reset the current row when closing
    setOriginalRow(null); // Reset the original row
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
    // Log the fields that have been changed
    const changedFields = Object.keys(currentRow)
      .filter((key) => currentRow[key] !== originalRow[key])
      .reduce((acc, key) => {
        acc[key] = currentRow[key];
        return acc;
      }, {});
    const data = new FormData();

    // Append form values to FormData
    Object.keys(changedFields).forEach((key) => {
      if (changedFields[key] !== undefined) {
        data.append(key, changedFields[key]);
      }
    });
    try {
      const res = await api.patch(`/api/members/${currentRow.id}/`, data);
      if (res.status === 200) {
        alert("Member updated successfully");
      }
    } catch (error) {
    } finally {
    }

    setOpenEditModal(false);
    setCurrentRow(null);
    setOriginalRow(null);
  };

  return (
    <Box sx={{ maxWidth: "75%", minHeight: "750px", maxHeight: "750px" }}>
      <Box
        sx={{
          display: "flex",
          marginTop: "5%",
          marginLeft: "3%",
          maxWidth: "75%",
          minHeight: "750px",
          maxHeight: "750px",
          marginBottom: "50px",
        }}
      >
        <TableList openEdit={openEdit} />
      </Box>

      <Dialog open={openEditModal} onClose={handleCloseModal}>
        <Box sx={{ width: "600px" }}>
          <DialogTitle>Edit Member</DialogTitle>
          <DialogContent>
            <Profilepic />
            {editFormFields.map((field) => (
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
                  <TextField
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
            <Button onClick={handleCloseModal} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSaveChanges} color="primary">
              Save Changes
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};

export default AllMembers;
