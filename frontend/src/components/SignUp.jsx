import React, { useState } from "react";
import { TextField, Button, Typography, Container, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import useUser from "../context/user/UserContext";

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [image, setImage] = useState("");
  const [domain, setDomain] = useState("");
  const [fullName, setfullName] = useState("");
  const User_Info = useUser();

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      setError("All fields are required!");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    setError("");
    const res = await axios.post(User_Info.backendUrl + "auth/SignIn", {
      UserName: fullName,
      Email: email,
      Password: password,
      Occupation: domain,
    });

    if (res.status == 200) {
      User_Info.login(res.data);
      navigate("/login");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <Typography variant="h4" gutterBottom>
          Sign Up
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleSignup}>
          <TextField
            fullWidth
            margin="normal"
            label="Full Name"
            variant="outlined"
            value={fullName}
            onChange={(e) => setfullName(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Image"
            variant="outlined"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Domain"
            variant="outlined"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Confirm Password"
            variant="outlined"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2 }}
          >
            Sign Up
          </Button>
        </form>
        <Typography sx={{ mt: 2 }}>
          Already have an account? <Link to="/">Login</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Signup;
