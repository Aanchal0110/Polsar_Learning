import React, { Component, useContext } from "react";
import MainNavBar_1 from "../components/MainNavBar_1";
import MainFooter_1 from "../components/MainFooter_1";
import { Box } from "@mui/material";
import Earth_1 from "../Assests/HomeImages/earth.png";
import { UserContext } from "../context/user/UserContext";

export class Home extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      cardStyle: {
        height: "300px",
        width: "90%",
        // border: "1px solid black",
        marginTop: "30px",
        marginBottom: "5px",
        boxShadow: "inset 5px 0px 10px 3px rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: "60px",
        borderRadius: "20px",
      },
    };
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
        <Box
          sx={{
            height: "90.5vh",
            widht: "100%",
            border: "1px solid black",
            backgroundImage: `url(${Earth_1})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              height: "200px",
              widht: "500px",
              // border: "1px solid red",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              background: "rgba(0, 0, 0, 0.5)",
              borderRadius: "10px",
            }}
          >
            <div>
              <h1
                style={{
                  color: "white",
                  margin: "10px",
                }}
              >
                DISCOVER NEW HORIZONS
              </h1>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              <button
                style={{
                  background: "#ff6600",
                  color: "white",
                  border: "1px solid #ff6600",
                  height: "30px",
                  widht: "50px",
                  fontSize: "15px",
                  padding: "5px",
                  borderRadius: "5px",
                }}
              >
                WATCH VIDEO
              </button>
              <button
                style={{
                  background: "#ff6600",
                  color: "white",
                  border: "1px solid #ff6600",
                  height: "30px",
                  widht: "50px",
                  fontSize: "15px",
                  padding: "5px",
                  borderRadius: "5px",
                }}
              >
                Read More
              </button>
            </div>
          </div>
        </Box>
        <Box
          sx={Object.assign({}, this.state.cardStyle, {
            justifyContent: "space-evenly",
          })}
        >
          <div
            style={{
              widht: "50%",
              height: "100%",
            }}
          >
            <h1>Introdunction to Remote sensing..</h1>
            <h4>information</h4>
          </div>
          <div
            style={{
              widht: "50%",
              height: "100%",
            }}
          >
            <img
              style={{
                widht: "80%",
                height: "80%",
                margin: "10px",
              }}
              src={Earth_1}
              alt="img"
            />
          </div>
        </Box>
        <Box
          sx={Object.assign({}, this.state.cardStyle, {
            justifyContent: "space-evenly",
          })}
        >
          <div
            style={{
              widht: "50%",
              height: "100%",
            }}
          >
            <h1>Introdunction to Remote sensing..</h1>
            <h4>information</h4>
          </div>
          <div
            style={{
              widht: "50%",
              height: "100%",
            }}
          >
            <img
              style={{
                widht: "80%",
                height: "80%",
                margin: "10px",
              }}
              src={Earth_1}
              alt="img"
            />
          </div>
        </Box>
        <Box
          sx={Object.assign({}, this.state.cardStyle, {
            justifyContent: "space-evenly",
          })}
        >
          <div
            style={{
              widht: "50%",
              height: "100%",
            }}
          >
            <h1>Introdunction to Remote sensing..</h1>
            <h4>information</h4>
          </div>
          <div
            style={{
              widht: "50%",
              height: "100%",
            }}
          >
            <img
              style={{
                widht: "80%",
                height: "80%",
                margin: "10px",
              }}
              src={Earth_1}
              alt="img"
            />
          </div>
        </Box>
        <footer>
          <MainFooter_1 />
        </footer>
      </>
    );
  }
}

export default Home;
