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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const fields = [
  { label: "Pulli ID (Primary Key)", name: "pulli_id", required: true },
  { label: "Name", name: "name", required: true },
  { label: "Family Name", name: "family_name", required: true },
  { label: "Spouse Name", name: "spouse_name", required: false },
  {
    label: "Mobile 2 (Spouse)",
    name: "mobile_2_spouse",
    required: false,
    type: "tel",
  },
  {
    label: "WhatsApp No 1",
    name: "whatsapp_no_1",
    required: false,
    type: "tel",
  },
  {
    label: "WhatsApp No 2",
    name: "whatsapp_no_2",
    required: false,
    type: "tel",
  },
  { label: "Address Line 1", name: "address_line_1", required: true },
  { label: "Address Line 2", name: "address_line_2", required: false },
  { label: "City", name: "city", required: true },
  { label: "State", name: "state", required: true },
  { label: "Pin Code", name: "pin_code", required: true },
  { label: "Mobile 1", name: "mobile_1", required: true, type: "tel" },
  { label: "Email ID 1", name: "email_id_1", required: true, type: "email" },
  { label: "Email ID 2", name: "email_id_2", required: false, type: "email" },
  { label: "Karai", name: "karai", required: true },
  { label: "Native", name: "native", required: true },
];

export default function TableList({ openEdit, data }) {
  const [rows, setRows] = useState([]);
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

  const uniqueValues = (key) => [...new Set(data.map((row) => row[key]))];

  const handleFilterChange = (key, value) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);
    applyFilters(searchTerm, updatedFilters);
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
      {/* Filters */}
      <Box sx={{ display: "flex", gap: "16px", marginBottom: "10px" }}>
        <TextField
          size="small"
          label="Search Member"
          value={searchTerm}
          onChange={handleSearch}
          sx={{ width: "150px" }}
        />
        <FormControl size="small" sx={{ minWidth: "150px" }}>
          <InputLabel id="demo-select-small-label">City</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={filters.city}
            size="small"
            onChange={(e) => handleFilterChange("city", e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {uniqueValues("city").map((city, idx) => (
              <MenuItem key={idx} value={city}>
                {city}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: "150px" }}>
          <InputLabel id="demo-select-small-label">Karai</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={filters.karai}
            onChange={(e) => handleFilterChange("karai", e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {uniqueValues("karai").map((karai, idx) => (
              <MenuItem key={idx} value={karai}>
                {karai}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: "150px" }}>
          <InputLabel id="demo-select-small-label">Native</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={filters.native}
            onChange={(e) => handleFilterChange("native", e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {uniqueValues("native").map((native, idx) => (
              <MenuItem key={idx} value={native}>
                {native}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <TableContainer
        sx={{
          maxHeight: "650px",
          width: "100%",
          backgroundColor: "rgb(255, 231, 218)",
        }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow >
              <TableCell align="left"  sx={{
          backgroundColor: "rgb(255, 231, 218)",
        }}>Action</TableCell>
              {fields.map((field) => (
                <TableCell key={field.name} align="left"  sx={{
                  backgroundColor: "rgb(255, 231, 218)",
                }}>
                  {field.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                <TableCell align="left"  sx={{
          backgroundColor: "rgb(255, 231, 218)",
        }}>
                  <Stack spacing={2} direction="row">
                    <EditIcon
                      style={{
                        fontSize: "20px",
                        color: "#f08001",
                        cursor: "pointer",
                      }}
                      onClick={() => openEdit(row.id)}
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
