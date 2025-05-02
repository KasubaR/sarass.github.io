// Home Page Specific JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Initialize any home page specific functionality
    initQuickLinks();
    initNewsletterForm();
});

// Quick Links Animation
const initQuickLinks = () => {
    const quickLinks = document.querySelectorAll('.quick-link-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    quickLinks.forEach((link, index) => {
        link.style.opacity = 0;
        link.style.transform = 'translateY(20px)';
        link.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        observer.observe(link);
    });
};

// Newsletter Form Handling
const initNewsletterForm = () => {
    const newsletterForm = document.querySelector('.footer-col form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (validateEmail(email)) {
                // In a real implementation, you would send this to your server
                alert('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
};

// Simple email validation
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

// Additional home page animations
const animateElementsOnScroll = () => {
    const elements = document.querySelectorAll('.section-title, .section-subtitle, .carousel-slide');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });

    elements.forEach((element) => {
        observer.observe(element);
    });
};

// Initialize all animations
document.addEventListener('DOMContentLoaded', () => {
    animateElementsOnScroll();
});