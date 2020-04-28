import * as PIXI from "pixi.js";
import MenuScene from "./MenuScene";
import Scene from "./Scene";
import { Game } from "../Game";

/*
export default class InitialScene extends Scene {
  testText: PIXI.Text;
  info: PIXI.Text;
  tick: number;
  graphics: PIXI.Graphics;

  constructor() {
    super
    tick = 0;
  }

  create(g: Game) {
    g.state.register("tick", 0);

    this.info = new PIXI.Text("");
    this.info.x = 100;
    this.info.y = 100;

    this.testText = new PIXI.Text("Press Enter");
    this.testText.x = 300;
    this.testText.y = 400;
    this.testText.interactive = true;
    this.testText.cursor = "finger";
    this.testText.on("pointerover", () => {
      console.log("over");
      this.graphics.beginFill(0xff00ff);
      this.graphics.drawRect(
        this.testText.x,
        this.testText.y,
        this.testText.width,
        this.testText.height
      );
      this.graphics.endFill();
    });

    this.graphics = new PIXI.Graphics();

    g.app.stage.addChild(this.info);
    g.app.stage.addChild(this.testText);
    g.app.stage.addChild(this.graphics);
  }

  update(g: Game, delta: number) {
    g.state.map("tick", (tick: number) => tick + 1);
    this.info.text = `
    [TICK(${g.state.fetch("tick", 0).toLocaleString()}), 
     CURRENT_KEYS(Enter:${g.keys.down["Enter"]}))
     MOUSE(${g.mouse.current.pos.x},${g.mouse.current.pos.y} => ${
      g.mouse.current.buttons.left
    }
      ${g.mouse.history.pos.internals
        .map((p: { x: number; y: number }) => [p.x, p.y].join(", "))
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

*/
