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

const fields = [
  { label: "Pulli ID (Primary Key)", name: "pulli_id", required: true },
  { label: "Family Name", name: "family_name", required: true },
  { label: "Name", name: "name", required: true },
  { label: "Spouse Name", name: "spouse_name", required: false },
  {
    label: "Address Line 1",
    name: "address_line_1",
    required: true,
    type: "text area",
  },
  { label: "Address Line 2", name: "addressLine2", required: true },
  { label: "City", name: "city", required: true },
  { label: "State", name: "state", required: true },
  { label: "Pin Code", name: "pin_code", required: true },
  { label: "Mobile Number 1", name: "mobile_1", required: true, type: "tel" },
  {
    label: "Mobile Number 2(Spouse)",
    name: "mobile2(spouse)",
    required: true,
    type: "tel",
  },
  {
    label: "Whatsapp Number 1",
    name: "Whatsapp1",
    required: true,
    type: "tel",
  },
  {
    label: "Whatsapp Number 2",
    name: "Whatsapp2",
    required: true,
    type: "tel",
  },
  { label: "Email ID 1", name: "email_id_1", required: true, type: "email" },
  {
    label: "Native",
    name: "native",
    required: true,
    type: "dropdown",
    options: [
      { value: "valayapatti", label: "valayapatti" },
      { value: "Kallal", label: "Kallal" },
      { value: "Kandanur", label: "Kandanur" },
      { value: "Karaikudi", label: "Karaikudi" },
      { value: "Melaisivapuri", label: "Melaisivapuri" },
    ],
  },
  {
    label: "Karai",
    name: "karai",
    required: true,
    type: "dropdown",
    options: [
      { value: "Panaivaikum Karai", label: "Panaivaikum Karai" },
      { value: "Samiyadi karai", label: "Samiyadi karai" },
      { value: "Poosari karai", label: "Poosari karai" },
    ],
  },
  {
    label: "Token Number",
    name: "token_number",
    required: false,
    type: "number",
  },
  {
    label: "Token Year",
    name: "token_year",
    required: false,
    type: "dropdown", // Specify that this is a dropdown field
    options: [
      { value: "2005", label: "2005" },
      { value: "2006", label: "2006" },
      { value: "2007", label: "2007" },
      { value: "2008", label: "2008" },
      { value: "2009", label: "2009" },
      { value: "2010", label: "2010" },
      { value: "2011", label: "2011" },
      { value: "2012", label: "2012" },
      { value: "2013", label: "2013" },
      { value: "2014", label: "2014" },
      { value: "2015", label: "2015" },
      { value: "2016", label: "2016" },
      { value: "2017", label: "2017" },
      { value: "2018", label: "2018" },
      { value: "2019", label: "2019" },
      { value: "2020", label: "2020" },
      { value: "2021", label: "2021" },
      { value: "2022", label: "2022" },
      { value: "2023", label: "2023" },
      { value: "2024", label: "2024" },
      { value: "2025", label: "2025" },
      { value: "2026", label: "2026" },
      { value: "2027", label: "2027" },
      { value: "2028", label: "2028" },
      { value: "2029", label: "2029" },
      { value: "2030", label: "2030" },
      { value: "2031", label: "2031" },
      { value: "2032", label: "2032" },
      { value: "2033", label: "2033" },
      { value: "2034", label: "2034" },
      { value: "2035", label: "2035" },
      { value: "2036", label: "2036" },
      { value: "2037", label: "2037" },
      { value: "2038", label: "2038" },
      { value: "2039", label: "2039" },
      { value: "2040", label: "2040" },
      { value: "2041", label: "2041" },
      { value: "2042", label: "2042" },
      { value: "2043", label: "2043" },
      { value: "2044", label: "2044" },
      { value: "2045", label: "2045" },
    ],
  },
];

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
            {fields.map((field) => (
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
