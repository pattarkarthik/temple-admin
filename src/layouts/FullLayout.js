import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Container } from "reactstrap";

const FullLayout = () => {
  return (
    <main>
      <div className="pageWrapper d-lg-flex ">
        <aside className="sidebarArea shadow overflow-hidden " id="sidebarArea">
          <Sidebar />
        </aside>
        <div className="contentArea ">
          <Container className="p-4" fluid>
            <Outlet />
          </Container>
        </div>
      </div>
    </main>
  );
};

export default FullLayout;
