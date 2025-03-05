import DialogSystem from './dialog.js';
import AudioManager from './audio.js';
import ButtonManager from './button.js';
import ImageManager from './image.js';
import { loadSource } from './util.js';

export class Game {
    constructor() {
        this.gameArea = document.querySelector("main").appendChild(document.createElement("div"));
        this.gameArea.id = "gameArea";
        this.managers = {
            dialog: new DialogSystem(this.gameArea),
            audio: new AudioManager(this.gameArea),
            button: new ButtonManager(this.gameArea),
            image: new ImageManager(this.gameArea)
        };
        this.stageFigures = new Map();
        this.background = null;
        this.isPaused = false;
        this.pauseResolve = null;
    }

    togglePause() {
        this.isPaused = !this.isPaused;
        if (!this.isPaused && this.pauseResolve) {
            this.pauseResolve();
            this.pauseResolve = null;
        }
    }

    async waitForResume() {
        if (!this.isPaused) return;
        return new Promise(resolve => {
            this.pauseResolve = resolve;
        });
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

    async initialize(bgm, background, figures) {
        this.managers.audio.audPlay(bgm, 0, 0);
        this.setBackground(background);
        this.setStage(figures);
        await this.managers.dialog.readWords('');
    }

    async waitForClick(eventType = 'click') {
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

    async getChoice(choices) {
        return new Promise(async (resolve) => {
            this.setupChoices(choices);
            const response = await this.managers.button.showButton();
            this.managers.dialog.setSpeaker("Player");
            resolve(response);
        })
    }

    async playStory({ texts, bgm, background, figures, choices }) {
        const { image, dialog } = this.managers;
        const actions = {
            button: async () => {
                await dialog.readWords(await this.getChoice(choices[ansCount]));
                ansCount += 1;
            },
            default: () => { }
        }

        await this.initialize(bgm, background, figures);
        let ansCount = 0;
        dialog.show();
        [...this.stageFigures.values()].forEach(src => image.showImg(src));

        for (const [speaker, words] of texts) {
            if (this.isPaused) {
                await this.waitForResume();
                await this.waitForClick();
            }
            if (speaker === "system") {
                await (actions[words] || actions["default"])();
            } else {
                dialog.setSpeaker(speaker);
                await dialog.readWords(words);
            }
            await this.waitForClick();
        }
    }

    async start() {
        this.managers.dialog.setAppearance("#ffffff");
        await loadSource(this.managers.image, this.managers.audio);
        try {
            const response = await fetch('story/mainStory.json');
            const stories = await response.json();

            for (const story of Object.values(stories)) {
                await this.playStory(story);
            }

            for (const [, src] of this.stageFigures) {
                this.managers.image.hideImg(src);
            }
            this.managers.dialog.hide();
        } catch (error) {
            console.error('Failed to load or play story:', error);
        }
    }
}