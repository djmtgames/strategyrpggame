import * as PIXI from "pixi.js";
import { Positionable } from "../core/mixins/Positionable";
import { Renderable } from "../core/mixins/Renderable";
import { Base } from "../utils/Utils";

export default class ScrollBox extends Positionable(Renderable(Base)) {
  protected pixi: PIXI.Container = new PIXI.Container();
  messages: string[] = [];
  private pTextRows: PIXI.Text[] = [];
  private maxRows: number = 4;
  onUpdate: (_: ScrollBox) => void;

  constructor(config: { onUpdate: (_: ScrollBox) => void }) {
    super();
    this.onUpdate = config.onUpdate;
    for (let index = 0; index < this.maxRows; index++) {
      const text = new PIXI.Text("---");
      text.y = 25 * (index + 1);
      this.pixi.addChild(text);
      this.pTextRows[index] = text;
    }
  }

  update() {
    this.onUpdate(this);
    this.messages
      .reverse()
      .slice(0, this.maxRows)
      .forEach((message, idx) => {
        this.pTextRows[idx].text = message;
      });
  }
}
