import React from "react";
import { data, columns } from "../assets/YelamData.js";
import YelamDataTable from "../components/YelamDataTable.js";
import { Box, Typography } from "@mui/material";
import TableList from "../components/TableList.js";

function YelamList() {
  return (
    <Box
      sx={{
        display: "flex",
        padding: "10px",
        flexDirection:"column",
      }}
    >
      <Typography  sx={{
      marginBottom:"10px"
       
      }}>YELAM LIST</Typography>
     <TableList/>
    </Box>
  );
}

export default YelamList;
