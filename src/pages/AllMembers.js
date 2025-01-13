import { useState } from "react";
import { Box } from "@mui/material";
import TableList from "../components/TableList.js";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Profilepic from "../components/Profilepic.js";

const fields = [
  { label: "Family Name", name: "familyName", required: true },
  { label: "Name", name: "name", required: true },
  { label: "Spouse Name", name: "spouseName", required: false },
  { label: "Photo1", name: "photo1", required: false },
  { label: "Photo2", name: "photo2", required: false },
  { label: "Address Line 1", name: "addressLine1", required: true },
  { label: "Address Line 2", name: "addressLine2", required: false },
  { label: "City", name: "city", required: true },
  { label: "State", name: "state", required: true },
  { label: "Pin Code", name: "pinCode", required: true },
  { label: "Mobile 1", name: "mobile1", required: true, type: "tel" },
  {
    label: "Mobile 2 (Spouse)",
    name: "mobile2Spouse",
    required: false,
    type: "tel",
  },
  { label: "WhatsApp No 1", name: "whatsapp1", required: false, type: "tel" },
  { label: "WhatsApp No 2", name: "whatsapp2", required: false, type: "tel" },
  { label: "Email ID 1", name: "email1", required: true, type: "email" },
  { label: "Email ID 2", name: "email2", required: false, type: "email" },
  { label: "Pulli ID (Primary Key)", name: "pulliID", required: true },
];

const AllMembers = () => {
  const [openEditModal, setOpenEditModal] = useState(false); // Modal visibility
  const [currentRow, setCurrentRow] = useState(null); // Row data for editing

  const openEdit = (row) => {
    setCurrentRow(row);
    setOpenEditModal(true);
  };

  const handleCloseModal = () => {
    setOpenEditModal(false);
    setCurrentRow(null); // Reset the current row when closing
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentRow((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    console.log("Updated row:", currentRow);
    setOpenEditModal(false);
    setCurrentRow(null);
  };

  return (
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

      <Dialog open={openEditModal} onClose={handleCloseModal}>
        <DialogTitle>Edit Member</DialogTitle>
        <DialogContent>
          <Profilepic />
          {fields.map((field) => (
            <TextField
              key={field.name}
              label={field.label}
              name={field.name}
              value={currentRow ? currentRow[field.name] : ""}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              required={field.required}
              type={field.type || "text"}
            />
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
      </Dialog>
    </Box>
  );
};

export default AllMembers;
