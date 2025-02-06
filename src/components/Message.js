import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import axios from "axios";
import { ACCESS_TOKEN } from "../util/constants";

function Message({ open, handleClose }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [whatsappResponse, setWhatsappResponse] = useState("");
  const formattedPhoneNumber = phoneNumber.startsWith("+")
    ? phoneNumber
    : `+${phoneNumber}`;

  const handleSendWhatsAppMessage = async () => {
    if (!phoneNumber || !message) {
      setWhatsappResponse("Whatsapp number and message are required.");
      return;
    }

    // Retrieve the token from localStorage
    const token = localStorage.getItem(ACCESS_TOKEN);
    console.log("JWT Token from localStorage:", token);

    // If token is not available, show an error message
    if (!token) {
      setWhatsappResponse("Authorization token is missing.");
      return;
    }

    try {
      console.log("📤 Sending request to backend...");
      console.log("Payload:", { phone_number: phoneNumber, message: message });
      const res = await axios.post(
        "http://localhost:8000/api/send-whatsapp/",
        { phone_number: formattedPhoneNumber, message: message },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the JWT token in headers
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response Data:", res.data);

      setWhatsappResponse(res.data.success || "Message sent successfully!");
    } catch (error) {
      setWhatsappResponse(
        error.response?.data?.error || "Failed to send message."
      );
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Send WhatsApp Message</DialogTitle>
      <DialogContent>
        <TextField
          label="Phone Number"
          fullWidth
          margin="normal"
          value={phoneNumber || ""} // Ensure it's not undefined
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <TextField
          label="Message"
          fullWidth
          margin="normal"
          multiline
          rows={3}
          value={message || ""} // Ensure it's not undefined
          onChange={(e) => setMessage(e.target.value)}
        />
        {whatsappResponse && (
          <p style={{ color: "green" }}>{whatsappResponse}</p>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button
          onClick={handleSendWhatsAppMessage}
          color="primary"
          variant="contained"
        >
          Send
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Message;
