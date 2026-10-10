import '@/style.scss';

import { initActiveMenu, initBurgerMenu } from './menu.js';
import { initVideoModal } from './video-modal.js';
import { initSimpleSliders, initReviewsSwiper } from './sliders.js';

document.addEventListener('DOMContentLoaded', () => {
    initActiveMenu();
    initBurgerMenu();
    initVideoModal();
    initSimpleSliders();
    initReviewsSwiper();
});