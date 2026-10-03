import './style.scss'

/* ---------- Активное меню (автоматически) ---------- */
document.addEventListener('DOMContentLoaded', () => {
    const menuLinks = document.querySelectorAll('.menu__link');
    // Получаем имя текущего файла (например, "about.html")
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    menuLinks.forEach(link => {
        // Получаем имя файла из href ссылки (например, "about.html")
        const linkPage = link.getAttribute('href').split('/').pop();

        // Если совпадает — подсвечиваем родителя <li>
        if (linkPage === currentPage) {
            link.closest('.menu__item')?.classList.add('active');
        } else {
            link.closest('.menu__item')?.classList.remove('active');
        }
    });
});

/* ---------- Меню (бургер) ---------- */
const menuBtn = document.querySelector('.menu__btn');
const menu = document.querySelector('.menu__list');

if (menuBtn && menu) {
    menuBtn.addEventListener('click', () => {
        menu.classList.toggle('open');
    });
}

/* ---------- Видео-модалка ---------- */
const preview = document.getElementById('videoPreview');
const modal = document.getElementById('videoModal');
const container = document.getElementById('videoContainer');

if (preview && modal && container) {
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
}

/* ---------- Простой слайдер (About us) ---------- */
document.addEventListener('DOMContentLoaded', () => {
    const sliders = document.querySelectorAll('.slider');

    sliders.forEach(slider => {
        const images = slider.querySelectorAll('.slider__img');
        const prevBtn = slider.querySelector('.slider__btn--prev');
        const nextBtn = slider.querySelector('.slider__btn--next');
        const counter = slider.querySelector('.slider__counter');

        // Защита: если элементов нет — пропускаем
        if (!images.length || !prevBtn || !nextBtn || !counter) return;

        let currentIndex = 0;
        const totalSlides = images.length;

        function updateSlider() {
            images.forEach((img, index) => {
                img.classList.toggle('active', index === currentIndex);
            });
            counter.textContent = `${currentIndex + 1} of ${totalSlides}`;
        }

        updateSlider(); // Сразу показываем "1 of N"

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateSlider();
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateSlider();
        });
    });
});

/* ---------- Слайдер отзывов (Swiper-кастомный) ---------- */
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

    function getGap() {
        return parseFloat(getComputedStyle(swiperItemsContainer).gap) || 0;
    }

    function getVisibleCount() {
        const viewportWidth = swiperItemsContainer.parentElement.getBoundingClientRect().width;
        const itemWidth = swiperItems[0].getBoundingClientRect().width;
        const gap = getGap();
        return Math.max(1, Math.round((viewportWidth + gap) / (itemWidth + gap)));
    }

    // Генерируем точки пагинации
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

    function updateSlider() {
        const visibleSlides = getVisibleCount();
        const shiftIndex = Math.max(0, currentIndex - (visibleSlides - 1));
        const itemWidth = swiperItems[0].getBoundingClientRect().width;
        const gap = getGap();

        swiperItemsContainer.style.transform =
            `translateX(-${shiftIndex * (itemWidth + gap)}px)`;

        swiperItems.forEach((item, i) => {
            item.classList.toggle('swiper__active', i === currentIndex);
        });

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

    window.addEventListener('resize', () => {
        const visibleSlides = getVisibleCount();
        const maxIndex = totalSlides - visibleSlides;
        if (currentIndex > maxIndex) {
            currentIndex = Math.max(0, maxIndex);
        }
        updateSlider();
    });
});