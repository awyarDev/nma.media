
    document.addEventListener('DOMContentLoaded', function() {
        // New mobile menu with icon toggling
const mobileBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('nav ul');
const menuIcon = mobileBtn.querySelector('i'); // Gets the icon element
    
mobileBtn.addEventListener('click', function() {
    // Toggle menu visibility
    navMenu.classList.toggle('show');
    
    // Toggle between bars and times icons
    if(navMenu.classList.contains('show')) {
        menuIcon.classList.replace('fa-bars', 'fa-times'); // Change to X icon
    } else {
        menuIcon.classList.replace('fa-times', 'fa-bars'); // Change back to ☰
    }
});
    
// Close menu when clicking links (mobile)
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', function() {
        if(window.innerWidth <= 768) {
            navMenu.classList.remove('show');
            mobileBtn.querySelector('i').classList.replace('fa-times', 'fa-bars');
        }
    });
});
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Improved number animation with header support
        function animateValue(element, start, end, duration) {
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                let value = Math.floor(progress * (end - start) + start);
                
                // Format 1,000,000 as "1M"
                if (end >= 1000000) {
                    value = (value / 1000000).toFixed(1);
                    if (value.endsWith('.0')) {
                        value = value.replace('.0', '');
                    }
                    element.textContent = "+" +value + "M";
                } else {
                    element.textContent = "+" + value;
                }
                
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        }
        
        function startCountingAnimations() {
            const statItems = document.querySelectorAll('.stat-item');
            statItems.forEach(item => {
                const numberElement = item.querySelector('h3');
                let statText = numberElement.textContent;
                let finalValue;
                
                if (statText.includes('M')) {
                    finalValue = parseFloat(statText.replace('M', '')) * 1000000;
                    numberElement.textContent = "0M";
                } else {
                    finalValue = parseInt(statText.replace('+', ''));
                    numberElement.textContent = "+0";
                }
                
                // Delay start slightly to ensure header is loaded
                setTimeout(() => {
                    animateValue(numberElement, 0, finalValue, 2000);
                }, 300);
            });
        }
        
        // Image animations
        function animateOnScroll() {
            const elements = document.querySelectorAll('.partner-item, .series-item');
            elements.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (elementPosition < windowHeight - 100) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
            });
        }
        
        // Initialize all animations
        function initAnimations() {
            // Set initial styles
            const partnerItems = document.querySelectorAll('.partner-item');
            const seriesItems = document.querySelectorAll('.series-item');
            
            partnerItems.forEach(item => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                item.style.transition = 'opacity 0.5s ease 0.2s, transform 0.5s ease 0.2s';
            });
            
            seriesItems.forEach((item, index) => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                item.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
            });
            
            // Start animations
            startCountingAnimations();
            animateOnScroll();
            window.addEventListener('scroll', animateOnScroll);
        }
        
        // Start everything after slight delay
        setTimeout(initAnimations, 100);
    });



// Add this to your existing JavaScript
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});






document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('commentForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const note = document.getElementById('userNote').value;
        const speaker = document.getElementById('speakerSuggestion').value;
        
        if (!note.trim()) {
            showNotification('تکایە تێبینیەکانت بنووسە', 'error');
            return;
        }
        
        const comment = {
            id: Date.now(),
            note: note,
            speaker: speaker,
            date: new Date().toISOString()
        };
        
        saveComment(comment);
        form.reset();
        showNotification('ســوپاس! تێبینیەکەت بە سەرکەوتووی تۆمارکرا');
    });
    
    function saveComment(comment) {
        let comments = JSON.parse(localStorage.getItem('podcastComments')) || [];
        comments.unshift(comment);
        localStorage.setItem('podcastComments', JSON.stringify(comments));
    }
});



// Notification system
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        ${message}
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
    
    // Click to dismiss
    notification.addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    });
}


// Simple loader dismissal
window.addEventListener('load', function() {
  const loader = document.querySelector('.nma-sleek-loader');
  
  // Add a slight delay before starting fade out
  setTimeout(() => {
    loader.classList.add('hidden');
    
    // Remove loader after animation completes
    setTimeout(() => {
      loader.remove();
    }, 800);
  }, 500); // Adjust this delay based on your needs
});

document.addEventListener('DOMContentLoaded', function() {
    const texts = [
        "بەخێربێن بۆ نما میدیا",
        "بەخێربێن بۆ نما میدیا",
        "بەخێربێن بۆ نما میدیا", 
        "بەخێربێن بۆ نما میدیا"
    ];
    
    const typingElement = document.getElementById('typing-text');
    const cursorElement = document.querySelector('.cursor');
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    // Timing configuration (in milliseconds)
    const typingSpeed = 100 + Math.random() * 50; // Speed while typing (100-150ms per letter)
    const deletingSpeed = 30; // Speed while deleting (30ms per letter)
    const displayDuration = 15000; // 30 SECONDS display time after typing
    const initialDelay = 1000; // 1 second delay before starting

    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            // Deleting text
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            
            if (charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                setTimeout(type, 100); // Short pause before typing next text
                return;
            }
        } else {
            // Typing text
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            
            if (charIndex === currentText.length) {
                setTimeout(() => {
                    isDeleting = true;
                    type(); // Start deleting after long display
                }, displayDuration); // Wait 30 seconds before deleting
                return;
            }
        }

        // Continue typing/deleting
        const speed = isDeleting ? deletingSpeed : typingSpeed;
        setTimeout(type, speed);
    }

    // Start the typing effect
    setTimeout(type, initialDelay);
    
    // Create floating light spots
    for (let i = 0; i < 15; i++) {
        createFloatingLight();
    }
});