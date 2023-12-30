$(document).ready(function () {
    const piece1 = document.getElementById('animatedPiece1');
    const piece2 = document.getElementById('animatedPiece2');

    piece2.addEventListener('click', function () {

        piece2.style.animationPlayState = 'paused';
        piece2.style.display = 'none';
        piece2.style.opacity = '0';
        piece1.classList.toggle('hidden');
    });

    const animatedPiece = document.getElementById('animatedPiece1');

    animatedPiece.addEventListener('animationend', () => {
        const elements = document.querySelectorAll('#full');
        elements.forEach(full => {
            full.style.width = '15px';
            full.style.height = '15px';
            full.style.margin = '1px';
            full.style.backgroundColor = '#FF160C';
        });
        const blocks = document.querySelectorAll('.tetris-block');
        blocks.forEach(block => {
            block.style.backgroundColor = '#FF160C';
        });
        const empty = document.querySelectorAll('.empty');
        empty.forEach(block => {
            block.style.backgroundColor = 'transparent';
        })
    });
});