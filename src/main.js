import './style.scss';

/**
 * Main application initialization
 */
document.addEventListener('DOMContentLoaded', () => {
    initActiveMenu();
    initBurgerMenu();
    initVideoModal();
    initSimpleSliders();
    initReviewsSwiper();
});

/* ---------- Активное меню ---------- */
function initActiveMenu() {
    const menuLinks = document.querySelectorAll('.menu__link');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    menuLinks.forEach(link => {
        const linkPage = link.getAttribute('href')?.split('/').pop();
        const menuItem = link.closest('.menu__item');

        if (menuItem) {
            menuItem.classList.toggle('active', linkPage === currentPage);
        }
    });
}

/* ---------- Меню (бургер) ---------- */
function initBurgerMenu() {
    const menuBtn = document.querySelector('.menu__btn');
    const menu = document.querySelector('.menu__list');

    if (menuBtn && menu) {
        menuBtn.addEventListener('click', () => {
            menu.classList.toggle('open');
        });
    }
}

/* ---------- Видео-модалка ---------- */
function initVideoModal() {
    const preview = document.getElementById('videoPreview');
    const modal = document.getElementById('videoModal');
    const container = document.getElementById('videoContainer');

    if (!preview || !modal || !container) return;

    preview.addEventListener('click', () => {
        // Получаем ID видео из data-атрибута или используем значение по умолчанию
        const videoId = preview.dataset.videoId || 'm_nlLmWRj_k';

        const iframe = document.createElement('iframe');
        iframe.width = '100%';
        iframe.height = '100%';
        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        iframe.frameBorder = '0';
        iframe.allow = 'autoplay; encrypted-media';
        iframe.allowFullscreen = true;

        container.innerHTML = ''; // Очистка
        container.appendChild(iframe);

        modal.classList.add('is-open');
        document.body.classList.add('no-scroll');
    });

    modal.addEventListener('click', (e) => {
        if (e.target.closest('.video-modal__close') || e.target.classList.contains('video-modal__overlay')) {
            modal.classList.remove('is-open');
            container.innerHTML = '';
            document.body.classList.remove('no-scroll');
        }
    });
}

/* ---------- Простой слайдер (About us) ---------- */
function initSimpleSliders() {
    const sliders = document.querySelectorAll('.slider');

    sliders.forEach(slider => {
        const images = slider.querySelectorAll('.slider__img');
        const prevBtn = slider.querySelector('.slider__btn--prev');
        const nextBtn = slider.querySelector('.slider__btn--next');
        const counter = slider.querySelector('.slider__counter');

        if (!images.length || !prevBtn || !nextBtn || !counter) return;

        let currentIndex = 0;
        const totalSlides = images.length;

        function updateSlider() {
            images.forEach((img, index) => {
                img.classList.toggle('active', index === currentIndex);
            });
            counter.textContent = `${currentIndex + 1} of ${totalSlides}`;
        }

        updateSlider();

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateSlider();
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateSlider();
        });
    });
}

/* ---------- Слайдер отзывов (Оптимизированный) ---------- */
function initReviewsSwiper() {
    const swiperItemsContainer = document.querySelector('.swiper__items');
    const swiperItems = document.querySelectorAll('.swiper__item');
    const navButtons = document.querySelectorAll('.swiper__nav-buttons .swiper__nav-btn-wrapper');
    const pagination = document.querySelector('.swiper__nav-pagination');

    if (!swiperItems.length || navButtons.length < 2 || !swiperItemsContainer || !pagination) return;

    const prevBtn = navButtons[0];
    const nextBtn = navButtons[1];
    const prevImg = prevBtn.querySelector('.swiper__nav-button');
    const nextImg = nextBtn.querySelector('.swiper__nav-button');

    let currentIndex = 0;
    const totalSlides = swiperItems.length;

    // Кэш размеров для предотвращения layout thrashing
    let cachedDimensions = {
        itemWidth: 0,
        gap: 0,
        visibleCount: 1
    };

    function cacheDimensions() {
        const gap = parseFloat(getComputedStyle(swiperItemsContainer).gap) || 0;
        const itemWidth = swiperItems[0].getBoundingClientRect().width;
        const viewportWidth = swiperItemsContainer.parentElement.getBoundingClientRect().width;
        const visibleCount = Math.max(1, Math.round((viewportWidth + gap) / (itemWidth + gap)));

        cachedDimensions = { itemWidth, gap, visibleCount };
    }

    function updateSlider() {
        const { itemWidth, gap, visibleCount } = cachedDimensions;
        const shiftIndex = Math.max(0, currentIndex - (visibleCount - 1));

        swiperItemsContainer.style.transform = `translateX(-${shiftIndex * (itemWidth + gap)}px)`;

        swiperItems.forEach((item, i) => {
            item.classList.toggle('swiper__active', i === currentIndex);
        });

        const dots = pagination.querySelectorAll('.swiper__nav-dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('swiper__nav-dot--active', i === currentIndex);
        });

        const isAtStart = currentIndex === 0;
        const isAtEnd = currentIndex === totalSlides - 1;

        prevImg.classList.toggle('swiper__nav-button-active', isAtStart);
        prevBtn.disabled = isAtStart;

        nextImg.classList.toggle('swiper__nav-button-active', isAtEnd);
        nextBtn.disabled = isAtEnd;
    }

    // Инициализация пагинации
    pagination.innerHTML = '';
    swiperItems.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.className = 'swiper__nav-dot';
        if (i === 0) dot.classList.add('swiper__nav-dot--active');
        dot.addEventListener('click', () => {
            currentIndex = i;
            updateSlider();
        });
        pagination.appendChild(dot);
    });

    nextBtn.addEventListener('click', () => {
        if (currentIndex < totalSlides - 1) {
            currentIndex++;
            updateSlider();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });

    window.addEventListener('resize', () => {
        cacheDimensions();
        const { visibleCount } = cachedDimensions;
        const maxIndex = totalSlides - visibleCount;
        if (currentIndex > maxIndex) {
            currentIndex = Math.max(0, maxIndex);
        }
        updateSlider();
    });

    // Первичная настройка
    cacheDimensions();
    updateSlider();
}
