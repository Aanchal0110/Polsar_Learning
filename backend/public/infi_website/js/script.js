document.addEventListener('DOMContentLoaded', () => {
    const menu = document.getElementById('menu');
    // The CSS targets the element with the class 'navbar' for mobile toggling.
    // This might be inside the '#navBar' div or the div itself might have the class.
    const navBar = document.querySelector('.navbar'); 

    if (menu && navBar) {
        menu.addEventListener('click', () => {
            navBar.classList.toggle('active');
        });
    }

    // Fallback for the case where #navBar is the container to toggle
    const navBarContainer = document.getElementById('navBar');
    if (menu && navBarContainer && !navBar) {
         menu.addEventListener('click', () => {
            // This assumes the dynamically loaded content will have the .navbar class
            const innerNavBar = navBarContainer.querySelector('.navbar');
            if(innerNavBar) {
                innerNavBar.classList.toggle('active');
            }
        });
    }
});
