import InitialScene from "./scenes/InitialScene";
import { Config, Game } from "./core/Game";
import GameScene from "./scenes/GameScene";

const config: Config = {
  width: 800,
  height: 600,
  scene: new GameScene(),
};

window.onload = () => {
  console.log("--- Starting ---");
  new Game(config);
};
