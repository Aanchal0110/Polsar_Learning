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
        <main style={{ width: "90%", justifySelf: "center" }}>
          <div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "20px",
                justifyContent: "center",
                alignItems: "centers",
              }}
            >
              {this.state.data.map((data, index) => (
                <>
                  <DomainCard index id={index} data={data} />
                </>
              ))}
            </div>
          </div>
        </main>
      </>
    );
  }
}

export default DomainExperts;
