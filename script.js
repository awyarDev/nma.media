
    document.addEventListener('DOMContentLoaded', function() {
        // Mobile menu toggle
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navMenu = document.querySelector('nav ul');
        
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('show');
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('nav ul li a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    navMenu.classList.remove('show');
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
                    element.textContent = value + "M";
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