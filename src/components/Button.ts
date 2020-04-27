import * as PIXI from "pixi.js";
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
  x: number = 0;
  y: number = 0;
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

  mouseOver(): boolean {
    return this.isMouseOver;
  }

  setY(n: number) {
    this.pixi.y = n;
  }

  update() {
    this.isActive(this);
  }
}
