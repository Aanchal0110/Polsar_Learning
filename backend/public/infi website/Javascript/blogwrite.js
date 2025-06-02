import {getData} from "./context.js"
const blog = document.getElementById("submit_btn");
var user_info = null;

let token = await getData("token");
token = token.slice(1, -1);
// const base64Url = token.split('.')[1];
// const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
// const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
//     return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
// }).join(''));
// user_info = JSON.parse(jsonPayload)
// console.log(`Bearer ` + token);
// fetch(`http://localhost:5000/auth/user/${user_info.email}`, {
//     headers: {
//       method:"GET",
//     authorization: `Bearer ${token}`,
//   },
// })
//   .then((res) => res.json())
//   .then((res) => {
//         // console.log(res)
//       user_info = res.data;
//     //   console.log(user_info);
//   });
  

// console.log(user_info);

blog.addEventListener("click", async (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const status = "draft";
    const postFile = document.getElementById("editor").value;
    const coverImage = document.getElementById("image").files[0];

    const formData = new FormData();
    formData.append("title", document.getElementById("title").value);
    formData.append("status", status);
    formData.append("content", document.getElementById("editor").innerHTML);
  formData.append("coverImage", document.getElementById("image").files[0]);
  
  // console.log(typeof document.getElementById("editor").innerHTML);

    try {
        const res = await fetch(`${window.location.origin}/post`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        const result = await res.json();

        if (!res.ok) {
          throw new Error(result.message || "Upload failed");
        }

      alert("Post uploaded successfully!");
      window.location.href = "/infi website/HTML/blog.html"
      } catch (err) {
        // errorDiv.innerText = err.message;
        alert(err.message);
      }
});