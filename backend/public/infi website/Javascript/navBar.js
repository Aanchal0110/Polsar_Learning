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
<header>
  <a href="/infi%20website/HTML/home.html" class="logo">
    <img src="../image/logo.jpeg" alt="Logo" class="logo-img">
  </a>
  <div id="menu" class="fas fa-bars"></div>
  <nav class="navbar">
    <ul>
      <li><a href="/infi%20website/HTML/home.html" class="">Home</a></li>
      <li class="dropdown">
        <a href="#" class="dropbtn">Resources</a>
        <div class="dropdown-content">
          <a href="/infi%20website/HTML/Fundamental.html">Fundamentals</a>
          <a href="/infi%20website/HTML/Technical_Paper.html">Technical Papers</a>
          <a href="/infi%20website/HTML/Books.html">Books</a>
          <a href="/infi%20website/HTML/Videos.html">Videos</a>
        </div>
      </li>
      <li class="dropdown">
        <a href="#" class="dropbtn">Domain Experts</a>
        <div class="dropdown-content">
          <a href="/infi%20website/HTML/academicians.html">Academicians</a>
          <a href="/infi%20website/HTML/Industry_Personnel.html">Industry Personnel</a>
          <a href="/infi%20website/HTML/Researchers.html">Researchers</a>
        </div>
      </li>
      <li class="dropdown">
        <a href="#" class="dropbtn">Downloads</a>
        <div class="dropdown-content">
          <a href="/infi%20website/HTML/datadownloads.html">Data Download</a>
          <a href="/infi%20website/HTML/opensource.html">Software</a>
        </div>
      </li>
      <li class="dropdown">
        <a href="/infi%20website/HTML/education.html" class="dropbtn">Education</a>
      </li>
      <li><a href="/infi%20website/HTML/career.html">Career</a></li>
      <li><a href="/infi%20website/HTML/news.html">Events</a></li>
      <li><a href="/infi%20website/HTML/blog.html">Blog</a></li>
      <li><a href="/infi%20website/HTML/contact.html">Contact Us</a></li>
      <li>
        <form class="search-form">
          <input type="text" placeholder="Search...">
          <button type="submit"><i class="fas fa-search"></i></button>
        </form>
      </li>
      <li> <a href="/infi%20website/HTML/login.html" >${x}</a></li>
    </ul>
  </nav>
</header>
`;
navBar.innerHTML = navbar;
const currentPage = window.location.pathname;
const currentLink = document.querySelector(`a[href="${currentPage}"]`);

if (currentLink) {
    const d = document.querySelector(`a[href="/${window.location.pathname.split("/")[1]}"]`);
    d.classList.add("active");
  currentLink.classList.add("active");
}

tracker.innerHTML = `<a href="/">${window.location.pathname}</a>`;

const menu = document.getElementById("menu");
menu.addEventListener("click", () => {
    document.querySelector(".navbar").classList.toggle("active")
})

document.getElementById("navBarTracker").innerHTML = '';

// --- Dropdown navigation and toggle fix ---
// Prevent default for dropdown parent links and toggle dropdown on click
const dropbtns = document.querySelectorAll('.dropbtn[href="#"], .dropbtn:not([href])');
dropbtns.forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    const dropdown = this.parentElement.querySelector('.dropdown-content');
    if (dropdown) {
      dropdown.classList.toggle('show');
    }
  });
});
// Close dropdowns when clicking outside
window.addEventListener('click', function(e) {
  document.querySelectorAll('.dropdown-content').forEach(menu => {
    if (!menu.parentElement.contains(e.target)) {
      menu.classList.remove('show');
    }
  });
});
// --- End dropdown fix ---

console.log("done")