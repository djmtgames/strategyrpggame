import * as PIXI from "pixi.js";
import { Game } from "../Game";
import { Renderable } from "../core/mixins/Renderable";
import { Positionable } from "../core/mixins/Positionable";
import { Point } from "../utils/Utils";
import Map from "./maps/medieval-map.png";

export class MapAsset extends Positionable(Renderable(Object)) {
  protected pixi: PIXI.Sprite;
  private moveDistance: Point;
  private scale: Point = { x: 0, y: 0 };

  constructor(game: Game) {
    super();
    this.pixi = PIXI.Sprite.from(Map);

    this.setScaleY(0.5).setScaleX(0.5).setY(-350).setX(-475);

    this.moveDistance = {
      x: game.app.view.width / 2,
      y: game.app.view.height / 2,
    };
  }

  update(g: Game) {
    g.keys.last.map((keyName) => {
      switch (keyName) {
        case "KeyW":
          this.moveUp();
          break;
        case "KeyS":
          this.moveDown(g);
          break;
        case "KeyA":
          this.moveLeft();
          break;
        case "KeyD":
          this.moveRight(g);
          break;
        default:
          return;
      }
    });
  }

  private setScaleY(n: number): this {
    this.scale.y = n;
    this.pixi.scale.y = n;
    return this;
  }

  private setScaleX(n: number): this {
    this.scale.x = n;
    this.pixi.scale.x = n;
    return this;
  }

  private moveUp(): void {
    if (this.y + this.moveDistance.y >= 0) {
      this.setY(0);
    } else {
      this.setY(this.y + this.moveDistance.y);
    }
  }

  private moveDown(g: Game): void {
    if (this.y + this.moveDistance.y <= 0) {
      this.setY(-g.app.view.height);
    } else {
      this.setY(this.y - this.moveDistance.y);
    }
  }

  private moveLeft(): void {
    if (this.x + this.moveDistance.x >= 0) {
      this.setX(0);
    } else {
      this.setX(this.x + this.moveDistance.x);
    }
  }

  private moveRight(g: Game): void {
    if (this.x + this.moveDistance.x <= 0) {
      this.setX(-g.app.view.width);
    } else {
      this.setX(this.x - this.moveDistance.x);
    }
  }
}
