import * as Pixi from "pixi.js";
import { Game } from "../Game";

export default class GameSceneAssets {
  resourceContainerAssets(container: Pixi.Container) {
    this.foodAssets(container);
    this.goldAssets(container);
    this.populationAssets(container);
  }

  private foodAssets(container: Pixi.Container) {
    const asset = Pixi.Sprite.from(
      require("./images/garlic.png")
    );

    asset.x = 0
    asset.y = 0;
    asset.height = 25;
    asset.width = 25;
    container.addChild(asset);
  }

  private goldAssets(container: Pixi.Container) {
    const asset = Pixi.Sprite.from(
      require("./images/gold.png")
    );

    asset.x = 0
    asset.y = 30;
    asset.height = 25;
    asset.width = 25;
    container.addChild(asset);
  }

  private populationAssets(container: Pixi.Container) {
    const asset = Pixi.Sprite.from(
      require("./images/peasant.png")
    );

    asset.x = 0
    asset.y = 60;
    asset.height = 25;
    asset.width = 25;
    container.addChild(asset);
  }
}
