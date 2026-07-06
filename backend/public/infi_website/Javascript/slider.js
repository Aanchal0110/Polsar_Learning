// Check if slideshow elements exist before initializing
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.getElementsByClassName("mySlides");
    const introSlides = document.getElementsByClassName("introSlides");
    
    // Only initialize if slides exist
    if (slides.length > 0 || introSlides.length > 0) {
        let slideIndex = 0;  // Index for the main slideshow
        let slideIndexIntro = 0;  // Index for the intro sections slideshow

        // Function to show the main slideshow
        function showSlides() {
            let i;
            
            // Hide all slides
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }
            
            // Increment the slide index
            slideIndex++;
            
            // Reset index if it exceeds the number of slides
            if (slideIndex > slides.length) {
                slideIndex = 1;
            }
            
            // Display the current slide
            if (slides[slideIndex - 1]) {
                slides[slideIndex - 1].style.display = "block";
            }
            
            // Change slide every 5 seconds
            setTimeout(showSlides, 5000);
        }

        // Function to show the intro sections slideshow
        function showSlidesIntro() {
            let i;
            
            // Hide all intro slides
            for (i = 0; i < introSlides.length; i++) {
                introSlides[i].style.display = "none";
            }
            
            // Increment the intro slide index
            slideIndexIntro++;
            
            // Reset index if it exceeds the number of intro slides
            if (slideIndexIntro > introSlides.length) {
                slideIndexIntro = 1;
            }
            
            // Display the current intro slide
            if (introSlides[slideIndexIntro - 1]) {
                introSlides[slideIndexIntro - 1].style.display = "block";
            }
            
            // Change intro slide every 5 seconds
            setTimeout(showSlidesIntro, 5000);
        }

        // Function to manually change the main slideshow
        function plusSlides(n) {
            showSlidesManually(slideIndex += n);
        }

        // Function to manually show a specific main slide
        function showSlidesManually(n) {
            let i;
            
            // Reset index if it exceeds the number of slides
            if (n > slides.length) {
                slideIndex = 1;
            }
            
            // Reset index if it is less than 1
            if (n < 1) {
                slideIndex = slides.length;
            }
            
            // Hide all slides
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }
            
            // Display the current slide
            if (slides[slideIndex - 1]) {
                slides[slideIndex - 1].style.display = "block";
            }
        }

        // Function to manually change the intro sections slideshow
        function plusSlidesIntro(n) {
            showSlidesIntroManually(slideIndexIntro += n);
        }

        // Function to manually show a specific intro slide
        function showSlidesIntroManually(n) {
            let i;
            
            // Reset index if it exceeds the number of intro slides
            if (n > introSlides.length) {
                slideIndexIntro = 1;
            }
            
            // Reset index if it is less than 1
            if (n < 1) {
                slideIndexIntro = introSlides.length;
            }
            
            // Hide all intro slides
            for (i = 0; i < introSlides.length; i++) {
                introSlides[i].style.display = "none";
            }
            
            // Display the current intro slide
            if (introSlides[slideIndexIntro - 1]) {
                introSlides[slideIndexIntro - 1].style.display = "block";
            }
        }

        // Initialize the slideshows
        if (slides.length > 0) {
            showSlides();
        }
        if (introSlides.length > 0) {
            showSlidesIntro();
        }
    }
});
