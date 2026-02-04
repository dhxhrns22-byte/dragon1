import { Game } from './game.js';
import { InputHandler } from './input.js';

window.addEventListener('load', () => {
    const canvas = document.getElementById('game-canvas');
    const log = document.getElementById('message-log');
    
    // UI Refs
    const uiRefs = { log };

    const game = new Game(canvas, uiRefs);
    const input = new InputHandler(canvas, game);

    // Button wiring
    document.getElementById('btn-trap').addEventListener('click', () => game.setBuildType('trap'));
    document.getElementById('btn-monster').addEventListener('click', () => game.setBuildType('monster'));
    document.getElementById('btn-resource').addEventListener('click', () => game.setBuildType('resource'));

    // Start
    game.start();
});
