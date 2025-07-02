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

document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.produits-slider');
    const slides = document.querySelectorAll('.produit-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dotsContainer = document.querySelector('.carousel-dots');
    
    let currentIndex = 0;
    let slideWidth = slides[0].offsetWidth + 20; // 20px pour le gap
    let slidesPerView = Math.floor(slider.offsetWidth / slideWidth);
    
    // Créer les dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('carousel-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.carousel-dot');
    
    // Fonction pour aller à un slide spécifique
    function goToSlide(index) {
        currentIndex = index;
        slider.scrollTo({
            left: index * slideWidth,
            behavior: 'smooth'
        });
        updateDots();
    }
    
    // Fonction pour mettre à jour les dots actifs
    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Bouton précédent
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = slides.length - slidesPerView;
        }
        goToSlide(currentIndex);
    });
    
    // Bouton suivant
    nextBtn.addEventListener('click', () => {
        if (currentIndex < slides.length - slidesPerView) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        goToSlide(currentIndex);
    });
    
    // Mise à jour responsive
    function updateSlideWidth() {
        slideWidth = slides[0].offsetWidth + 20;
        slidesPerView = Math.floor(slider.offsetWidth / slideWidth);
    }
    
    window.addEventListener('resize', updateSlideWidth);
    
    // Détection du scroll pour mettre à jour les dots
    slider.addEventListener('scroll', () => {
        const newIndex = Math.round(slider.scrollLeft / slideWidth);
        if (newIndex !== currentIndex) {
            currentIndex = newIndex;
            updateDots();
        }
    });
});