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








          // 3. Podcast data
    const allPodcasts = [
        {
            img: "./1742556355.jpg",
            title: "عالەمانیەت؛ لە تاریکییەوە بۆ تاریکی",
            speaker: "م.ئاڤار قەرەداغی",
            link: "podcast1.html"
        },
        {
            img: "./1742556373.jpg",
            title: "خۆشەویستی و هاوسەرگیری و خێزان",
            speaker: "م.ڕزگار حەمە سەلیم", 
            link: "podcast2.html"
        },
        {
            img: "./1742556413.jpg",
            title: "چۆن بەشەکەم هەڵبژێرم؟",
            speaker: "م. هاوژین فوئاد",
            link: "podcast3.html" 
        },
        {
            img: "./1742556424.jpg",
            title: "ئایا پێغەمبەرایەتی کۆتایی هاتووە؟!",
            speaker: "م.تەحسین حەمە غەریب",
            link: "podcast4.html"
        },
        {
            img: "./1742556433.jpg",
            title: "گەنجان و هیممەت بەرزی!",
            speaker: "م.ئەکرەم ئەنوەر",
            link: "podcast5.html"
        },
        {
            img: "./1742684202.jpg", 
            title: "ئایا خودا بوونی هەیە؟",
            speaker: "م.مەودود جبار",
            link: "podcast6.html"
        },
        {
            img: "./Halala m.jpg",
            title: "ئافرەت و حیجاب و کارکردن!",
            speaker: "م.هەڵاڵە محمد ئەڵماس",
            link: "https://www.youtube.com/watch?v=1bU3_BdYT8g"
        },
        {
            img: "./Mudrek.jpg",
            title: "ڕێگا ڕاستەکە کامەیە؟",
            speaker: "م.مودریک علی عارف", 
            link: "https://www.youtube.com/watch?v=9qnIVzaZ15s"
        }
    ];

    // 4. Recommendation functionality
    const recommendBtn = document.getElementById('recommendBtn');
    if (recommendBtn) {
        recommendBtn.addEventListener('click', function() {
            const recommendationsContainer = document.getElementById('recommendations');
            if (recommendationsContainer) {
                recommendationsContainer.innerHTML = '';
                
                // Get 3 random unique podcasts
                const shuffled = [...allPodcasts].sort(() => 0.5 - Math.random());
                const recommended = shuffled.slice(0, 3);
                
                // Display recommendations
                recommended.forEach(podcast => {
                    recommendationsContainer.innerHTML += `
                        <a href="${podcast.link}" class="podcast-item" target="_blank">
                            <div class="podcast-cover">
                                <img src="${podcast.img}" alt="${podcast.title}" loading="lazy">
                            </div>
                            <h3>${podcast.title}</h3>
                            <p>${podcast.speaker}</p>
                        </a>
                    `;
                });
                
                // Animate the new items
                setTimeout(() => {
                    document.querySelectorAll('#recommendations .podcast-item').forEach(item => {
                        item.classList.add('show');
                    });
                }, 100);
            }
        });
    }
});