import { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import api from "../api";

import * as XLSX from "xlsx"; // For Excel export
import jsPDF from "jspdf"; // For PDF export
import autoTable from "jspdf-autotable"; // Import the plugin
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"; // Import the arrow icon

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
  const [anchorEl, setAnchorEl] = useState(null);

  //Menu for Export and click handles
  const openMenu = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  //defining export to pdf
  const exportToPDF = () => {
    const doc = new jsPDF();

    // Prepare headers and table data
    const headers = [fields.map((field) => field.label)];
    const tableData = filteredRows.map((row) =>
      fields.map((field) => row[field.name] || "")
    );

    // Add Table using autoTable
    autoTable(doc, {
      head: headers,
      body: tableData,
      startY: 20, // Space from the top of the page
      styles: { fontSize: 10 }, // Adjust font size if needed
    });
    doc.save("table_data.pdf");
    handleMenuClose();
  };

  //defining export to excel

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredRows.map((row) => {
        const result = {};
        fields.forEach((field) => {
          result[field.label] = row[field.name] || "";
        });
        return result;
      })
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "TableData");
    XLSX.writeFile(workbook, "table_data.xlsx");
    handleMenuClose();
  };

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
      <Box
        sx={{
          display: "flex", // Align items horizontally
          alignItems: "center", // Align vertically in the center
          width: "100%", // Full width of the container
          marginBottom: "10px", // Space between rows
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

        {/* Export dropdoown menu */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleMenuClick}
          sx={{
            height: "40px",
            boxShadow: "none",
            textTransform: "none",
            backgroundColor: "rgb(240, 128, 1)",
            color: "#fff",
            marginLeft: "20px",
            marginTop: "2px",
            "&:hover": {
              backgroundColor: "#d56e01", // Darker orange on hover
            },
            paddingRight: "10px", // Space for the icon on the right
          }}
          endIcon={<ArrowDropDownIcon />} // Add downward arrow icon
        >
          Export
        </Button>
      </Box>

      {/* Export Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleMenuClose}
        sx={{
          "& .MuiMenuItem-root": {
            fontSize: "0.8rem", // Small font size for menu items
          },
          "& .MuiMenuItem-root:hover": {
            backgroundColor: "rgb(240, 128, 1)", // Hover color
            color: "white", // White font on hover
          },
        }}
      >
        <MenuItem onClick={exportToPDF}>Export to PDF</MenuItem>
        <MenuItem onClick={exportToExcel}>Export to Excel</MenuItem>
      </Menu>

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
