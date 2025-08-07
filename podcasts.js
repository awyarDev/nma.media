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
        link: "https://youtu.be/eWoFRJ4gEs0?si=JOxGLImhWnuAtA4r"
    },
    {
        img: "./1742556373.jpg",
        title: "خۆشەویستی و هاوسەرگیری و خێزان",
        speaker: "م.ڕزگار حەمە سەلیم",
        link: "https://youtu.be/sjLjd7XsseQ?si=8UoNf0GHXd2cQEoM"
    },
    {
        img: "./1742556413.jpg",
        title: "چۆن بەشەکەم هەڵبژێرم؟",
        speaker: "م. هاوژین فوئاد",
        link: "https://youtu.be/UgYAAx65zRY?si=UXzazTZk5hIBpczU"
    },
    {
        img: "./1742556424.jpg",
        title: "ئایا پێغەمبەرایەتی کۆتایی هاتووە؟!",
        speaker: "م.تەحسین حەمە غەریب",
        link: "https://youtu.be/OiNdfH4oLfo?si=KLXPxjWEygxr9Zfp"
    },
    {
        img: "./1742556433.jpg",
        title: "گەنجان و هیممەت بەرزی!",
        speaker: "م.ئەکرەم ئەنوەر",
        link: "https://youtu.be/xiNMk17XB4g?si=QgX6byaGKs3XU9qY"
    },
    {
        img: "./1742684202.jpg",
        title: "ئایا خودا بوونی هەیە؟",
        speaker: "م.مەودود جبار",
        link: "https://youtu.be/PbWUEU86Ths?si=F8DGpLP5TrlzpX93"
    },
    {
        img: "./Halala m.jpg",
        title: "ئافرەت و حیجاب و کارکردن!",
        speaker: "م.هەڵاڵە محمد ئەڵماس",
        link: "https://www.youtube.com/watch?v=1bU3_BdYT8g&list=PLqz8seWkWRglKl0WrBbw2Usg_ajmqfjt7&index=4"
    },
    {
        img: "./Mudrek.jpg",
        title: "ڕێگا ڕاستەکە کامەیە؟",
        speaker: "م.مودریک علی عارف",
        link: "https://www.youtube.com/watch?v=9qnIVzaZ15s&index=13"
    },
    {
        img: "./d4.jpg",
        title: "ئامانجی گەورە ڕێگاکەی سەختە!",
        speaker: "م. حەسەن پێنجوێنی",
        link: "https://youtu.be/RvRkYXNFYRM?si=cpn88nVCkvTHExmM"
    },
    {
        img: "./d5.jpg",
        title: "ڕواڵەتگەرایی و ئازادی و حیجاب!",
        speaker: "م.بێخاڵ ئەبوبەکر",
        link: "https://youtu.be/wOOhOLhw4CM?si=E9JKahf_yAveQOA0"
    },
    {
        img: "./d6.jpg",
        title: "کچ و سەرکەوتن و ڤلۆگەرەکانیش",
        speaker: "م.تریفە جەلال",
        link: "https://youtu.be/GSUdUiuvBh4?si=1xhoq15sUfvNfnqh"
    },
    {
        img: "./d7.jpg",
        title: "کێ بکەین بە پێشەنگی خۆمان؟",
        speaker: "م.عبداللە حمەسعید",
        link: "https://youtu.be/hyfU-6grrG4?si=Yttf5LPUSTe2dkc-"
    },
    {
        img: "./d8.jpg",
        title: "زیرەکی دەستکرد و کۆتایی مرۆڤ!",
        speaker: "ئەندام عومەر",
        link: "https://youtu.be/Bjxw4B070xA?si=MmkvyQfofNeLewGJ"
    },
    {
        img: "./EA.jpg",
        title: "ئەوەی دەربارەی ژیاننامەی پێغەمبەر دەبێت بیزانیت!",
        speaker: "م.بەکر حەمە صدیق",
        link: "https://youtu.be/nwdlOq74eTQ?si=GN3xIJWgAUnOt7Yx"
    },
    {
        img: "./ED.jpg",
        title: "قورئان تاکە ڕێگای بەختەوەری",
        speaker: "م.محمد عبدالرحیم",
        link: "https://youtu.be/0EBOD9rtXjM?si=txvAwXCzqYGAEzyz"
    },
    {
        img: "./d3.jpg",
        title: "کێشەکانی کۆمەڵگا لە ڕوانگەی داواکاری گشتییەوە",
        speaker: "م.بەختیار علی میرزا",
        link: "https://youtu.be/Gsodd764EzM?si=qTIueDMdIhO-KOtS"
    },
    {
        img: "./maarf.jpg",
        title: "ڕەمەزان و گەنج و شتی تریش",
        speaker: "م.عبدالرحمن محمد عارف",
        link: "https://youtu.be/axPMrZRFdrI?si=RA2sUEG_K8JtpxtV"
    },
    {
        img: "./faisal.jpg",
        title: "گەنج و زانیاری و سۆشیاڵ میدیا",
        speaker: "م.فیصل ابراهیم",
        link: "https://youtu.be/dsobVECb384?si=GYZMonLZLW_uOg36"
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