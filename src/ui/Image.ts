import { Renderable } from '../core/Components';
import * as PIXI from 'pixi.js';
import { Game } from '../Game';

export default class Image implements Renderable {
  private pixi: PIXI.Sprite;

  private constructor(path: string) {
    this.pixi = PIXI.Sprite.from(path);
    return this;
  }

  static from(path: string): Image {
    return new Image(path);
  }

  setBounds(x: number, y: number, width: number, height: number): this {
    this.pixi.x = x;
    this.pixi.y = y;
    this.pixi.width = width;
    this.pixi.height = height;
    return this;
  }

  getPixi(): PIXI.Container {
    return this.pixi;
  }

  addToStage(g: Game): void {
    g.app.stage.addChild(this.pixi);
  }
}
