// Produits.js
document.addEventListener('DOMContentLoaded', function() {
    // Filtrage des produits
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.produit-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Retire la classe active de tous les boutons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Ajoute la classe active au bouton cliqué
            button.classList.add('active');
            
            const category = button.dataset.category;
            
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
    
    // Animation des cartes de produits
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    productCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.5s ease, transform 0.5s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Gestion du panier (simplifiée)
    const addToCartButtons = document.querySelectorAll('.btn-ajouter');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.produit-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('.prix-actuel').textContent;
            
            // Ici vous pourriez ajouter la logique pour ajouter au panier
            Swal.fire({
                icon: 'success',
                title: 'Produit ajouté',
                html: `<strong>${productName}</strong><br>${productPrice}`,
                confirmButtonColor: 'var(--primary-color)',
                timer: 1500
            });
        });
    });
});