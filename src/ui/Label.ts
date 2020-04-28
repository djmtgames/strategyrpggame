import * as PIXI from "pixi.js";
import { Game } from "../Game";
import { Renderable } from "../core/Components";

export default class Label implements Renderable {
  readonly x: number = 0;
  readonly y: number = 0;
  private pixi: PIXI.Text = new PIXI.Text("");
  private text: string = "";

  static from(text: string): Label {
    return new Label().setText(text);
  }

  private setText(text: string): this {
    this.text = text;
    this.pixi.text = text;
    return this;
  }

  getPixi(): PIXI.Container {
    return this.pixi;
  }

  addToStage(g: Game): void {
    g.app.stage.addChild(this.pixi);
  }
}
