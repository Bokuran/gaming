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