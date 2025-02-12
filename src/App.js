import React, { lazy, Suspense } from "react";
import Sidenav from "./components/Sidenav";
import { Routes, Route, BrowserRouter, Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Login from "./pages/Login";
import ErrorBoundary from "./components/ErrorBoundary";

const NewMember = lazy(() => import("./pages/NewMember"));
const AllMembers = lazy(() => import("./pages/AllMembers"));
const YelamEntry = lazy(() => import("./pages/YelamEntry"));
const YelamList = lazy(() => import("./pages/YelamList"));
const ProductReceivedForm = lazy(() => import("./pages/ProductReceivedForm"));
const ProductReceivedList = lazy(() => import("./pages/ProductReceivedList"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const YelamProductCatalog = lazy(() => import("./pages/YelamProductCatalog"));

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
        <ErrorBoundary>
          <Sidenav />
        </ErrorBoundary>
      </Box>

      <Box sx={{ flex: 1, padding: 2, maxWidth: "80%", opacity: "0.9" }}>
        <ErrorBoundary>
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
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
          <Route path="/" element={<Dashboard />} />
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
