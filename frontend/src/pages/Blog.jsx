import React, { Component } from "react";
import MainNavBar_1 from "../components/MainNavBar_1";
import { Box } from "@mui/material";
import { BlogCard_1 } from "../components/BlogCard_1";

export class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      box_item: {
        height: "100%",
        width: "50%",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        border: "1px solid black",
        margin: "10px",
      },
    };
  }
  render() {
    const data = [];

    for (let i = 0; i < 5; i++) {
      data.push(<BlogCard_1 />);
    }
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
            height: "90vh",
            width: "99.5%",
            // border: "1px solid black",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "10px",
          }}
        >
          <Box
            sx={Object.assign({}, this.state.box_item, {
              width: "50%",
              flexDirection: "column",
            })}
          >
            <BlogCard_1 />
            <BlogCard_1 />
            <BlogCard_1 />
          </Box>
          <Box
            sx={Object.assign({}, this.state.box_item, {
              width: "30%",
            })}
          >
            extra info
          </Box>
        </Box>
      </>
    );
  }
}

export default Blog;
