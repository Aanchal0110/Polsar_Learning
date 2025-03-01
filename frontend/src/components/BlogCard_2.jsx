import React from "react";
import { Box } from "@mui/material";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import useUser from "../context/user/UserContext";

export default function BlogCard_2(props) {
  const nav = useNavigate();
  const user = useUser();
  return (
    <Box
      sx={{
        height: "825px",
        width: "357px",
        // border: "1px solid red",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        margin: "20px",
        background: "#fff",
        borderRadius: "10px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        fontFamily: "monospace",
      }}
    >
      <Box
        sx={{
          width: "100%",
          alignSelf: "center",
          justifySelf: "center",
          //   border: "1px solid yellow",
          display: "flex",
          alignItems: "center",
          justifyContent: "",
          height: "30%",
          color: "#003366",
          flexDirection: "column",
        }}
      >
        <h1
          style={{
            alignSelf: "center",
            justifySelf: "center",
            padding: "10px",
            margin: "10px 10px 10px 0px",
            fontSize: "35px",
          }}
        >
          {props.data.Title}
        </h1>
        <p
          style={{
            alignSelf: "center",
            justifySelf: "center",
            padding: "10px",
            margin: "0",
            color: "#000",
          }}
        >
          Published on {props.data.Updated_At} by {props.data.User_Name}
        </p>
      </Box>
      <Box
        sx={{
          width: "95%",
          alignSelf: "center",
          justifySelf: "center",
          //   border: "1px solid yellow",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "20%",
          background: "#d3d3d3",
          boxShadow: "1px 4px 6px rgba(10, 0, 0, 0.1)",
          margin: "5px",
          borderRadius: "10px",
        }}
      >
        images are here
      </Box>
      <Box
        sx={{
          width: "95%",
          alignSelf: "center",
          justifySelf: "center",
          //   border: "1px solid yellow",
          display: "flex",
          alignItems: "",
          justifyContent: "space-evenly",
          height: "20%",
          fontSize: "15px",
          flexDirection: "column",
        }}
      >
        <p>
          Remote sensing involves the use of various technologies to observe and
          measure objects without being in direct contact with them. This
          article explores different remote sensing techniques and their
          applications...
        </p>
        {/* <span> */}
        {/* <a onClick={() => nav(`/post_info/${data.post_id}`)}>Read More</a> */}
        {/* </span> */}
        {/* <a href={`${user.backendUrl}post_info/${props.data.post_id}`}>
          Read more
        </a> */}
        <Button onClick={() => nav(`/post_info/${props.data.post_id}`)}>
          Read more
        </Button>
      </Box>
      <br />
      <Box
        sx={{
          width: "100%",
          alignSelf: "center",
          justifySelf: "center",
          //   border: "1px solid yellow",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          height: "30%",
        }}
      >
        <textarea
          value="Write Comment"
          name="comment"
          id=""
          style={{
            width: "90%",
            height: "50%",
            border: "1px solid #d3d3d3",
            padding: "1px",
            margin: "10px",
          }}
        ></textarea>
        <Button
          sx={{
            alignSelf: "center",
            justifySelf: "center",
            margin: "10px",
            width: "90%",
          }}
          variant="contained"
        >
          Submit Comment
        </Button>
      </Box>
    </Box>
  );
}
