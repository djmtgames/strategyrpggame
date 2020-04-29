import * as PIXI from "pixi.js";
import Scene from "./scenes/Scene";
import Keys from "./core/inputs/Keys";
import Mouse from "./core/inputs/Mouse";
import StateManager from "./StateManager";
import EventQueue from "./events/EventQueue";

export interface Config {
  width: number;
  height: number;
  scene: Scene;
}

export class Game {
  app: PIXI.Application;
  previousScene?: Scene;
  activeScene: Scene;
  keys: Keys;
  mouse: Mouse;
  state: StateManager;
  events: EventQueue;

  constructor(config: Config) {
    this.keys = new Keys();
    this.mouse = new Mouse();
    this.state = new StateManager();
    this.events = new EventQueue();
    this.app = new PIXI.Application({ backgroundColor: 0xffffff });
    this.activeScene = config.scene;
    document.body.appendChild(this.app.view);
    this.activeScene.create(this);
    this.app.ticker.add((delta) => {
      this.activeScene.update(this, delta);
      this.keys.update();
    });
  }

  display(): PIXI.Application {
    return this.app;
  }

  replaceScene(scene: Scene) {
    this.previousScene = this.activeScene;
    this.app.stage.removeChildren();
    this.activeScene = scene;
    this.activeScene.create(this);
  }
}
