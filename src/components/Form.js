import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import CardHeader from "@mui/material/CardHeader";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import UploadAvatar from "./UploadAvatar";

const PREFIX = "DynamicForm";

const classes = {
  padding: `${PREFIX}-padding`,
  button: `${PREFIX}-button`,
};

const StyledCard = styled(Card)(({ theme }) => ({
  [`&.${classes.padding}`]: {
    padding: theme.spacing(3),
  },
  [`& .${classes.button}`]: {
    margin: theme.spacing(1),
  },
}));

const StyledCardHeader = styled(CardHeader)(({ theme }) => ({
  backgroundColor: "rgba(38, 198, 218)",
  color: theme.palette.common.white,
  borderRadius: "8px 8px 0 0",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
}));

const StyledCardActions = styled(CardActions)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
}));

function Form({ fields = [], onSubmit, title, initialValues = {}, purpose }) {
  const [formValues, setFormValues] = useState(initialValues);
  const [avatar, setAvatar] = useState(null); // Add state for the avatar

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
    const finalFormValues = { ...formValues, avatar }; // Include the avatar in the final form values
    console.log(finalFormValues);
    if (onSubmit) onSubmit(finalFormValues);
  };

  return (
    <Grid container justifyContent="center" spacing={2}>
      <Grid item xs={12} md={10}>
        <StyledCard className={classes.padding}>
          <StyledCardHeader title={title} />
          <form onSubmit={handleSubmit}>
            <CardContent>
              <Grid container spacing={3} alignItems="flex-start">
                {/* Conditionally render UploadAvatar */}
                {(purpose === "NewMember.js" && purpose !== "YelamDataTable" &&
                  purpose === "AllMembers.js") && (
                  <Grid
                    item
                    xs={12}
                    sm={3}
                    md={3}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "flex-start",
                    }}
                  >
                    <UploadAvatar avatar={avatar} setAvatar={setAvatar} />
                  </Grid>
                )}

                {/* Form fields */}
                <Grid container item xs={12} sm={15} md={15} spacing={1}>
                  {fields.map((field, index) => (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      key={index}
                      sx={{
                        "&:last-child": {
                          gridColumn:
                            fields.length % 2 === 0 ? "span 1" : "span 2", // Adjust the last field to span full width if odd
                        },
                      }}
                    >
                      {field.type === "dropdown" ? (
                        <FormControl fullWidth variant="outlined">
                          <InputLabel>{field.label}</InputLabel>
                          <Select
                            value={formValues[field.name] || ""}
                            onChange={handleDropdownChange(field.name)}
                            label={field.label}
                          >
                            {field.options.map((option, idx) => (
                              <MenuItem
                                key={idx}
                                value={option.value}
                                sx={{
                                  "&:hover": {
                                    backgroundColor: "rgba(21, 168, 236, 0.2)", 
                                    border: "1px solid #005f73", 
                                  },
                                }}
                              >
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
            </CardContent>
            <StyledCardActions>
              <Button variant="contained" color="secondary">
                Cancel
              </Button>
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
            </StyledCardActions>
          </form>
        </StyledCard>
      </Grid>
    </Grid>
  );
}

export default Form;
