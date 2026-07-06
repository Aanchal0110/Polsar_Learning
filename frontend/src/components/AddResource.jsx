import { Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import useUser from "../context/user/UserContext";

const AddResource = (props) => {
  const [BookName, setBook] = useState(null);
  const [Title, setTitle] = useState(null);
  const [Author, setAuthor] = useState(null);
  const [Disscreption, setDes] = useState(null);
  const [ContentType, setcontentType] = useState(null);
  const UserEmail = useUser().user.User.Email;
  const UserID = useUser().user.User.Uid;
  const backendUrl = useUser();

  const addInfo = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      backendUrl.backendUrl + "resource/insert",
      {
        BookName,
        Title,
        Author,
        Disscreption,
        UserEmail,
        UserID,
        ContentType,
      }
    );
    // console.log(response);
    window.location.reload();
  };

  return (
    <div style={props.style}>
      <form action="">
        <h4>Book Name</h4>
        <TextField onChange={(e) => setBook(e.target.value)} />
        <h4>Title</h4>
        <TextField onChange={(e) => setTitle(e.target.value)} />
        <h4>Author</h4>
        <TextField onChange={(e) => setAuthor(e.target.value)} />
        <h4>Description</h4>
        <TextField onChange={(e) => setDes(e.target.value)} />
        <h4>Content Type</h4>
        <TextField onChange={(e) => setcontentType(e.target.value)} />
        {/* <button onClick={addInfo} type="submit">
          Submit
        </button> */}
        <Button onClick={addInfo}>Submit</Button>
      </form>
    </div>
  );
};

export default AddResource;
