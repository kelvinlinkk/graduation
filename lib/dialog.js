class DialogSystem {
    constructor(main) {
        this.elements = {
            box: this.createElement("div", { id: "dialogbox" }),
            textArea: this.createElement("p", { id: "dialogText" })
        };
        this.status = {
            speaker: "",
            isLocked: false,
            text: "",
            display: false,
        };
        this.elements.box.appendChild(this.elements.textArea);
        main.appendChild(this.elements.box);
    }

    createElement(tag, attributes) {
        const element = document.createElement(tag);
        Object.assign(element, attributes);
        return element;
    }

    async readWords(text) {
        const words = text.split("");
        let showWords = "";

        for (const word of words) {
            showWords += word;
            await this.delay(10);
            this.setText(showWords);
        }
        this.status.isLocked = false;
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    setText(text) {
        this.status.text = text;
        this.elements.textArea.innerHTML = text;
    }

    show() {
        this.elements.box.style.display = "initial";
        this.status.display = true;
    }

    hide() {
        this.elements.box.style.display = "none";
        this.status.display = false;
    }
}

export default DialogSystem;