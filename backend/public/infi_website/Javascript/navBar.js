import {getData} from "./context.js"
const navBar = document.getElementById("navBar");
const tracker = document.getElementById("navBarTracker");
let user_info = await getData("token");
let x = '';



try {
  user_info = JSON.parse(user_info).User;
  x = '<i class="fas fa-user"></i>'

} catch (err) {
  x = `Login`;
  
}

// const navbar = `
// <ul>
//                     <li><a href="/infi_website/HTML/home.html" class="">Home</a></li>
//                     <li class="dropdown">
//                         <a href="#" class="dropbtn">Resources</a>
//                         <div class="dropdown-content">
//                             <a href="/infi_website/HTML/Fundamental.html">Fundamentals</a>
//                             <a href="/infi_website/HTML/Technical Paper.html">Technical Papers</a>
//                             <a href="/infi_website/HTML/Books.html">Books</a>
//                             <a href="/infi_website/HTML/Videos.html">Videos</a>
//                         </div>
//                     </li>
//                     <li class="dropdown">
//                         <a href="#" class="dropbtn">Domain Experts</a>
//                         <div class="dropdown-content">
//                             <a href="/infi_website/HTML/academicians.html">Academicians</a>
//                             <a href="/infi_website/HTML/Industry Personnel.html">Industry Personnel</a>
//                             <a href="/infi_website/HTML/Researchers.html">Researchers</a>
//                         </div>
//                     </li>
//                     <li class="dropdown">
//                         <a href="#" class="dropbtn">Downloads</a>
//                         <div class="dropdown-content">
//                             <a href="/infi_website/HTML/datadownload.html">Data Download</a>
//                             <a href="/infi_website/HTML/opensource.html">Software</a>
//                         </div>
//                     </li>

//                     <li class="dropdown">
//                         <a href="/infi_website/HTML/education.html" class="dropbtn">Education</a>
                       
//                     </li>
//                     <li><a href="/infi_website/HTML/career.html">Career</a></li>
//                     <li><a href="/infi_website/HTML/news.html">Events</a></li>
//                     <li><a href="/infi_website/HTML/blog.html">Blog</a></li> <!-- Blog link added -->
//                     <li><a href="/infi_website/HTML/contact.html">Contact Us</a></li> <!-- Contact Us link added -->
//                     <li>
//                         <form class="search-form">
//                             <input type="text" placeholder="Search...">
//                             <button type="submit"><i class="fas fa-search"></i></button>
//                         </form>
//                     </li>
//                     <li> <a href="/infi_website/HTML/login.html" >${x}</a></li>
//                 </ul>
// `

const navbar = `<nav class="navbar">
                <ul>
                    <li><a href="/infi_website/HTML/home.html">Home</a></li>
                    <li class="dropdown">
                        <a href="#" class="dropbtn">Resources</a>
                        <div class="dropdown-content">
                            <a href="/infi_website/HTML/Fundamental.html">Fundamentals</a>
                            <a href="/infi_website/HTML/Technical Paper.html">Technical Papers</a>
                            <a href="/infi_website/HTML/Books.html">Books</a>
                            <a href="/infi_website/HTML/Videos.html">Videos</a>
                            <a href="/infi_website/HTML/Relevant Links.html">Relevant Links</a>
                        </div>
                    </li>
                    <li class="dropdown">
                        <a href="#" class="dropbtn">Domain Experts</a>
                        <div class="dropdown-content">
                            <a href="/infi_website/HTML/academicians.html">Academicians</a>
                            <a href="/infi_website/HTML/scientists.html">Scientists</a>
                            <a href="/infi_website/HTML/Industry Personnel.html">Industry Personnel</a>
                            <a href="/infi_website/HTML/Researchers.html">Researchers</a>
                        </div>
                    </li>
                    <li class="dropdown">
                        <a href="#" class="dropbtn">Downloads</a>
                        <div class="dropdown-content">
                            <a href="/infi_website/HTML/datadownload.html">Data Download</a>
                            <a href="/infi_website/HTML/opensource.html">Opensource Software</a>
                        </div>
                    </li>
                    <li class="dropdown">
                        <a href="#" class="dropbtn">Education</a>
                        <div class="dropdown-content">
                            <a href="/infi_website/HTML/education.html">Education Main</a>
                        </div>
                    </li>
                    <li><a href="/infi_website/HTML/career.html">Career</a></li>
                    <li><a href="/infi_website/HTML/event.html">Events</a></li>
                    <li><a href="/infi_website/HTML/blog.html">Blog</a></li>
                    <li><a href="/infi_website/HTML/contact.html">Contact Us</a></li>
                </ul>
            </nav>
            <div class="right-items">
                <form class="search-form">
                    <input type="text" placeholder="Search...">
                    <button type="submit"><i class="fas fa-search"></i></button>
                </form>
                <a href="login.html" class="login-icon">
                    <i class="fas fa-user"></i>
                    <span>Login</span>
                </a>
            </div>`
if (navBar) {
  navBar.innerHTML = navbar;
  const currentPage = window.location.pathname;
  const currentLink = document.querySelector(`a[href="${currentPage}"]`);
  if (currentLink) {
      const d = document.querySelector(`a[href="/${window.location.pathname.split("/")[1]}"]`);
      if (d) d.classList.add("active");
      currentLink.classList.add("active");
  }
}
if (tracker) {
  tracker.innerHTML = `<a href="/">${window.location.pathname}</a>`;
}
const menu = document.getElementById("menu");
if (menu) {
  menu.addEventListener("click", () => {
      const nav = document.getElementById("navbar");
      if (nav) nav.classList.toggle("active");
  });
}
const navBarTracker = document.getElementById("navBarTracker");
if (navBarTracker) {
  navBarTracker.innerHTML = '';
}
console.log("done")