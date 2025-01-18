import React, { useState } from "react";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import Profilepic from "./Profilepic";
import CustomButton from "./CustomButton";
import Input from "./Input";

function Form({ fields = [], onSubmit, initialValues = {}, profilePic }) {
  const [formValues, setFormValues] = useState(initialValues);
  const [uploadedProfilePic, setUploadedProfilePic] = useState(null); // To hold the photo file

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleDropdownChange = (name) => (event) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: event.target.value,
    }));
  };

  const handleFileChange = (file) => {
    setUploadedProfilePic(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();

    // Append form values to FormData
    Object.keys(formValues).forEach((key) => {
      if (formValues[key] !== undefined) {
        data.append(key, formValues[key]);
      }
    });

    if (uploadedProfilePic) {
      data.append("photo", uploadedProfilePic); // "photo" should match the field name in your Django model
    }

    // Submit the data
    onSubmit(data);
  };

  const handleCancel = () => {
    setFormValues(initialValues); // Reset form fields to initialValues
    setUploadedProfilePic(null); // Clear the profile picture
  };

  return (
    <Paper
      sx={{
        padding: "10px",
      }}
    >
      <form onSubmit={handleSubmit}>
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "stretch",
          }}
        >
          {/* Left Grid: Profile Picture */}
          {profilePic && (
            <Grid item xs={12} md={4} style={{ textAlign: "center" }}>
              <Profilepic onFileChange={handleFileChange} />
            </Grid>
          )}

          {/* Right Grid: Adjust Field Slicing Dynamically */}
          <Grid item xs={12} md={profilePic ? 6 : 12}>
            {fields
              .slice(0, profilePic ? 3: fields.length) // Show only the first 4 fields if profilePic is true; otherwise show all
              .map((field, index) => (
                <Grid key={index} item xs={12} style={{ marginTop: "15px", paddingLeft:"5px" }}>
                  {field.type === "dropdown" ? (
                    <FormControl fullWidth sx={{   }} size="small">
                      <Box >{field.label}</Box>
                      <Select
                        value={formValues[field.name] || ""}
                        onChange={handleDropdownChange(field.name)}
                        name={field.name}
                        label={field.label}
                      >
                        {field.options.map((option, idx) => (
                          <MenuItem key={idx} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  ) : (
                    <Input
                      required={field.required}
                      label={field.label}
                      name={field.name}
                      type={field.type || "text"}
                      value={formValues[field.name] || ""}
                      onChange={handleChange}
                    />
                  )}
                </Grid>
              ))}
          </Grid>
        </Grid>

        {/* Remaining Input Fields */}
        {profilePic && (
          <Grid container spacing={1} style={{ marginTop: "0px" }}>
            {fields.slice(3).map((field, index) => (
              <Grid key={index} item xs={12} sm={6} >
                {field.type === "dropdown" ? (
                  <Box>

                
                  <FormControl fullWidth variant="outlined" size="small" sx={{marginTop:"10px",}}>
                    <Box >{field.label}</Box>
                    <Select
                      value={formValues[field.name] || ""}
                      onChange={handleDropdownChange(field.name)}
                      label={field.label}
                    >
                      {field.options.map((option, idx) => (
                        <MenuItem key={idx} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl> </Box>
                ): (
                  <Input
                    required={field.required}
                    label={field.label}
                    name={field.name}
                    type={field.type || "text"}
                    value={formValues[field.name] || ""}
                    onChange={handleChange}
                  />  
                )}
              </Grid>
            ))}
          </Grid>
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "30px",
          }}
        >
          <CustomButton inverted={true} label="Cancel" onClick={handleCancel} />
          <CustomButton inverted={false} label="Add Member" type="submit" />
        </Box>
      </form>
    </Paper>
  );
}

export default Form;
