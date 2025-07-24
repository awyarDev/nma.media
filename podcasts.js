document.addEventListener('DOMContentLoaded', function() {
    // Play button functionality
    document.querySelectorAll('.play-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const podcastTitle = this.closest('.podcast-card').querySelector('h3').textContent;
            
            // Replace with actual audio player functionality
            console.log(`Playing: ${podcastTitle}`);
            // window.location.href = 'podcast-player.html'; // Uncomment for actual navigation
        });
    });
    
    // Mobile menu toggle (reuse from main script if needed)
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');
    
    if(mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('show');
        });
    }
});



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