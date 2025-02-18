import DialogSystem from '../lib/dialog.js';
import AudioManager from '../lib/audio.js';
import ButtonManager from '../lib/button.js';
import ImageManager from '../lib/image.js';
import loadSource from '../lib/util.js';

const gameArea = document.querySelector("main");
const dialog = new DialogSystem(gameArea);
const audio = new AudioManager(gameArea);
const btn = new ButtonManager(gameArea);
const img = new ImageManager(gameArea);

function setBackground(src){
    let background = gameArea.appendChild(document.createElement("img"));
    background.id = "bg";
    background.src = src;
    return background;
}

async function setup(){
    dialog.setSpeaker("John");
    dialog.setAppearance("resources/sunset.jpg","yellow");
    await loadSource(img, audio);
    let background = setBackground("resources/sunset.jpg");
    img.setAppearance("Bocchi",{ width:100});
    return background;
}

async function main(){
    const background = await setup();
    btn.addButton("123","kk");
    btn.addButton("1234","k2k");
    await new Promise((r)=>{
        gameArea.addEventListener("click",()=>{
            audio.audPlay("song",0,0);r()})
    })
    img.showImg("Bocchi");
    await img.skew("Bocchi", -50,0,1);
    dialog.show();
    await dialog.readWords("gameArea append Child(dia  log.elem ts.box);");
    window.alert(await btn.showButton());
    dialog.hide();
}
main();