/**
 * A To Z Appliance - Main JavaScript
 */

// Page Loader
window.addEventListener('load', () => {
  const loader = document.getElementById('page-loader');
  if (loader) {
    loader.style.opacity = '0';
    loader.style.transition = 'opacity 0.3s';
    setTimeout(() => loader.remove(), 300);
  }
});

// Initialize AOS
AOS.init({
  duration: 800,
  easing: 'ease-out',
  once: true,
  offset: 100
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Business Hours Check
function checkBusinessHours() {
  const now = new Date();
  const day = now.getDay(); // 0=Sunday, 6=Saturday
  const hour = now.getHours();
  const minute = now.getMinutes();
  
  const statusDot = document.getElementById('businessStatusDot');
  const statusText = document.getElementById('businessStatusText');
  
  if (!statusDot || !statusText) return;
  
  const isOpen = (day !== 0 && hour >= 9 && hour < 19);
  
  if (isOpen) {
    statusDot.className = 'badge bg-success me-2';
    statusDot.innerHTML = '●';
    statusText.innerHTML = 'Open Now - Call Us!';
    statusText.className = 'text-success fw-semibold';
  } else {
    statusDot.className = 'badge bg-danger me-2';
    statusDot.innerHTML = '●';
    statusText.innerHTML = 'Closed - Opens 9 AM';
    statusText.className = 'text-danger fw-semibold';
  }
}

checkBusinessHours();
setInterval(checkBusinessHours, 60000);

// Counter Animation
function animateCounter(element) {
  const target = parseInt(element.getAttribute('data-target'));
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;
  
  const updateCounter = () => {
    current += step;
    if (current < target) {
      element.textContent = Math.floor(current) + '+';
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target + '+';
    }
  };
  
  requestAnimationFrame(updateCounter);
}

// Intersection Observer for Counters
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counters = entry.target.querySelectorAll('.counter-box');
      counters.forEach(counter => animateCounter(counter));
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const counterSection = document.querySelector('.counter-section');
if (counterSection) {
  counterObserver.observe(counterSection);
}

// Gallery Lightbox (Simple)
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', function() {
    const imgSrc = this.querySelector('img').src;
    const lightbox = document.createElement('div');
    lightbox.className = 'position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center';
    lightbox.style.cssText = 'background: rgba(0,0,0,0.9); z-index: 9999; cursor: pointer;';
    lightbox.innerHTML = `<img src="${imgSrc}" class="img-fluid" style="max-height: 90vh; max-width: 90%;">`;
    
    lightbox.addEventListener('click', () => lightbox.remove());
    document.body.appendChild(lightbox);
  });
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.main-navbar');
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
    } else {
      navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
    }
  }
});