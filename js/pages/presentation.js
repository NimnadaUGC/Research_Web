let currentSlide = 1;
const totalSlides = 13;

function slidePath(num) {
    return `assets/Initial Research Presntation/Slide${num}.jpeg`;
}

function animateImage(el) {
    if (!el) return;
    el.classList.remove('animate-slide-transition');
    void el.offsetWidth;
    el.classList.add('animate-slide-transition');
}

function refreshViews() {
    const path = slidePath(currentSlide);

    const modalImage = document.getElementById('slideImage');
    const stageImage = document.getElementById('stageImage');
    const presentImage = document.getElementById('presentImage');

    if (modalImage) {
        modalImage.src = path;
        animateImage(modalImage);
    }
    if (stageImage) {
        stageImage.src = path;
        animateImage(stageImage);
    }
    if (presentImage) {
        presentImage.src = path;
        animateImage(presentImage);
    }

    document.getElementById('currentSlide').textContent = currentSlide;
    document.getElementById('stageCurrentSlide').textContent = currentSlide;
    document.getElementById('presentCurrentSlide').textContent = currentSlide;
}

function goToSlide(num) {
    const next = Math.max(1, Math.min(totalSlides, num));
    if (next === currentSlide) return;
    currentSlide = next;
    refreshViews();
}

function openSlideViewer(slideNum) {
    currentSlide = Math.max(1, Math.min(totalSlides, slideNum));
    refreshViews();
    document.getElementById('slideViewer').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeSlideViewer() {
    document.getElementById('slideViewer').classList.remove('active');
    if (!document.getElementById('presentMode').classList.contains('active')) {
        document.body.style.overflow = '';
    }
}

function openPresentMode() {
    refreshViews();
    document.getElementById('presentMode').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closePresentMode() {
    document.getElementById('presentMode').classList.remove('active');
    if (!document.getElementById('slideViewer').classList.contains('active')) {
        document.body.style.overflow = '';
    }
}

function nextSlide() {
    goToSlide(currentSlide + 1);
}

function previousSlide() {
    goToSlide(currentSlide - 1);
}

function downloadSlideshow() {
    alert('Slide pack (ZIP) download feature coming soon. For now, download individual slides manually or get the PowerPoint file.');
}

document.querySelectorAll('.slide-thumb').forEach((thumb) => {
    thumb.addEventListener('click', () => {
        const slideNum = parseInt(thumb.getAttribute('data-slide'), 10);
        openSlideViewer(slideNum);
    });
});

document.addEventListener('keydown', (e) => {
    const modalOpen = document.getElementById('slideViewer').classList.contains('active');
    const presentOpen = document.getElementById('presentMode').classList.contains('active');
    if (!modalOpen && !presentOpen) return;

    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') previousSlide();
    if (e.key === 'Escape') {
        if (presentOpen) {
            closePresentMode();
        } else {
            closeSlideViewer();
        }
    }
});

document.getElementById('slideViewer').addEventListener('click', (e) => {
    if (e.target.id === 'slideViewer') closeSlideViewer();
});

document.getElementById('presentMode').addEventListener('click', (e) => {
    if (e.target.id === 'presentMode') closePresentMode();
});

document.getElementById('totalSlides').textContent = totalSlides;
document.getElementById('stageTotalSlides').textContent = totalSlides;
document.getElementById('presentTotalSlides').textContent = totalSlides;
refreshViews();

document.getElementById('year').textContent = new Date().getFullYear();