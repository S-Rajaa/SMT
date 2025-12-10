// === Existing Slider JS Logic ===
let index = 0;
const slides = document.querySelector(".slides");
const total = document.querySelectorAll(".slide").length;

let autoSlide;     // auto timer
let pauseTime = 12000; // 12 sec pause after user click (Updated from 10000 to 12000 as per comment in original script)
let autoTime = 5000;   // 5 sec normal auto-slide

// Show slide
function showSlide() {
    slides.style.transform = `translateX(-${index * 100}%)`;
}

// Move slide
function moveSlide(step) {
    index = (index + step + total) % total;
    showSlide();

    // STOP auto-slide on user click for 12 seconds
    resetAutoSlide();
}

// Start auto-slide
function startAutoSlide() {
    autoSlide = setInterval(() => {
        index = (index + 1) % total;
        showSlide();
    }, autoTime);
}

// Reset auto-slide after user click
function resetAutoSlide() {
    clearInterval(autoSlide); // stop auto
    // Use window.setTimeout to avoid confusion with the startAutoSlide timer handle
    window.setTimeout(startAutoSlide, pauseTime); // restart after 12s
}

// Start initial auto-slide
startAutoSlide();


// === New Feature JS Logic ===

// 1. Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when a link is clicked (for single-page navigation)
document.querySelectorAll('#nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// 2. Fade-in on Scroll / Intersection Observer Logic
const productCards = document.querySelectorAll('.product-card');
const productSection = document.querySelector('.product-section');

const observerOptions = {
    root: null, // viewport
    threshold: 0.1 // 10% of item must be visible
};

const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Once the section is visible, start observing the individual cards
            cardObserver.observe(productGrid);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 }); // Use a lower threshold for the main section

const cardObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Get all the cards inside the intersecting product grid
            const cards = entry.target.querySelectorAll('.product-card');
            cards.forEach((card, index) => {
                // Apply a staggered delay for a smoother effect
                setTimeout(() => {
                    card.classList.add('visible');
                }, index * 100); // 100ms delay between cards
            });
            // Unobserve the grid once all its cards are fading in
            observer.unobserve(entry.target);
        }
    });
}, { root: null, threshold: 0.05 }); // Use a very low threshold for the card container

const productGrid = document.querySelector('.product-grid');
if (productSection && productGrid) {
    sectionObserver.observe(productSection);
}


