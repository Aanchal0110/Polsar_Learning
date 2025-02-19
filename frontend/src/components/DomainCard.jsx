import React from "react";
import logo from "../Assests/WebSiteGenral/logo.jpeg";

export const DomainCard = (props) => {
  return (
    <>
      <div
        style={{
          height: "90%",
          width: "300px",
          border: "2px red solid",
          margin: "15px",
          overflow: "auto",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <img
          style={{
            width: "50%",
            height: "50%",
            borderRadius: "50%",
            justifySelf: "center",
            marginLeft: "25%",
            marginTop: "10px",
          }}
          src={logo}
          alt=""
        />
        <h4>Name:{props.data.UserName}</h4>
        <h4>Domain: {props.data.Occupation}</h4>
        <h4>Contact: {props.data.Email}</h4>
        <h4>Verified: {props.data.Verified}</h4>
      </div>
    </>
  );
};

export default DomainCard;
