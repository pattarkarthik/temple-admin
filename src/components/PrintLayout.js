import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";
import Modal from "./Modal";

export default function PrintLayout({
  closePrintModal,
  members,
  fields,
  openPrintModal,
}) {
  const componentRef = useRef(null);
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
      .filter((fieldName) => checkedFields[fieldName])
      .map((fieldName) => {
        const field = fields.find((f) => f.name === fieldName);

        return (
          <Grid item xs={12} sm={12} md={12} key={fieldName}>
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
  const membersForPreview = members.slice(0, members.length);

  return (
    <Modal
      title="Print Selected Fields"
      saveClickHandler={printFn}
      saveBtnLabel={"Print"}
      openModal={openPrintModal}
      onClose={closePrintModal}
    >
      <Box sx={{ padding: 2 }}>
        <Grid container spacing={1}>
          {fields
            .filter(
              (field) =>
                field.name !== "husband_photo" && field.name !== "wife_photo"
            )
            .map((field) => (
              <Grid item xs={3} sm={3} md={3} key={field.name}>
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
      <Box
        ref={componentRef}
        sx={{
          margin: "20px auto",
          padding: "10mm",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          boxSizing: "border-box",
          backgroundColor: "#ffffff",
          border: "1px solid #ddd",
          overflow: "auto",
        }}
      >
        <Grid container spacing={2}>
          {membersForPreview.map((member, index) => (
            <Grid
              item
              xs={6}
              sm={6}
              md={6}
              key={index}
              sx={{ pageBreakInside: "avoid", breakInside: "avoid-column" }}
            >
              <Box
                sx={{
                  padding: 2,
                  backgroundColor: "#f9f9f9",
                  borderRadius: "4px",
                  pageBreakInside: "avoid", // Prevent breaking inside boxes
                  breakInside: "avoid-page",
                }}
              >
                <Grid container spacing={1}>
                  {renderSelectedFields(member)}
                </Grid>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Modal>
  );
}
