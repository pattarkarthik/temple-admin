import { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import CustomButton from "./CustomButton";

const fields = [
  { label: "Serial Number", name: "serialNumber", required: true },
  { label: "Product", name: "Product", required: true },
  { label: "Category", name: "Category", required: true },
];

const initialProducts = [
  { serialNumber: 1, Product: "Phone", Category: "Electronics" },
  { serialNumber: 2, Product: "Charger", Category: "Accessories" },
];

const categories = [
  "Electronics",
  "Accessories",
  "Idols",
  "Pooja Accessories",
  "Fragrance",
  "Lighting",
  "Devotional Wear",
  "Pooja Essentials",
  "Furnishings",
];

export default function Catalog() {
  const [rows, setRows] = useState(initialProducts);
  const [filteredRows, setFilteredRows] = useState(initialProducts);
  const [isModalOpen, setModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({ Product: "", Category: "" });
  const [error, setError] = useState({ Product: false, Category: false });
  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => {
    setModalOpen(false);
    setNewProduct({ Product: "", Category: "" });
    setError({ Product: false, Category: false });
  };

  const handleAddProduct = () => {
    const errors = {
      Product: !newProduct.Product.trim(),
      Category: !newProduct.Category.trim(),
    };

    if (errors.Product || errors.Category) {
      setError(errors);
      return;
    }

    const newSerialNumber =
      rows.length > 0 ? rows[rows.length - 1].serialNumber + 1 : 1;
    const updatedProduct = { ...newProduct, serialNumber: newSerialNumber };

    setRows((prev) => [...prev, updatedProduct]);
    setFilteredRows((prev) => [...prev, updatedProduct]);
    handleModalClose();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
    setError((prev) => ({ ...prev, [name]: false }));
  };

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    let filteredData = rows.filter((row) =>
      Object.values(row).some((field) =>
        String(field).toLowerCase().includes(value)
      )
    );

    setFilteredRows(filteredData);
  };

  const handleSuggestionClick = (product) => {
    setFilteredRows([product]);
    setSearchInput(product.Product);
    setSuggestions([]);
  };

  return (
    <Paper
    sx={{
      display: "flex",
      flexDirection: "column",
      padding: "10px",
      width:"100%",
      flexGrow: 2,
   
    }}
  >
      <Box height={10} />
      <Box sx={{display:"flex", justifyContent:"space-between"}}>
      <TextField
        
        label="Search Product"
        onChange={(e) => handleSearchChange(e)}
        size="small"
      />
        <CustomButton inverted={false} label="Add Product" onclick={handleModalOpen} />
      </Box>
   
      {suggestions.length > 0 && (
        <ul
          style={{
            listStyleType: "none",
            margin: 0,
            padding: "10px",
            border: "1px solid #ccc",
            maxHeight: "150px",
            overflowY: "auto",
            position: "absolute",
            backgroundColor: "white",
            zIndex: 1,
            width: "300px",
          }}
        >
          {suggestions.map((product) => (
            <li
              key={product.serialNumber}
              onClick={() => handleSuggestionClick(product)}
              style={{
                padding: "5px",
                cursor: "pointer",
              }}
            >
              {product.Product}
            </li>
          ))}
        </ul>
      )}
      <Box height={10} />
      {
        <TableContainer
          sx={{ overflowY: "auto", maxHeight: "650px", }}
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {fields.map((field) => (
                  <TableCell key={field.name}>{field.label}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.map((row) => (
                <TableRow key={row.serialNumber}>
                  {fields.map((field) => (
                    <TableCell key={field.name}>{row[field.name]}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      }

      {/* Add Product Modal */}
      <Modal open={isModalOpen} onClose={handleModalClose}>
        <Paper
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            width: "400px",
          }}
        >
          <h3>Add New Product</h3>
          <TextField
            fullWidth
            label="Product Name"
            name="Product"
            value={newProduct.Product}
            onChange={handleInputChange}
            margin="normal"
            error={error.Product}
            helperText={error.Product ? "Product Name is required" : ""}
          />
          <TextField
            fullWidth
            select
            label="Category"
            name="Category"
            value={newProduct.Category}
            onChange={handleInputChange}
            margin="normal"
            error={error.Category}
            helperText={error.Category ? "Category is required" : ""}
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>
          <Box mt={2} textAlign="right">
          <CustomButton inverted={false} label="Add" onclick={handleAddProduct} />
            
          </Box>
        </Paper>
      </Modal>
    </Paper>
  );
}
