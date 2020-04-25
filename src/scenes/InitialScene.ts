import * as Pixi from "pixi.js";
import MenuScene from "./MenuScene";
import Scene from "./Scene";
import Game from "../Game";

export default class InitialScene extends Scene {
  testText: Pixi.Text;
  info: Pixi.Text;
  tick: number;
  graphics: Pixi.Graphics;

  create(g: Game) {
    /*
      Instead of hacking the way data is created, lets create a store on the game
      which will hold references to data we actually care about.
    */
    if (this.tick === undefined) {
      this.tick = 0;
    }

    this.info = new Pixi.Text("");
    this.info.x = 100;
    this.info.y = 100;

    this.testText = new Pixi.Text("Press Enter");
    this.testText.x = 300;
    this.testText.y = 400;

    this.graphics = new Pixi.Graphics();

    g.app.stage.addChild(this.info);
    g.app.stage.addChild(this.testText);
    g.app.stage.addChild(this.graphics);
  }

  update(g: Game, delta: number) {
    this.tick += 1;
    this.info.text = `
    [TICK(${this.tick.toLocaleString()}), 
     CURRENT_KEYS(Enter:${g.keys.down["Enter"]}))
     MOUSE(${g.mouse.current.pos.x},${g.mouse.current.pos.y} => ${
      g.mouse.current.buttons.left
    }
      ${g.mouse.history.pos.internals
        .map((p) => [p.x, p.y].join(", "))
        .join("|")})
    ]`;

    if (g.keys.down["Enter"] === true) {
      g.replaceScene(new MenuScene());
    }

    this.graphics.clear();
    for (const pos of g.mouse.history.pos.internals) {
      this.graphics.beginFill(0xde3249);
      this.graphics.drawRect(pos.x, pos.y, 5, 5);
      this.graphics.endFill();
    }
  }
}
