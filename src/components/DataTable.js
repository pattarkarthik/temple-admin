import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { TableVirtuoso } from "react-virtuoso";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import FormModal from "./FormModal";

const StyledTopSection = styled("div")(({ theme }) => ({
  backgroundColor: "rgba(38, 198, 218, 0.8)", // Semi-transparent background for the top section
  color: theme.palette.common.white, // White text color
  borderRadius: "8px 8px 0 0", // Rounded corners for the top section
  padding: "10px",
  // Space between the top section and the table
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  position: "relative",
}));

const fields = [
  { label: "Family Name", name: "familyName", required: true },
  { label: "Name", name: "name", required: true },
  { label: "Spouse Name", name: "spouseName", required: false },
  // {
  //   label: "Photo 1",
  //   name: "photo1",
  //   required: false,
  //   type: "file",
  // },
  // {
  //   label: "Photo 2",
  //   name: "photo2",
  //   required: false,
  //   type: "file",
  // },

  // Communication Address fields
  { label: "Address Line 1", name: "addressLine1", required: true },
  { label: "Address Line 2", name: "addressLine2", required: false },
  { label: "City", name: "city", required: true },
  { label: "State", name: "state", required: true },
  { label: "Pin Code", name: "pinCode", required: true },

  // Mobile Numbers
  { label: "Mobile 1", name: "mobile1", required: true, type: "tel" },
  {
    label: "Mobile 2 (Spouse)",
    name: "mobile2Spouse",
    required: false,
    type: "tel",
  },

  // WhatsApp Numbers
  { label: "WhatsApp No 1", name: "whatsapp1", required: false, type: "tel" },
  { label: "WhatsApp No 2", name: "whatsapp2", required: false, type: "tel" },

  // Email IDs
  { label: "Email ID 1", name: "email1", required: true, type: "email" },
  { label: "Email ID 2", name: "email2", required: false, type: "email" },

  // Primary Key (Pulli ID)
  { label: "Pulli ID (Primary Key)", name: "pulliID", required: true },

  // Native and Karai
  { label: "Native", name: "native", required: true },
  { label: "Karai", name: "karai", required: true },

  // Custom Columns
  {
    label: "Custom Column 1 - Year",
    name: "customColumn1Year",
    required: false,
  },
  {
    label: "Custom Column 1 - Allowed Number",
    name: "customColumn1Number",
    required: false,
    type: "number",
  },
  { label: "Custom Column 1", name: "customColumn1", required: false },
];

function DataTable({ title, columns, data }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const handleClose = () => setOpen(false);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredRows = data.filter((row) => {
    return columns.some((column) =>
      String(row[column.dataKey])
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  });
  const handleEditClick = (row) => {
    setSelectedRow(row);
    setOpen(true);
  };

  const fixedHeaderContent = () => (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align={column.numeric ? "right" : "left"}
          sx={{
            backgroundColor: "background.paper",
            minWidth: 150,
            verticalAlign: "top",
            fontWeight: "bold",
          }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );

  const rowContent = (_index, row) => (
    <React.Fragment>
      {columns.map((column) => {
        if (column.label === "Edit") {
          return (
            <TableCell key={column.dataKey}>
              <IconButton onClick={() => handleEditClick(row)}>
                <EditIcon />
              </IconButton>
            </TableCell>
          );
        }
        return (
          <TableCell
            key={column.dataKey}
            align={column.numeric ? "right" : "left"}
          >
            {row[column.dataKey]}
          </TableCell>
        );
      })}
    </React.Fragment>
  );

  return (
    <Paper style={{ height: "800px", width: "100%" }}>
      <StyledTopSection>
        <Typography variant="h6">{title}</Typography>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ width: "250px" }}
        />
      </StyledTopSection>
      <TableVirtuoso
        data={filteredRows}
        components={{
          Scroller: React.forwardRef((props, ref) => (
            <TableContainer component={Paper} {...props} ref={ref} />
          )),
          Table: (props) => (
            <Table
              {...props}
              sx={{
                borderCollapse: "separate",
                tableLayout: "auto",
              }}
            />
          ),
          TableHead: React.forwardRef((props, ref) => (
            <TableHead {...props} ref={ref} />
          )),
          TableRow,
          TableBody: React.forwardRef((props, ref) => (
            <TableBody {...props} ref={ref} />
          )),
        }}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
      <FormModal
        open={open}
        handleClose={handleClose}
        rowData={selectedRow}
        fields={fields}
      />
    </Paper>
  );
}

export default DataTable;
