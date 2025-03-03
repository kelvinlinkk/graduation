import DialogSystem from './dialog.js';
import AudioManager from './audio.js';
import ButtonManager from './button.js';
import ImageManager from './image.js';
import { loadSource } from './util.js';

export class Game {
    constructor() {
        this.gameArea = document.querySelector("main");
        this.managers = {
            dialog: new DialogSystem(this.gameArea),
            audio: new AudioManager(this.gameArea),
            button: new ButtonManager(this.gameArea),
            image: new ImageManager(this.gameArea)
        };
        this.stageFigures = new Map();
        this.background = null;
        this.isPaused = false;
    }

    setBackground(src) {
        if (this.background) {
            this.background.src = src;
            return this.background;
        }
        this.background = Object.assign(document.createElement("img"), {
            id: "bg",
            src: src
        });
        this.gameArea.appendChild(this.background);
        return this.background;
    }

    async initialize() {
        this.managers.dialog.setAppearance("#ffffff");
        await loadSource(this.managers.image, this.managers.audio);
    }

    async waitForClick(eventType = 'click') {
        if (this.isPaused) return;
        return new Promise(resolve => {
            const handler = () => {
                this.gameArea.removeEventListener(eventType, handler);
                resolve();
            };
            this.gameArea.addEventListener(eventType, handler);
        });
    }

    setupChoices(choices = []) {
        this.managers.button.clearButton();
        choices.forEach(({ value, text }) => 
            this.managers.button.addButton(value, text)
        );
    }

    setStage(figures = []) {
        if (!figures.length) return;
        
        this.stageFigures.clear();
        figures.forEach(({ name, src }) => {
            this.stageFigures.set(name, src);
            this.managers.image.setAppearance(src, {
                width: '',
                height: 960,
                left: 810,
                top: 60
            });
        });
    }

    async readStory(texts) {
        const { dialog } = this.managers;
        for (const [speaker, words] of texts) {
            dialog.setSpeaker(speaker);
            dialog.readWords(words);
            await this.waitForClick();
        }
    }

    async playStory({ texts, bgm, background, figures, choices }) {
        const { audio, image, button, dialog } = this.managers;

        audio.audPlay(bgm, 0, 0);
        this.setBackground(background);
        this.setStage(figures);
        dialog.show();

        // Show all figures
        for (const [, src] of this.stageFigures) {
            image.showImg(src);
        }

        await this.readStory(texts);

        if (choices.length) {
            this.setupChoices(choices);
            const response = await button.showButton();
            dialog.setSpeaker("Player");
            dialog.readWords(response);
        }

        // Hide all figures
        for (const [, src] of this.stageFigures) {
            image.hideImg(src);
        }
    }

    async start() {
        await this.initialize();
        try {
            const response = await fetch('story/mainStory.json');
            const stories = await response.json();
            
            for (const story of Object.values(stories)) {
                await this.playStory(story);
                await this.waitForClick();
            }
            this.managers.dialog.hide();
        } catch (error) {
            console.error('Failed to load or play story:', error);
        }
    }
}