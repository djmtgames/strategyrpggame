import * as PIXI from "pixi.js";
import { Game } from "../Game";
interface ButtonConfig {
  width: number;
  height: number;
  text: string;
  isActive: (_: Button) => void;
  mouseover: (_: Button) => void;
  mouseout: (_: Button) => void;
  click: (_: Button) => void;
}

export default class Button {
  pixi: PIXI.Text;
  private x: number = 0;
  private y: number = 0;
  private isMouseOver = false;
  private isActive: (_: Button) => void;

  constructor(config: ButtonConfig) {
    this.pixi = new PIXI.Text(config.text);
    this.pixi.interactive = true;
    this.pixi.buttonMode = true;
    this.pixi.on("pointerup", config.click.bind(this, this));
    this.pixi.on("pointerover", () => {
      this.isMouseOver = true;
      config.mouseover(this);
    });
    this.pixi.on("pointerout", () => {
      this.isMouseOver = false;
      config.mouseout(this);
    });
    this.isActive = config.isActive;
  }

  addToStage(g: Game): void {
    g.app.stage.addChild(this.pixi);
  }

  mouseOver(): boolean {
    return this.isMouseOver;
  }

  setY(n: number): this {
    this.pixi.y = n;
    return this;
  }

  setX(n: number): this {
    this.pixi.x = n;
    return this;
  }

  update() {
    this.isActive(this);
  }
}
