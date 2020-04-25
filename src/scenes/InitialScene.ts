import * as Pixi from "pixi.js";
export default class InitialScene {
  testText: Pixi.Text;
  info: Pixi.Text;
  tick: number;

  create(g) {
    this.tick = 0;

    this.info = new Pixi.Text("");
    this.info.x = 10;
    this.info.y = 10;

    this.testText = new Pixi.Text("Press Enter");
    this.testText.x = 300;
    this.testText.y = 400;

    //TODO: Don't pass App, but instead pass Game, and add all needed utilities into Game directly.

    g.app.stage.addChild(this.info);
    g.app.stage.addChild(this.testText);
  }

  update(g, delta) {
    this.tick += 1;
    this.info.text = `
    [ TICK(${this.tick.toLocaleString()}), 
      CURRENT_KEYS(${Object.entries(g.downKeys).filter((key) => key[1])}))
    ]`;
  }
}
