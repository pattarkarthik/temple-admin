import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate, useLocation } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import ListIcon from "@mui/icons-material/List";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ViewListIcon from "@mui/icons-material/ViewList";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import BallotIcon from "@mui/icons-material/Ballot";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import LogoutIcon from "@mui/icons-material/Logout";

const drawerWidth = 280;

const Drawer = styled(MuiDrawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  "& .MuiDrawer-paper": {
    width: drawerWidth,
    backgroundColor: "#464547",
  },
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const pages = [
  { name: "Dashboard", url: "/dashboard", icon: <AnalyticsIcon /> },
  { name: "New Member", url: "/new-member", icon: <PersonAddIcon /> },
  { name: "All Members", url: "/all-members", icon: <ListIcon /> },
  { name: "Yelam Entry", url: "/yelam-entry", icon: <AddIcon /> },
  { name: "Yelam List", url: "/yelam-list", icon: <ViewListIcon /> },
  {
    name: "Product Catalog",
    url: "/product-catalog",
    icon: <Inventory2Icon />,
  },
  {
    name: "Product Received Form",
    url: "/product-received-form",
    icon: <AddCircleIcon />,
  },
  {
    name: "Product Received List",
    url: "/product-received-list",
    icon: <BallotIcon />,
  },
];

export default function Sidenav() {
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();
  const location = useLocation(); // Get current route

  const handleNavigation = (url) => {
    navigate(url);
  };
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    sessionStorage.clear();
    navigate("/login");
  };
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <CssBaseline />
      <Drawer variant="permanent">
        <DrawerHeader>
          {/* <img src={logo} style={{height:"150px", width:"250px", display:"flex", justifyContent:"space-around"}}/> */}
        </DrawerHeader>
        <Divider />
        <List
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
          }}
        >
          {pages.map((page) => (
            <ListItem
              key={page.name}
              disablePadding
              sx={{
                display: "block",
                backgroundColor:
                  location.pathname === page.url ? "#393939" : "inherit", // Highlight selected item
              }}
            >
              <ListItemButton
                onClick={() => handleNavigation(page.url)}
                sx={{
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: location.pathname === page.url ? "#f08001" : "white",
                  }}
                >
                  {page.icon}
                </ListItemIcon>
                <ListItemText
                  primary={page.name}
                  sx={{
                    opacity: open ? 1 : 0,
                    color: location.pathname === page.url ? "#f08001" : "white",
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <Box
          sx={{
            padding: "16px",
            textAlign: "center",
            color: "white",
            backgroundColor: "#393939",
          }}
        >
          <ListItemButton
            onClick={handleLogout}
            sx={{
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
          >
            <LogoutIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
                color: "white",
              }}
            ></LogoutIcon>
            <ListItemText
              primary={"Logout"}
              sx={{
                opacity: open ? 1 : 0,
                color: "white",
              }}
            />
          </ListItemButton>
        </Box>
      </Drawer>
    </Box>
  );
}
