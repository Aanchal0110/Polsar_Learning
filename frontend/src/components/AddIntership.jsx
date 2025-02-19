import { TextField, Button } from "@mui/material";
import React, { useState } from "react";
import useUser from "../context/user/UserContext";
import axios from "axios";

const AddIntership = () => {
  const [Career_Oppo, settitle] = useState(null);
  const [Discription, setdiscription] = useState(null);
  const UserID = useUser().user.User.Uid;
  const Organizser_Email = useUser().user.User.Email;

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log({ UserID, Organizser_Email, Career_Oppo, Discription });
    const response = await axios.post(
      "http://192.168.236.54:3000/career/add_intership",
      { UserID, Organizser_Email, Career_Oppo, Discription }
    );

    if (response.status == 200) {
    }
  };

  return (
    <>
      <form action="">
        <h2>Job Title: </h2>
        <TextField onChange={(e) => settitle(e.target.value)} />
        <h2>Job Discription:</h2>
        <TextField onChange={(e) => setdiscription(e.target.value)} />
        <Button onClick={onSubmit}>Submit</Button>
      </form>
    </>
  );
};

export default AddIntership;
