import React, { Component, useEffect } from "react";
import MainNavBar_1 from "../components/MainNavBar_1";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import AddResource from "../components/AddResource";
import axios from "axios";
import { UserContext } from "../context/user/UserContext";

export class Resources extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount(prevProps) {
    // console.log(this.context);
    axios
      .get(this.context.backendUrl + "resource")
      .then((response) => {
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
        <main
          style={{
            width: "99%",
            height: "90vh",
            border: "2px red solid",
          }}
        >
          <h1
            style={{
              justifySelf: "center",
            }}
          >
            Books
          </h1>
          <TableContainer
            style={{
              width: "80%",
              justifySelf: "center",
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Author</TableCell>
                  <TableCell>Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.data.map((data, index) => (
                  <TableRow id={index}>
                    <TableCell>{data.Time_of_Upload}</TableCell>
                    <TableCell>{data.Contain_Type}</TableCell>
                    <TableCell>{data.User_Email}</TableCell>
                    <TableCell>{data.Contain_Path}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <AddResource />
        </main>
      </>
    );
  }
}

export default Resources;
