import React, { Component } from "react";
import ThumbsUpDownIcon from "@mui/icons-material/ThumbsUpDown";
import CommentIcon from "@mui/icons-material/Comment";
import MinimizeIcon from "@mui/icons-material/Minimize";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import earth from "../Assests/WebSiteGenral/logo.jpeg";

export class BlogCard_1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardStyle: {
        height: "200px",
        width: "95%",
        margin: "15px",
        border: "1px solid black",
        borderRadius: "5px",
        fontFamily: "monospace",
        padding: "5px",
      },
      accountStyle: {
        width: "100%",
        height: "10%",
        marginTop: "5px",
        marginLeft: "5px",
        // border: "1px solid green",
      },
      cardPartition: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "70%",
        width: "100%",
      },
      cardFooter: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        height: "20%",
      },
      cardFooterCom1: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        width: "30%",
      },
    };
  }
  render() {
    return (
      <div style={this.state.cardStyle}>
        <div style={this.state.accountStyle}>Lucifer from Hell's Paradise</div>
        <div style={this.state.cardPartition}>
          <div
            style={{
              width: "60%",
              //   border: "1px solid yellow",
              height: "100%",
            }}
          >
            <h1>Stop using docker.. Desktop for better performance..</h1>
            <h3>Ditch docker , it is very havey and suspicious..</h3>
          </div>
          <div
            style={{
              width: "40%",
              //   border: "1px solid blue",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50px",
              }}
              src={earth}
              alt=""
            />
          </div>
        </div>
        <div style={this.state.cardFooter}>
          <div style={this.state.cardFooterCom1}>
            <div>20 Jan</div>
            <div>
              <ThumbsUpDownIcon />
            </div>
            <div>
              <CommentIcon />
            </div>
          </div>
          <div style={this.state.cardFooterCom1}>
            <div>
              <MinimizeIcon />
            </div>
            <div>
              <BookmarkIcon />
            </div>
            <div>
              <MoreHorizIcon />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BlogCard_1;
