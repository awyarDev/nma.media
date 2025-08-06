document.addEventListener('DOMContentLoaded', function() {
    // ===== Mobile Menu Toggle =====
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');
    const menuIcon = mobileBtn?.querySelector('i');
    
    if (mobileBtn && menuIcon) {
        mobileBtn.addEventListener('click', function() {
            navMenu.classList.toggle('show');
            if(navMenu.classList.contains('show')) {
                menuIcon.classList.replace('fa-bars', 'fa-times');
            } else {
                menuIcon.classList.replace('fa-times', 'fa-bars');
            }
        });
    }
    
    // Close menu when clicking links (mobile)
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', function() {
            if(window.innerWidth <= 768 && navMenu) {
                navMenu.classList.remove('show');
                if (menuIcon) {
                    menuIcon.classList.replace('fa-times', 'fa-bars');
                }
            }
        });
    });
    
    // ===== Smooth Scrolling =====
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
    
    // ===== Scroll-Triggered Stats Counter =====
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            let value = Math.floor(progress * (end - start) + start);
            
            if (end >= 1000000) {
                value = (value / 1000000).toFixed(1);
                if (value.endsWith('.0')) {
                    value = value.replace('.0', '');
                }
                element.textContent = "+" + value + "M";
            } else {
                element.textContent = "+" + value;
            }
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    function setupStatsCounter() {
        const statsSection = document.querySelector('.stats');
        const statItems = document.querySelectorAll('.stat-item');
        let hasAnimated = false;

        // Reset counters to 0 initially
        statItems.forEach(item => {
            const numberElement = item.querySelector('h3');
            const originalText = numberElement.textContent;
            numberElement.dataset.original = originalText;
            numberElement.textContent = originalText.includes('M') ? "+0M" : "+0";
        });

        function checkScroll() {
            if (hasAnimated || !statsSection) return;
            
            const rect = statsSection.getBoundingClientRect();
            const isVisible = (rect.top <= window.innerHeight && rect.bottom >= 0);
            
            if (isVisible) {
                hasAnimated = true;
                
                statItems.forEach(item => {
                    const numberElement = item.querySelector('h3');
                    const originalText = numberElement.dataset.original;
                    let finalValue;
                    
                    if (originalText.includes('M')) {
                        finalValue = parseFloat(originalText.replace('+', '').replace('M', '')) * 1000000;
                    } else {
                        finalValue = parseInt(originalText.replace('+', ''));
                    }
                    
                    animateValue(numberElement, 0, finalValue, 2000);
                });
                
                window.removeEventListener('scroll', checkScroll);
            }
        }

        window.addEventListener('scroll', checkScroll);
        checkScroll(); // Check immediately if already visible
    }

    // ===== Optimized Partners Animation =====
    function initPartnersAnimation() {
        const partnersSection = document.querySelector('.partners');
        const partnerItems = document.querySelectorAll('.partner-item');
        
        if (!partnersSection) return;

        // Faster animation with less delay between items
        partnerItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            // Reduced delay between items (0.05s) and faster animation (0.4s)
            item.style.transition = `opacity 0.4s ease ${index * 0.05}s, transform 0.4s ease ${index * 0.05}s`;
        });

        function animatePartners() {
            const rect = partnersSection.getBoundingClientRect();
            // Trigger when top of section reaches 1/3 of viewport (earlier)
            const triggerPoint = window.innerHeight / 3;

            if (rect.top < triggerPoint) {
                partnerItems.forEach(item => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                });
                window.removeEventListener('scroll', animatePartners);
            }
        }

        // More aggressive checking
        window.addEventListener('scroll', animatePartners, { passive: true });
        animatePartners(); // Check immediately
    }

    // ===== Series Items Animation =====
    function initSeriesAnimation() {
        const seriesItems = document.querySelectorAll('.series-item');
        
        seriesItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        });

        function checkSeries() {
            seriesItems.forEach(item => {
                const rect = item.getBoundingClientRect();
                if (rect.top < window.innerHeight - 100) {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }
            });
        }

        window.addEventListener('scroll', checkSeries);
        checkSeries(); // Check immediately
    }

    // ===== Typing Animation =====
    function initTypingAnimation() {
        const texts = [
            "بەخێربێن بۆ نما میدیا",
            "بیری بـــــــاڵا",
            "کاری بـــــــاڵا", 
            "تاکی بـــــــاڵا"
        ];
        const typingElement = document.getElementById('typing-text');
        const cursorElement = document.querySelector('.cursor');
        
        if (!typingElement) return;

        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100 + Math.random() * 50;
        const displayDuration = 3000; // 30 seconds display time

        function type() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                
                if (charIndex === 0) {
                    isDeleting = false;
                    textIndex = (textIndex + 1) % texts.length;
                    setTimeout(type, 100);
                    return;
                }
            } else {
                typingElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                
                if (charIndex === currentText.length) {
                    setTimeout(() => {
                        isDeleting = true;
                        type();
                    }, displayDuration);
                    return;
                }
            }

            const speed = isDeleting ? 50 : typingSpeed;
            setTimeout(type, speed);
        }

        setTimeout(type, 1000);
    }

    // ===== Floating Lights =====
    function createFloatingLight() {
        const light = document.createElement('div');
        light.className = 'floating-light';
        document.querySelector('.hero')?.appendChild(light);
        
        const size = Math.random() * 4 + 1;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        const xStart = Math.random() * 100;
        const xEnd = xStart + (Math.random() * 40 - 20);
        
        light.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${xStart}%;
            top: 110%;
            animation: floatUp ${duration}s linear ${delay}s infinite;
            opacity: ${Math.random() * 0.4 + 0.1};
        `;
    }

    // ===== Initialize Everything =====
    setupStatsCounter();
    initPartnersAnimation(); // This is the optimized version
    initSeriesAnimation();
    initTypingAnimation();
    
    // Create floating lights
    for (let i = 0; i < 15; i++) {
        createFloatingLight();
    }
});

// ===== Header Scroll Effect =====
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (header) {
        header.classList.toggle('scrolled', window.scrollY > 50);
    }
});

// ===== Comment Form =====
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('commentForm');
    if (!form) return;
    
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

// ===== Notification System =====
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

// ===== Loader Dismissal =====
window.addEventListener('load', function() {
    const loader = document.querySelector('.nma-sleek-loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
            setTimeout(() => loader.remove(), 800);
        }, 500);
    }
});