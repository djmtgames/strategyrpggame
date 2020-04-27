import * as Pixi from "pixi.js";
import { Game } from "../Game";

export default class GameSceneAssets {
  constructor(g: Game) {
    this.loadFood(g);
    this.loadGold(g);
    this.loadPopulation(g);
  }

  loadFood(g: Game) {
    const asset = Pixi.Sprite.from(
      require("./images/garlic.png")
    );

    asset.x = g.app.screen.width - 130;
    asset.y = 0;
    asset.height = 25;
    asset.width = 25;
    g.app.stage.addChild(asset);
  }

  loadGold(g: Game) {
    const asset = Pixi.Sprite.from(
      require("./images/gold.png")
    );

    asset.x = g.app.screen.width - 130;
    asset.y = 30;
    asset.height = 25;
    asset.width = 25;
    g.app.stage.addChild(asset);
  }

  loadPopulation(g: Game) {
    const asset = Pixi.Sprite.from(
      require("./images/peasant.png")
    );

    asset.x = g.app.screen.width - 130;
    asset.y = 60;
    asset.height = 25;
    asset.width = 25;
    g.app.stage.addChild(asset);
  }
}
