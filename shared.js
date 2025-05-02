// Error handling utility
const handleError = (error, message) => {
    console.error(message, error);
    return null;
};

// Mobile Menu Toggle
const initMobileMenu = () => {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    const body = document.body;

    if (!mobileMenuBtn || !nav) {
        return handleError(new Error('Mobile menu elements not found'), 'Mobile menu initialization failed');
    }

    const toggleMenu = () => {
        const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
        mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
        nav.classList.toggle('active');
        body.classList.toggle('no-scroll'); // Prevent background scrolling when menu is open
        
        // Change menu button text based on state
        mobileMenuBtn.textContent = isExpanded ? '☰' : '✕';
    };

    // Click handler
    mobileMenuBtn.addEventListener('click', toggleMenu);

    // Keyboard navigation
    mobileMenuBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleMenu();
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !mobileMenuBtn.contains(e.target) && nav.classList.contains('active')) {
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            nav.classList.remove('active');
            body.classList.remove('no-scroll');
            mobileMenuBtn.textContent = '☰';
        }
    });

    // Close menu when clicking a nav link
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            nav.classList.remove('active');
            body.classList.remove('no-scroll');
            mobileMenuBtn.textContent = '☰';
        });
    });
    
    // Close menu when pressing Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && nav.classList.contains('active')) {
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            nav.classList.remove('active');
            body.classList.remove('no-scroll');
            mobileMenuBtn.textContent = '☰';
        }
    });
    
    // Handle resize events to reset menu state on desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 992 && nav.classList.contains('active')) {
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            nav.classList.remove('active');
            body.classList.remove('no-scroll');
            mobileMenuBtn.textContent = '☰';
        }
    });
};

// Carousel functionality
const initCarousel = () => {
    const carousel = document.querySelector('.carousel');
    if (!carousel) return; // Skip if carousel doesn't exist on page
    
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');

    if (!slides.length || !dots.length || !prevBtn || !nextBtn) {
        return handleError(new Error('Carousel elements not found'), 'Carousel initialization failed');
    }

    let currentSlide = 0;
    const slideCount = slides.length;

    const updateCarousel = () => {
        // Update slide positions instead of transforming the container
        slides.forEach((slide, index) => {
            if (index === currentSlide) {
                slide.style.transform = 'translateX(0)';
                slide.style.opacity = '1';
                slide.style.zIndex = '1';
            } else {
                slide.style.transform = `translateX(${index < currentSlide ? '-100%' : '100%'})`;
                slide.style.opacity = '0';
                slide.style.zIndex = '0';
            }
        });

        // Update ARIA attributes and active status
        dots.forEach((dot, index) => {
            dot.setAttribute('aria-selected', index === currentSlide);
            dot.classList.toggle('active', index === currentSlide);
        });

        slides.forEach((slide, index) => {
            slide.setAttribute('aria-hidden', index !== currentSlide);
        });
    };

    const nextSlide = () => {
        currentSlide = (currentSlide + 1) % slideCount;
        updateCarousel();
    };

    const prevSlide = () => {
        currentSlide = (currentSlide - 1 + slideCount) % slideCount;
        updateCarousel();
    };

    // Event listeners
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateCarousel();
        });
    });

    // Keyboard navigation for carousel
    carousel.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });

    // Swipe functionality for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    const handleSwipe = () => {
        // Detect swipe direction and minimum swipe distance
        if (touchEndX < touchStartX - 50) {
            nextSlide(); // Swipe left
        } else if (touchEndX > touchStartX + 50) {
            prevSlide(); // Swipe right
        }
    };

    // Auto play carousel
    let carouselInterval = setInterval(nextSlide, 5000);

    // Pause on hover
    carousel.addEventListener('mouseenter', () => {
        clearInterval(carouselInterval);
    });

    carousel.addEventListener('mouseleave', () => {
        carouselInterval = setInterval(nextSlide, 5000);
    });
    
    // Pause on touch for mobile
    carousel.addEventListener('touchstart', () => {
        clearInterval(carouselInterval);
    }, { passive: true });
    
    carousel.addEventListener('touchend', () => {
        carouselInterval = setInterval(nextSlide, 5000);
    }, { passive: true });

    // Initialize carousel
    updateCarousel();
};

// Handle fixed header adjustments
const initFixedHeader = () => {
    const header = document.querySelector('header');
    const banner = document.querySelector('.page-banner');
    
    if (!header || !banner) return;
    
    // Set initial banner padding based on header height
    banner.style.paddingTop = `${header.offsetHeight}px`;
    
    // Adjust on scroll for visual effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Adjust when window resizes
    window.addEventListener('resize', () => {
        banner.style.paddingTop = `${header.offsetHeight}px`;
    });
};

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initCarousel();
    initFixedHeader();
});