import { Button, Nav, NavItem } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import user1 from "../assets/images/users/user4.jpg";
import probg from "../assets/images/bg/download.jpg";

const navigation = [
  {
    title: "Dashboard",
    href: "/Dashboard-Overview",
    icon: "bi bi-graph-up-arrow",
  },
  {
    title: "New Member",
    href: "/new-member",
    icon: "bi bi-person-hearts",
  },
  {
    title: "All Members",
    href: "/all-members",
    icon: "bi bi-people",
  },
  {
    title: "Yelam Entry",
    href: "/yelam-entry",
    icon: "bi bi-file-earmark-text",
  },
  {
    title: "Yelam list",
    href: "/yelam-list",
    icon: "bi bi-list-check",
  },
  {
    title: "Yelam Products",
    href: "/yelam-prod-Cat",
    icon: "bi bi-box2-fill",
  },
  // {
  //   title: "Yelam Product List",
  //   href: "/yelam-prod-list",
  //   icon: "bi bi-journal-check",
  // },
  {
    title: "Product Received Form",
    href: "/Product-Received-Form",
    icon: "bi bi-box-arrow-down",
  },
  {
    title: "Product Received List",
    href: "/Product-Received-List",
    icon: "bi bi-clipboard-data",
  },
  {
    title: "Communication Module",
    href: "/Whatsapp-Module",
    icon: "bi bi-whatsapp",
  },
];

const Sidebar = () => {
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  let location = useLocation();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh", // Full height of the viewport
        overflowY: "auto", // Enable vertical scrolling
        backgroundColor: "#f8f9fa",
      }}
    >
      <div
        className="profilebg"
        style={{ background: `url(${probg}) no-repeat` }}
      >
        <div className="p-3 d-flex">
          <img src={user1} alt="user" width="50" className="rounded-circle" />
        </div>
        <div className="bg-dark text-white p-5 opacity-75">Temple Admin</div>
      </div>
      <div className="p-7 mt-2 w-30">
        <Nav vertical className="sidebarNav">
          {navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              <Link
                to={navi.href}
                className={
                  location.pathname === navi.href
                    ? "active nav-link py-3"
                    : "nav-link text-secondary py-3"
                }
              >
                <i className={navi.icon}></i>
                <span className="ms-2 d-inline-block">{navi.title}</span>
              </Link>
            </NavItem>
          ))}
          <Button // change the button size later after review
            color="danger"
            tag="a"
            target="_blank"
            className="mt-3"
            href="https://wrappixel.com/templates/materialpro-react-admin/?ref=33"
          >
            Logout
          </Button>
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
