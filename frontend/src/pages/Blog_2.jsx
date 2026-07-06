import React, { Component } from "react";
import MainNavBar_1 from "../components/MainNavBar_1";
import { Box } from "@mui/material";
import { Button } from "@mui/material";
import BlogCard_2 from "../components/BlogCard_2";
import { Link } from "react-router-dom";
import { UserContext } from "../context/user/UserContext";
import axios from "axios";

export class Blog_2 extends Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {
      d: [1, 2, 3, 4],
    };
  }

  async componentDidMount() {
    const res = await axios.get(`${this.context.backendUrl}post/`);
    this.setState({ data: res.data });
    console.log(this.state.data);
  }

  render() {
    return (
      <Box
        sx={{
          width: "100vw",
          // height: "100vh",
          background: "#d3d3d3",
        }}
      >
        <header>
          <MainNavBar_1 />
        </header>
        <Box
          sx={{
            // border: "1px solid black",
            width: "99.7vw",
            height: "91vh",
          }}
        >
          <Box
            sx={{
              background: "#fefefe",
              width: "100vw",
              height: "15%",
              //   border: "1px solid",
              display: "flex",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Box
              sx={{
                width: "85%",
                display: "flex",
                justifyContent: "space-evenly",
                flexDirection: "column",
                alignItems: "center",
                fontFamily: "monospace",
                color: "#003366",
              }}
            >
              <h1 style={{ fontSize: "40px" }}>THE BLOGS</h1>
              <h2>
                Stay updated with the latest articles, tutorials, and insights
                on remote sensing and microwave remote sensing.
              </h2>
            </Box>
            <Box
              sx={{
                width: "15%",
                height: "100%",
                display: "flex",
              }}
            >
              <Button
                sx={{
                  alignSelf: "center",
                  justifySelf: "center",
                }}
                variant="contained"
              >
                <Link to={"/write_page"}>Write Your Own Blog</Link>
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              height: "85%",
              //   border: "1px solid red",
              display: "grid",
              // flexWrap: "wrap",
              // justifyContent: "space-between",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "10px",
              // padding: "10px",
            }}
          >
            {this.state.data &&
              this.state.data.map((data, index) => <BlogCard_2 data={data} />)}
          </Box>
        </Box>
      </Box>
    );
  }
}

export default Blog_2;
