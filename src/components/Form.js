import React, { useState } from "react";
import {
  Box,
  FormControl,
  Grid,
  MenuItem,
  Paper,
  Select,
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

  const handleSubmit =  async (e) => {
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
    const isSuccessful = await onSubmit(data);

    if (isSuccessful) {
      setFormValues(initialValues); // Reset all fields to initial values
      setUploadedProfilePic(null); // Clear profile picture
    }
  };

  const handleCancel = () => {
    setFormValues(initialValues); // Reset form fields to initialValues
    setUploadedProfilePic(null); // Clear the profile picture
  };

  return (
    <Paper
      sx={{
        padding: "10px",
        backgroundColor:"rgb(255, 231, 218)",
        borderRadius:"0px"
      }}
    >
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} direction="row">
          {/* Profile Picture at the Top */}
          {profilePic && (
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <Profilepic onFileChange={handleFileChange} />
            </Grid>
            
          )}

          {/* Fields Below the Profile Picture */}
          <Grid item xs={12}>
            <Grid container spacing={2}>
              {fields.map((field, index) => (
                <Grid key={index} item xs={12} sm={6}>
                  {field.type === "dropdown" ? (
                    <FormControl fullWidth size="small" sx={{ marginTop: "10px",  display:"flex", flexDirection:"row"}}>
                      <Box sx={{width:"30%", fontSize:"17px"}}>{field.label}</Box>
                      <Select
                      sx={{width:"65%", backgroundColor:"rgb(255, 250, 245)"}}
                        value={formValues[field.name] || ""}
                        onChange={handleDropdownChange(field.name)}
                        name={field.name}
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
        </Grid>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "30px",

          }}
        >
          <CustomButton inverted={false} label="Cancel" onclick={handleCancel} />
          <CustomButton inverted={false} label="Add Member" type="submit" />
        </Box>
      </form>
    </Paper>
  );
}

export default Form;
