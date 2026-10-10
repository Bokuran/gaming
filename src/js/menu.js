/* ---------- Активное меню ---------- */
export function initActiveMenu() {
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
export function initBurgerMenu() {
    const menuBtn = document.querySelector('.menu__btn');
    const menu = document.querySelector('.menu__list');

    menuBtn.addEventListener('click', () => {
        const isOpen = menu.classList.toggle('open');
        menuBtn.setAttribute('aria-expanded', isOpen);
    });
}