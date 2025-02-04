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
import PrintIcon from "@mui/icons-material/Print";
import CustomButton from "./CustomButton";
import Input from "./Input";
import CustomSelect from "./CustomSelect";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import PrintLayout from "./PrintLayout";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

export default function TableList({
  openEdit,
  data,
  fields,
  showEdit = false, // Prop to toggle the "Payment Status" button
  handlePaymentStatus,
  filterFields = [],
  page = "",
  handleAddProductModal,
}) {
  const [rows, setRows] = useState([]);
  const [openPrintModal, setOpenPrintModal] = useState(false);
  const [filteredRows, setFilteredRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    city: "",
    karai: "",
    native: "",
  });
  useEffect(() => {
    setRows(data);
    setFilteredRows(data);
  }, [data]);
  const uniqueValues = (key) => {
    const uniqueObjects = [];
    data.forEach((row) => {
      const obj = { label: row[key], value: row[key] };
      if (
        !uniqueObjects.some(
          (item) => item.label === obj.label && item.value === obj.value
        )
      ) {
        uniqueObjects.push(obj);
      }
    });

    return [{ label: "All", value: "" }, ...uniqueObjects];
  };

  const handleFilterChange = (key, value) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);
    applyFilters(searchTerm, updatedFilters);
  };

  const exportToExcel = (data) => {
    const worksheet = XLSX.utils.json_to_sheet(
      data.map((row) => {
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
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    applyFilters(value, filters);
  };

  const getButtons = (page) => {
    switch (page) {
      case "catalog":
        return (
          <CustomButton
            inverted={false}
            label="Add Product"
            width={"40%"}
            onclick={handleAddProductModal}
          />
        );
      case "allmembers":
        return (
          <>
            <CustomButton
              inverted={true}
              label="Print"
              onclick={() => setOpenPrintModal(true)}
              endIcon={<PrintIcon />}
            />
            <CustomButton
              inverted={true}
              label="All"
              onclick={() => exportToExcel(rows)}
              startIcon={<FileDownloadIcon />}
            />
            <CustomButton
              inverted={true}
              label="Selected"
              onclick={() => exportToExcel(filteredRows)}
              startIcon={<FileDownloadIcon />}
            />
          </>
        );
      default:
        return;
    }
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
    <>
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

          {getButtons(page)}
        </Box>

        <TableContainer
          sx={{
            maxHeight: "70vh",
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
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.pulli_id}
                >
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
                      {field.name === "update_payment" ? (
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-around",
                          }}
                        >
                          {row[field.name]}
                          {field.name === "update_payment" ? (
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
                      ) : field.name === "transactions" ? (
                        <ReceiptLongIcon
                          style={{
                            fontSize: "20px",
                            color: "#f08001",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            console.log(row);
                          }}
                        />
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

      <PrintLayout
        // closePrintModal={() => setOpenPrintModal(false)}
        members={filteredRows}
        fields={fields}
        openPrintModal={openPrintModal}
        closePrintModal={() => setOpenPrintModal(false)}
      />
    </>
  );
}
