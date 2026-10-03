import './style.scss'

/* ---------- Меню ---------- */
const menuBtn = document.querySelector('.menu__btn');
const menu = document.querySelector('.menu__list');

menuBtn.addEventListener('click', () => {
    menu.classList.toggle('open');
});

/* ---------- Видео-модалка ---------- */
const preview = document.getElementById('videoPreview');
const modal = document.getElementById('videoModal');
const container = document.getElementById('videoContainer');

preview.addEventListener('click', () => {
    container.innerHTML = `
    <iframe 
      width="100%" 
      height="100%" 
      src="https://www.youtube.com/embed/m_nlLmWRj_k?autoplay=1" 
      frameborder="0" 
      allow="autoplay; encrypted-media" 
      allowfullscreen>
    </iframe>`;
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

/* ---------- Слайдер отзывов (swiper) ---------- */
document.addEventListener('DOMContentLoaded', () => {
    const swiperItemsContainer = document.querySelector('.swiper__items');
    const swiperItems = document.querySelectorAll('.swiper__item');
    const navButtons = document.querySelectorAll('.swiper__nav-buttons .swiper__nav-btn-wrapper');
    const pagination = document.querySelector('.swiper__nav-pagination');

    if (!swiperItems.length || navButtons.length < 2) return;

    const prevBtn = navButtons[0];
    const nextBtn = navButtons[1];
    const prevImg = prevBtn.querySelector('.swiper__nav-button');
    const nextImg = nextBtn.querySelector('.swiper__nav-button');

    let currentIndex = 0;
    const totalSlides = swiperItems.length;

    /* --- Автоматический подсчёт количества видимых слайдов --- */
    function getVisibleCount() {
        const viewportWidth = swiperItemsContainer.parentElement.getBoundingClientRect().width;
        const itemWidth = swiperItems[0].getBoundingClientRect().width;
        const gap = parseFloat(getComputedStyle(swiperItemsContainer).gap) || 0;

        // Формула: сколько карточек + отступов влезает в ширину окна
        return Math.max(1, Math.round((viewportWidth + gap) / (itemWidth + gap)));
    }

    /* --- Автоматический подсчёт gap --- */
    function getGap() {
        return parseFloat(getComputedStyle(swiperItemsContainer).gap) || 0;
    }

    /* --- Генерируем точки пагинации --- */
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

    const dots = pagination.querySelectorAll('.swiper__nav-dot');

    /* --- Функция обновления --- */
    function updateSlider() {
        const visibleSlides = getVisibleCount(); // <-- динамически

        // Сдвиг дорожки
        const shiftIndex = Math.max(0, currentIndex - (visibleSlides - 1));
        const itemWidth = swiperItems[0].getBoundingClientRect().width;
        const gap = getGap(); // <-- автоматический gap

        swiperItemsContainer.style.transform =
            `translateX(-${shiftIndex * (itemWidth + gap)}px)`;

        // Активная карточка
        swiperItems.forEach((item, i) => {
            item.classList.toggle('swiper__active', i === currentIndex);
        });

        // Активная точка пагинации
        dots.forEach((dot, i) => {
            dot.classList.toggle('swiper__nav-dot--active', i === currentIndex);
        });

        // Кнопки
        const isAtStart = currentIndex === 0;
        const isAtEnd = currentIndex === totalSlides - 1;

        prevImg.classList.toggle('swiper__nav-button-active', isAtStart);
        prevBtn.disabled = isAtStart;

        nextImg.classList.toggle('swiper__nav-button-active', isAtEnd);
        nextBtn.disabled = isAtEnd;
    }

    updateSlider();

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

    // При ресайзе — пересчитываем и обновляем
    window.addEventListener('resize', () => {
        // Если карточки стали шире и currentIndex "улетел" за пределы — корректируем
        const visibleSlides = getVisibleCount();
        const maxIndex = totalSlides - visibleSlides;
        if (currentIndex > maxIndex) {
            currentIndex = Math.max(0, maxIndex);
        }
        updateSlider();
    });
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