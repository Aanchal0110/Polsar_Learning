//basic scrpit as given by sub-ordinate

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
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");

    if (n > slides.length) {
        slideIndex = 1;
    }
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

    // Show the current slide
    slides[slideIndex - 1].style.display = "block";
    // Add active class to the current dot
    dots[slideIndex - 1].className += " active";
}

// Event listeners for manual navigation
document.querySelector(".prev").addEventListener("click", function () {
    plusSlides(-1);
});
document.querySelector(".next").addEventListener("click", function () {
    plusSlides(1);
});
document.querySelectorAll('.rating .fa-star').forEach(star => {
    star.addEventListener('click', function () {
        let starValue = this.getAttribute('data-star');
        console.log(`Star ${starValue} clicked`);

        // Reset all stars to default color
        this.parentNode.querySelectorAll('.fa-star').forEach(star => {
            star.classList.remove('checked');
        });

        // Highlight the selected stars
        for (let i = 0; i < starValue; i++) {
            this.parentNode.children[i].classList.add('checked');
        }
    });
});

