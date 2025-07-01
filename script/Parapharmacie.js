// PARAPHARMACIE PAGE
document.addEventListener('DOMContentLoaded', function() {
    // Slider produits phares
    const slider = document.querySelector('.produits-slider');
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.style.cursor = 'grabbing';
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.style.cursor = 'grab';
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.style.cursor = 'grab';
    });

    slider.addEventListener('mousemove', (e) => {
        if(!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
    });

    // Boutons favoris
    const favButtons = document.querySelectorAll('.btn-favori');
    
    favButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            this.innerHTML = this.innerHTML.includes('far') ? 
                '<i class="fas fa-heart"></i>' : 
                '<i class="far fa-heart"></i>';
            
            const productCard = this.closest('.produit-card');
            const productName = productCard.querySelector('h3').textContent;
            
            if (this.innerHTML.includes('fas')) {
                Swal.fire({
                    icon: 'success',
                    title: 'Ajouté aux favoris',
                    text: `${productName} a été ajouté à votre liste de favoris`,
                    confirmButtonColor: 'var(--primary-color)',
                    timer: 1500
                });
            }
        });
    });
    
    // Animation des catégories
    const categories = document.querySelectorAll('.category-large, .category-small');
    
    categories.forEach(cat => {
        cat.style.transform = 'scale(0.95)';
        cat.style.transition = 'all 0.5s ease';
        
        cat.addEventListener('mouseenter', () => {
            cat.style.transform = 'scale(1)';
        });
        
        cat.addEventListener('mouseleave', () => {
            cat.style.transform = 'scale(0.95)';
        });
    });
});