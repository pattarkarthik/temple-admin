import { lazy } from "react";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/
const AllMembers = lazy(() => import("../pages/AllMembers.js"));
const NewMember = lazy(() => import("../pages/NewMember.js"));
const YelamEntry = lazy(() => import("../pages/YelamEntry.js"));
const YelamList = lazy(() => import("../pages/YelamList.js"));
const YelamProduct = lazy(() => import("../pages/YelamProduct.js"));
const YelamProductList = lazy(() => import("../pages/YelamProductList.js"));

/*****Routes******/

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/new-member", exact: true, element: <NewMember /> },
      { path: "/all-members", exact: true, element: <AllMembers /> },
      { path: "/yelam-entry", exact: true, element: <YelamEntry /> },
      { path: "/yelam-list", exact: true, element: <YelamList /> },
      { path: "/yelam-prod", exact: true, element: <YelamProduct /> },
      { path: "/yelam-prod-list", exact: true, element: <YelamProductList /> },
    ],
  },
];

export default ThemeRoutes;
