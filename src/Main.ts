import InitialScene from "./scenes/InitialScene";
import Game from "./Game";

const Config = {
  width: 800,
  height: 600,
  scene: InitialScene,
};

window.onload = () => {
  new Game(Config);
};
