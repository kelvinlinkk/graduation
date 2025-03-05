import { Game } from '../lib/game.js';

const landing = document.getElementById('landing');
const startbtn = document.getElementById('startbtn');
const game = new Game();
document.addEventListener('keydown',e =>{
    if(e.key === 'Escape'){
        game.togglePause();
    }
})
startbtn.addEventListener('click',async e =>{
    landing.style.display = 'none';
    await game.start();
    landing.style.display = "initial";
})