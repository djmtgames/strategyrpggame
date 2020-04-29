import * as PIXI from "pixi.js";
import { NOOP } from "../utils/Utils";
import { Positionable } from "../core/mixins/Positionable";
import { Renderable } from "../core/mixins/Renderable";
import Style from "./Style";

export interface ButtonConfig {
  width: number | "__auto";
  height: number;
  text: string;
  isActive: (_: Button) => void;
  mouseover: (_: Button) => void;
  mouseout: (_: Button) => void;
  click: (_: Button) => void;
}

export class Button extends Positionable(Renderable(Object)) {
  static AUTO: "__auto" = "__auto";
  protected pixi: PIXI.Text;
  private isMouseOver = false;
  private isMouseDown: boolean = false;
  private isActive: (_: Button) => void;

  constructor(config: ButtonConfig) {
    super();
    this.isActive = config.isActive;

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

    this.pixi.on("pointerdown", () => {
      this.isMouseDown = true;
    });
  }

  mouseOver(): boolean {
    return this.isMouseOver;
  }

  mouseDown(): boolean {
    return this.isMouseDown;
  }

  setStyle(styles: Style): this {
    this.pixi.style = styles.getPixi();
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
