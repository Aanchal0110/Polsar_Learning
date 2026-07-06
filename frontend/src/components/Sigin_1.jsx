import React, { Component } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginStyle: {
        width: "20%",
        height: "50%",
        border: "1px solid black",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "20px",
      },
      TextFieldStyle: {
        margin: "15px",
      },
      ButtonFieldStyle: {
        width: "40%",
        marginLeft: "10px",
      },
      Logged: true,
    };
  }
  render() {
    const { toggle_sign } = this.props;
    return (
      <div style={this.state.loginStyle}>
        <div
          style={{
            height: "50%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            padding: "10px",
          }}
        >
          <h3>SigN In</h3>
          <TextField
            id="outlined-required"
            label="Email"
            defaultValue="________"
            sx={this.state.TextFieldStyle}
          />
          <TextField
            id="outlined-required"
            label="Password"
            defaultValue="________"
            sx={this.state.TextFieldStyle}
          />
        </div>
        <div
          style={{
            height: "50%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <Button sx={this.state.ButtonFieldStyle} variant="contained">
            <Link
              style={{
                textDecoration: "none",
                color: "white",
              }}
              to="/Home"
            >
              Login
            </Link>
          </Button>

          <Button
            onClick={toggle_sign}
            sx={this.state.ButtonFieldStyle}
            variant="contained"
          >
            SignIn
          </Button>
        </div>
      </div>
    );
  }
}

export default SignIn;
