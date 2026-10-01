import './style.scss'

const menuBtn = document.querySelector('.menu__btn');
const menu = document.querySelector('.menu__list');

menuBtn.addEventListener('click', () => {
    menu.classList.toggle('open');
});

document.addEventListener('DOMContentLoaded', () => {
    // Находим все слайдеры на странице (вдруг их будет несколько)
    const sliders = document.querySelectorAll('.slider');

    sliders.forEach(slider => {
        const images = slider.querySelectorAll('.slider__img');
        const prevBtn = slider.querySelector('.slider__btn--prev');
        const nextBtn = slider.querySelector('.slider__btn--next');
        const counter = slider.querySelector('.slider__counter');

        let currentIndex = 0;
        const totalSlides = images.length;

        // Функция обновления слайдера
        function updateSlider() {
            // 1. Переключаем класс active у картинок
            images.forEach((img, index) => {
                img.classList.toggle('active', index === currentIndex);
            });

            // 2. Обновляем текст счетчика (например, "1 of 4")
            counter.textContent = `${currentIndex + 1} of ${totalSlides}`;
        }
        updateSlider(); // Сразу запускаем функцию, чтобы счетчик посчитал картинки при загрузке

        // Слушатель для кнопки "Вперед"
        nextBtn.addEventListener('click', () => {
            // Если дошли до конца, возвращаемся в начало (0)
            currentIndex = (currentIndex + 1) % totalSlides;
            updateSlider();
        });

        // Слушатель для кнопки "Назад"
        prevBtn.addEventListener('click', () => {
            // Если на первом слайде, переходим на последний
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateSlider();
        });
    });
});

const preview = document.getElementById('videoPreview');
const modal = document.getElementById('videoModal');
const container = document.getElementById('videoContainer');

preview.addEventListener('click', () => {
    // Вставляем iframe только в момент клика (ленивая загрузка)
    container.innerHTML = `
    <iframe 
      width="100%" 
      height="100%" 
      src="https://www.youtube.com/embed/watch?v=m_nlLmWRj_k&list=RDm_nlLmWRj_k&start_radio=1?autoplay=1" 
      frameborder="0" 
      allow="autoplay; encrypted-media" 
      allowfullscreen>
    </iframe>`;
    modal.classList.add('is-open');
    document.body.classList.add('no-scroll');
});

// Закрытие модалки
modal.addEventListener('click', (e) => {
    if (e.target.closest('.video-modal__close') || e.target.classList.contains('video-modal__overlay')) {
        modal.classList.remove('is-open');
        container.innerHTML = ''; // Очищаем iframe, чтобы видео остановилось
        document.body.classList.remove('no-scroll');
    }
});