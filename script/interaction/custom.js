export class CustomPlayer {
    constructor() {
        this.container = document.getElementById('custom');
        this.info = { name: "", sex: "", track: "" };
    }

    async show() {
        this.container.style.display = "flex";

        // Get references to existing DOM elements (already in main.html)
        const nameInput = document.getElementById("charName");
        const okBtn = document.getElementById("customOkBtn");
        const previewName = document.getElementById("previewName");
        const previewSex = document.getElementById("previewSex");
        const previewTrack = document.getElementById("previewTrack");

        // Button groups
        const sexBtns = Array.from(document.querySelectorAll("#sexBtns .sex-btn"));
        const trackBtns = Array.from(document.querySelectorAll("#trackBtns .track-btn"));

        // Reset fields
        nameInput.value = "";
        sexBtns.forEach(btn => btn.classList.remove("selected"));
        trackBtns.forEach(btn => btn.classList.remove("selected"));
        previewName.textContent = "Name: Player";
        previewSex.textContent = "Sex: -";
        previewTrack.textContent = "Track: -";
        okBtn.disabled = true;

        let selectedSex = "";
        let selectedTrack = "";

        // Button selection logic
        sexBtns.forEach(btn => {
            btn.onclick = () => {
                sexBtns.forEach(b => b.classList.remove("selected"));
                btn.classList.add("selected");
                selectedSex = btn.dataset.value;
                updatePreview();
                checkValid();
            };
        });
        trackBtns.forEach(btn => {
            btn.onclick = () => {
                trackBtns.forEach(b => b.classList.remove("selected"));
                btn.classList.add("selected");
                selectedTrack = btn.dataset.value;
                updatePreview();
                checkValid();
            };
        });

        // Update preview on input
        const updatePreview = () => {
            previewName.textContent = "Name: " + (nameInput.value.trim() || "Player");
            const sexText = sexBtns.find(b => b.classList.contains("selected"))?.textContent || "-";
            const trackText = trackBtns.find(b => b.classList.contains("selected"))?.textContent || "-";
            previewSex.textContent = "Sex: " + sexText;
            previewTrack.textContent = "Track: " + trackText;
        };
        nameInput.oninput = () => { updatePreview(); checkValid(); };

        // Disable OK button until all fields are filled
        const checkValid = () => {
            okBtn.disabled = !(
                nameInput.value.trim() &&
                selectedSex &&
                selectedTrack
            );
        };
        checkValid();

        nameInput.focus();

        // Await user input (OK button or Enter key)
        return new Promise(resolve => {
            const finish = () => {
                if (okBtn.disabled) return;
                this.info.name = nameInput.value.trim() || "Player";
                this.info.sex = selectedSex;
                this.info.track = selectedTrack;
                this.container.style.display = "none";
                window.removeEventListener('keydown', keyHandler);
                resolve(this.info);
            };
            okBtn.onclick = finish;
            function keyHandler(e) {
                if (e.key === "Enter") finish();
            }
            window.addEventListener('keydown', keyHandler);
        });
    }
}