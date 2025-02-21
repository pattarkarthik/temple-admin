import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Container } from "reactstrap";
import { Grid2 } from "@mui/material";

const FullLayout = () => {
  return (
    <Grid2 container spacing={2}>
      <Grid2>
        <Sidebar />
      </Grid2>
      <Grid2 size={10}>
        <Container className="p-4" fluid>
          <Outlet />
        </Container>
      </Grid2>
    </Grid2>
   
  );
};

export default FullLayout;
