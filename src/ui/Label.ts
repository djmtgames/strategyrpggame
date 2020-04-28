import * as PIXI from "pixi.js";
import { Game } from "../Game";
import { Renderable } from "../core/Components";
import Style from "./Style";
import { Positionable } from "../utils/Utils";

class Label implements Renderable {
  private pixi: PIXI.Text = new PIXI.Text("");
  private text: string = "";

  static from(text: string): Label {
    return new Label().setText(text);
  }

  setStyle(styles: Style): this {
    this.pixi.style = styles.getPixi();
    return this;
  }

  setY(n: number): this {
    this.pixi.y = n;
    return this;
  }

  setX(n: number): this {
    this.pixi.x = n;
    return this;
  }

  setText(msg: string): this {
    this.text = msg;
    this.pixi.text = msg;
    return this;
  }

  getPixi(): PIXI.Container {
    return this.pixi;
  }

  addToStage(g: Game): void {
    g.app.stage.addChild(this.pixi);
  }
}

export default Label;
