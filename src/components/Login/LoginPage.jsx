// import React, { useState } from "react";
// import { TextField, Button, Box, Typography, Alert } from "@mui/material";

// const LoginPage = ({ onLogin }) => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const validCredentials = {
//     username: "admin",
//     password: "password123",
//   };

//   const handleLogin = (e) => {
//     e.preventDefault();
//     if (!username || !password) {
//       setError("Please fill out both fields.");
//       return;
      
//     }
//     if (username === validCredentials.username && password === validCredentials.password) {
//       setError("");
//       onLogin(); // Trigger login state update
//     } else {
//       setError("Invalid username or password.");
//     }
//   };

//   return (
//     <Box
//       sx={{
//         maxWidth: 400,
//         margin: "auto",
//         mt: 10,
//         p: 3,
//         border: "1px solid #ccc",
//         borderRadius: "8px",
//         boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//       }}
//     >
//       <Typography variant="h5" sx={{ mb: 3, textAlign: "center" }}>
//         Admin Login
//       </Typography>
//       {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
//       <form onSubmit={handleLogin}>
//         <TextField
//           label="Username"
//           variant="outlined"
//           fullWidth
//           sx={{ mb: 2 }}
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <TextField
//           label="Password"
//           type="password"
//           variant="outlined"
//           fullWidth
//           sx={{ mb: 2 }}
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <Button
//           type="submit"
//           variant="contained"
//           color="primary"
//           fullWidth
//           sx={{ mb: 2 }}
//         >
//           Login
//         </Button>
//       </form>
//     </Box>
//   );
// };

// export default LoginPage;
