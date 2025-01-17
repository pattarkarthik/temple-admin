import { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { data } from "../assets/Data";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import api from "../api";

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

export default function TableList({ openEdit }) {
  const [rows, setRows] = useState(data);
  const [filteredRows, setFilteredRows] = useState(data);

  const deleteUser = async (id) => {
    try {
      const res = await api.delete(`/api/members/${id}/`);
      if (res.status === 204) {
        alert("Member Deleted successfully");
      }
    } catch (error) {
    } finally {
    }
  };

  const filterData = (selected) => {
    if (selected) {
      setFilteredRows(rows.filter((row) => row.id === selected.id));
    } else {
      setFilteredRows(rows);
    }
  };

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "10px",
        width:"100%",
        flexGrow: 2,
        // overflow: "auto",
      }}
    >
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={rows}
        sx={{ width: 300 }}
        onChange={(e, selected) => filterData(selected)}
        getOptionLabel={(option) => option.name || "Unnamed Member"}
        renderInput={(params) => (
          <TextField {...params} size="small" label="Search Member" />
        )}
      />
      <Box height={10} />
      <TableContainer
        sx={{
          // overflowY: "auto",
          maxHeight: "650px",
          width: "100%", 
        }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="left" style={{ minWidth: "100px" }}>
                Action
              </TableCell>
              {fields.map((field) => (
                <TableCell
                  align="left"
                  style={{ minWidth: "100px" }}
                  key={field.name}
                >
                  {field.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody sx={{ maxHeight: "100px" }}>
            {filteredRows.map((row) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                <TableCell align="left">
                  <Stack spacing={2} direction="row">
                    <EditIcon
                      style={{
                        fontSize: "20px",
                        color: "#f08001",
                        cursor: "pointer",
                      }}
                      onClick={() => openEdit(row.id)}
                    />
                    <DeleteIcon
                      style={{
                        fontSize: "20px",
                        color: "#f08001",
                        cursor: "pointer",
                      }}
                      onClick={() => deleteUser(row.id)}
                    />
                  </Stack>
                </TableCell>
                {fields.map((field) => (
                  <TableCell key={field.name} align="left">
                    {row[field.name]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
