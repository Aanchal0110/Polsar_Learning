// Check if slideshow elements exist before initializing
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("dot");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");
    
    // Only initialize slideshow if elements exist
    if (slides.length > 0) {
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
            if (slides[slideIndex - 1]) {
                slides[slideIndex - 1].style.display = "block";
            }
            if (dots[slideIndex - 1]) {
                dots[slideIndex - 1].className += " active";
            }
        }

        // Event listeners for slide navigation
        if (prevBtn) {
            prevBtn.addEventListener("click", function () {
                plusSlides(-1);
            });
        }
        if (nextBtn) {
            nextBtn.addEventListener("click", function () {
                plusSlides(1);
            });
        }
    }
});

// Star Rating System
document.addEventListener('DOMContentLoaded', function() {
    const stars = document.querySelectorAll('.rating .fa-star');
    if (stars.length > 0) {
        stars.forEach(star => {
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
    }
});

// Mobile menu functionality is now handled in navBar.js to prevent conflicts
