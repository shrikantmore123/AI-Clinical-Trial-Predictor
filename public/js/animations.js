// Additional animation utilities
class AnimationManager {
    constructor() {
        this.animations = new Map();
    }

    // Add fade in animation to elements
    fadeInElements(selector, delay = 0) {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
                el.style.transition = 'all 0.6s ease';
                
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, 100);
            }, delay + (index * 100));
        });
    }

    // Add hover animations to cards
    enableCardHover(selector) {
        const cards = document.querySelectorAll(selector);
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
}

// Initialize animation manager
const animationManager = new AnimationManager();

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    animationManager.enableCardHover('.feature-card');
    animationManager.fadeInElements('.feature-card', 500);
});