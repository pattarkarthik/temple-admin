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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import api from "../api";

export default function TableList({
  openEdit,
  data,
  fields,
  showEdit = false,
  showPaymentStatus = false, // Prop to toggle the "Payment Status" button
  handlePaymentStatus, // New prop
}) {
  const [rows, setRows] = useState(data);
  const [filteredRows, setFilteredRows] = useState(data);
  const deleteUser = async (id) => {
    try {
      const res = await api.delete(`/api/Products/${id}/`);
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
        width: "100%",
        flexGrow: 2,
        borderRadius: "0px",
        backgroundColor: "rgb(255, 231, 218)",
      }}
    >
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={rows}
        sx={{ width: 300, backgroundColor: "rgb(255, 231, 218)" }}
        onChange={(e, selected) => filterData(selected)}
        getOptionLabel={(option) => option.name || "Unnamed Member"}
        renderInput={(params) => (
          <TextField {...params} size="small" label="Search Member" />
        )}
      />
      <Box height={10} />
      <TableContainer
        sx={{
          maxHeight: "650px",
          width: "100%",
          backgroundColor: "rgb(255, 231, 218)",
        }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead sx={{ backgroundColor: "rgb(255, 231, 218)" }}>
            <TableRow
              sx={{
                backgroundColor: "rgb(255, 231, 218)",
              }}
            >
              {(showEdit || showPaymentStatus) && (
                <TableCell
                  align="left"
                  style={{
                    minWidth: "100px",
                    backgroundColor: "rgb(255, 231, 218)",
                    fontWeight: "bold",
                  }}
                >
                  Action
                </TableCell>
              )}
              {fields.map((field) => (
                <TableCell
                  align="left"
                  style={{
                    minWidth: "100px",
                    backgroundColor: "rgb(255, 231, 218)",
                    fontWeight: "bold",
                  }}
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
                {(showEdit || showPaymentStatus) && (
                  <TableCell align="left">
                    <Stack spacing={2} direction="row">
                      {showEdit && openEdit && (
                        <EditIcon
                          style={{
                            fontSize: "20px",
                            color: "#f08001",
                            cursor: "pointer",
                          }}
                          onClick={() => openEdit(row.id)}
                        />
                      )}
                      {showPaymentStatus && (
                        <button
                          style={{
                            fontSize: "14px",
                            padding: "5px 10px",
                            backgroundColor: "#f08001",
                            color: "#fff",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                          }}
                          onClick={() => handlePaymentStatus(row)} // Pass the row data
                        >
                          Payment Status
                        </button>
                      )}
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
                )}
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
