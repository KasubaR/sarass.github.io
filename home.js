// Header scroll effect
window.addEventListener('scroll', function () {
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Error handling utility
const handleError = (error, message) => {
  console.error(message, error);
  return null;
};

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
    body.classList.toggle('no-scroll');
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
    if (nav.classList.contains('active') &&
      !nav.contains(e.target) &&
      !mobileMenuBtn.contains(e.target)) {
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
      nav.classList.remove('active');
      body.classList.remove('no-scroll');
    }
  });

  // Close menu when clicking a nav link
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
      nav.classList.remove('active');
      body.classList.remove('no-scroll');
    });
  });
};

// Carousel functionality
const initCarousel = () => {
  const carousel = document.querySelector('.carousel');
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.carousel-dot');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');

  if (!carousel || !slides.length || !dots.length || !prevBtn || !nextBtn) {
    return handleError(new Error('Carousel elements not found'), 'Carousel initialization failed');
  }

  let currentSlide = 0;
  const slideCount = slides.length;

  const updateCarousel = () => {
    carousel.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Update ARIA attributes
    dots.forEach((dot, index) => {
      dot.setAttribute('aria-selected', index === currentSlide);
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

  // Auto play carousel
  let carouselInterval = setInterval(nextSlide, 5000);

  // Pause on hover
  carousel.addEventListener('mouseenter', () => {
    clearInterval(carouselInterval);
  });

  carousel.addEventListener('mouseleave', () => {
    carouselInterval = setInterval(nextSlide, 5000);
  });

  // Initialize carousel
  updateCarousel();
};

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initCarousel();
});