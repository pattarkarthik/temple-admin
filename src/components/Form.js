import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import Profilepic from "./Profilepic";


function Form({ fields = [], onSubmit, initialValues = {} }) {
  const [formValues, setFormValues] = useState(initialValues);
  const [profilePic, setProfilePic] = useState(null); // To hold the photo file

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
    setProfilePic(file);
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

    // Add the photo file if it exists
    if (profilePic) {
      data.append("photo", profilePic); // "photo" should match the field name in your Django model
    }

    // Submit the data
    onSubmit(data);
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
            alignItems: "flex-end",
          }}
        >
          <Grid item xs={12} md={4} style={{ textAlign: "center" }}>
            <Profilepic onFileChange={handleFileChange} />
          </Grid>

          <Grid item xs={12} md={6}>
            {fields.slice(0, 4).map((field, index) => (
              <Grid key={index} item xs={12} style={{ marginBottom: "5px" }}>
                {field.type === "dropdown" ? (
                  

                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="demo-select-small-label">{field.label}</InputLabel>
                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      value={formValues[field.name] || ""}
                          onChange={handleDropdownChange(field.name)}
                          name={field.name}
                          label={field.label}
                    >
                    {field.options.map((option, idx) => (
                                            <MenuItem key={idx} value={option.value}>
                                              {option.label} hh
                                            </MenuItem>
                                          ))}
                    </Select>
                    </FormControl>
                ) : (
                  <TextField
                  size="small"
                    required={field.required}
                    label={field.label}
                    variant="outlined"
                    fullWidth
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
        <Grid container spacing={1} style={{ marginTop: "20px" }}>
          {fields.slice(4).map((field, index) => (
            <Grid key={index} item xs={12} sm={6}  >
              {field.type === "dropdown" ? (
                <FormControl fullWidth variant="outlined" size="small">
                  <InputLabel>{field.label}</InputLabel>
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
                </FormControl>
              ) : (
                <TextField
                  size="small"
                  required={field.required}
                  label={field.label}
                  variant="outlined"
                  fullWidth
                  name={field.name}
                  type={field.type || "text"}
                  value={formValues[field.name] || ""}
                  onChange={handleChange}
                />
              )}
            </Grid>
          ))}
        </Grid>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "30px",
          }}
        >
          <Button variant="contained" sx={{backgroundColor:"white", border:"1px solid #f08001", color:"#f08001", boxShadow:"none"}}>
            Cancel
          </Button>
          <Button variant="contained" sx={{backgroundColor:"#f08001",  color:"white", boxShadow:"none"}} type="submit">
            Add Member
          </Button>
        </Box>
      </form>
    </Paper>
  );
}

export default Form;
