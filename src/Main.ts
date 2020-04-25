import * as Pixi from "pixi.js";
import InitialScene from "./scenes/InitialScene";

const Config = {
  width: 800,
  height: 600,
  scene: InitialScene,
};

class Game {
  app: Pixi.Application;
  activeScene: InitialScene;
  downKeys: { [x: string]: boolean };

  constructor(config) {
    this.downKeys = {};
    document.addEventListener("keyup", (e) => {
      //Store global map of all keys up and down
      this.downKeys[e.code] = false;
    });
    document.addEventListener("keydown", (e) => {
      //Store global map of all keys up and down
      //Be sure to store last touched key as well.
      this.downKeys[e.code] = true;
    });
    this.app = new Pixi.Application({ backgroundColor: 0x109bb });
    document.body.appendChild(this.app.view);

    this.activeScene = new config.scene();

    this.activeScene.create(this);
    this.app.ticker.add((delta) => {
      this.activeScene.update(this, delta);
    });
  }
}

window.onload = () => {
  new Game(Config);
};
