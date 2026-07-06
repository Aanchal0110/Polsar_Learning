import { Button } from "@mui/material";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import useUser from "../context/user/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RichTextEditor() {
  const [value, setValue] = useState("");
  const user = useUser();
  const [Title, setTitle] = useState("");
  const nav = useNavigate();

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["blockquote", "code-block"],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(user.backendUrl + "post/insert", {
      data: value,
      user: user,
      title: Title,
      post_or_comment: "post",
    });
    if (res.status == 200) {
      nav("/Blog_2");
    }
  };

  const handleOnchange = (e) => {
    setTitle(e.target.value);
    console.log(Title);
  };

  return (
    <div
      style={{
        padding: "4rem",
        marginRight: "auto",
        marginLeft: "auto",
      }}
      className="p-4 max-w-2xl mx-auto"
    >
      <h1>
        Title: <input onChange={handleOnchange} type="text" />
      </h1>
      <h2
        style={{
          fontSize: "20px",
        }}
        className="text-xl font-bold mb-2"
      >
        Rich Text Editor
      </h2>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        modules={modules}
      />
      <Button onClick={handleSubmit}>Submit</Button>
      <div
        style={{
          marginTop: "4rem",
          padding: "2rem",
          border: "2px solid gray",
          borderRadius: "30px",
        }}
        className="mt-4 p-2 border rounded bg-gray-100"
      >
        <h3 className="text-lg font-semibold">Preview:</h3>
        <div
          dangerouslySetInnerHTML={{ __html: value }}
          className="p-2 bg-white border rounded"
          style={{
            padding: "2rem",
            backgroundColor: "white",
            border: "1px solid black",
            borderRadius: "30px",
          }}
        />
      </div>
    </div>
  );
}
