// Helper Functions
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top <= window.innerHeight * 0.75 && // Trigger when 75% into view
    rect.bottom >= 0
  );
}

function animateStatsValue(element, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp)/duration, 1);
    let value = Math.floor(progress * (end - start) + start);
    
    if (end >= 1000000) {
      value = (value/1000000).toFixed(1);
      element.textContent = "+" + value.replace('.0', '') + "M";
    } else {
      element.textContent = "+" + value;
    }
    
    if (progress < 1) window.requestAnimationFrame(step);
  };
  window.requestAnimationFrame(step);
}

// Mobile Menu
function initMobileMenu() {
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const navMenu = document.querySelector('nav ul');
  const menuIcon = mobileBtn?.querySelector('i');
  
  if (mobileBtn && menuIcon) {
    mobileBtn.addEventListener('click', function() {
      navMenu.classList.toggle('show');
      menuIcon.classList.toggle('fa-bars');
      menuIcon.classList.toggle('fa-times');
    });
    
    document.querySelectorAll('nav ul li a').forEach(link => {
      link.addEventListener('click', function() {
        if(window.innerWidth <= 768) {
          navMenu.classList.remove('show');
          menuIcon.classList.replace('fa-times', 'fa-bars');
        }
      });
    });
  }
}

// Smooth Scrolling
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Stats Counter
function initStatsCounter() {
  const statsSection = document.querySelector('.stats');
  if (!statsSection) return;

  const statItems = document.querySelectorAll('.stat-item');
  statItems.forEach(item => {
    const numEl = item.querySelector('h3');
    const original = numEl.textContent;
    numEl.dataset.original = original;
    numEl.textContent = original.includes('M') ? "+0M" : "+0"; 
  });

  function handleScroll() {
    if (!isElementInViewport(statsSection)) return;
    
    statItems.forEach(item => {
      const numEl = item.querySelector('h3');
      const original = numEl.dataset.original;
      let finalValue = original.includes('M') 
        ? parseFloat(original.replace(/[^\d.]/g, '')) * 1000000
        : parseInt(original.replace(/[^\d]/g, ''));
      
      animateStatsValue(numEl, 0, finalValue, 2000);
    });
    
    window.removeEventListener('scroll', handleScroll);
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll();
}

// Partners Animation
function initPartnersAnimation() {
  const partnersSection = document.querySelector('.partners');
  const partnerItems = document.querySelectorAll('.partner-item');
  
  if (!partnersSection) return;

  partnerItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = `opacity 0.4s ease ${index * 0.05}s, transform 0.4s ease ${index * 0.05}s`;
  });

  function animatePartners() {
    if (isElementInViewport(partnersSection)) {
      partnerItems.forEach(item => {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      });
      window.removeEventListener('scroll', animatePartners);
    }
  }

  window.addEventListener('scroll', animatePartners);
  animatePartners();
}

// Typing Animation
function initTypingAnimation() {
  const texts = [
    "بەخێربێن بۆ نما میدیا",
    "بیری باڵا",
    "کاری باڵا", 
    "تاکی باڵا"
  ];
  const typingElement = document.getElementById('typing-text');
  if (!typingElement) return;

  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100 + Math.random() * 50;

  function type() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
      typingElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      
      if (charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(type, 500);
        return;
      }
    } else {
      typingElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      
      if (charIndex === currentText.length) {
        setTimeout(() => {
          isDeleting = true;
          type();
        }, 3000); // Pause for 3 seconds when complete
        return;
      }
    }

    setTimeout(type, isDeleting ? 50 : typingSpeed);
  }

  setTimeout(type, 1000);
}

// Main Initialization
document.addEventListener('DOMContentLoaded', function() {
  initMobileMenu();
  initSmoothScrolling();
  initStatsCounter();
  initPartnersAnimation();
  initTypingAnimation();
});

// Header Scroll Effect
window.addEventListener('scroll', function() {
  const header = document.querySelector('header');
  if (header) {
    header.classList.toggle('scrolled', window.scrollY > 50);
  }
});

// Notification System
function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerHTML = `
    <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
    ${message}
  `;
  
  document.body.appendChild(notification);
  setTimeout(() => notification.classList.add('show'), 100);
  
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 5000);
  
  notification.addEventListener('click', () => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  });
}

// Loader
window.addEventListener('load', function() {
  const loader = document.querySelector('.nma-sleek-loader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('hidden');
      setTimeout(() => loader.remove(), 800);
    }, 500);
  }
});