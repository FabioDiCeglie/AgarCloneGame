let wHeight = window.innerHeight;
let wWidth = window.innerWidth;

//canvas element needs to be in a variable
const canvas = document.querySelector('#the-canvas');
//context is how we draw! We will be drawing in 2d
const context = canvas.getContext('2d')
//set the canvas height and width to = window height and width
canvas.height = wHeight;
canvas.width = wWidth;
const player = {};

const loginModal = new bootstrap.Modal(document.querySelector('#loginModal'));
const spawnModal = new bootstrap.Modal(document.querySelector('#spawnModal'));


window.addEventListener('load', () => {
    loginModal.show()
});

document.querySelector('.name-form').addEventListener('submit', (e) => {
    e.preventDefault();
    player.name = document.querySelector('#name-input').value;
    loginModal.hide()
    spawnModal.show()
})