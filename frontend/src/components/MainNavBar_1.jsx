import { Box } from "@mui/material";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Logo from "../Assests/WebSiteGenral/logo.jpeg";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useUser, UserContext } from "../context/user/UserContext";

export class MainNavBar_1 extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      navBarItemStyle: {
        margin: "5px",
        color: "white",
        fontFamily: "monospace",
        fontSize: "150%",
      },
    };
  }

  // useUser = useUser();

  componentDidMount() {
    // console.log(this.useUser);
  }

  render() {
    // console.log(this.context);
    return (
      <Box
        sx={{
          display: "flex",
          listStyle: "none",
          alignItems: "center",
          justifyContent: "space-evenly",
          width: "99.8%",
          height: "70px",
          //   border: "2px solid blue",
          background: "#003366",
        }}
      >
        <Link style={{ listStyle: "none", textDecoration: "none" }} to="/Home">
          <li style={this.state.navBarItemStyle}>
            <img
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
              }}
              src={Logo}
              alt="Logo"
            />
          </li>
        </Link>
        <Link style={{ listStyle: "none", textDecoration: "none" }} to="/Home">
          <li style={this.state.navBarItemStyle}>Home</li>
        </Link>
        <Link
          style={{ listStyle: "none", textDecoration: "none" }}
          to="/Resourses"
        >
          <li style={this.state.navBarItemStyle}>Resouces</li>
        </Link>
        <Link
          style={{ listStyle: "none", textDecoration: "none" }}
          to="/DomainExperts"
        >
          <li style={this.state.navBarItemStyle}>Domain Experts</li>
        </Link>
        <Link
          style={{ listStyle: "none", textDecoration: "none" }}
          to="/Downloads"
        >
          <li style={this.state.navBarItemStyle}>Downloads</li>
        </Link>
        <Link
          style={{ listStyle: "none", textDecoration: "none" }}
          to="/Education"
        >
          <li style={this.state.navBarItemStyle}>Education</li>
        </Link>
        <Link
          style={{ listStyle: "none", textDecoration: "none" }}
          to="/Career"
        >
          <li style={this.state.navBarItemStyle}>Career</li>
        </Link>
        <Link
          style={{ listStyle: "none", textDecoration: "none" }}
          to="/Events"
        >
          <li style={this.state.navBarItemStyle}>Events</li>
        </Link>
        <Link
          style={{ listStyle: "none", textDecoration: "none" }}
          to="/Blog_2"
        >
          <li style={this.state.navBarItemStyle}>Blog</li>
        </Link>
        <Link
          style={{ listStyle: "none", textDecoration: "none" }}
          to="/ContactUs"
        >
          <li style={this.state.navBarItemStyle}>Contact Us</li>
        </Link>
        {!this.context.isLogged && (
          <Link
            style={{ listStyle: "none", textDecoration: "none" }}
            to="/auth"
          >
            <li style={this.state.navBarItemStyle}>Login</li>
          </Link>
        )}
        {this.context.isLogged && (
          <Link to="/Profile">
            <AccountCircleIcon />
          </Link>
        )}
      </Box>
    );
  }
}

export default MainNavBar_1;
