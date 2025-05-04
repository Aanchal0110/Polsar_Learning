import {getData} from "./context.js"
const blog = document.getElementById("blog-form");
let user_info = await getData("user");
user_info = JSON.parse(user_info)

blog.addEventListener("submit", async (e) => {
    e.preventDefault();
    const fileinput = document.getElementById("image");
    const formData = new FormData();
    formData.append("image", fileinput.files[0]);

    try {
        const res_0 = await fetch(`${window.location.origin}/post/insert`, {
            method: "POST",
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                data: document.getElementById("editor").innerHTML,
                Uid: user_info.User.Uid,
                UserName: user_info.User.UserName,
                title: document.getElementById("title").value,
                post_or_comment:"post"
            })
        })
        const data_0 = await res_0.json();
        if (res_0.status == 200) {
            const res_1 = await fetch(`${window.location.origin}/post/upload_cover_image`, {
                method: 'POST',
                body: formData
            })
            const data_1 = await res_1.json();
            if (res_1.status == 200) {
                const res_2 = await fetch(`${window.location.origin}/post/add_cover_page`, {
                    method: 'POST',
                    headers: {
                'Content-Type':'application/json'
            },
                    body: JSON.stringify({
                        post_id: data_0.content[0].post_id,
                        path:data_1.filePath
                })
                })
                const data_2 = await res_2.json();
                console.log(data_2);
                if (res_2.status == 200) {
                    window.location.href = "/blogs"
                }
            }
        }
    } catch (err) {

        console.log(err)
    }
})