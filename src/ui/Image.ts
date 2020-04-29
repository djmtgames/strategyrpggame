import * as PIXI from "pixi.js";
import { Bounds } from "../utils/Utils";
import { Positionable } from "../core/mixins/Positionable";
import { Renderable } from "../core/mixins/Renderable";

export default class Image extends Positionable(Renderable(Object)) {
  protected pixi: PIXI.Sprite;

  private constructor(path: string) {
    super();
    this.pixi = PIXI.Sprite.from(path);
    return this;
  }

  static from(path: string): Image {
    return new Image(path);
  }

  setBounds({ x, y, width, height }: Bounds): this {
    this.pixi.x = x;
    this.pixi.y = y;
    this.pixi.width = width;
    this.pixi.height = height;
    return this;
  }
}
