import * as PIXI from "pixi.js";

export default class Style {
  private pixi: PIXI.TextStyle = new PIXI.TextStyle();

  private constructor(styles: { [x: string]: string }) {
    this.pixi = new PIXI.TextStyle(styles);
  }

  static from(styles: { [x: string]: string }): Style {
    return new Style(styles);
  }

  getPixi(): PIXI.TextStyle {
    return this.pixi;
  }
}
