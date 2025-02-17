import DialogSystem from '../lib/dialog.js';
import AudioManager from '../lib/audio.js';
import ButtonManager from '../lib/button.js';
import ImageManager from '../lib/image.js';
const gameArea = document.querySelector("main");
async function main(){
    const dialog = new DialogSystem(gameArea);
    const audio = new AudioManager(gameArea);
    const btn = new ButtonManager(gameArea);
    const img = new ImageManager(gameArea);
    img.addImg("Bocchi","resources/bocchi.jpg");
    img.setAppearance("Bocchi",{ width:100});
    await img.skew("Bocchi", 50,0,3);
    await img.skew("Bocchi", -50,0,1);
    btn.addButton("123","kk");
    btn.addButton("1234","k2k");
    audio.addAudio("song","resources/Music.mp3");
    await new Promise((r)=>{
        gameArea.addEventListener("click",()=>{
            audio.audPlay("song",0,0);r()})
    })
    dialog.show();
    await dialog.readWords("gameArea append Child(dia  log.elem ts.box);");
    window.alert(await btn.showButton());
    dialog.hide();
}
main();