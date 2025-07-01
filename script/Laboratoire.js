// LABORATOIRE PAGE
document.addEventListener('DOMContentLoaded', function() {
    // Animation des cartes d'analyses
    const analyseCards = document.querySelectorAll('.analyse-card');
    
    analyseCards.forEach((card, index) => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
        card.style.transition = `all 0.5s ease ${index * 0.1}s`;
        
        setTimeout(() => {
            card.style.opacity = 1;
            card.style.transform = 'translateY(0)';
        }, 500 + (index * 100));
    });
    
    // Tooltip pour les avantages RDV
    const avantages = document.querySelectorAll('.avantage');
    
    avantages.forEach(av => {
        av.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            icon.style.transform = 'scale(1.2)';
            icon.style.transition = 'all 0.3s ease';
        });
        
        av.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            icon.style.transform = 'scale(1)';
        });
    });
    
    // Bouton RDV
    const rdvBtn = document.querySelector('.rdv-content .btn');
    
    rdvBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        Swal.fire({
            title: 'Prendre rendez-vous',
            html: `
                <p>Vous allez être redirigé vers notre système de rendez-vous en ligne.</p>
                <p><strong>Important :</strong> N'oubliez pas d'apporter votre ordonnance le jour du rendez-vous.</p>
            `,
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: 'var(--primary-color)',
            cancelButtonColor: '#999',
            confirmButtonText: 'Continuer',
            cancelButtonText: 'Annuler'
        }).then((result) => {
            if (result.isConfirmed) {
                // Redirection vers la page de RDV
                window.location.href = '/prendre-rdv';
            }
        });
    });
});