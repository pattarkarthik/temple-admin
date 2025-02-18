import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { TableVirtuoso } from "react-virtuoso";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
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
  { label: "Yelam Poral/Product", name: "YelamPoral", required: true },
  { label: "Value", name: "value", required: true },
  { label: "Pulli ID (Primary Key)", name: "pulliID", required: true },
  { label: "Name", name: "name", required: true },
  { label: "Native", name: "Native", required: true },
  { label: "WhatsApp No 1", name: "whatsapp1", required: false, type: "tel" },
  { label: "Manual Book Sr no", name: "BookNo", required: true },
  { label: "State", name: "state", required: true },
  { label: "Remark", name: "Remark", required: true },

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
];

const updatedFields = [
  { label: "Yelam Id", name: "yelamid", required: true },
  { label: "Name", name: "name", required: true },
  { label: "Yelam Porul", name: "YelamPorul", required: true },
  { label: "Receipt No", name: "ReceiptNo", required: true },
  { label: "Amount", name: "Amount", required: true },
];
function DataTable({ title, columns, data }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const handleClose = () => setOpen(false);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePaymentStatusClick = (row) => {
    setSelectedRow(row);
    setOpen(true);
  };

  const filteredRows = data.filter((row) => {
    return columns.some((column) =>
      String(row[column.dataKey])
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  });

  // const handleEditClick = (row) => {
  //   setSelectedRow(row);
  //   setOpen(true);
  // };

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
        if (column.label === "Payment Status") {
          return (
            <TableCell
              key={column.dataKey}
              onClick={() => handlePaymentStatusClick(row)}
              sx={{
                cursor: "pointer",
                color: "blue",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              {row[column.dataKey]}
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
      style={{
        height: "1000px", // Full height of the container
        width: "100%",
        display: "Inline-Block",
        flexDirection: "column",
      }}
    >
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
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        sx={{
          marginBottom: 2,
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
            "&:hover fieldset": {
              borderColor: "rgba(38, 198, 218)",
            },
          },
        }}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <TableVirtuoso
        data={filteredRows}
        components={{
          Scroller: React.forwardRef((props, ref) => (
            <div
              {...props}
              ref={ref}
              style={{
                overflowY: "auto",
                overflowX: "auto", // Ensure both horizontal and vertical scrolling
                height: "calc(100% - 20px)", // Leave space for the horizontal scrollbar
                position: "relative",
              }}
            >
              <div
                style={{
                  minWidth: "1200px",
                }}
              >
                {props.children}
              </div>
            </div>
          )),
          Table: (props) => (
            <Table
              {...props}
              sx={{
                borderCollapse: "separate",
                tableLayout: "auto", // Let the table adjust column widths automatically
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
        fields={updatedFields}
        purpose="YelamDataTable" // to not render upload avatar component
      />
    </Paper>
  );
}

export default DataTable;
