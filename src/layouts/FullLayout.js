import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Container } from "reactstrap";

const FullLayout = () => {
  return (
    <main>
      <div className="pageWrapper d-lg-flex ">
        {/********Sidebar**********/}
        <aside className="sidebarArea shadow overflow-hidden " id="sidebarArea">
          <Sidebar />
        </aside>
        {/********Content Area**********/}
        {/* <div className="topArea">This is top</div> */}
        <div className="contentArea ">
          {/********Middle Content**********/}
          <Container className="p-4 " fluid>
            <Outlet />
          </Container>
        </div>
      </div>
    </main>
  );
};

export default FullLayout;
