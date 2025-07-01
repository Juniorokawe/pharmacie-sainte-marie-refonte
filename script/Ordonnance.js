document.addEventListener('DOMContentLoaded', function() {
    // Création des bulles adaptées à l'écran
    function createBubbles() {
        const bubbleCount = window.innerWidth < 768 ? 8 : 15;
        const body = document.body;
        
        for (let i = 0; i < bubbleCount; i++) {
            const bubble = document.createElement('div');
            bubble.classList.add('bubble');
            
            // Taille adaptative
            const baseSize = window.innerWidth < 480 ? 15 : 20;
            const size = Math.random() * 60 + baseSize;
            bubble.style.width = `${size}px`;
            bubble.style.height = `${size}px`;
            
            // Position aléatoire
            bubble.style.left = `${Math.random() * 100}vw`;
            bubble.style.bottom = `-${size}px`;
            
            // Animation adaptée
            const baseDuration = window.innerWidth < 768 ? 20 : 30;
            const duration = Math.random() * 20 + baseDuration;
            bubble.style.animationDuration = `${duration}s`;
            bubble.style.animationDelay = `${Math.random() * 5}s`;
            
            body.appendChild(bubble);
        }
    }

    createBubbles();

    // Gestion du formulaire (reste identique mais optimisé pour le tactile)
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const filePreview = document.getElementById('filePreview');
    const fileName = document.getElementById('fileName');
    const previewImage = document.getElementById('previewImage');
    const form = document.getElementById('ordonnanceForm');
    
    // Optimisation pour les événements tactiles
    uploadArea.addEventListener('click', () => fileInput.click());
    uploadArea.style.cursor = 'pointer';
    
    fileInput.addEventListener('change', function() {
        if (this.files && this.files[0]) {
            const file = this.files[0];
            fileName.textContent = file.name.length > 25 
                ? file.name.substring(0, 22) + '...' 
                : file.name;
            
            if (file.type.match('image.*')) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    previewImage.src = e.target.result;
                    previewImage.style.display = 'block';
                }
                reader.readAsDataURL(file);
            } else {
                previewImage.style.display = 'none';
            }
            filePreview.style.display = 'block';
        }
    });
    
    // Soumission du formulaire
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!fileInput.files.length) {
            Swal.fire({
                icon: 'error',
                title: 'Ordonnance manquante',
                text: 'Veuillez ajouter votre ordonnance avant de soumettre le formulaire',
                confirmButtonColor: 'var(--primary-color)'
            });
            return;
        }
        
        // Simulation d'envoi
        Swal.fire({
            icon: 'success',
            title: 'Ordonnance envoyée',
            text: 'Nous avons bien reçu votre ordonnance et la traiterons dans les plus brefs délais.',
            confirmButtonColor: 'var(--primary-color)'
        }).then(() => {
            form.reset();
            filePreview.style.display = 'none';
        });
    });

    // Réinitialisation des bulles lors du redimensionnement
    window.addEventListener('resize', function() {
        document.querySelectorAll('.bubble').forEach(b => b.remove());
        createBubbles();
    });
});