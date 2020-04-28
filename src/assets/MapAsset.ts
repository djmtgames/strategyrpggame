import * as PIXI from "pixi.js";
import { Game } from "../Game";
import { Renderable } from "../core/Components";
import Map from "./maps/medieval-map.png";

export class MapAsset implements Renderable {
  private app: PIXI.Application;
  private moveDistanceX: number;
  private moveDistanceY: number;
  private pixi: PIXI.Sprite;
  private _y: number = 0;
  private _x: number = 0;
  private _scale_y: number = 0;
  private _scale_x: number = 0;

  constructor(app: PIXI.Application) {
    this.app = app;
    this.pixi = PIXI.Sprite.from(Map);

    this.setScaleY(0.5)
        .setScaleX(0.5)
        .setY(-350)
        .setX(-475);

    this.moveDistanceX = this.app?.view.width / 2;
    this.moveDistanceY = this.app?.view.height / 2;

    document.addEventListener("keydown", (key: { keyCode: number }): void => {
      switch (key.keyCode) {
        case 87:
          this.moveUp();
          break;
        case 83:
          this.moveDown();
          break;
        case 65:
          this.moveLeft();
          break;
        case 68:
          this.moveRight();
          break;
        default:
          return;
      }
    });
  }

  private setScaleY(n: number): this {
    this._scale_y = n;
    this.pixi.scale.y = n;
    return this;
  }

  private setScaleX(n: number): this {
    this._scale_x = n;
    this.pixi.scale.x = n;
    return this;
  }

  private setY(n: number): this {
    this._y = n;
    this.pixi.y = n;
    return this;
  }

  private get y(): number {
    return this._y;
  }

  private setX(n: number): this {
    this._x = n;
    this.pixi.x = n;
    return this;
  }

  private get x(): number {
    return this._x;
  }
  
  getPixi(): PIXI.Sprite {
    return this.pixi;
  }

  addToStage(g: Game): void {
    g.app.stage.addChild(this.pixi);
  }

  private moveUp(): void {
    if (this.y + this.moveDistanceY >= 0) {
      this.setY(0);
    } else {
      this.setY(this.y + this.moveDistanceY);
    }
  }

  private moveDown(): void {
    if (this.y + this.moveDistanceY <= 0) {
      this.setY(-this.app.view.height);
    } else {
      this.setY(this.y - this.moveDistanceY);
    }
  }

  private moveLeft(): void {
    if (this.x + this.moveDistanceX >= 0) {
      this.setX(0);
    } else {
      this.setX(this.x + this.moveDistanceX);
    }
  }

  private moveRight(): void {
    if (this.x + this.moveDistanceX <= 0) {
      this.setX(-this.app?.view.width);
    } else {
      this.setX(this.x - this.moveDistanceX);
    }
  }
}

export const BlankMapAsset = new MapAsset(new PIXI.Application());
