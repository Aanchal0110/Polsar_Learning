import React, { Component } from "react";
import MainNavBar_1 from "../components/MainNavBar_1";
import DomainCard from "../components/DomainCard";
import axios from "axios";
import { UserContext } from "../context/user/UserContext";

export class DomainExperts extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    axios
      .get(this.context.backendUrl + "auth")
      .then((response) => {
        // console.log(response.data);
        this.setState({ data: response.data, loading: false });
      })
      .catch((error) => {
        this.setState({ error: error.message, loading: false });
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
        <main style={{ width: "80%", justifySelf: "center" }}>
          <div>
            <h1>Researcher</h1>
            <div
              style={{
                border: "2px black solid",
                width: "100%",
                height: "300px",
                display: "flex",
                overflow: "scroll",
              }}
            >
              {this.state.data.map((data, index) => (
                <>
                  <DomainCard index id={index} data={data} />
                </>
              ))}
            </div>
          </div>
          <div>
            <h1>Researcher</h1>
            <div
              style={{
                border: "2px black solid",
                width: "100%",
                height: "300px",
                display: "flex",
                overflow: "scroll",
              }}
            ></div>
          </div>
          <div>
            <h1>Researcher</h1>
            <div
              style={{
                border: "2px black solid",
                width: "100%",
                height: "300px",
                display: "flex",
                overflow: "scroll",
                flexDirection: "row",
                flexFlow: "row",
                flexGrow: "initial",
              }}
            ></div>
          </div>
        </main>
      </>
    );
  }
}

export default DomainExperts;
