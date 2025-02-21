import React, { useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import TableList from "../components/TableList.js";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import api from "../util/api.js";
import { ProductData } from "../assets/ProductReceivedData.js";
import CustomButton from "../components/CustomButton.js";
import Loader from "../components/Loader";
import TopHeaderTitle from "../components/TopHeaderTitle.js";

const ProductFields = [
  // { label: "Edit", name: "edit" },
  { label: "Yelam Porul", name: "yelamPorul", required: true },
  { label: "Pulli Id", name: "pulliId", required: true },
  { label: "Name", name: "name" },
  { label: "Native", name: "native" },
  { label: "Whatsup Number 1", name: "whatsupNumber1" },
  { label: "Whatsup Number 2", name: "whatsupNumber2" },
  { label: "Product Receiving Number", name: "productReceivingNumber" },
  { label: "Product Value", name: "productValue" },
  { label: "Remark", name: "remark" },
];

function ProductReceivedList() {
  const [openEditModal, setOpenEditModal] = useState(false);

  const [currentRow, setCurrentRow] = useState(null);
  const [originalRow, setOriginalRow] = useState(null); 
  const [loading, setLoading] = useState(false); 
  const [successAlert, setSuccessAlert] = useState(false); 
  const [errorAlert, setErrorAlert] = useState(false); 

  return (
    <Box
      sx={{
        display: "flex",
        padding: "10px",
        flexDirection: "column",
        overflow: "hidden",
        maxWidth: "100%",
      }}
    >
      <TopHeaderTitle pagename={"PRODUCT RECEIVED LIST"} />

      {loading && <Loader />}

      <TableList
        openEdit={null}
        showEdit={false} 
        fields={ProductFields}
        data={ProductData}
      />
    </Box>
  );
}

export default ProductReceivedList;
