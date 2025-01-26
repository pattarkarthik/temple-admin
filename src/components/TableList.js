import { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Stack,
  MenuItem,
  FormControl,
  InputLabel,
  Menu,
  Avatar,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import * as XLSX from "xlsx"; // For Excel export
import jsPDF from "jspdf"; // For PDF export
import autoTable from "jspdf-autotable"; // Import the plugin
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"; // Import the arrow icon
import CustomButton from "./CustomButton";
import Input from "./Input";
import CustomSelect from "./CustomSelect";

export default function TableList({
  openEdit,
  data,
  fields,
  showEdit = false,
  showPaymentStatus = false, // Prop to toggle the "Payment Status" button
  handlePaymentStatus,
  filterFields = [],
}) {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [filters, setFilters] = useState({
    city: "",
    karai: "",
    native: "",
  });
  useEffect(() => {
    setRows(data);
    setFilteredRows(data);
  }, [data]);

  const uniqueValues = (key) => [
    { label: "All", value: "" },
    ...new Set(
      data.map((row) => {
        return { label: row[key], value: row[key] };
      })
    ),
  ];

  const handleFilterChange = (key, value) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);
    applyFilters(searchTerm, updatedFilters);
  };
  const openMenu = Boolean(anchorEl);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

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

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    applyFilters(value, filters);
  };

  const applyFilters = (search, filters) => {
    const { city, karai, native } = filters;
    const filtered = rows.filter((row) => {
      const matchesSearch =
        !search ||
        fields.some((field) =>
          String(row[field.name]).toLowerCase().includes(search)
        );
      const matchesCity = !city || row.city === city;
      const matchesKarai = !karai || row.karai === karai;
      const matchesNative = !native || row.native === native;

      return matchesSearch && matchesCity && matchesKarai && matchesNative;
    });

    setFilteredRows(filtered);
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
          display: "flex",
          gap: "16px",
          marginBottom: "10px",
          alignItems: "flex-end",
        }}
      >
        <Input
          required={null}
          label={null}
          type={"text"}
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search"
          width={"100%"}
        />
        {filterFields &&
          filterFields.map((filter) => (
            <FormControl
              key={filter.key}
              size="small"
              sx={{ minWidth: "150px" }}
            >
              <InputLabel>{filter.label}</InputLabel>
              <CustomSelect
                value={filters.city}
                fields={uniqueValues(filter.key)}
                onChange={(value) => handleFilterChange(filter.key, value)}
                width={"100%"}
              />
            </FormControl>
          ))}

        <CustomButton
          inverted={true}
          label="Export"
          onclick={handleMenuClick}
          endIcon={<ArrowDropDownIcon />}
        />
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
              {showEdit && (
                <TableCell
                  align="left"
                  sx={{
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
                  sx={{
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
          <TableBody>
            {filteredRows.map((row) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                {showEdit && (
                  <TableCell align="left">
                    <Stack spacing={2} direction="row">
                      {showEdit && openEdit && (
                        <EditIcon
                          style={{
                            fontSize: "20px",
                            color: "#f08001",
                            cursor: "pointer",
                          }}
                          onClick={() => openEdit(row.pulli_id)}
                        />
                      )}
                    </Stack>
                  </TableCell>
                )}
                {fields.map((field) => (
                  <TableCell key={field.name} align="left">
                    {field.name === "balance" ? (
                      <Box
                        sx={{ display: "flex", justifyContent: "space-around" }}
                      >
                        {row[field.name]}
                        {field.name === "balance" ? (
                          <EditIcon
                            style={{
                              fontSize: "20px",
                              color: "#f08001",
                              cursor: "pointer",
                            }}
                            onClick={() => handlePaymentStatus(row)}
                          />
                        ) : (
                          ""
                        )}
                      </Box>
                    ) : field.type === "photo" ? (
                      <Avatar alt="" src={row[field.name]} />
                    ) : (
                      row[field.name]
                    )}
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
