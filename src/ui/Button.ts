import * as PIXI from "pixi.js";
import { Game } from "../Game";
import { Renderable } from "../core/Components";
import { NOOP } from "../utils/Utils";

export interface ButtonConfig {
  width: number | "__auto";
  height: number;
  text: string;
  isActive: (_: Button) => void;
  mouseover: (_: Button) => void;
  mouseout: (_: Button) => void;
  click: (_: Button) => void;
}

export class Button implements Renderable {
  static AUTO: "__auto" = "__auto";
  private pixi: PIXI.Text;
  private x: number = 0;
  private y: number = 0;
  private isMouseOver = false;
  private isMouseDown: boolean = false;
  private isActive: (_: Button) => void;

  constructor(config: ButtonConfig) {
    this.pixi = new PIXI.Text(config.text);
    this.pixi.interactive = true;
    this.pixi.buttonMode = true;
    this.pixi.on("pointerup", () => {
      config.click(this);
      this.isMouseDown = false;
    });
    this.pixi.on("pointerover", () => {
      this.isMouseOver = true;
      config.mouseover(this);
    });
    this.pixi.on("pointerout", () => {
      this.isMouseOver = false;
      config.mouseout(this);
    });
    this.pixi.on("pointerdown", () => (this.isMouseDown = true));
    this.isActive = config.isActive;
  }

  getPixi(): PIXI.Text {
    return this.pixi;
  }

  addToStage(g: Game): void {
    g.app.stage.addChild(this.pixi);
  }

  mouseOver(): boolean {
    return this.isMouseOver;
  }

  mouseDown(): boolean {
    return this.isMouseDown;
  }

  setY(n: number): this {
    this.pixi.y = n;
    return this;
  }

  setX(n: number): this {
    this.pixi.x = n;
    return this;
  }

  setStyle(styles: PIXI.TextStyle): this {
    this.pixi.style = styles;
    return this;
  }

  onClick(fn: (_: Button) => void): this {
    this.pixi.on("pointerup", () => {
      this.isMouseDown = false;
      fn(this);
    });
    return this;
  }

  update() {
    this.isActive(this);
  }
}

export const BlankButton = new Button({
  width: Button.AUTO,
  height: 0,
  text: "UNIMPLEMENTED",
  isActive: NOOP,
  mouseout: NOOP,
  mouseover: NOOP,
  click: NOOP,
});
