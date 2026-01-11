// ============================================
// Gallery Initialization
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const totalImages = 24;
    const carouselInner = document.querySelector('#galleryCarousel .carousel-inner');
    const thumbnailsContainer = document.getElementById('galleryThumbnails');
    const lightboxModal = new bootstrap.Modal(document.getElementById('imageLightbox'));
    const lightboxImage = document.getElementById('lightboxImage');
    const currentImageNumber = document.getElementById('currentImageNumber');
    const totalImagesSpan = document.getElementById('totalImages');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    
    let currentImageIndex = 0;
    const images = [];
    
    // Criar array de imagens
    for (let i = 1; i <= totalImages; i++) {
        images.push(`img/${i}.jpeg`);
    }
    
    totalImagesSpan.textContent = totalImages;
    
    // Criar itens do carousel
    images.forEach((imagePath, index) => {
        const isActive = index === 0 ? 'active' : '';
        const carouselItem = document.createElement('div');
        carouselItem.className = `carousel-item ${isActive}`;
        carouselItem.innerHTML = `<img src="${imagePath}" alt="Imagem ${index + 1}" class="d-block w-100">`;
        carouselInner.appendChild(carouselItem);
        
        // Adicionar evento de clique para abrir lightbox
        carouselItem.querySelector('img').addEventListener('click', () => {
            openLightbox(index);
        });
    });
    
    // Criar thumbnails
    images.forEach((imagePath, index) => {
        const col = document.createElement('div');
        col.className = 'col-6 col-md-3 col-lg-2';
        
        const thumbnail = document.createElement('div');
        thumbnail.className = `gallery-thumbnail ${index === 0 ? 'active' : ''}`;
        thumbnail.setAttribute('data-index', index);
        
        const img = document.createElement('img');
        img.src = imagePath;
        img.alt = `Thumbnail ${index + 1}`;
        
        thumbnail.appendChild(img);
        col.appendChild(thumbnail);
        thumbnailsContainer.appendChild(col);
        
        // Eventos do thumbnail
        thumbnail.addEventListener('click', () => {
            // Atualizar carousel
            const carousel = bootstrap.Carousel.getInstance(document.getElementById('galleryCarousel'));
            if (carousel) {
                carousel.to(index);
            } else {
                const newCarousel = new bootstrap.Carousel(document.getElementById('galleryCarousel'));
                newCarousel.to(index);
            }
            
            // Atualizar thumbnails ativos
            document.querySelectorAll('.gallery-thumbnail').forEach(thumb => {
                thumb.classList.remove('active');
            });
            thumbnail.classList.add('active');
            
            // Abrir lightbox
            openLightbox(index);
        });
    });
    
    // Inicializar carousel sem autoplay
    const carouselElement = document.getElementById('galleryCarousel');
    const carousel = new bootstrap.Carousel(carouselElement, {
        interval: false,
        wrap: true,
        keyboard: true
    });
    
    // Atualizar thumbnail ativo quando carousel muda
    carouselElement.addEventListener('slid.bs.carousel', function(event) {
        const activeIndex = event.to;
        currentImageIndex = activeIndex;
        
        // Atualizar thumbnails
        document.querySelectorAll('.gallery-thumbnail').forEach((thumb, index) => {
            if (index === activeIndex) {
                thumb.classList.add('active');
                // Scroll suave para o thumbnail ativo
                thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            } else {
                thumb.classList.remove('active');
            }
        });
    });
    
    // Função para abrir lightbox
    function openLightbox(index) {
        currentImageIndex = index;
        lightboxImage.src = images[index];
        currentImageNumber.textContent = index + 1;
        lightboxModal.show();
    }
    
    // Navegação no lightbox
    lightboxPrev.addEventListener('click', () => {
        navigateLightbox(-1);
    });
    
    lightboxNext.addEventListener('click', () => {
        navigateLightbox(1);
    });
    
    function navigateLightbox(direction) {
        currentImageIndex += direction;
        
        if (currentImageIndex < 0) {
            currentImageIndex = totalImages - 1;
        } else if (currentImageIndex >= totalImages) {
            currentImageIndex = 0;
        }
        
        lightboxImage.src = images[currentImageIndex];
        currentImageNumber.textContent = currentImageIndex + 1;
        
        // Atualizar carousel também
        const carousel = bootstrap.Carousel.getInstance(document.getElementById('galleryCarousel'));
        if (carousel) {
            carousel.to(currentImageIndex);
        }
        
        // Atualizar thumbnails
        document.querySelectorAll('.gallery-thumbnail').forEach((thumb, index) => {
            if (index === currentImageIndex) {
                thumb.classList.add('active');
                // Scroll para o thumbnail visível
                thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
                thumb.classList.remove('active');
            }
        });
    }
    
    // Navegação com teclado
    document.addEventListener('keydown', function(e) {
        const lightboxElement = document.getElementById('imageLightbox');
        if (lightboxElement.classList.contains('show')) {
            if (e.key === 'ArrowLeft') {
                navigateLightbox(-1);
            } else if (e.key === 'ArrowRight') {
                navigateLightbox(1);
            } else if (e.key === 'Escape') {
                lightboxModal.hide();
            }
        }
    });
    
    // Quando lightbox é fechado, atualizar carousel para a imagem atual
    document.getElementById('imageLightbox').addEventListener('hidden.bs.modal', function() {
        const carousel = bootstrap.Carousel.getInstance(document.getElementById('galleryCarousel'));
        if (carousel) {
            carousel.to(currentImageIndex);
        }
    });
});
