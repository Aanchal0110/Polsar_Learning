import React, { useState } from "react";
import { Login } from "../components/Login";
import { Signup } from "../components/SignUp";
import { Button } from "@mui/material";

export const Authrisation = () => {
  const [login, setlogin] = useState(false);
  return (
    <>
      {login && <Login />}
      {!login && <Signup />}
      <Button onClick={() => setlogin(!login)}>toggle</Button>
    </>
  );
};

export default Authrisation;
