// Ajoutez ce code au début du fichier script.js (avant le DOMContentLoaded)

// Création des bulles animées
function createBubbles() {
    const bubbleCount = 15;
    const body = document.body;
    
    for (let i = 0; i < bubbleCount; i++) {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        
        // Taille aléatoire entre 20px et 100px
        const size = Math.random() * 80 + 20;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        
        // Position aléatoire
        bubble.style.left = `${Math.random() * 100}vw`;
        bubble.style.bottom = `-${size}px`;
        
        // Animation avec durée aléatoire
        const duration = Math.random() * 30 + 20;
        bubble.style.animationDuration = `${duration}s`;
        
        // Délai aléatoire
        bubble.style.animationDelay = `${Math.random() * 10}s`;
        
        body.appendChild(bubble);
    }
}

// Appelez cette fonction lorsque le DOM est chargé
document.addEventListener('DOMContentLoaded', function() {
    createBubbles();
    
    // Le reste de votre code existant...
});

document.addEventListener('DOMContentLoaded', function() {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const filePreview = document.getElementById('filePreview');
    const fileName = document.getElementById('fileName');
    const previewImage = document.getElementById('previewImage');
    const form = document.getElementById('ordonnanceForm');
    
    // Gestion du clic sur la zone d'upload
    uploadArea.addEventListener('click', () => fileInput.click());
    
    // Gestion du changement de fichier
    fileInput.addEventListener('change', function() {
        if (this.files && this.files[0]) {
            const file = this.files[0];
            fileName.textContent = file.name;
            
            // Afficher l'aperçu pour les images
            if (file.type.match('image.*')) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    previewImage.src = e.target.result;
                }
                reader.readAsDataURL(file);
                filePreview.style.display = 'block';
            } else {
                previewImage.style.display = 'none';
                filePreview.style.display = 'block';
            }
            
            uploadArea.style.borderColor = 'var(--primary-color)';
        }
    });
    
    // Drag and drop
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, preventDefaults, false);
        document.body.addEventListener(eventName, preventDefaults, false);
    });
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    ['dragenter', 'dragover'].forEach(eventName => {
        uploadArea.addEventListener(eventName, highlight, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, unhighlight, false);
    });
    
    function highlight() {
        uploadArea.style.borderColor = 'var(--primary-color)';
        uploadArea.style.backgroundColor = 'rgba(42, 127, 98, 0.05)';
    }
    
    function unhighlight() {
        uploadArea.style.borderColor = '#ddd';
        uploadArea.style.backgroundColor = 'transparent';
    }
    
    uploadArea.addEventListener('drop', handleDrop, false);
    
    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        fileInput.files = files;
        
        if (files.length > 0) {
            fileInput.dispatchEvent(new Event('change'));
        }
    }
    
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
        
        // Ici vous ajouteriez la logique d'envoi vers votre backend
        // Par exemple avec fetch() ou AJAX
        
        Swal.fire({
            icon: 'success',
            title: 'Ordonnance envoyée',
            text: 'Nous avons bien reçu votre ordonnance et la traiterons dans les plus brefs délais.',
            confirmButtonColor: 'var(--primary-color)'
        }).then(() => {
            form.reset();
            filePreview.style.display = 'none';
            uploadArea.innerHTML = `
                <i class="fas fa-cloud-upload-alt upload-icon"></i>
                <p class="upload-text">Glissez-déposez votre ordonnance ici</p>
                <p class="upload-hint">ou cliquez pour sélectionner un fichier</p>
            `;
        });
    });
});

