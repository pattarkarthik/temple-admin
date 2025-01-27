import React, { useState } from "react";
import { Box } from "@mui/material";
import Catalog from "../components/Catalog";
import TopHeaderTitle from "../components/TopHeaderTitle";

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
        padding: "10px",
        flexDirection: "column",
      }}
    >
      <TopHeaderTitle pagename={" PRODUCT CATALOG"} />

      <Catalog />
    </Box>
  );
}

export default YelamProductCatalog;
