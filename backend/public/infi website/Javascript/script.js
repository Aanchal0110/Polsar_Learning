let slideIndex = 1;
showSlides(slideIndex);

// Function to change slides
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Function to display a specific slide
function currentSlide(n) {
    showSlides(slideIndex = n);
}

// Function to display slides
function showSlides(n) {
    let i;
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("dot");

    // Loop back to the first slide if n exceeds the total slides
    if (n > slides.length) {
        slideIndex = 1;
    }
    // Loop back to the last slide if n is less than 1
    if (n < 1) {
        slideIndex = slides.length;
    }

    // Hide all slides
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    // Remove active class from all dots
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    // Show the current slide and set the corresponding dot as active
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

// Event listeners for slide navigation
document.querySelector(".prev").addEventListener("click", function () {
    plusSlides(-1);
});
document.querySelector(".next").addEventListener("click", function () {
    plusSlides(1);
});

// Star Rating System
document.querySelectorAll('.rating .fa-star').forEach(star => {
    star.addEventListener('click', function () {
        const starValue = parseInt(this.getAttribute('data-star'), 10);
        console.log(`Star ${starValue} clicked`);

        // Reset all stars to default
        this.parentNode.querySelectorAll('.fa-star').forEach(s => {
            s.classList.remove('checked');
        });

        // Highlight the selected stars up to the clicked one
        for (let i = 0; i < starValue; i++) {
            this.parentNode.children[i].classList.add('checked');
        }
    });
});

// Navbar Toggling for Mobile View
// document.getElementById('menu').addEventListener('click', function () {
//     console.log("I was clicked")
//     const navbar = document.querySelector('.navbar');
//     // const menu = document.getElementById("menu");
//     navbar.classList.toggle('active');
// });
