// Script pour le menu mobile et les animations
document.addEventListener('DOMContentLoaded', function() {
    // Animation pour les cards au scroll
    const cards = document.querySelectorAll('.service-card, .category-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease';
        observer.observe(card);
    });

    // Smooth scrolling pour les ancres
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Affichage du menu burger
    const burger = document.getElementById('burger-menu');
    const navUl = document.querySelector('nav ul');
    if (burger && navUl) {
        burger.addEventListener('click', function() {
            navUl.classList.toggle('active');
        });
        // Fermer le menu au clic sur un lien
        navUl.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navUl.classList.remove('active');
            });
        });
    }
});

// Animation du texte d'accueil
document.addEventListener("DOMContentLoaded", function() {
    const text = "Bienvenue dans votre espace santé, votre bien etre, notre priorité";
    const target = document.getElementById("hero-typing");
    let i = 0;

    function type() {
        if (i < text.length) {
            target.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, 45); // Vitesse de frappe (ms)
        }
    }
    if (target) type();
});

