const blog_section = document.getElementById("blog-post");
const write_blog_btn = document.getElementById("write_blog_btn");
import { getData } from "./context.js";
const blog_template = `<article class="blog-post">
                    <h2>Understanding Remote Sensing Techniques</h2>
                    <p>Published on August 15, 2024 by <strong>Aanchal Choudhary</strong></p>
                    <img src="/infi website/image/r3.jpeg" alt="Remote Sensing Techniques Image" class="blog-image">
                    <p>Remote sensing involves the use of various technologies to observe and measure objects without being in direct contact with them. This article explores different remote sensing techniques and their applications...</p>
                    <a href="post1.html" class="read-more">Read More</a>
                    <!-- Comment Box and Rating System -->
                    <div class="comment-section">
                        <h3>Leave a Comment</h3>
                        <form action="#" method="post" class="comment-form">
                            <textarea name="comment" rows="4" placeholder="Write your comment here..." required></textarea>
                            <button type="submit">Submit Comment</button>
                        </form>

                        <div class="rating">
                            <div class="rating">
                                <span>Rate this post:</span>
                                <i class="fas fa-star" data-star="1"></i>
                                <i class="fas fa-star" data-star="2"></i>
                                <i class="fas fa-star" data-star="3"></i>
                                <i class="fas fa-star" data-star="4"></i>
                                <i class="fas fa-star" data-star="5"></i>
                            </div>
                            
                    </div>
                    
                </article>`

async function fetch_blog_info() {
    const res = await fetch(`${window.location.origin}/post`);
    const data = await res.json();
    
    data.posts.map((data, index) => {
        // let image = data.Cover_page.replace("uploads\\", "")
        console.log(data);
        serve_post(data.title, data.created_at, data.user_name, `/blog/post/${data.post_id}`, data.post_id, data.cover_page)
    })
}

function serve_post(title, Published, Author, link, id, image) {
    blog_section.innerHTML += `<article class="blog-post">
                    <h2>${title}</h2>
                    <p>Published on ${Published} by <strong>${Author}</strong></p>
                    <img height="50px" width="50px" src="${image}" alt="Remote Sensing Techniques Image" class="blog-image">
                    <p>Remote sensing involves the use of various technologies to observe and measure objects without being in direct contact with them. This article explores different remote sensing techniques and their applications...</p>
                    <a href="${link}?id=${id}" class="read-more">Read More</a>
                    <!-- Comment Box and Rating System -->
                    <div class="comment-section">
                        <h3>Leave a Comment</h3>
                        <form action="#" method="post" class="comment-form">
                            <textarea name="comment" rows="4" placeholder="Write your comment here..." required></textarea>
                            <button type="submit">Submit Comment</button>
                        </form>

                        <div class="rating">
                            <div class="rating">
                                <span>Rate this post:</span>
                                <i class="fas fa-star" data-star="1"></i>
                                <i class="fas fa-star" data-star="2"></i>
                                <i class="fas fa-star" data-star="3"></i>
                                <i class="fas fa-star" data-star="4"></i>
                                <i class="fas fa-star" data-star="5"></i>
                            </div>
                            
                    </div>
                    
                </article>`
}

write_blog_btn.addEventListener('click', async () => {
    try { 
        const user = await getData("token");
        const data = JSON.parse(user);
        console.log(data);
        if (data) {
            window.location.href = "/infi website/HTML/blogwrite.html";
        }
    }
    catch (err) {
        window.location.href = "/infi website/HTML/login.html";
    }
})

fetch_blog_info();