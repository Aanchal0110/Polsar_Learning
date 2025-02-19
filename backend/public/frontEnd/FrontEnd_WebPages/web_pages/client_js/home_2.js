// this is for slider function replication of slider.js 

let slideIndex = 0;  // Index for the main slideshow
let slideIndexIntro = 0;  // Index for the intro sections slideshow
const user_info = {
    name:"None"
}

// Function to show the main slideshow
function showSlides() {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    
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
    slides[slideIndex - 1].style.display = "block";
    
    // Change slide every 5 seconds
    setTimeout(showSlides, 5000);
}

// Function to show the intro sections slideshow
function showSlidesIntro() {
    let i;
    let slides = document.getElementsByClassName("introSlides");
    
    // Hide all intro slides
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    
    // Increment the intro slide index
    slideIndexIntro++;
    
    // Reset index if it exceeds the number of intro slides
    if (slideIndexIntro > slides.length) {
        slideIndexIntro = 1;
    }
    
    // Display the current intro slide
    slides[slideIndexIntro - 1].style.display = "block";
    
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
    let slides = document.getElementsByClassName("mySlides");
    
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
    slides[slideIndex - 1].style.display = "block";
}

// Function to manually change the intro sections slideshow
function plusSlidesIntro(n) {
    showSlidesIntroManually(slideIndexIntro += n);
}

// Function to manually show a specific intro slide
function showSlidesIntroManually(n) {
    let i;
    let slides = document.getElementsByClassName("introSlides");
    
    // Reset index if it exceeds the number of intro slides
    if (n > slides.length) {
        slideIndexIntro = 1;
    }
    
    // Reset index if it is less than 1
    if (n < 1) {
        slideIndexIntro = slides.length;
    }
    
    // Hide all intro slides
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    
    // Display the current intro slide
    slides[slideIndexIntro - 1].style.display = "block";
}

// Initialize the slideshows
showSlides();
showSlidesIntro();
