/* ---------- Видео-модалка ---------- */
export function initVideoModal() {
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

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('is-open')) {
            modal.classList.remove('is-open');
            container.innerHTML = '';
            document.body.classList.remove('no-scroll');
        }
    });
}