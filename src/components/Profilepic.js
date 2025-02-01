import React, { useState } from "react";
import { Button, Avatar, Box, Typography } from "@mui/material";

export default function Profilepic({
  onFileChange,
  title,
  type,
  picPreview = null,
}) {
  const [profilePicture, setProfilePicture] = useState(null);
  const [preview, setPreview] = useState(picPreview);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePicture(file);

      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);

      // Pass the file and type to the parent component
      if (onFileChange) onFileChange(file, type);
    }
  };

  const handleRemovePicture = () => {
    setProfilePicture(null);
    setPreview(null);
    if (onFileChange) onFileChange(null, type); // Notify parent that the file was removed
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        mt: 4,
      }}
    >
      <Typography variant="h6">{title}</Typography>
      <Avatar
        src={preview || ""}
        sx={{ width: 100, height: 100, bgcolor: "grey.300" }}
      >
        {!preview && "P"}
      </Avatar>
      <input
        accept="image/*"
        type="file"
        id={type}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <label htmlFor={type}>
        <Button
          variant="contained"
          component="span"
          sx={{
            backgroundColor: "#f08001",
            color: "white",
            boxShadow: "none",
          }}
        >
          {profilePicture ? "Change Picture" : "Upload Picture"}
        </Button>
      </label>
      {profilePicture && (
        <Button color="error" onClick={handleRemovePicture}>
          Remove Picture
        </Button>
      )}
    </Box>
  );
}
