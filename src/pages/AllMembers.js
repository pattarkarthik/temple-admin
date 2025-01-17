import { useState } from "react";
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
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Profilepic from "../components/Profilepic.js";
import api from "../api.js";
import { editFormFields } from "../assets/Data.js";
import CustomButton from "../components/CustomButton.js";

function AllMembers() {
  const [openEditModal, setOpenEditModal] = useState(false); // Modal visibility
  const [currentRow, setCurrentRow] = useState(null); // Row data for editing
  const [originalRow, setOriginalRow] = useState(null); // Original data to compare changes

  const openEdit = async (id) => {
    try {
      const res = await api.get(`/api/members/${id}/`);
      setCurrentRow(res.data); // Set API data to currentRow state
      setOriginalRow(res.data); // Store the original data for comparison
    } catch (error) {}
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
        }}
      >
        ALL MEMBERS
      </Typography>
      <TableList openEdit={openEdit} />
      <Dialog open={openEditModal} onClose={handleCloseModal}>
        <Box sx={{ width: "500px" }}>
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
            <Box sx={{display:"flex", width:"100%", justifyContent:"space-between"}}>
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

    // <Box sx={{ maxWidth: "75%", minHeight: "750px", maxHeight: "750px" }}>
    //   <TableList openEdit={openEdit} />

    // </Box>
  );
}

export default AllMembers;
