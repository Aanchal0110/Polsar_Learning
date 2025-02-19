import React, { useState, useCallback, useMemo } from "react";
import { MainNavBar_1 } from "../components/MainNavBar_1";
import { Button } from "@mui/material";
import axios from "axios";
import { useUser } from "../context/user/UserContext";
import WordEditor from "../components/WordEditor";

export const WriteBlogPage = () => {
  const [title, settitle] = useState("");
  const [content, setContent] = useState("");
  const User_info = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post(User_info.backendUrl + "post/insert", {
      User_id: User_info.user.User.Uid,
      Title: "",
      status: "",
    });
  };

  return (
    <>
      <MainNavBar_1 />
    </>
  );
};

export default WriteBlogPage;
