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
  {
    label: "Native",
    name: "Native",
    required: true,
    type: "dropdown", // Specify that this is a dropdown field
    options: [
      { value: "valayapatti", label: "valayapatti" },
      { value: "Kallal", label: "Kallal" },
      { value: "Kandanur", label: "Kandanur" },
      { value: "Karaikudi", label: "Karaikudi" },
      { value: "Melaisivapuri", label: "Melaisivapuri" },
      { value: "Ponnamaravathi", label: "Ponnamaravathi" },
      { value: "Venthampatti", label: "Venthampatti" },
      { value: "Mahivalambatti", label: "Mahivalambatti" },
      { value: "A.thekkur", label: "A.thekkur" },
      { value: "Rangiem", label: "Rangiem" },
      { value: "Nerkuppai", label: "Nerkuppai" },
    ],
  },
  {
    label: "Karai",
    name: "karai",
    required: true,
    type: "dropdown", // Specify that this is a dropdown field
    options: [
      { value: "Panaivaikum Karai", label: "Panaivaikum Karai" },
      { value: "Samiyadi karai", label: "Samiyadi karai" },
      { value: "Poosari karai", label: "Poosari karai" },
    ],
  },

  // Custom Columns
  {
    label: "Token Number",
    name: "TokenNumber",
    required: false,
    type: "number",
  },
  {
    label: "Token Year",
    name: "TokenYear",
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
    <Paper
      elevation={3}
      sx={{
        padding: "30px",
        width: "95%",
        display: "flex",
        flexDirection: "column",
      }}
    >
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
    </Paper>
    // <Paper style={{ height: "800px", width: "100%" }}>
    //   <StyledTopSection>
    //     <Typography variant="h6">{title}</Typography>
    //     <TextField
    //       label="Search"
    //       variant="outlined"
    //       size="small"
    //       value={searchTerm}
    //       onChange={handleSearchChange}
    //       sx={{ width: "250px" }}
    //     />
    //   </StyledTopSection>

    //   <FormModal
    //     open={open}
    //     handleClose={handleClose}
    //     rowData={selectedRow}
    //     fields={fields} // edit for customized fields
    //   />
    // </Paper>
  );
}

export default DataTable;
