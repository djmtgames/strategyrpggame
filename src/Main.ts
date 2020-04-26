import InitialScene from "./scenes/InitialScene";
import { Config, Game } from "./Game";

const config: Config = {
  width: 800,
  height: 600,
  scene: new InitialScene(),
};

window.onload = () => {
  console.log("--- Starting ---");
  new Game(config);
};
