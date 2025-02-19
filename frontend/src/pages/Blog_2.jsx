import React, { Component } from "react";
import MainNavBar_1 from "../components/MainNavBar_1";
import { Box } from "@mui/material";
import { Button } from "@mui/material";
import BlogCard_2 from "../components/BlogCard_2";
import { Link } from "react-router-dom";

export class Blog_2 extends Component {
  render() {
    return (
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          background: "#d3d3d3",
        }}
      >
        <header>
          <MainNavBar_1 />
        </header>
        <Box
          sx={{
            border: "1px solid black",
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
              display: "flex",
              //   flexWrap: "wrap",
              justifyContent: "space-around",
            }}
          >
            <BlogCard_2 />
            <BlogCard_2 />
            <BlogCard_2 />
            <BlogCard_2 />
          </Box>
        </Box>
      </Box>
    );
  }
}

export default Blog_2;
