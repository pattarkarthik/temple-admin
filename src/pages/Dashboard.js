import React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
  styled,
  Grid2,
} from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import StatCard from "../components/StatCard";
import PeopleIcon from "@mui/icons-material/People";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import ListIcon from "@mui/icons-material/List";
import PiChart from "../components/PiChart";

const Dashboard = () => {
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
      icon: (
        <MonetizationOnIcon fontSize="large" style={{ color: "#F8E1B7" }} />
      ),
      bgColor: "#3E7B27",
    },
    {
      title: "Devotees",
      value: 891,
      icon: <EmojiPeopleIcon fontSize="large" style={{ color: "#FFE2E2" }} />,
      bgColor: "#F93827",
    },
  ];
  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

  return (
    <Box>
      <Grid2 container spacing={2}>
        <Grid2 size={4}>
          <StatCard
            name="Members"
            icon={<PeopleIcon />}
            value="10000"
            color="red"
          />
        </Grid2>
        <Grid2 size={4}>
          <StatCard
            name="Total Bid Amount"
            icon={<CurrencyRupeeIcon />}
            value="3,49,00,000"
            color="red"
          />{" "}
        </Grid2>
        <Grid2 size={4}>
          <StatCard
            name="Total Yelams"
            icon={<ListIcon />}
            value="125"
            color="red"
          />{" "}
        </Grid2>
        <Grid2 size={6}>
          {/* <PiChart
            data={[
              {
                city: "Gulbarga",
                count: 4,
              },
              {
                city: "Bengaluru",
                count: 1,
              },
              {
                city: "Bangalore",
                count: 1,
              },
            ]}
          /> */}
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default Dashboard;
