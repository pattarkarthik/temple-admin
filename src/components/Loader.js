import React from "react";
import Dialog from "@mui/material/Dialog";
import { Box, CircularProgress, Paper } from "@mui/material";

export default function Loader(props) {
  return (
    <React.Fragment>
      <Dialog
        open={true}
        PaperProps={{
          sx: {
            backgroundColor: "transparent",
            boxShadow: "none",
            overflow: "hidden",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
          }}
        >
          <CircularProgress
            sx={{
              color: "white",
            }}
          />
        </Box>
      </Dialog>
    </React.Fragment>
  );
}
