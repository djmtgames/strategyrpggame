import * as Pixi from "pixi.js";
import Scene from "./scenes/Scene";
import Keys from "./Keys";
import Mouse from "./Mouse";

export default class Game {
  app: Pixi.Application;
  previousScene: Scene;
  activeScene: Scene;
  keys: Keys;
  mouse: Mouse;

  constructor(config: { width?: number; height?: number; scene: any }) {
    this.keys = new Keys();
    this.mouse = new Mouse();

    this.app = new Pixi.Application({ backgroundColor: 0x109bb });
    document.body.appendChild(this.app.view);

    this.activeScene = new config.scene();

    this.activeScene.create(this);
    this.app.ticker.add((delta) => {
      this.activeScene.update(this, delta);
    });
  }

  replaceScene(scene: Scene) {
    this.previousScene = this.activeScene;
    this.app.stage.removeChildren();
    this.activeScene = scene;
    this.activeScene.create(this);
  }
}
