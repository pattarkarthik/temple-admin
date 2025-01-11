import React, { useState } from "react";
import {
  Avatar,
  IconButton,
  Button,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";


function UploadAvatar({ avatar, setAvatar }) {
  const [avatarError, setAvatarError] = useState(""); // Initialize with an empty string
  const [openAlert, setOpenAlert] = useState(false); // Control Snackbar visibility

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // File size validation (max 1MB)
      if (file.size <= 1024 * 1024) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setAvatar(reader.result);
          setAvatarError(""); // Clear error on successful upload
        };
        reader.readAsDataURL(file);
      } else {
        setAvatarError("File size must be 1MB or smaller."); // Set error message
        setOpenAlert(true); // Show error alert
      }
    }
  };

  const handleCloseAlert = () => {
    setOpenAlert(false); // Close the alert
  };

  return (
    <div
      style={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
    
      <IconButton component="label" sx={{ width: 60, height: 60 }}>
        <Avatar
          src={avatar || "/images/example.jpg"} // Default avatar if none is provided
          sx={{
            width: 80, // Adjust size
            height: 80, // Adjust size
            border: "2px solid #ccc",
          }}
        />
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </IconButton>

     
      <Button
        variant="contained"
        color="primary"
        component="label"
        sx={{
          backgroundColor: "rgba(38, 198, 218)",
          "&:hover": {
            backgroundColor: "rgba(38, 198, 218, 0.8)",
          },
          marginTop: "20px",
          padding: "6px 16px",
          fontSize: "12px",
        }}
      >
        Upload Photo
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </Button>

      {/* Snackbar for Error Message  */}
      <Snackbar
        open={openAlert}
        autoHideDuration={6000} // Auto hide the alert after 6 seconds
        onClose={handleCloseAlert}
      >
        <Alert onClose={handleCloseAlert} severity="error">
          {avatarError} {/* Display error message */}
        </Alert>
      </Snackbar>

      <Typography sx={{ fontSize: "12px", color: "gray", marginTop: 1 }}>
        Please upload an image file (max 1MB).
      </Typography>
    </div>
  );
}

export default UploadAvatar;
