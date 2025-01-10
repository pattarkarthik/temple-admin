import React, { useState } from "react";
import { TextField, Button, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";

const YelamProductCatalog = () => {
  const [fields, setFields] = useState({
    name: "",
    email: "",
  });

  const [data, setData] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFields({
      ...fields,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRow = {
      serialNumber: data.length + 1,
      name: fields.name,
      email: fields.email,
    };
    setData([...data, newRow]);
    setFields({ name: "", email: "" }); // Reset input fields
  };

  return (
    <Box sx={{ padding: "20px" }}>
      {/* First Container with Input Fields */}
      <Paper sx={{ padding: "20px", marginBottom: "20px" }}>
        <Typography variant="h6">Add New Entry</Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", gap: "20px", marginBottom: "10px" }}>
            <TextField
              label="Name"
              name="name"
              value={fields.name}
              onChange={handleInputChange}
              fullWidth
              required
            />
            <TextField
              label="Email"
              name="email"
              value={fields.email}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Box>
          <Button type="submit" variant="contained" color="primary">
            Add Entry
          </Button>
        </form>
      </Paper>

      {/* Second Container with Table */}
      <Paper sx={{ padding: "20px" }}>
        <Typography variant="h6">Data Table</Typography>
        <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Serial Number</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.serialNumber}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};



export default YelamProductCatalog;
