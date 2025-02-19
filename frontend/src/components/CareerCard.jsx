import React from "react";
import { Box } from "@mui/material";
import Logo from "../Assests/WebSiteGenral/logo.jpeg";

const CareerCard = (props) => {
  return (
    <Box
      style={{
        width: "400px",
        height: "400px",
        border: "2px solid red",
        margin: "10px",
        padding: "10px",
        borderRadius: "30px",
      }}
    >
      <img
        style={{
          height: "100px",
          width: "100px",
          borderRadius: "50%",
          justifySelf: "center",
          marginLeft: "40%",
        }}
        src={Logo}
        alt=""
      />
      <h1>Career Info</h1>
    </Box>
  );
};

export default CareerCard;
