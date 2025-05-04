const blog_header = document.getElementById("blog-header");
const blog_content = document.getElementById("blog-content");
const blog_title = document.getElementById("blog_title");
const blog_author = document.getElementById("blog_author");
const blog_date = document.getElementById("blog_date");
const params = new URLSearchParams(window.location.search);
const post_id = params.get('id');

console.log(post_id);

async function post_data() {
    const res = await fetch(`${window.location.origin}/post/fetch_post`, {
        method: "POST",
        headers: {
                    'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            post_id:post_id,
        })
    })

    const data = await res.json();
    blog_title.innerHTML = data.data.Title
    blog_author.innerHTML = data.data.User_Name;
    blog_date.innerHTML = data.data.Created_At;
    blog_content.innerHTML = data.content;
    console.log(data.content)
}

post_data();