import { register, entities } from "./ecs.js";
import { Input } from "./input.js";
import { Ai } from "./ai.js";
import { Movement } from "./movement.js";
import { Renderer } from "./render.js";
import addPlayer from "./entities/player.js";
import addMob from "./entities/mob.js";
import initLoop from "./loop.js";

// Configure input handling
function setupInput() {
  function handleInput(keyState, isPressed) {
    const playerEntities = entities.filter(entity =>
      entity.components.input &&
      entity.components.type?.name === 'player'
    );

    const input = playerEntities[0].components.input;
    // Map keys to input directions
    switch (keyState) {
      case 'ArrowUp':
      case 'w':
      case 'W':
        input.up = isPressed;
        break;
      case 'ArrowDown':
      case 's':
      case 'S':
        input.down = isPressed;
        break;
      case 'ArrowLeft':
      case 'a':
      case 'A':
        input.left = isPressed;
        break;
      case 'ArrowRight':
      case 'd':
      case 'D':
        input.right = isPressed;
        break;
    }
  }

  window.addEventListener("keydown", (e) => handleInput(e.key, true));
  window.addEventListener("keyup", (e) => handleInput(e.key, false));
}

// Initialize game
function init() {
  // Register systems in execution order
  register(Input);
  register(Ai);
  register(Movement);
  register(Renderer);

  // Create initial entities
  addPlayer(100, 100);
  addMob(200, 150);
  addMob(300, 200);

  // Setup input handling
  setupInput();

  // Start game loop
  initLoop();
}

// Start the game when page loads
window.addEventListener("DOMContentLoaded", init);
