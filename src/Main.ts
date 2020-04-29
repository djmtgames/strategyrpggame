import InitialScene from "./scenes/InitialScene";
import { Config, Game } from "./core/Game";
import GameScene from "./scenes/GameScene";

const config: Config = {
  width: 1920,
  height: 1080,
  scene: new GameScene(),
};

window.onload = () => {
  console.log("--- Starting ---");
  new Game(config);
};
