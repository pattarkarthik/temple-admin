import React from "react";
import Sidenav from "./components/Sidenav";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import NewMember from "./pages/NewMember";
import AllMembers from "./pages/AllMembers";
import YelamEntry from "./pages/YelamEntry";
import YelamList from "./pages/YelamList";
import ProductReceivedForm from "./pages/ProductReceivedForm";
import ProductReceivedList from "./pages/ProductReceivedList";
import DashboardOverview from "./pages/DashboardOverview";
import YelamProductCatalog from "./pages/YelamProductCatalog";
import { Box } from "@mui/material";

export default function App() {
  return (
    <BrowserRouter>
      <Box sx={{ display: "flex" }}>
        <Sidenav />
        <Routes>
          <Route path="/" exact element={<DashboardOverview />} />
          <Route path="/new-member" exact element={<NewMember />} />
          <Route path="/all-members" exact element={<AllMembers />} />
          <Route path="/yelam-entry" exact element={<YelamEntry />} />
          <Route path="/yelam-list" exact element={<YelamList />} />
          <Route
            path="/product-catalog"
            exact
            element={<YelamProductCatalog />}
          />
          <Route
            path="/product-received-form"
            exact
            element={<ProductReceivedForm />}
          />
          <Route
            path="/product-received-list"
            exact
            element={<ProductReceivedList />}
          />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}
