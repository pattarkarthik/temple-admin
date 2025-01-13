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

function Form({ fields = [], onSubmit, title, initialValues = {}, purpose }) {
  const [formValues, setFormValues] = useState(initialValues);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);
    if (onSubmit) onSubmit(formValues);
  };

  return (
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
          <Profilepic />
        </Grid>

        <Grid item xs={12} md={6}>
          {fields.slice(0, 3).map((field, index) => (
            <Grid key={index} item xs={12} style={{ marginBottom: "5px" }}>
              {field.type === "dropdown" ? (
                <FormControl fullWidth variant="outlined">
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
        {fields.slice(2).map((field, index) => (
          <Grid key={index} item xs={12} sm={6}>
            {field.type === "dropdown" ? (
              <FormControl fullWidth variant="outlined">
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
        <Button variant="contained" color="secondary">
          Cancel
        </Button>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </Box>
    </form>
  );
}

export default Form;
