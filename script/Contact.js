// Contact.js
document.addEventListener('DOMContentLoaded', function() {
    // Gestion de la soumission du formulaire
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Récupération des valeurs du formulaire
        const nom = document.getElementById('nom').value;
        const email = document.getElementById('email').value;
        const sujet = document.getElementById('sujet').value;
        
        // Ici vous ajouteriez la logique d'envoi du formulaire
        // Pour l'exemple, nous affichons juste une alerte
        Swal.fire({
            icon: 'success',
            title: 'Message envoyé',
            html: `Merci <strong>${nom}</strong> pour votre message concernant <strong>${sujet}</strong>. Nous vous répondrons à l'adresse <strong>${email}</strong> dans les plus brefs délais.`,
            confirmButtonColor: 'var(--primary-color)'
        }).then(() => {
            contactForm.reset();
        });
    });
    
    // Animation des cartes de l'équipe
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    const membreCards = document.querySelectorAll('.membre-card');
    membreCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.5s ease, transform 0.5s ease ${index * 0.1}s`;
        observer.observe(card);
    });
});