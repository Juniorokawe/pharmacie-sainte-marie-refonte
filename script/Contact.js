// CONTACT PAGE
document.addEventListener('DOMContentLoaded', function() {
    // Validation du formulaire
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validation simple
        const nom = document.getElementById('nom').value;
        const email = document.getElementById('email').value;
        const sujet = document.getElementById('sujet').value;
        const message = document.getElementById('message').value;
        
        if (!nom || !email || !sujet || !message) {
            Swal.fire({
                icon: 'error',
                title: 'Champs manquants',
                text: 'Veuillez remplir tous les champs obligatoires',
                confirmButtonColor: 'var(--primary-color)'
            });
            return;
        }
        
        // Envoi simulé (remplacer par un vrai envoi AJAX)
        Swal.fire({
            icon: 'success',
            title: 'Message envoyé',
            text: 'Nous avons bien reçu votre message et vous répondrons dans les plus brefs délais.',
            confirmButtonColor: 'var(--primary-color)'
        });
        
        contactForm.reset();
    });
    
    // Animation des cartes de l'équipe
    const membreCards = document.querySelectorAll('.membre-card');
    
    membreCards.forEach((card, index) => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
        card.style.transition = `all 0.5s ease ${index * 0.1}s`;
        
        setTimeout(() => {
            card.style.opacity = 1;
            card.style.transform = 'translateY(0)';
        }, 500 + (index * 100));
    });
    
    // Interaction avec la carte de contact
    const infoCards = document.querySelectorAll('.info-card');
    
    infoCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.05)';
        });
    });
    
    // Initialisation de la carte Google Maps
    if (typeof google !== 'undefined') {
        initMap();
    } else {
        // Chargement asynchrone de l'API Google Maps
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=VOTRE_CLE_API&callback=initMap`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
    }
    
    window.initMap = function() {
        const position = { lat: 0.394854, lng: 9.456309 }; // Coordonnées de la pharmacie
        const map = new google.maps.Map(document.querySelector('.map-container'), {
            zoom: 15,
            center: position,
            styles: [
                {
                    "featureType": "poi.medical",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#2a7f62"
                        }
                    ]
                }
            ]
        });
        
        new google.maps.Marker({
            position: position,
            map: map,
            title: 'Pharmacie Sainte Marie',
            icon: {
                url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
            }
        });
    };
});