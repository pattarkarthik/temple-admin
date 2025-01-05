import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Box, Grid, Card, CardContent, Typography, CardActions, Button } from "@mui/material";
import ProtectedRoute from "../ProtectedRoute";
import NewMember from "../../pages/NewMember";
import AllMembers from "../../pages/AllMembers";
import YelamEntry from "../../pages/YelamEntry";
import YelamList from "../../pages/YelamList";
import YelamProduct from "../../pages/YelamProduct";
import YelamProductList from "../../pages/YelamProductList";

const DashboardOverview = () => (
  <Box sx={{ padding: 3 }}>
    <Typography variant="h4" gutterBottom>
      Dashboard Overview
    </Typography>
    <Grid container spacing={3}>
      {/* Card for Total Users */}
      <Grid item xs={12} sm={6} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h5">Total Users</Typography>
            <Typography variant="h4" color="primary">
              1,234
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="outlined">View</Button>
          </CardActions>
        </Card>
      </Grid>
      {/* Card for Revenue */}
      <Grid item xs={12} sm={6} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h5">Revenue</Typography>
            <Typography variant="h4" color="secondary">
              $12,345
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="outlined">View</Button>
          </CardActions>
        </Card>
      </Grid>
      {/* Other cards... */}
    </Grid>
  </Box>
);

const DashboardRoutes = ({ isLoggedIn }) => {
  return (
    <Box>
      <Routes>
        {/* Default dashboard overview */}
        <Route path="/dashboard" element={<DashboardOverview />} />
        {/* Protected routes */}
        <Route
          path="/new-member"
          element={<ProtectedRoute component={NewMember} />}
        />
        <Route
          path="/all-members"
          element={<ProtectedRoute component={AllMembers} />}
        />
        <Route
          path="/yelam-entry"
          element={<ProtectedRoute component={YelamEntry} />}
        />
        <Route
          path="/yelam-list"
          element={<ProtectedRoute component={YelamList} />}
        />
        <Route
          path="/yelam-prod"
          element={<ProtectedRoute component={YelamProduct} />}
        />
        <Route
          path="/yelam-prod-list"
          element={<ProtectedRoute component={YelamProductList} />}
        />
        <Route
          path="/Product-Received-Form"
          element={<ProtectedRoute component={ProductReceivedForm} />}
        />
        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Box>
  );
};

export default DashboardRoutes;
