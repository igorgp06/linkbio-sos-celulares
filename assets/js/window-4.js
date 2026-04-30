const galleryToggle = document.querySelector('.gallery-toggle-btn');
const galleryContent = document.querySelector('.gallery-content');

if (galleryToggle) {
    galleryToggle.addEventListener('click', () => {
        galleryContent.classList.toggle('expanded');
        galleryToggle.classList.toggle('expanded');
    });
}

const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
const galleryImages = galleryItems.map((item) => item.querySelector('img'));
const modal = document.querySelector('.gallery-modal');
const modalImg = document.querySelector('.modal-img');
const modalDescription = document.querySelector('.modal-description');
const closeModal = document.querySelector('.modal-close');
const prevBtn = document.querySelector('.modal-prev');
const nextBtn = document.querySelector('.modal-next');

let currentImageIndex = 0;

const imageMeta = galleryItems.map((item, index) => ({
    src: galleryImages[index]?.src || '',
    alt: galleryImages[index]?.alt || 'Imagem da galeria',
    description: item.dataset.description || 'Clique nas setas para navegar'
}));

const imageCache = new Map();
let isSwitchingImage = false;

function preloadImage(src) {
    if (!src || imageCache.has(src)) return;
    const img = new Image();
    img.decoding = 'async';
    img.loading = 'eager';
    img.src = src;
    imageCache.set(src, img);
}

function renderModalImage(index) {
    const image = imageMeta[index];
    if (!image || isSwitchingImage) return;

    isSwitchingImage = true;
    modalImg.src = image.src;
    modalImg.alt = image.alt;
    modalDescription.textContent = image.description;

    const nextIndex = (index + 1) % imageMeta.length;
    const prevIndex = (index - 1 + imageMeta.length) % imageMeta.length;
    preloadImage(imageMeta[nextIndex]?.src);
    preloadImage(imageMeta[prevIndex]?.src);

    requestAnimationFrame(() => {
        isSwitchingImage = false;
    });
}

function openModal(index) {
    currentImageIndex = index;
    renderModalImage(index);
    modal.classList.add('active');
    document.body.style.overflowX = 'hidden';
    document.body.style.overflowY = 'hidden';
}

function closeModalHandler() {
    modal.classList.remove('active');
    document.body.style.overflowX = '';
    document.body.style.overflowY = '';
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    renderModalImage(currentImageIndex);
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    renderModalImage(currentImageIndex);
    modalDescription.textContent = description;
}

galleryImages.forEach((img, index) => {
    if (!img) return;
    img.addEventListener('click', () => openModal(index));
});

if (galleryToggle) {
    galleryToggle.addEventListener('click', () => {
        if (!galleryContent.classList.contains('expanded')) {
            imageMeta.forEach((image) => preloadImage(image.src));
        }
    });
}

if (closeModal) {
    closeModal.addEventListener('click', closeModalHandler);
}

if (prevBtn) {
    prevBtn.addEventListener('click', prevImage);
}

if (nextBtn) {
    nextBtn.addEventListener('click', nextImage);
}

if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModalHandler();
        }
    });
}

document.addEventListener('keydown', (e) => {
    if (!modal) return;
    if (!modal.classList.contains('active')) return;

    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'Escape') closeModalHandler();
});
