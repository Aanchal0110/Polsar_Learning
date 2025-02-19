import React, { Component } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { UserContext } from "../context/user/UserContext";
import axios from "axios";

export class Login_1 extends Component {
  static contextType = UserContext;

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
      UserName: null,
      password: null,
    };

    this.UserInput = React.createRef();
    this.passInput = React.createRef();
    // this.navigator = useNavigate();

    // this.handleUsernameChange = this.handleUsernameChange.bind(this);
  }

  componentDidMount() {
    // this.fetch_User();
  }

  fetch_User = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/auth/login?username=${this.UserInput.current.value}&password=${this.passInput.current.value}`
      );
      if (response.data) {
        this.context.updateUserInfo(response.data);
        window.location.href = "/Home";
        // this.navigator("/Home");
        console.log(this.context.User);
      }
    } catch (err) {
      // console.log(err.message);
      window.location.href = "/auth";
    }
  };

  render() {
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
          <h3>LOGIN</h3>
          <TextField
            id="outlined-required"
            label="Email"
            defaultValue="________"
            sx={this.state.TextFieldStyle}
            // onChange={this.handleUsernameChange}
            inputRef={this.UserInput}
          />
          <TextField
            id="outlined-required"
            label="Password"
            defaultValue="________"
            // sx={this.state.TextFieldStyle}
            inputRef={this.passInput}
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
          <Button
            sx={this.state.ButtonFieldStyle}
            variant="contained"
            onClick={this.fetch_User}
          >
            Login
          </Button>

          <Button
            sx={this.state.ButtonFieldStyle}
            variant="contained"
            onClick={() => this.context.updateUserInfo({ error: "hello" })}
          >
            SignIn
          </Button>
        </div>
      </div>
    );
  }
}

export default Login_1;
