import * as PIXI from "pixi.js";
import { Game } from "../Game";

export default class ScrollBox {
  private maxRows: number = 4;
  messages: string[] = [];
  private pContainer: PIXI.Container = new PIXI.Container();
  private pTextRows: PIXI.Text[] = [];
  onUpdate: (_: ScrollBox) => void;

  constructor(config: { onUpdate: (_: ScrollBox) => void }) {
    this.onUpdate = config.onUpdate;
    for (let index = 0; index < this.maxRows; index++) {
      const text = new PIXI.Text("---");
      text.y = 25 * (index + 1);
      this.pContainer.addChild(text);
      this.pTextRows[index] = text;
    }
  }

  addToStage(g: Game): void {
    g.app.stage.addChild(this.pContainer);
  }

  setY(n: number): this {
    this.pContainer.y = n;
    return this;
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
