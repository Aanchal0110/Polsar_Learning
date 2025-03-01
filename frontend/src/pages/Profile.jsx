import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Chip,
  Grid,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";
import BlogCard_2 from "../components/BlogCard_2";
import { useUser } from "../context/user/UserContext";
import axios from "axios";

export const Profile = () => {
  const User_Info = useUser();

  const [user, setUser] = useState({
    name: User_Info.user.User.UserName,
    headline: User_Info.user.User.Occupation,
    location: "San Francisco, CA",
    experience: [
      {
        title: "Software Engineer",
        company: "Google",
        years: "2021 - Present",
      },
      {
        title: "Frontend Developer",
        company: "Microsoft",
        years: "2019 - 2021",
      },
    ],
    skills: [
      "React.js",
      "Node.js",
      "JavaScript",
      "TypeScript",
      "GraphQL",
      "MUI",
    ],
  });

  const [blogs, setblogs] = useState({});

  useEffect(() => {
    const data = async () => {
      const res = await axios.post(User_Info.backendUrl);
    };
  });

  return (
    <Box
      sx={{ width: "100%", bgcolor: "#f4f4f4", minHeight: "100vh", padding: 2 }}
    >
      {/* Cover Photo */}
      <Box
        sx={{
          position: "relative",
          height: "200px",
          bgcolor: "#1976d2",
          borderRadius: "10px",
        }}
      ></Box>

      {/* Profile Picture */}
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "-50px" }}
      >
        <Avatar sx={{ width: 120, height: 120, border: "4px solid white" }} />
      </Box>

      {/* User Info */}
      <Card
        sx={{
          maxWidth: 800,
          margin: "20px auto",
          padding: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          {user.name}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {user.headline}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          <LocationOnIcon fontSize="small" /> {user.location}
        </Typography>
        <Button variant="contained" startIcon={<EditIcon />} sx={{ mt: 2 }}>
          Edit Profile
        </Button>
      </Card>

      {/* Experience Section */}
      <Card sx={{ maxWidth: 800, margin: "20px auto", padding: 2 }}>
        <Typography variant="h6" fontWeight="bold">
          Experience
        </Typography>
        {user.experience.map((exp, index) => (
          <Box
            key={index}
            sx={{ display: "flex", alignItems: "center", mt: 2 }}
          >
            <WorkIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="body1">
              {exp.title} at <b>{exp.company}</b> ({exp.years})
            </Typography>
          </Box>
        ))}
      </Card>

      {/* Skills Section */}
      <Card sx={{ maxWidth: 800, margin: "20px auto", padding: 2 }}>
        <Typography variant="h6" fontWeight="bold">
          Skills
        </Typography>
        <Grid container spacing={1} sx={{ mt: 1 }}>
          {user.skills.map((skill, index) => (
            <Grid item key={index}>
              <Chip label={skill} color="primary" />
            </Grid>
          ))}
        </Grid>
      </Card>

      <Card sx={{ maxWidth: 800, margin: "20px auto", padding: 2 }}>
        <Typography variant="h6" fontWeight="bold">
          Your Blogs
        </Typography>
        {/* <BlogCard_2 /> */}
      </Card>

      <Card sx={{ maxWidth: 800, margin: "20px auto", padding: 2 }}>
        <Typography variant="h6" fontWeight="bold">
          Contact details
        </Typography>
        Contact Details comes Heres
      </Card>
    </Box>
  );
};

export default Profile;
