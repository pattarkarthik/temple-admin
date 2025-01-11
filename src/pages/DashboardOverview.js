import React from "react";
import { Box, Grid, Card, CardContent, Typography, IconButton } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";

const DashboardOverview = () => {
  // Replace these static values with dynamic data later
  const stats = [
    {
      title: "Members",
      value: 1234,
      icon: <GroupIcon fontSize="large" style={{ color: "#D0DDD0" }} />,
      bgColor: "#16C47F",
    },
    {
      title: "Products",
      value: 567,
      icon: <ShoppingCartIcon fontSize="large" style={{ color: "#EFB6C8" }} />,
      bgColor: "#C30E59",
    },
    {
      title: "Value Generated",
      value: "$e57373",
      icon: <MonetizationOnIcon fontSize="large" style={{ color: "#F8E1B7" }} />,
      bgColor: "#3E7B27",
    },
    {
      title: "Devotees",
      value: 891,
      icon: <EmojiPeopleIcon fontSize="large" style={{ color: "#FFE2E2" }} />,
      bgColor: "#F93827",
    },
  ];

  return (
    <Box sx={{ padding: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: "bold", textAlign: "center", marginBottom: 4, backgroundColor:"rgba(38, 198, 218)",borderRadius: '16px' }}
      >
        Dashboard Overview
      </Typography>
      <Grid container spacing={4}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "200px",
                borderRadius: 4,
                boxShadow: 4,
                backgroundColor: stat.bgColor,
                transition: "transform 0.3s ease",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <IconButton sx={{ marginBottom: 2 }}>{stat.icon}</IconButton>
              <Typography variant="h6" color="textSecondary">
                {stat.title}
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                {stat.value}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DashboardOverview;
