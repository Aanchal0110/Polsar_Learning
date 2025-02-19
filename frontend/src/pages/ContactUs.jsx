import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import SendIcon from "@mui/icons-material/Send";
import MainNavBar_1 from "../components/MainNavBar_1";

export const ContactUs = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Handle Input Change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError("All fields are required!");
      return;
    }

    // Simulate form submission
    setSubmitted(true);
    setError("");
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <>
      <header
        style={{
          width: "100vw",
        }}
      >
        <MainNavBar_1 />
      </header>
      <Container sx={{ maxWidth: "600px", mt: 5 }}>
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <EmailIcon sx={{ fontSize: 50, color: "primary.main" }} />
          <Typography variant="h4" fontWeight="bold">
            Contact Us
          </Typography>
          <Typography variant="body1" color="textSecondary">
            We’d love to hear from you! Fill in the form below.
          </Typography>
        </Box>

        {submitted && (
          <Alert severity="success">Message sent successfully!</Alert>
        )}
        {error && <Alert severity="error">{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Your Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            type="email"
            label="Your Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Your Message"
            name="message"
            value={form.message}
            onChange={handleChange}
            multiline
            rows={4}
            sx={{ mb: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            startIcon={<SendIcon />}
          >
            Send Message
          </Button>
        </form>
      </Container>
    </>
  );
};

export default ContactUs;
