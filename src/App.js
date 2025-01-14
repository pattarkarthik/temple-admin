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
import ProtectedRoutes from "./components/ProtectedRoutes";
import Login from "./pages/Login";

// Layout for Protected Routes
function ProtectedLayout() {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidenav />
      <Box sx={{ flex: 1, padding: 2 }}>
        <Routes>
          <Route path="/" element={<DashboardOverview />} />
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
    </Box>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public route for login */}
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        <Route
          element={
            <ProtectedRoutes>
              <ProtectedLayout />
            </ProtectedRoutes>
          }
        >
          {/* Nested routes for protected pages */}
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
