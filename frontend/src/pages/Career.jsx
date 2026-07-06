import React, { Component } from "react";
import MainNavBar_1 from "../components/MainNavBar_1";
import CareerCard from "../components/CareerCard";
import axios from "axios";
import { TextField } from "@mui/material";
import AddIntership from "../components/AddIntership";
import { UserContext } from "../context/user/UserContext";

export class Career extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      data: [0, 1],
    };
  }

  componentDidMount() {
    console.clear();
    axios.get(this.context.backendUrl + "career/").then((response) => {
      this.setState({ data: response.data });
    });
  }

  render() {
    return (
      <>
        <header
          style={{
            width: "100vw",
          }}
        >
          <MainNavBar_1 />
        </header>
        <main>
          <h1>Career Options you can opt for...</h1>
          <div style={{ display: "flex", overflow: "scroll" }}>
            {this.state.data.map((data, index) => (
              <CareerCard />
            ))}
          </div>
          <AddIntership />
        </main>
      </>
    );
  }
}

export default Career;
