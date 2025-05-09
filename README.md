# Graduation Game Project

## Overview
The Graduation Game Project is an interactive visual novel built with JavaScript, HTML, and CSS. It features a dynamic dialog system, branching storylines, character affinity tracking, and a rhythm mini-game. The project is designed to provide an engaging, extensible experience for players and developers alike.

## Features
- **Dynamic Dialog System**: Character dialogs with a typing effect and conversation log.
- **Affinity System**: Tracks player relationships with characters based on choices.
- **Interactive Choices**: Player decisions influence the storyline and character affinity.
- **Audio Management**: Background music and sound effects with volume and fade controls.
- **Image Management**: Handles character sprites, backgrounds, and image animations.
- **Save and Load**: Automatic progress saving and the ability to continue from the last session.
- **Customizable Storylines**: Easily extendable via JSON files.
- **Rhythm Mini-Game**: Includes a drum rhythm game as part of the story.

## File Structure
- **`main.html`**: Main entry point of the game.
- **`style/main.css`**: Game UI styles.
- **`script/main.js`**: Game initialization and UI logic.
- **`script/lib/`**: Modular classes for game systems:
  - `game.js`: Core game logic.
  - `dialog.js`: Dialog display and log management.
  - `button.js`: Interactive button handling.
  - `image.js`: Character and background image management.
  - `audio.js`: Audio playback and effects.
  - `util.js`: Resource loading utilities.
- **`script/custom/`**: Custom mini-games (e.g., `drum.js` for the rhythm game).
- **`resources/`**: Game assets and configuration:
  - `mainStory.json`: Storyline definitions.
  - `audio.json`: Audio resource list.
  - `image.json`: Image resource list.
- **`assets/`**: Icons and profile images.

## Main Classes & Methods

### Game (`game.js`)
- `toggleGamePause()`: Pause/resume the game.
- `waitForResume()`: Wait for the game to resume if paused.
- `setBackgroundImage(src)`: Set or update the background image.
- `setStage(bgm, background, figures)`: Configure the stage with music, background, and characters.
- `waitForUser()`: Wait for user interaction (click or space).
- `setupChoices(choices)`: Display choice buttons.
- `getChoice(choices)`: Await and return the user's choice.
- `saveProgress(ans, line)`: Save current progress to local storage.
- `playStory(ans, line, storyResources)`: Play a story segment.
- `initialize(chapter, data)`: Initialize game state and load resources.
- `ending()`: End the game and clear progress.
- `startloop(chapter, data)`: Main story loop.

### DialogSystem (`dialog.js`)
- `createLog(text, speaker)`: Add a dialog log entry.
- `showLog()`: Toggle the dialog log display.
- `readSavedLog(log)`: Load and display saved logs.
- `readWords(text)`: Typing effect for dialog text.
- `setText(text)`: Set dialog box text.
- `setSpeaker(speaker)`: Set the current speaker.
- `setAppearance(color)`: Set dialog text color.
- `show() / hide()`: Show or hide the dialog box.

### ButtonManager (`button.js`)
- `addButton(info, text)`: Add a button.
- `showButton()`: Display buttons and handle selection.
- `clearButton(name)`: Remove buttons.

### AudioManager (`audio.js`)
- `addAudio(name, src)`: Add an audio element.
- `setVolume(volume)`: Set global audio volume.
- `audPlay(name, time, fade)`: Play audio with optional duration/fade.
- `audStop(name, fade)`: Stop audio with optional fade.
- `fadeIn(audio, duration)`: Fade in audio.
- `fadeOut(audio, duration)`: Fade out audio.

### ImageManager (`image.js`)
- `getImg(name, src)`: Get or create an image element.
- `showImg(name) / hideImg(name)`: Show or hide an image.
- `setAppearance(name, { left, top, zIndex, width, height })`: Set image position and size.
- `move(name, deltaX, deltaY, time)`: Animate image movement.
- `scale(name, w, h, time)`: Animate image scaling.
- `skew(name, angleX, angleY, time)`: Animate image skew.
- `rotate(name, angle, time)`: Animate image rotation.

### Utility (`util.js`)
- `loadSource(img, aud)`: Load image and audio resources from JSON.

## How to Run
1. Clone or download the repository.
2. Open `main.html` in your web browser.
3. Click "START" to begin the game.

## How to Extend

### Add New Characters
1. Add the character's image to `resources/img/`.
2. Update `resources/image.json` with the character's name and image path.

### Add New Storylines
1. Edit `resources/mainStory.json` to add new story nodes.
2. Define texts, choices, and properties for each node.

### Add New Audio
1. Add audio files to `resources/aud/`.
2. Update `resources/audio.json` with the audio name and file path.

## Controls

- **Mouse**: Click to interact with dialogs and buttons.
- **Keyboard**:
  - `Space`: Progress through dialogs.
  - `Escape`: Pause the game and return to the landing screen.
  - `L`: Toggle the dialog log.
  - `` ` ``: Clear saved progress.
  - `F` / `J`: Play the drum mini-game (red/blue notes).


## Issues and Plans
- **Settings**:
  - `Sync`: Sync user settings automatically
  - `Save and resume`: Combines the backup files and saved local data
- Landing page:
  - `Profile`:Highlight the characters that's been unlocked
  - `Personalization`: Custom our own playable main character 

## License
This project is for educational purposes. You may modify and use it as a base for your own projects.

## Credits
- **Development**: Kelvin Lin
- **Assets**: All assets are placeholders and should be replaced with original or properly licensed content for distribution.
