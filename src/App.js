import React from "react";
import Sidenav from "./components/Sidenav";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import NewMember from "./pages/NewMember";
import AllMembers from "./pages/AllMembers";
import YelamEntry from "./pages/YelamEntry";
import YelamList from "./pages/YelamList";
import ProductReceivedForm from "./pages/ProductReceivedForm";
import ProductReceivedList from "./pages/ProductReceivedList";
import Dashboard from "./pages/Dashboard";
import YelamProductCatalog from "./pages/YelamProductCatalog";
import { Box } from "@mui/material";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Login from "./pages/Login";
import WhatsappModule from "./pages/WhatsappModule";

function ProtectedLayout() {
  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "#f6f6f7",
        width: "100dvw",
        backgroundImage:
          "url('https://www.sarkarishikshak.com/wp-content/uploads/2023/06/Meenakshi-Amman-Temple-Wiki.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center", // Center the image
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        boxSizing: "border-box",
      }}
    >
      <Box sx={{ maxWidth: "20%", opacity: "0.9" }}>
        <Sidenav />
      </Box>

      <Box sx={{ flex: 1, padding: 2, maxWidth: "80%", opacity: "0.9" }}>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
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
          <Route path="/communicate" element={<WhatsappModule />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          element={
            <ProtectedRoutes>
              <ProtectedLayout />
            </ProtectedRoutes>
          }
        >
          {/* Nested routes for protected pages */}
          <Route path="/dashboard" element={<NewMember />} />
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
          <Route path="/communicate" element={<WhatsappModule />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
