import React, { useEffect, useState } from "react";
import MainNavBar_1 from "../components/MainNavBar_1";
import { useParams } from "react-router-dom";
import axios from "axios";
import useUser from "../context/user/UserContext";

const BlogPost = () => {
  let { id } = useParams();
  const user = useUser();
  const [data, setdata] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post(user.backendUrl + "post/fetch_post", {
          post_id: id,
        });
        // console.log(res);
        setdata({ ...res.data });
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MainNavBar_1 />
      <div
        style={{
          height: "90vh",
          width: "90%",
          border: "2px solid red",
          marginTop: "5px",
        }}
        dangerouslySetInnerHTML={{ __html: data.content }}
      />
    </div>
  );
};

export default BlogPost;
