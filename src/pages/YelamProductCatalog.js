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

const StyledCardHeader = styled(CardHeader)(({ theme }) => ({
  backgroundColor: "rgba(38, 198, 218)",
  color: theme.palette.common.white,
  borderRadius: "8px 8px 0 0",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
}));

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
    { serialNumber: 12, Product: "Sacred Thread", Category: "Pooja Essentials" },
    { serialNumber: 13, Product: "Brass Idol of Lakshmi", Category: "Idols" },
    { serialNumber: 14, Product: "Camphor Tablets", Category: "Fragrance" },
    { serialNumber: 15, Product: "Rudraksha Beads", Category: "Devotional Wear" }
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
    <Grid container justifyContent="center" sx={{ padding: "20px" }}>
      <Grid item xs={12}>
        <Card elevation={3}>
          <CardContent>
            <StyledCardHeader title="Yelam Product Catalog"  sx={{ marginBottom: "20px" }}/>

            <Box sx={{ display: "flex", gap: "10px", alignItems: "center", width: '200px' }}>
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

            <TextField
              label="Category (Optional)"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              fullWidth
              sx={{ marginTop: "20px" }}
            />
          </CardContent>

          {/* Table Section */}
          <Paper elevation={0} sx={{ padding: "10px 20px" }}>
          <StyledCardHeader title="Product and Category List" />

            {/* <Typography variant="h6" gutterBottom>
              Product and Category List
            </Typography> */}
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Serial Number</TableCell>
                    <TableCell>Product</TableCell>
                    <TableCell>Category</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row) => (
                    <TableRow key={row.serialNumber}>
                      <TableCell>{row.serialNumber}</TableCell>
                      <TableCell>{row.Product}</TableCell>
                      <TableCell>{row.Category}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Card>
      </Grid>
    </Grid>
  );
}

export default YelamProductCatalog;
