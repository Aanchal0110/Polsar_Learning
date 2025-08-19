import {getData} from "./context.js"

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  initializeNavbar();
});

async function initializeNavbar() {
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

const navbar = `<nav class="navbar">
<a href="#" class="logo">
                <img src="/infi_website/image/logo.jpeg" alt="Logo" class="logo-img">
            </a>
                <ul>
                    <li><a href="/infi_website/HTML/home.html">Home</a></li>
                    <li class="dropdown">
                        <a href="#" class="dropbtn">Resources</a>
                        <div class="dropdown-content">
                            <a href="/infi_website/HTML/Fundamental.html">Fundamentals</a>
                            <a href="/infi_website/HTML/Technical Paper.html">Technical Papers</a>
                            <a href="/infi_website/HTML/Books.html">Books</a>
                            <a href="/infi_website/HTML/Videos.html">Videos</a>
                        </div>
                    </li>
                    <li class="dropdown">
                        <a href="#" class="dropbtn">Domain Experts</a>
                        <div class="dropdown-content">
                            <a href="/infi_website/HTML/academicians.html">Academicians</a>
                            <a href="/infi_website/HTML/Industry Personnel.html">Industry Personnel</a>
                            <a href="/infi_website/HTML/Researchers.html">Researchers</a>
                        </div>
                    </li>
                    <li class="dropdown">
                        <a href="#" class="dropbtn">Downloads</a>
                        <div class="dropdown-content">
                            <a href="/infi_website/HTML/datadownload.html">Data Download</a>
                            <a href="/infi_website/HTML/opensource.html">Software</a>
                        </div>
                    </li>
                      <li><a href="/infi_website/HTML/education.html">Education</a></li>
                    <li><a href="/infi_website/HTML/career.html">Career</a></li>
                    <li><a href="/infi_website/HTML/event.html">Events</a></li>
                    <li><a href="/infi_website/HTML/contact.html">Contact Us</a></li>
                  </ul>
                  
              </nav>`
  
  // <div class="search-login-container">
                        
  //                   <a id="" href="/infi_website/HTML/login.html" class="">
  //                       <i class="fas fa-user"></i>
  //                       <span>Login</span>
  //                   </a>
  //                 </div>

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

// Ensure a single brand logo only (remove duplicate if both exist)
try {
  const headerEl = document.querySelector('header');
  const existingBrand = document.getElementById('brandLogo');
  if (headerEl) {
    if (existingBrand) {
      // If we already injected a brand logo earlier, keep only one by removing it
      existingBrand.remove();
    }
  }
} catch (e) {}

if (tracker) {
  tracker.innerHTML = `<a href="/">${window.location.pathname}</a>`;
}

  // Mobile menu functionality
const menu = document.getElementById("menu");
if (menu) {
  menu.addEventListener("click", () => {
        const navbar = document.querySelector(".navbar");
        if (navbar) {
            navbar.classList.toggle("active");
        }
    });
  }

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    const navbar = document.querySelector(".navbar");
    const menu = document.getElementById("menu");
    
    if (navbar && navbar.classList.contains("active")) {
        if (!navbar.contains(e.target) && !menu.contains(e.target)) {
            navbar.classList.remove("active");
        }
    }
  });

  // Close mobile menu when clicking on a link
  document.addEventListener("click", (e) => {
    if (e.target.tagName === "A" && e.target.closest(".navbar")) {
        const navbar = document.querySelector(".navbar");
        if (navbar && navbar.classList.contains("active")) {
            navbar.classList.remove("active");
        }
    }
  });

  // Handle dropdown functionality on mobile
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("dropbtn")) {
        e.preventDefault();
        const dropdown = e.target.closest(".dropdown");
        const dropdownContent = dropdown.querySelector(".dropdown-content");
        
        // Close all other dropdowns
        document.querySelectorAll(".dropdown-content").forEach(content => {
            if (content !== dropdownContent) {
                content.classList.remove("show");
            }
        });
        
        // Toggle current dropdown
        dropdownContent.classList.toggle("show");
    }
  });

  // Close dropdowns when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".dropdown")) {
        document.querySelectorAll(".dropdown-content").forEach(content => {
            content.classList.remove("show");
        });
    }
  });

const navBarTracker = document.getElementById("navBarTracker");
if (navBarTracker) {
  navBarTracker.innerHTML = '';
}

  console.log("Navbar initialized successfully");
  
  // Initialize search functionality directly only if search-form exists (avoid mobile console noise)
  if (document.querySelector('.search-form')) {
    initializeSearch();
  }
}

// Search functionality
function initializeSearch() {
  console.log("Initializing search functionality...");
  
  // Wait a bit for DOM to be ready
  setTimeout(() => {
    const searchForm = document.querySelector('.search-form');
    if (!searchForm) {
      console.error("Search form not found!");
      return;
    }
    
    const searchInput = searchForm.querySelector('input');
    const searchButton = searchForm.querySelector('button');
    
    if (!searchInput || !searchButton) {
      console.error("Search input or button not found!");
      return;
    }
    
    console.log("Search elements found, setting up event listeners...");
    
    // Create search results container
    const searchResultsContainer = document.createElement('div');
    searchResultsContainer.className = 'search-results-container';
    searchResultsContainer.style.cssText = `
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: white;
      border: 1px solid #ddd;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      max-height: 400px;
      overflow-y: auto;
      z-index: 1001;
      display: none;
      margin-top: 4px;
    `;
    
    searchForm.style.position = 'relative';
    searchForm.appendChild(searchResultsContainer);
    
    // Search data
    const searchData = [
      {
        title: "Home",
        url: "/infi_website/HTML/home.html",
        keywords: ["remote sensing", "microwave", "optical", "satellite", "earth observation", "geospatial", "radar", "SAR", "polarimetry"],
        description: "Learn about remote sensing fundamentals, microwave and optical remote sensing techniques"
      },
      {
        title: "Fundamentals",
        url: "/infi_website/HTML/Fundamental.html",
        keywords: ["fundamentals", "basics", "principles", "theory", "electromagnetic spectrum", "sensors", "platforms"],
        description: "Basic principles and fundamentals of remote sensing technology"
      },
      {
        title: "Books",
        url: "/infi_website/HTML/Books.html",
        keywords: ["books", "literature", "textbooks", "references", "reading", "study materials", "publications"],
        description: "Comprehensive collection of books and literature on remote sensing"
      },
      {
        title: "Videos",
        url: "/infi_website/HTML/Videos.html",
        keywords: ["videos", "tutorials", "lectures", "youtube", "learning", "visual", "multimedia"],
        description: "Educational videos and tutorials on remote sensing topics"
      },
      {
        title: "Academicians",
        url: "/infi_website/HTML/academicians.html",
        keywords: ["academicians", "professors", "researchers", "experts", "faculty", "academia"],
        description: "Meet leading academicians and researchers in remote sensing"
      },
      {
        title: "Industry Personnel",
        url: "/infi_website/HTML/Industry Personnel.html",
        keywords: ["industry", "professionals", "experts", "practitioners", "commercial", "business"],
        description: "Industry experts and professionals in remote sensing applications"
      },
      {
        title: "Researchers",
        url: "/infi_website/HTML/Researchers.html",
        keywords: ["researchers", "scientists", "research", "publications", "studies", "investigations"],
        description: "Leading researchers and their contributions to remote sensing"
      },
      {
        title: "Data Download",
        url: "/infi_website/HTML/datadownload.html",
        keywords: ["data", "download", "datasets", "satellite data", "free data", "open data", "resources"],
        description: "Download satellite data and remote sensing datasets"
      },
      {
        title: "Open Source Software",
        url: "/infi_website/HTML/opensource.html",
        keywords: ["software", "open source", "tools", "applications", "processing", "analysis", "GIS", "ENVI", "SNAP"],
        description: "Open source and proprietary software for remote sensing analysis"
      },
      {
        title: "Education",
        url: "/infi_website/HTML/education.html",
        keywords: ["education", "universities", "colleges", "courses", "programs", "degrees", "institutions"],
        description: "Educational institutions offering remote sensing programs"
      },
      {
        title: "Career",
        url: "/infi_website/HTML/career.html",
        keywords: ["career", "jobs", "opportunities", "employment", "professions", "career paths"],
        description: "Career opportunities and job prospects in remote sensing"
      },
      {
        title: "Events",
        url: "/infi_website/HTML/event.html",
        keywords: ["events", "conferences", "workshops", "seminars", "meetings", "symposiums"],
        description: "Upcoming events and conferences in remote sensing"
      },
      {
        title: "Contact Us",
        url: "/infi_website/HTML/contact.html",
        keywords: ["contact", "support", "help", "inquiry", "feedback", "communication"],
        description: "Get in touch with us for support and inquiries"
      }
    ];
    
    // Search functions
    const performSearch = (query) => {
      console.log("Performing search for:", query);
      if (!query.trim()) {
        searchResultsContainer.style.display = 'none';
        return;
      }
      
      const searchTerm = query.toLowerCase();
      const searchResults = [];
      
      searchData.forEach(item => {
        const titleMatch = item.title.toLowerCase().includes(searchTerm);
        const keywordMatch = item.keywords.some(keyword => 
          keyword.toLowerCase().includes(searchTerm)
        );
        const descriptionMatch = item.description.toLowerCase().includes(searchTerm);
        
        if (titleMatch || keywordMatch || descriptionMatch) {
          let score = 0;
          if (titleMatch) score += 3;
          if (keywordMatch) score += 2;
          if (descriptionMatch) score += 1;
          
          searchResults.push({
            ...item,
            score,
            matchedTerm: searchTerm
          });
        }
      });
      
      searchResults.sort((a, b) => b.score - a.score);
      displaySearchResults(searchResults);
    };
    
    const displaySearchResults = (results) => {
      if (results.length === 0) {
        searchResultsContainer.innerHTML = `
          <div style="padding: 20px; text-align: center; color: #666;">
            <i class="fas fa-search" style="font-size: 24px; margin-bottom: 10px; display: block;"></i>
            <p>No results found</p>
            <p style="font-size: 12px; margin-top: 5px;">Try different keywords</p>
          </div>
        `;
      } else {
        const resultsHTML = results.map(result => `
          <div class="search-result-item" style="
            padding: 12px 16px;
            border-bottom: 1px solid #f0f0f0;
            cursor: pointer;
            transition: background-color 0.2s;
          " onmouseover="this.style.backgroundColor='#f8f9fa'" onmouseout="this.style.backgroundColor='white'">
            <div style="display: flex; align-items: center; gap: 12px;">
              <div style="
                width: 40px;
                height: 40px;
                background: #003366;
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 16px;
              ">
                <i class="fas fa-${getIconForPage(result.title)}"></i>
              </div>
              <div style="flex: 1;">
                <div style="
                  font-weight: 600;
                  color: #003366;
                  margin-bottom: 4px;
                  font-size: 14px;
                ">${highlightMatch(result.title, result.matchedTerm)}</div>
                <div style="
                  color: #666;
                  font-size: 12px;
                  line-height: 1.4;
                ">${result.description}</div>
              </div>
              <div style="
                color: #999;
                font-size: 12px;
                margin-left: 8px;
              ">
                <i class="fas fa-arrow-right"></i>
              </div>
            </div>
          </div>
        `).join('');
        
        searchResultsContainer.innerHTML = `
          <div style="
            padding: 8px 16px;
            background: #f8f9fa;
            border-bottom: 1px solid #e9ecef;
            font-size: 12px;
            color: #666;
            font-weight: 500;
          ">
            ${results.length} result${results.length !== 1 ? 's' : ''} found
          </div>
          ${resultsHTML}
        `;
        
        // Add click handlers to results
        searchResultsContainer.querySelectorAll('.search-result-item').forEach((item, index) => {
          item.addEventListener('click', () => {
            window.location.href = results[index].url;
          });
        });
      }
      
      searchResultsContainer.style.display = 'block';
    };
    
    const highlightMatch = (text, searchTerm) => {
      if (!searchTerm) return text;
      const regex = new RegExp(`(${searchTerm})`, 'gi');
      return text.replace(regex, '<mark style="background: #ffeb3b; padding: 1px 2px; border-radius: 2px;">$1</mark>');
    };
    
    const getIconForPage = (title) => {
      const iconMap = {
        'Home': 'home',
        'Fundamentals': 'book-open',
        'Books': 'book',
        'Videos': 'video',
        'Academicians': 'user-graduate',
        'Industry Personnel': 'user-tie',
        'Researchers': 'user-edit',
        'Data Download': 'download',
        'Open Source Software': 'code',
        'Education': 'graduation-cap',
        'Career': 'briefcase',
        'Events': 'calendar',
        'Contact Us': 'envelope'
      };
      return iconMap[title] || 'file';
    };
    
    // Event listeners
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      console.log("Search form submitted");
      performSearch(searchInput.value);
    });
    
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.trim();
      console.log("Search input changed:", query);
      if (query.length >= 2) {
        performSearch(query);
      } else {
        searchResultsContainer.style.display = 'none';
      }
    });
    
    searchButton.addEventListener('click', (e) => {
      e.preventDefault();
      console.log("Search button clicked");
      performSearch(searchInput.value);
    });
    
    // Close search results when clicking outside
    document.addEventListener('click', (e) => {
      if (!searchForm.contains(e.target) && !searchResultsContainer.contains(e.target)) {
        searchResultsContainer.style.display = 'none';
      }
    });
    
    console.log("Search functionality initialized successfully!");
  }, 100);
}

// Also initialize on window load as fallback
window.addEventListener('load', function() {
  if (!document.querySelector('.navbar')) {
    initializeNavbar();
  }
});