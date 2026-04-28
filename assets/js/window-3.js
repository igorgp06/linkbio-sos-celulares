const galleryToggle = document.querySelector('.gallery-toggle-btn');
const galleryContent = document.querySelector('.gallery-content');

if (galleryToggle) {
    galleryToggle.addEventListener('click', () => {
        galleryContent.classList.toggle('expanded');
        galleryToggle.classList.toggle('expanded');
    });
}

const galleryImages = document.querySelectorAll('.gallery-item img');
const modal = document.querySelector('.gallery-modal');
const modalImg = document.querySelector('.modal-img');
const modalDescription = document.querySelector('.modal-description');
const closeModal = document.querySelector('.modal-close');
const prevBtn = document.querySelector('.modal-prev');
const nextBtn = document.querySelector('.modal-next');

let currentImageIndex = 0;

function openModal(index) {
    currentImageIndex = index;
    const imageElement = galleryImages[index];
    const alt = imageElement.alt;
    const src = imageElement.src;
    const body = document.body;
    const description = imageElement.closest('.gallery-item').dataset.description || 'Clique nas setas para navegar';

    modalImg.src = src;
    modalImg.alt = alt;
    modalDescription.textContent = description;
    modal.classList.add('active');
    body.style.overflow = 'hidden';
}

function closeModalHandler() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    const imageElement = galleryImages[currentImageIndex];
    const alt = imageElement.alt;
    const src = imageElement.src;
    const description = imageElement.closest('.gallery-item').dataset.description || 'Clique nas setas para navegar';

    modalImg.src = src;
    modalImg.alt = alt;
    modalDescription.textContent = description;
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    const imageElement = galleryImages[currentImageIndex];
    const alt = imageElement.alt;
    const src = imageElement.src;
    const description = imageElement.closest('.gallery-item').dataset.description || 'Clique nas setas para navegar';

    modalImg.src = src;
    modalImg.alt = alt;
    modalDescription.textContent = description;
}

galleryImages.forEach((img, index) => {
    img.addEventListener('click', () => openModal(index));
});

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
    if (!modal.classList.contains('active')) return;

    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'Escape') closeModalHandler();
});
