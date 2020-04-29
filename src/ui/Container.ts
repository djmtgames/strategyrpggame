import * as PIXI from "pixi.js";
import { Positionable } from "../core/mixins/Positionable";
import { Renderable } from "../core/mixins/Renderable";

export default class Container extends Positionable(Renderable(Object)) {
  protected pixi: PIXI.Container = new PIXI.Container();
  private objects: Renderable[] = [];

  add(x: Renderable): this {
    this.objects.push(x);
    this.pixi.addChild(x.getPixi());
    return this;
  }
}
