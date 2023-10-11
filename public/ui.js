let wHeight = window.innerHeight;
let wWidth = window.innerWidth;

const canvas = document.querySelector('#the-canvas');
const context = canvas.getContext('2d')

canvas.height = wHeight;
canvas.width = wWidth;

window.addEventListener('load', () => {
    const loginModal = new bootstrap.Modal(document.querySelector('#loginModal'));
    loginModal.show()
})