import * as PIXI from "pixi.js";
import { Game } from "../Game";
import { Renderable } from "../core/Components";

export default class Container implements Renderable {
  private pixi: PIXI.Container = new PIXI.Container();
  private objects: Renderable[] = [];
  private _x: number = 0;
  private _y: number = 0;

  get x(): number {
    return this._x;
  }

  setX(n: number): this {
    this._x = n;
    this.pixi.x = n;
    return this;
  }

  get y(): number {
    return this._y;
  }

  setY(n: number): this {
    this._y = n;
    this.pixi.y = n;
    return this;
  }

  add(x: Renderable): this {
    this.objects.push(x);
    this.pixi.addChild(x.getPixi());
    return this;
  }

  getPixi(): PIXI.Container {
    return this.pixi;
  }

  addToStage(g: Game): void {
    g.app.stage.addChild(this.pixi);
  }
}
