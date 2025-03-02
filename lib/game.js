import DialogSystem from './dialog.js';
import AudioManager from './audio.js';
import ButtonManager from './button.js';
import ImageManager from './image.js';
import { loadSource } from './util.js';

export class Game {
    constructor() {
        this.gameArea = document.querySelector("main");
        this.dialog = new DialogSystem(this.gameArea);
        this.audio = new AudioManager(this.gameArea);
        this.btn = new ButtonManager(this.gameArea);
        this.img = new ImageManager(this.gameArea);
        this.background = null;
    }

    setBackground(src) {
        this.background = this.gameArea.appendChild(document.createElement("img"));
        this.background.id = "bg";
        this.background.src = src;
        return this.background;
    }

    async initialize() {
        this.dialog.setSpeaker("Bocchi");
        this.dialog.setAppearance("#ffffff");
        await loadSource(this.img, this.audio);
        this.background = this.setBackground("resources/sunset.jpg");
        this.img.setAppearance("Bocchi", {
            width: 300,
            height: 'unset',
            left: 810,
            top: 300
        });
    }

    async waitForClick(eventType = 'click') {
        return new Promise((resolve) => {
            const handler = () => {
                this.gameArea.removeEventListener(eventType, handler);
                resolve();
            };
            this.gameArea.addEventListener(eventType, handler);
        });
    }

    setupChoices(texts = []) {
        this.btn.clearButton();
        texts.forEach(choice => {
            this.btn.addButton(choice.value, choice.text)
        })
    }

    async readStory(src){
        try{
            const response = await fetch(src);
            const sources = await response.text();
            const texts = sources.split(/\r\n|\n/);
            for(let text of texts){
                this.dialog.readWords(text);
                await this.waitForClick();
            }
        }catch(err){
            console.error(err);
        }
    }

    async startDialogue() {
        await this.waitForClick();
        this.audio.audPlay("song", 0, 0);

        this.dialog.show();
        this.img.showImg("Bocchi");
        await this.readStory('story/preface.txt')

        this.setupChoices([
            { value: "So far, so good..", text: "Fine" },
            { value: "Not quite so well.", text: "Bad" }
        ]);
        let response = await this.btn.showButton();

        this.dialog.setSpeaker("Player");
        this.dialog.readWords(response);

        await this.waitForClick('dblclick');
        this.dialog.hide();
    }

    async start() {
        await this.initialize();
        await this.startDialogue();
    }
}