// home.js - Specific functionality for the homepage

// Animate elements on scroll
document.addEventListener('DOMContentLoaded', function() {
  // Header scroll effect
  const header = document.querySelector('header');
  const bannerSection = document.querySelector('.page-banner');
  let lastScrollY = window.scrollY;
  
  // Function to handle header appearance on scroll
  const handleHeaderScroll = () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    lastScrollY = currentScrollY;
  };
  
  // Add scroll listener
  window.addEventListener('scroll', handleHeaderScroll);
  
  // Initialize header state
  handleHeaderScroll();
  
  // Animate quick links on scroll
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.quick-link-card, .section-header, .carousel-container');
    
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementTop < windowHeight - 100) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };
  
  // Set initial state for animation
  document.querySelectorAll('.quick-link-card, .section-header, .carousel-container').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
  });
  
  // Add scroll listener for animations
  window.addEventListener('scroll', animateOnScroll);
  
  // Run once to check for elements already in view
  setTimeout(animateOnScroll, 100);
  
  // Apply Now button scroll effect
  const applyBtn = document.querySelector('.apply-btn');
  if (applyBtn) {
    applyBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  }
  
  // Quick links hover effects
  const quickLinkCards = document.querySelectorAll('.quick-link-card');
  quickLinkCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--secondary');
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--primary');
    });
  });
  
  // Make the quick link cards clickable (entire card)
  quickLinkCards.forEach(card => {
    const link = card.querySelector('.quick-link-btn');
    if (link) {
      const linkHref = link.getAttribute('href');
      card.style.cursor = 'pointer';
      
      card.addEventListener('click', function(e) {
        if (e.target !== link) {
          window.location.href = linkHref;
        }
      });
    }
  });
  
  // Add accessibility improvements
  const carouselSlides = document.querySelectorAll('.carousel-slide');
  carouselSlides.forEach((slide, index) => {
    // Add proper focus management for screen readers
    slide.setAttribute('tabindex', '0');
    slide.setAttribute('aria-hidden', index !== 0 ? 'true' : 'false');
  });
  
  // Improve banner accessibility
  if (bannerSection) {
    bannerSection.setAttribute('role', 'banner');
    bannerSection.setAttribute('aria-label', 'Welcome to Sarass Christian Academy');
  }
});

// Add a preloader
window.addEventListener('load', function() {
  const body = document.body;
  
  // Create preloader element
  const preloader = document.createElement('div');
  preloader.className = 'preloader';
  preloader.innerHTML = `
    <div class="preloader-content">
      <div class="spinner"></div>
      <div class="logo-icon">SC</div>
      <p>Loading...</p>
    </div>
  `;
  
  // Add preloader style
  const style = document.createElement('style');
  style.textContent = `
    .preloader {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: var(--white);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
      transition: opacity 0.5s ease-in-out, visibility 0.5s ease-in-out;
    }
    
    .preloader-content {
      text-align: center;
    }
    
    .spinner {
      width: 50px;
      height: 50px;
      border: 5px solid rgba(26, 93, 26, 0.1);
      border-radius: 50%;
      border-top-color: var(--primary);
      animation: spin 1s linear infinite;
      margin: 0 auto 20px;
    }
    
    .preloader p {
      color: var(--primary);
      font-weight: 600;
      margin-top: 10px;
    }
    
    @keyframes spin {
      100% {
        transform: rotate(360deg);
      }
    }
  `;
  
  document.head.appendChild(style);
  document.body.prepend(preloader);
  
  // Remove preloader after page is loaded
  setTimeout(() => {
    preloader.style.opacity = '0';
    preloader.style.visibility = 'hidden';
    
    // Remove preloader completely after fade out
    setTimeout(() => {
      preloader.remove();
    }, 500);
  }, 800);
});