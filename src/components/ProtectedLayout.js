import React from "react";
import { Box } from "@mui/material";
import Sidenav from "./Sidenav";
import { Routes, Route } from "react-router-dom";
import DashboardOverview from "../pages/DashboardOverview";
import NewMember from "../pages/NewMember";
import AllMembers from "../pages/AllMembers";
import YelamEntry from "../pages/YelamEntry";
import YelamList from "../pages/YelamList";
import ProductReceivedForm from "../pages/ProductReceivedForm";
import ProductReceivedList from "../pages/ProductReceivedList";
import YelamProductCatalog from "../pages/YelamProductCatalog";

function ProtectedLayout() {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Sidenav />
      {/* <Box sx={{ flex: 1, marginLeft: "50px" }}>
        <Box
          sx={{
            padding: "20px",
            height: "calc(100vh - 5%)",
            overflowY: "auto",
          }}
        >
          <Routes>
            <Route path="/new-member" element={<NewMember />} />
            <Route path="/all-members" element={<AllMembers />} />
            <Route path="/new-member" element={<NewMember />} />
            <Route path="/all-members" element={<AllMembers />} />
            <Route path="/yelam-entry" element={<YelamEntry />} />
            <Route path="/yelam-list" element={<YelamList />} />
            <Route path="/product-catalog" element={<YelamProductCatalog />} />
            <Route
              path="/product-received-form"
              element={<ProductReceivedForm />}
            />
            <Route
              path="/product-received-list"
              element={<ProductReceivedList />}
            />
          </Routes>
        </Box>
      </Box> */}
    </Box>
  );
}

export default ProtectedLayout;
