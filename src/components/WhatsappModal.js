import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  MenuItem,
  Select,
  TextField,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CustomButton from "./CustomButton";

// Styled dialog component similar to your BootstrapDialog example
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    minWidth: "600px",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function WhatsappModal({ open, onClose }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedMessageType, setSelectedMessageType] = useState("");
  const [message, setMessage] = useState("");

  // When the message type changes, auto-populate the message field accordingly.
  useEffect(() => {
    if (selectedMessageType === "prewritten") {
      setMessage(
        "Temple is having its annual general body meeting on 15th July 2025. Everyone is required to be present. Please join promptly."
      );
    } else if (selectedMessageType === "standard") {
      setMessage(
        "Your member data has been updated for your ID. This message is sent to inform you of the update. Thank you."
      );
    } else if (selectedMessageType === "custom") {
      setMessage(""); // Clear the message for custom input.
    }
  }, [selectedMessageType]);

  const handleCancel = () => {
    // Optionally, reset form fields if needed.
    console.log("Cancel button clicked");
    onClose();
  };

  const handleWhatsAppClick = () => {
    // Use the message state regardless of type.
    if (phoneNumber && message) {
      window.open(
        `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
      );
      onClose(); // Close the modal after sending
    } else {
      alert("Please provide both a phone number and a message.");
    }
  };

  return (
    <BootstrapDialog onClose={onClose} aria-labelledby="whatsapp-dialog-title" open={open}>
      <DialogTitle sx={{ m: 0, p: 1 }} id="whatsapp-dialog-title">
        Send WhatsApp Message
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent>
        {/* Dropdown for selecting message type */}
        <FormControl fullWidth sx={{ marginBottom: "20px" }}>
          <Select
            value={selectedMessageType}
            onChange={(e) => setSelectedMessageType(e.target.value)}
            displayEmpty
            renderValue={(value) => (value === "" ? "Select message type" : value)}
          >
            <MenuItem value="">
              <em>Select message type</em>
            </MenuItem>
            <MenuItem value="custom">Custom Message</MenuItem>
            <MenuItem value="prewritten">Prewritten Message</MenuItem>
            <MenuItem value="standard">Standard Message</MenuItem>
          </Select>
        </FormControl>

        {/* Phone number input */}
        <TextField
          fullWidth
          label="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          sx={{ marginBottom: "20px" }}
        />

        {/* Message input field (always visible) */}
        <TextField
          fullWidth
          label="Message"
          multiline
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          sx={{ marginBottom: "20px" }}
        />
      </DialogContent>

      <DialogActions>
        <CustomButton inverted={true} label="Cancel" onclick={handleCancel} />
        <CustomButton inverted={true} label="Send Message" onclick={handleWhatsAppClick} />
      </DialogActions>
    </BootstrapDialog>
  );
}

export default WhatsappModal;
