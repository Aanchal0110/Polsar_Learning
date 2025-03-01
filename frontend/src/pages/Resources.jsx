import React, { Component, useEffect } from "react";
import MainNavBar_1 from "../components/MainNavBar_1";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";
import AddResource from "../components/AddResource";
import axios from "axios";
import { UserContext } from "../context/user/UserContext";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export class Resources extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      toggleForm: false,
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
                  <TableRow
                    style={{
                      height: "100px",
                    }}
                    id={index}
                  >
                    <TableCell>
                      <LibraryBooksIcon
                        style={{
                          height: "30%",
                          width: "20%",
                        }}
                      />
                    </TableCell>
                    <TableCell>{data.Contain_Type}</TableCell>
                    <TableCell>{data.User_Email}</TableCell>
                    <TableCell>{data.Contain_Path}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button
            style={{
              position: "fixed",
              left: "85%",
              top: "80%",
            }}
          >
            <AddCircleIcon
              style={{
                height: "70px",
                width: "70px",
              }}
              onClick={() =>
                this.setState({
                  ...this.state,
                  toggleForm: !this.state.toggleForm,
                })
              }
            />
          </Button>
          {this.state.toggleForm && (
            <AddResource
              style={{
                position: "fixed",
                left: "40%",
                top: "30%",
                height: "500px",
                border: "2px solid black",
                width: "400px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#d3d3d3",
              }}
            />
          )}
        </main>
      </>
    );
  }
}

export default Resources;
