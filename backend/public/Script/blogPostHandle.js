const blogPostSection = document.getElementById('blog_post_section');


for (let i = 0; i < 30; i++){
    const single_post = `<article id=${i} class="blog-post">
                    <h2>Understanding Remote Sensing Techniques</h2>
                    <p>Published on August 15, 2024 by <strong>Aanchal Choudhary</strong></p>
                    <img src="Images/r3.jpeg" alt="Remote Sensing Techniques Image" class="blog-image">
                    <p>Remote sensing involves the use of various technologies to observe and measure objects without
                        being in direct contact with them. This article explores different remote sensing techniques and
                        their applications...</p>
                    <a href="post1.html" class="read-more">Read More</a>
                    <!-- Comment Box and Rating System -->
                    <div class="comment-section">
                        <h3>Leave a Comment</h3>
                        <form action="#" method="post" class="comment-form">
                            <textarea name="comment" rows="4" placeholder="Write your comment here..."
                                required></textarea>
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

                </article>`;
    blogPostSection.innerHTML += single_post;
}