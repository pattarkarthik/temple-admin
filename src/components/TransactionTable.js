import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { transactionTableFields } from "../assets/Fields";
function TransactionTable({ transactions }) {
  const [transactionData, setTransactionData] = useState(transactions);
  useEffect(() => {
    setTransactionData(transactions);
  }, [transactions]);
  return (
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
            {transactionTableFields.map((field) => (
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
          {transactionData.map((row) => (
            <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
              {transactionTableFields.map((field) => (
                <TableCell
                  align="left"
                  sx={{
                    minWidth: "100px",
                    backgroundColor: "rgb(255, 231, 218)",
                  }}
                  key={field.name}
                >
                  {row[field.name] || "N/A"}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TransactionTable;
