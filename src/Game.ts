import * as Pixi from "pixi.js";
import Scene from "./scenes/Scene";
import Keys from "./Keys";
import Mouse from "./Mouse";
import StateManager from "./StateManager";

export interface Config {
  width: number;
  height: number;
  scene: Scene;
}

export class Game {
  app: Pixi.Application;
  previousScene: Scene;
  activeScene: Scene;
  keys: Keys;
  mouse: Mouse;
  state: StateManager;

  constructor(config: Config) {
    this.keys = new Keys();
    this.mouse = new Mouse();
    this.state = new StateManager();
    this.app = new Pixi.Application({ backgroundColor: 0x109bb });
    this.activeScene = config.scene;

    document.body.appendChild(this.app.view);
    this.activeScene.create(this);
    this.app.ticker.add((delta) => {
      this.activeScene.update(this, delta);
    });
  }

  display(): Pixi.Application {
    return this.app;
  }

  replaceScene(scene: Scene) {
    this.previousScene = this.activeScene;
    this.app.stage.removeChildren();
    this.activeScene = scene;
    this.activeScene.create(this);
  }
}
