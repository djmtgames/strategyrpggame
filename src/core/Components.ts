import { Game } from "../Game";

export interface Renderable {
  getPixi(): PIXI.DisplayObject;
  addToStage(g: Game): void;
}
