// CLICK & COLLECT PAGE
document.addEventListener('DOMContentLoaded', function() {
    // Filtrage des produits
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.produit-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Active le bouton cliqué
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.dataset.category;
            
            // Filtre les produits
            productCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Ajout au panier
    const addToCartBtns = document.querySelectorAll('.btn-ajouter');
    
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const productCard = this.closest('.produit-card');
            const productName = productCard.querySelector('h3').textContent;
            
            Swal.fire({
                icon: 'success',
                title: 'Produit ajouté',
                text: `${productName} a été ajouté à votre panier`,
                confirmButtonColor: 'var(--primary-color)',
                showCancelButton: true,
                cancelButtonText: 'Continuer mes achats',
                confirmButtonText: 'Voir mon panier'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = '/panier';
                }
            });
        });
    });
    
    // Animation des produits au scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    productCards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease';
        observer.observe(card);
    });
});