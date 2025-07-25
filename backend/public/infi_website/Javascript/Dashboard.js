// Function to set the active menu item
function setActiveMenuItem(clickedItem) {
    const menuItems = document.querySelectorAll(".menu a");
    menuItems.forEach(item => {
        item.classList.remove("active"); // Remove active class from all menu items
    });
    clickedItem.classList.add("active"); // Add active class to the clicked item
}

// Function to Display My Team
function displayMyTeam() {
    setActiveMenuItem(document.getElementById("myTeamLink"));
    const content = document.getElementById("mainContent");
    content.innerHTML = `<h2>My Team</h2>`;
    // Add team content here...
}

// Function to Display Explore Products
function displayExploreProducts() {
    setActiveMenuItem(document.getElementById("exploreProductsLink"));
    const content = document.getElementById("mainContent");
    content.innerHTML = `<h2>Explore Products</h2>`;
    // Add products content here...
}

// Function to Display My Courses
function displayMyCourses() {
    setActiveMenuItem(document.getElementById("myCoursesLink"));
    const content = document.getElementById("mainContent");
    content.innerHTML = `<h2>My Courses</h2>`;
    // Add courses content here...
}

// Function to Display Profile
function displayProfile() {
    setActiveMenuItem(document.getElementById("profileLink"));
    const content = document.getElementById("mainContent");
    content.innerHTML = `<h2>Profile</h2>`;
    // Add profile content here...
}

// Event Listeners for Navigation
document.getElementById("myTeamLink").addEventListener("click", displayMyTeam);
document.getElementById("exploreProductsLink").addEventListener("click", displayExploreProducts);
document.getElementById("myCoursesLink").addEventListener("click", displayMyCourses);
document.getElementById("profileLink").addEventListener("click", displayProfile);
