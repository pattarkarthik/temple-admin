import { lazy } from "react";

// import ProtectedRoute from "../components/ProtectedRoute"; // Import the ProtectedRoute

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/

const DashboardOverview = lazy(() => import("../pages/DashboardOverview.js"));
const AllMembers = lazy(() => import("../pages/AllMembers.js"));
const NewMember = lazy(() => import("../pages/NewMember.js"));
const YelamEntry = lazy(() => import("../pages/YelamEntry.js"));
const YelamList = lazy(() => import("../pages/YelamList.js"));
const YelamProductCatalog = lazy(() => import("../pages/YelamProductCatalog.js"));
const ProductReceivedForm = lazy(() => import("../pages/ProductReceivedForm.js"));
const ProductReceivedList = lazy(() => import("../pages/ProductReceivedList.js"));

/*****Routes******/
const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/Dashboard-Overview", exact: true, element: <DashboardOverview /> },
      { path: "/new-member", exact: true, element: <NewMember /> },
      { path: "/all-members", exact: true, element: <AllMembers /> },
      { path: "/yelam-entry", exact: true, element: <YelamEntry /> },
      { path: "/yelam-list", exact: true, element: <YelamList /> },
      { path: "/yelam-prod-Cat", exact: true, element: <YelamProductCatalog /> },
      { path: "/Product-Received-Form", exact: true, element: <ProductReceivedForm /> },
      { path: "/Product-Received-List", exact: true, element: <ProductReceivedList /> },

    ],
  },
];


export default ThemeRoutes;
