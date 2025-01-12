import React, { useState } from "react";
import { Button, Avatar, Box, Typography } from "@mui/material";

export default function Profilepic() {
  const [profilePicture, setProfilePicture] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePicture(file);

      // Generate a preview
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePicture = () => {
    setProfilePicture(null);
    setPreview(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        mt: 4,
        marginLeft: "50px",
      }}
    >
      <Typography variant="h6">Upload Profile Picture</Typography>
      <Avatar
        src={preview || ""}
        sx={{ width: 100, height: 100, bgcolor: "grey.300" }}
      >
        {!preview && "P"}
      </Avatar>
      <input
        accept="image/*"
        type="file"
        id="upload-button"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <label htmlFor="upload-button">
        <Button variant="contained" component="span">
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
