// Main application initialization
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar-medical');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Initialize page load animations
    initializePageAnimations();
});

// Page animations
function initializePageAnimations() {
    const elementsToAnimate = document.querySelectorAll('.fade-in-up');
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        setTimeout(() => {
            el.style.opacity = '1';
        }, 200);
    });
}

// Counter animation
function animateCounter() {
    const counters = document.querySelectorAll('.counter');
    const speed = 200;
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / speed;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => animateCounter(), 1);
        } else {
            counter.innerText = target;
        }
    });
}

// Intersection Observer for section titles
const sectionTitle = document.getElementById('features-title');
if (sectionTitle) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                animateCounter();
            }
        });
    }, { threshold: 0.5 });

    observer.observe(sectionTitle);
}


// Flash
document.addEventListener("DOMContentLoaded", () => {
    const flashContainer = document.getElementById("flash-container");
    if (!flashContainer) return;
    setTimeout(() => {
        flashContainer.style.transition = "all 0.5s ease";
        flashContainer.style.height = flashContainer.offsetHeight + "px";
        flashContainer.style.overflow = "hidden";
        flashContainer.style.height = "0px";
        flashContainer.style.marginTop = "0px";
        flashContainer.style.paddingTop = "0px";
        flashContainer.style.paddingBottom = "0px";
        flashContainer.style.opacity = "0";
    }, 4000);
});