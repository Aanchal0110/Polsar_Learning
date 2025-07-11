import {getData} from "./context.js"
const navBar = document.getElementById("navbar");
const tracker = document.getElementById("navBarTracker");
let user_info = await getData("token");
let x = '';

try {
  user_info = JSON.parse(user_info).User;
  x = '<i class="fas fa-user"></i>'

} catch (err) {
  x = `Login`;
  
}

const navbar = `
<ul>
                    <li><a href="/infi website/HTML/home.html" class="">Home</a></li>
                    <li class="dropdown">
                        <a href="#" class="dropbtn">Resources</a>
                        <div class="dropdown-content">
                            <a href="/infi website/HTML/Fundamental.html">Fundamentals</a>
                            <a href="/infi website/HTML/Technical Paper.html">Technical Papers</a>
                            <a href="/infi website/HTML/Books.html">Books</a>
                            <a href="/infi website/HTML/Videos.html">Videos</a>
                        </div>
                    </li>
                    <li class="dropdown">
                        <a href="#" class="dropbtn">Domain Experts</a>
                        <div class="dropdown-content">
                            <a href="/infi website/HTML/academicians.html">Academicians</a>
                            <a href="/infi website/HTML/Industry Personnel.html">Industry Personnel</a>
                            <a href="/infi website/HTML/Researchers.html">Researchers</a>
                        </div>
                    </li>
                    <li class="dropdown">
                        <a href="#" class="dropbtn">Downloads</a>
                        <div class="dropdown-content">
                            <a href="/infi website/HTML/datadownload.html">Data Download</a>
                            <a href="/infi website/HTML/opensource.html">Software</a>
                        </div>
                    </li>

                    <li class="dropdown">
                        <a href="/infi website/HTML/education.html" class="dropbtn">Education</a>
                       
                    </li>
                    <li><a href="/infi website/HTML/career.html">Career</a></li>
                    <li><a href="/infi website/HTML/news.html">Events</a></li>
                    <li><a href="/infi website/HTML/blog.html">Blog</a></li> <!-- Blog link added -->
                    <li><a href="/infi website/HTML/contact.html">Contact Us</a></li> <!-- Contact Us link added -->
                    <li>
                        <form class="search-form">
                            <input type="text" placeholder="Search...">
                            <button type="submit"><i class="fas fa-search"></i></button>
                        </form>
                    </li>
                    <li> <a href="/infi website/HTML/login.html" >${x}</a></li>
                </ul>
`
navBar.innerHTML = navbar;
const currentPage = window.location.pathname;
const currentLink = document.querySelector(`a[href="${currentPage}"]`);

// console.log(currentLink);
if (currentLink) {
    // console.log(window.location.pathname.split("/")[1]);
    const d = document.querySelector(`a[href="/${window.location.pathname.split("/")[1]}"]`);
    d.classList.add("active");
  currentLink.classList.add("active");
}

tracker.innerHTML = `<a href="/">${window.location.pathname}</a>`;

const menu = document.getElementById("menu");
menu.addEventListener("click", () => {
    document.getElementById("navbar").classList.toggle("active")
})

document.getElementById("navBarTracker").innerHTML = '';
console.log("done")