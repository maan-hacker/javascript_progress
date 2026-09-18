document.addEventListener('DOMContentLoaded', () => {
    const left = document.querySelector('.left');
    const right = document.querySelector('.right');
    const container = document.querySelector('.container');

    if (left && right && container) {
        left.addEventListener('mouseenter', () => {
            container.classList.add('hover-left');
            container.classList.add('hover-right');
        });

        right.addEventListener('mouseenter', () => {
            container.classList.add('hover-right');
            container.classList.remove('hover-left');
        });

        left.addEventListener('mouseleave', () => {
            container.classList.remove('hover-right');
        })
    }
})