import * as PIXI from "pixi.js";
import Style from "./Style";
import { Positionable } from "../core/mixins/Positionable";
import { Renderable } from "../core/mixins/Renderable";

class Label extends Positionable(Renderable(Array)) {
  private text: string = "";
  protected pixi: PIXI.Text = new PIXI.Text("");

  static from(text: string): Label {
    return new Label().setText(text);
  }

  setStyle(styles: Style): this {
    this.pixi.style = styles.getPixi();
    return this;
  }

  setText(msg: string): this {
    this.text = msg;
    this.pixi.text = msg;
    return this;
  }
}

export default Label;
