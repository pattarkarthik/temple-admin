import { Button, Nav, NavItem } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import user1 from "../assets/images/users/user4.jpg";
import probg from "../assets/images/bg/download.jpg";

const navigation = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "bi bi-speedometer2",
  },
  {
    title: "New Member",
    href: "/new-member",
    icon: "bi bi-person-add",
  },
  {
    title: "All Members",
    href: "/all-members",
    icon: "bi bi-people-fill",
  },
  {
    title: "Yelam Entry",
    href: "/yelam-entry",
    icon: "bi bi-hdd-stack",
  },
  {
    title: "Yelam list",
    href: "/yelam-list",
    icon: "bi bi-card-text",
  },
  {
    title: "Yelam Products",
    href: "/yelam-prod",
    icon: "bi bi-columns",
  },
  {
    title: "Yelam Product List",
    href: "/yelam-prod-list",
    icon: "bi bi-layout-split",
  },
];

const Sidebar = () => {
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  let location = useLocation();

  return (
    <div>
      <div
        className="profilebg"
        style={{ background: `url(${probg}) no-repeat` }}
      >
        <div className="p-3 d-flex">
          <img src={user1} alt="user" width="50" className="rounded-circle" />
        </div>
        <div className="bg-dark text-white p-5 opacity-75">Temple Admin</div>
      </div>
      <div className="p-3 mt-2">
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
                <span className="ms-3 d-inline-block">{navi.title}</span>
              </Link>
            </NavItem>
          ))}
          <Button
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
