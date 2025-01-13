import React, { useState } from "react";
import {
  Grid,
  styled,
  CardHeader,
  Card,
  CardContent,
  Typography,
  TextField,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Autocomplete,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"; // Correct icon import
import TableList from "../components/TableList";
import Catalog from "../components/Catalog";

function YelamProductCatalog() {
  const [data, setData] = useState([
    { serialNumber: 1, Product: "Phone", Category: "Electronics" },
    { serialNumber: 2, Product: "Charger", Category: "Accessories" },
    { serialNumber: 3, Product: "Ganesha Idol", Category: "Idols" },
    { serialNumber: 4, Product: "Pooja Bell", Category: "Pooja Accessories" },
    { serialNumber: 5, Product: "Incense Sticks", Category: "Fragrance" },
    { serialNumber: 6, Product: "Diya Lamp", Category: "Lighting" },
    { serialNumber: 7, Product: "Tulsi Mala", Category: "Devotional Wear" },
    { serialNumber: 8, Product: "Kalash Pot", Category: "Pooja Accessories" },
    { serialNumber: 9, Product: "Kumkum Powder", Category: "Pooja Essentials" },
    { serialNumber: 10, Product: "Temple Bell", Category: "Pooja Accessories" },
    { serialNumber: 11, Product: "Pooja Mat", Category: "Furnishings" },
    {
      serialNumber: 12,
      Product: "Sacred Thread",
      Category: "Pooja Essentials",
    },
    { serialNumber: 13, Product: "Brass Idol of Lakshmi", Category: "Idols" },
    { serialNumber: 14, Product: "Camphor Tablets", Category: "Fragrance" },
    {
      serialNumber: 15,
      Product: "Rudraksha Beads",
      Category: "Devotional Wear",
    },
  ]);

  const [newProduct, setNewProduct] = useState("");
  const [category, setCategory] = useState("");

  const handleAddEntry = () => {
    // If the product field is blank, clear it and return
    if (newProduct.trim() === "") {
      setNewProduct("");
      setCategory("");
      return;
    }

    // Check if the product already exists in the data array
    const existingProduct = data.find(
      (item) => item.Product.toLowerCase() === newProduct.toLowerCase()
    );

    // If the product doesn't exist, add it to the data array
    if (!existingProduct) {
      const newRow = {
        serialNumber: data.length + 1,
        Product: newProduct,
        Category: category || "Uncategorized",
      };
      setData([...data, newRow]);
      setNewProduct("");
      setCategory("");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        marginTop: "5%",
        marginLeft: "3%",
        minHeight: "750px",
        maxHeight: "750px",
        maxWidth: "75%",
        marginBottom: "50px",
      }}
    >
      {/* <Box sx={{ display: "flex" }}>
        <Box>
          <Autocomplete
            value={newProduct}
            onInputChange={(event, newValue) => setNewProduct(newValue)}
            onChange={(event, newValue) => handleAddEntry(newValue)}
            options={data.map((item) => item.Product)} // Existing product list
            freeSolo // Allow users to type and add new products
            renderInput={(params) => (
              <TextField
                {...params}
                label="Product"
                placeholder="Search or Add Product"
                fullWidth // Ensure full width here
                sx={{
                  width: "670px", // Make the input take the full width
                  maxWidth: "100%", // Ensure the input spans the entire container
                }}
                InputProps={{
                  ...params.InputProps,
                  style: { width: "100%" }, // Ensure dropdown is visible
                }}
              />
            )}
          />
          <IconButton
            color="primary"
            onClick={() => handleAddEntry(newProduct)}
            disabled={!newProduct.trim()}
          >
            <AddCircleOutlineIcon fontSize="large" />
          </IconButton>
        </Box>
        <Box>
          <TextField
            label="Category (Optional)"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            fullWidth
            sx={{ marginTop: "20px" }}
          />
        </Box>
      </Box>

      <TableList /> */}
      <Catalog />
    </Box>
  );
}

export default YelamProductCatalog;
