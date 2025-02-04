import React from "react";
import { Card, Typography, Box } from "@mui/material";
import { findLeftPinnedCellsAfterCol } from "@mui/x-data-grid/utils/domUtils";

function StatCard({ name, icon, value, color }) {
  return (
    <Card
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.5)", // White with slight transparency (80% opacity)
        overflow: "hidden",
        borderRadius: "12px",
        border: "1px solid #f08001",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        paddingTop: "10px",
        paddingBottom: "10px",
        width: "250px",
      }}
    >
      <Box sx={{ display: "flex", padding: "20px", flexDirection: "column" }}>
        <Box
          sx={{
            display: "flex",
            color: "#f08001",
            fontSize: "0.875rem",
            fontWeight: "medium",
            width: "100%",
            alignItems: "flex-end",
            gap: "10px",
          }}
        >
          {icon}
          {name}
        </Box>
        <Typography
          variant="h3"
          sx={{
            marginTop: "10px",
            color: "#f08001",
            fontSize: "2rem",
            fontWeight: "bold",
            borderRadius: "2px",
          }}
        >
          {value}
        </Typography>
      </Box>
    </Card>
  );
}

export default StatCard;
