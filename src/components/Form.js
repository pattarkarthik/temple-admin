import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import CardHeader from "@mui/material/CardHeader";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

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

// Custom Styled CardHeader
const StyledCardHeader = styled(CardHeader)(({ theme }) => ({
  backgroundColor: "rgba(38, 198, 218)", // Background color for the header
  color: theme.palette.common.white, // White text color
  borderRadius: "8px 8px 0 0", // Rounded corners at the top
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Shadow effect
  padding: theme.spacing(2), // Padding inside the header
  position: "relative", // Set position to relative for overlapping
  top: "-20px", // Move the header upwards to overlap the card content
  zIndex: 10,
  right: 0, // Ensure the header stays on top
}));
const StyledCardActions = styled(CardActions)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
}));

function Form({ fields, onSubmit, title, initialValues = {}, maxHeight }) {
  const [formValues, setFormValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);
    if (onSubmit) onSubmit(formValues);
  };

  return (
    <Grid container justifyContent="center" spacing={1}>
      <Grid item md={12}>
        <StyledCard
          className={classes.padding}
          sx={{ ...(maxHeight && { maxHeight }), overflow: "auto" }}
        >
          <StyledCardHeader title={title} />
          <form onSubmit={handleSubmit}>
            <CardContent>
              <Grid container spacing={2} justifyContent="center">
                {fields.map((field, index) => (
                  <Grid item xs={12} sm={6} md={6} key={index}>
                    <TextField
                      required={field.required}
                      label={field.label}
                      variant={"outlined"}
                      fullWidth
                      name={field.name}
                      type={field.type || "text"}
                      value={formValues[field.name]}
                      multiline={field.multiline || false}
                      rows={field.rows || 1}
                      onChange={handleChange}
                    />
                  </Grid>
                ))}
              </Grid>
            </CardContent>
            <StyledCardActions>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className={classes.button}
              >
                Submit
              </Button>
              <Button
                variant="contained"
                color="secondary"
                // onClick={handleClose} // Handle cancel to close modal
                className={classes.button}
              >
                Cancel
              </Button>
            </StyledCardActions>
          </form>
        </StyledCard>
      </Grid>
    </Grid>
  );
}

export default Form;
