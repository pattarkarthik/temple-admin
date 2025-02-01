import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function PrintLayout({ closePrintModal, members, fields }) {
  const componentRef = useRef(null);
  console.log(fields);
  const printFn = useReactToPrint({
    contentRef: componentRef,
  });
  const [checkedFields, setCheckedFields] = useState(
    fields.reduce((acc, field) => {
      acc[field.name] = false;
      return acc;
    }, {})
  );

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckedFields((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const renderSelectedFields = (member) => {
    return Object.keys(checkedFields)
      .filter((fieldName) => checkedFields[fieldName]) // Only include checked fields
      .map((fieldName) => {
        const field = fields.find((f) => f.name === fieldName);

        // Check for address line 1 and 2
        if (fieldName === "address_line_1" && member["address_line_2"]) {
          return (
            <Grid item xs={6} key={fieldName}>
              <Typography variant="body2" sx={{ fontSize: "12px" }}>
                <span>Address:</span> {member["address_line_1"]}{" "}
                {member["address_line_2"]}
              </Typography>
            </Grid>
          );
        }

        return (
          <Grid item xs={6} key={fieldName}>
            <Typography
              variant="body2"
              sx={{
                fontSize: "12px",
                wordWrap: "break-word", // Ensures the text wraps inside the box
                overflowWrap: "break-word", // Makes long words break onto the next line
                whiteSpace: "normal", // Allows line breaks within the text
              }}
            >
              <span>{field.label}:</span> {member[fieldName]}
            </Typography>
          </Grid>
        );
      });
  };

  // Get only 6 members (3 rows, 2 columns)
  const membersForPreview = members.slice(0, 6);

  return (
    <BootstrapDialog
      onClose={closePrintModal}
      aria-labelledby="customized-dialog-title"
      open={true}
      // sx={{ maxWidth: "300px" }}
    >
      <DialogTitle sx={{ m: 0, p: 1 }} id="customized-dialog-title">
        Print Selected Fields
      </DialogTitle>

      <Box sx={{ padding: 2 }}>
        <Grid container spacing={1}>
          {fields
            .filter(
              (field) =>
                field.name !== "husband_photo" && field.name !== "wife_photo"
            )
            .map((field) => (
              <Grid item xs={3} key={field.name}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkedFields[field.name]}
                      onChange={handleCheckboxChange}
                      name={field.name}
                      size="small"
                      sx={{
                        color: "#f08001", // Unselected color
                        "&.Mui-checked": {
                          color: "#f08001", // Selected color
                        },
                      }}
                    />
                  }
                  label={field.label}
                  componentsProps={{ typography: { fontSize: "12px" } }}
                />
              </Grid>
            ))}
        </Grid>
      </Box>

      <IconButton
        aria-label="close"
        onClick={closePrintModal}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent
        // dividers
        ref={componentRef}
        sx={{
          height: "297mm", // A4 height
          margin: "20px auto",
          padding: "10mm",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          boxSizing: "border-box",
          backgroundColor: "#ffffff",
          border: "1px solid #ddd",
          overflow: "auto",
        }}
      >
        {/* 3 rows, 2 columns layout for the members */}
        <Grid container spacing={4}>
          {membersForPreview.map((member, index) => (
            <Grid item xs={6} key={index}>
              <Box
                sx={{
                  padding: 2,
                  backgroundColor: "#f9f9f9",
                  borderRadius: "4px",
                }}
              >
                <Grid container spacing={1}>
                  {renderSelectedFields(member)}
                </Grid>
              </Box>
            </Grid>
          ))}
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button autoFocus onClick={printFn}>
          Print
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}
