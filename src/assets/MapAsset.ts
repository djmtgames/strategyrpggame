import * as PIXI from "pixi.js";
import { Renderable } from "../core/Components";
import Map from "./maps/medieval-map.png";

export class MapAsset implements Renderable {
  app: PIXI.Application;
  mapContainer: PIXI.Container;
  bgMap: PIXI.Sprite;
  distanceX: number;
  distanceY: number;

  constructor(app: PIXI.Application) {
    this.app = app
    this.mapContainer = new PIXI.Container()
    this.bgMap = PIXI.Sprite.from(Map);
    this.bgMap.scale.x = 0.5;
    this.bgMap.scale.y = 0.5;
    
    // Starting Location
    this.bgMap.x = -475;
    this.bgMap.y = -350;

    // Movement Interval
    this.distanceX = this.app?.view.width / 2;
    this.distanceY = this.app?.view.width / 2;

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

    this.mapContainer.addChild(this.bgMap)
  }

  private moveUp(): void {
    if (this.bgMap.position.y + this.distanceY >= 0) {
      this.bgMap.position.y = 0;
    } else {
      this.bgMap.position.y += this.distanceY;
    }
  }

  private moveDown(): void {
    if (this.bgMap.position.y + this.distanceY <= 0) {
      this.bgMap.position.y = -this.app.view.height;
    } else {
      this.bgMap.position.y -= this.distanceY;
    }
  }

  private moveLeft(): void {
    if (this.bgMap.position.x + this.distanceX >= 0) {
      this.bgMap.position.x = 0;
    } else {
      this.bgMap.position.x += this.distanceX;
    }
  }

  private moveRight(): void {
    if (this.bgMap.position.x + this.distanceX <= 0) {
      this.bgMap.position.x = -this.app?.view.width;
    } else {
      this.bgMap.position.x -= this.distanceX;
    }
  }
}

export const BlankMapAsset = new MapAsset(new PIXI.Application);
