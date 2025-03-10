// Utilisation de code JavaScript moderne avec modules ES6
'use strict';

// Configuration du Swiper avec des options modernes
const initSwiper = () => {
    const swiper = new Swiper('.carroussel-container', {
        modules: [Navigation, Pagination],
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        grabCursor: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            640: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
        },
    });
};

// Gestion des animations au scroll avec l'Intersection Observer
const observeElements = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.referencement-content, .referencement-image, .relation-client-content, .relation-client-image, .site-web-content, .site-web-image')
        .forEach(element => observer.observe(element));
};

// Gestion des phrases rotatives
const initRotatingPhrases = () => {
    const phrases = document.querySelectorAll('.phrase-block');
    let currentIndex = 0;

    const rotatePhrase = () => {
        phrases.forEach(phrase => phrase.classList.remove('active'));
        phrases[currentIndex].classList.add('active');
        currentIndex = (currentIndex + 1) % phrases.length;
    };

    setInterval(rotatePhrase, 3000);
    rotatePhrase();
};

// Initialisation au chargement du DOM
document.addEventListener('DOMContentLoaded', () => {
    initSwiper();
    observeElements();
    initRotatingPhrases();
});

// Gestion du menu mobile avec délégation d'événements
document.addEventListener('click', (e) => {
    if (e.target.matches('.navbar-toggler, .navbar-toggler *')) {
        document.querySelector('.navbar-collapse').classList.toggle('show');
    }
});

// Gestion du formulaire de contact avec async/await
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        
        try {
            const response = await fetch('/submit-form', {
                method: 'POST',
                body: formData
            });
            
            if (response.ok) {
                alert('Message envoyé avec succès !');
                contactForm.reset();
            } else {
                throw new Error('Erreur lors de l\'envoi du message');
            }
        } catch (error) {
            console.error('Erreur:', error);
            alert('Une erreur est survenue. Veuillez réessayer.');
        }
    });
}

// Gestion du header sticky
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar-fixed');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}); 