import {getData} from "./context.js"
const navBar = document.getElementById("navbar");
const tracker = document.getElementById("navBarTracker");
let user_info = await getData("user");
let x = '';

try {
  user_info = JSON.parse(user_info).User;
  x = '<i class="fas fa-user"></i>'

} catch (err) {
  x = `Login`;
  
}

const navbar = `
<ul>
                    <li><a href="/" class="">Home</a></li>
                    <li class="dropdown">
                        <a href="#" class="dropbtn">Resources</a>
                        <div class="dropdown-content">
                            <a href="/resource/fundamentals">Fundamentals</a>
                            <a href="/resource/technical_papers">Technical Papers</a>
                            <a href="/resource/books">Books</a>
                            <a href="/resource/videos">Videos</a>
                        </div>
                    </li>
                    <li class="dropdown">
                        <a href="#" class="dropbtn">Domain Experts</a>
                        <div class="dropdown-content">
                            <a href="/domain_experts/academic">Academicians</a>
                            <a href="/domain_experts/industry_personality">Industry Personnel</a>
                            <a href="/domain_experts/researchers">Researchers</a>
                        </div>
                    </li>
                    <li class="dropdown">
                        <a href="#" class="dropbtn">Downloads</a>
                        <div class="dropdown-content">
                            <a href="/downloads/data_downloads">Data Download</a>
                            <a href="/downloads/open_softwares">Software</a>
                        </div>
                    </li>

                    <li class="dropdown">
                        <a href="/education" class="dropbtn">Education</a>
                       
                    </li>
                    <li><a href="/career">Career</a></li>
                    <li><a href="/events">Events</a></li>
                    <li><a href="/blogs">Blog</a></li> <!-- Blog link added -->
                    <li><a href="/contact">Contact Us</a></li> <!-- Contact Us link added -->
                    <li>
                        <form class="search-form">
                            <input type="text" placeholder="Search...">
                            <button type="submit"><i class="fas fa-search"></i></button>
                        </form>
                    </li>
                    <li> <a href="/login" >${x}</a></li>
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

// tracker.innerHTML = `<a href="/">${window.location.pathname}</a>`;

const menu = document.getElementById("menu");
menu.addEventListener("click", () => {
    document.getElementById("navbar").classList.toggle("active")
})