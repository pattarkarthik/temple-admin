import React from "react";
import { data, columns } from "../assets/YelamData.js";
import YelamDataTable from "../components/YelamDataTable.js";
import { Box } from "@mui/material";
import TableList from "../components/TableList.js";

function YelamList() {
  return (
    <Box
      sx={{
        display: "flex",
        marginTop: "5%",
        marginLeft: "3%",
        maxWidth: "75%",
        minHeight: "750px",
        maxHeight: "750px",

        marginBottom: "50px",
      }}
    >
      <TableList />
    </Box>
  );
}

export default YelamList;
