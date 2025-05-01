# Graduation Game Project

## Overview
The Graduation Game Project is an interactive visual novel game built using JavaScript, HTML, and CSS. It features a dynamic storytelling system, character interactions, and customizable game mechanics. The project is designed to provide an engaging experience for players through its dialog system, affinity tracking, and branching storylines.

## Features
- **Dynamic Dialog System**: Displays character dialogs with a typing effect and maintains a log of conversations.
- **Affinity System**: Tracks the player's relationship with characters based on choices made during the game.
- **Interactive Choices**: Players can make decisions that influence the storyline and character relationships.
- **Audio Management**: Background music and sound effects with volume control and fade effects.
- **Image Management**: Handles character sprites, background images, and animations like scaling, rotation, and movement.
- **Save and Load**: Automatically saves game progress and allows players to continue from where they left off.
- **Customizable Storylines**: Easily extendable story structure using JSON files.

## File Structure
- **`main.html`**: The main entry point of the game.
- **`style/main.css`**: Contains the styles for the game's UI.
- **`script/main.js`**: Initializes the game and handles UI interactions.
- **`script/lib/`**: Contains modular classes for game systems:
  - `game.js`: Core game logic.
  - `dialog.js`: Manages dialog display and logs.
  - `button.js`: Handles interactive buttons.
  - `image.js`: Manages character and background images.
  - `audio.js`: Controls audio playback and effects.
  - `util.js`: Utility functions for loading resources.
- **`resources/`**: Stores game assets and configuration files:
  - `mainStory.json`: Defines the game's storyline.
  - `audio.json`: Lists audio resources.
  - `image.json`: Lists image resources.

## Methods

### **Game Class (`game.js`)**
- **`toggleGamePause()`**: Toggles the game's pause state and resolves the pause promise when resumed.
- **`waitForResume()`**: Waits for the game to resume if paused.
- **`setBackgroundImage(src)`**: Sets or updates the background image.
- **`setStage(bgm, background, figures)`**: Configures the stage with background music, background image, and character figures.
- **`waitForUser()`**: Waits for user interaction (click or space key).
- **`setupChoices(choices)`**: Configures choice buttons for the user.
- **`getChoice(choices)`**: Displays choices and waits for the user to make a selection.
- **`saveProgress(ans, line)`**: Saves the current game progress to local storage.
- **`playStory(ans, line, storyResources)`**: Plays a story segment based on the provided resources.
- **`initialize(data)`**: Initializes the game with saved data or default settings.
- **`ending()`**: Ends the game and clears progress.
- **`startloop(data)`**: Starts the game loop, progressing through the story.

### **DialogSystem Class (`dialog.js`)**
- **`createElement(tag, attributes)`**: Utility method to create a DOM element with specified attributes.
- **`createLog(text, speaker)`**: Creates a new log entry with the given text and optional speaker.
- **`showLog()`**: Toggles the visibility of the log area.
- **`readSavedLog(log)`**: Reads and displays a saved log from an array of log entries.
- **`readWords(text)`**: Displays text one character at a time with a typing effect.
- **`delay(ms)`**: Utility method to create a delay for a specified number of milliseconds.
- **`setText(text)`**: Sets the text content of the dialog box.
- **`setSpeaker(speaker)`**: Sets the current speaker and updates the name tag.
- **`setAppearance(color)`**: Sets the appearance of the dialog text (e.g., color).
- **`show()`**: Shows the dialog box.
- **`hide()`**: Hides the dialog box.

### **ButtonManager Class (`button.js`)**
- **`createElement(tag, attributes)`**: Utility method to create a DOM element with specified attributes.
- **`addButton(info, text)`**: Adds a new button with the specified class name and text.
- **`showButton()`**: Displays the button area and handles user interaction with buttons.
- **`clearButton(name)`**: Clears buttons from the button area.

### **AudioManager Class (`audio.js`)**
- **`createElement(tag, attributes)`**: Utility method to create a DOM element with specified attributes.
- **`addAudio(name, src)`**: Adds a new audio element with the given name and source URL.
- **`setVolume(volume)`**: Sets the volume for all audio elements.
- **`audPlay(name, time, fade)`**: Plays the specified audio by name, with optional duration and fade-in effect.
- **`audStop(name, fade)`**: Stops the specified audio by name, with an optional fade-out effect.
- **`fadeIn(audio, duration)`**: Gradually increases the volume of the audio over the specified duration.
- **`fadeOut(audio, duration)`**: Gradually decreases the volume of the audio over the specified duration.

### **ImageManager Class (`image.js`)**
- **`createElement(tag, attributes)`**: Utility method to create a DOM element with specified attributes.
- **`getImg(name, src)`**: Retrieves an image element by name or creates a new one if it doesn't exist.
- **`showImg(name)`**: Displays an image element by name.
- **`hideImg(name)`**: Hides an image element by name.
- **`setAppearance(name, { left, top, zIndex, width, height })`**: Sets the appearance of an image element.
- **`move(name, deltaX, deltaY, time)`**: Moves an image element by a specified delta over a given duration.
- **`scale(name, w, h, time)`**: Scales an image element to a specified width and height over a given duration.
- **`skew(name, angleX, angleY, time)`**: Skews an image element by specified angles over a given duration.
- **`rotate(name, angle, time)`**: Rotates an image element by a specified angle over a given duration.

### **Utility Functions (`util.js`)**
- **`loadSource(img, aud)`**: Loads image and audio resources from JSON files.

## How to Run
1. Clone the repository to your local machine.
2. Open `main.html` in a web browser.
3. Start the game by clicking the "START" button.

## How to Extend
### Adding New Characters
1. Add the character's image to the `resources/` folder.
2. Update `resources/image.json` with the character's name and image path.

### Adding New Storylines
1. Edit `resources/mainStory.json` to include new story nodes.
2. Define texts, choices, and other properties for the new storyline.

### Adding New Audio
1. Add the audio file to the `resources/` folder.
2. Update `resources/audio.json` with the audio name and file path.

## Controls
- **Mouse**: Click to interact with dialogs and buttons.
- **Keyboard**:
  - `Space`: Progress through dialogs.
  - `Escape`: Pause the game and return to the landing screen.
  - `L`: Toggle the dialog log.
  - `` ` ``: Clear saved progress.

## License
This project is for educational purposes. Feel free to modify and use it as a base for your own projects.

## Credits
- **Development**: [Your Name]
- **Assets**: All assets used in this project are placeholders and should be replaced with original or properly licensed content for distribution.
