// import React from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import LoginPage from "./LoginPage";
// import DashboardRoutes from "../dashboard/DashboardRoutes"; // Import DashboardRoutes

// const LoginSetup = ({ isLoggedIn, handleLogin, handleLogout }) => {
//   return (
//     <Routes>
//     {/* Default Route */}
//     <Route
//       path="/"
//       element={
//         isLoggedIn ? (
//           <Navigate to="/dashboard" replace />
//         ) : (
//           <LoginPage onLogin={handleLogin} />
//         )
//       }
//     />
//     {/* Dashboard Route */}
//     <Route
//       path="/dashboard/*"
//       element={
//         isLoggedIn ? (
//           <DashboardRoutes isLoggedIn={isLoggedIn} />
//         ) : (
//           <Navigate to="/" replace />
//         )
//       }
//     />
//   </Routes>
//   );
// };

// export default LoginSetup;
