import * as PIXI from "pixi.js";
import Garlic from "./images/garlic.png";
import Gold from "./images/gold.png";
import Peasant from "./images/peasant.png";

export default class GameSceneAssets {
  resourceContainerAssets(container: PIXI.Container) {
    this.foodAssets(container);
    this.goldAssets(container);
    this.populationAssets(container);
  }

  private foodAssets(container: PIXI.Container) {
    const asset = PIXI.Sprite.from(Garlic);

    asset.x = 0;
    asset.y = 0;
    asset.height = 25;
    asset.width = 25;
    container.addChild(asset);
  }

  private goldAssets(container: PIXI.Container) {
    const asset = PIXI.Sprite.from(Gold);

    asset.x = 0;
    asset.y = 30;
    asset.height = 25;
    asset.width = 25;
    container.addChild(asset);
  }

  private populationAssets(container: PIXI.Container) {
    const asset = PIXI.Sprite.from(Peasant);

    asset.x = 0;
    asset.y = 60;
    asset.height = 25;
    asset.width = 25;
    container.addChild(asset);
  }
}
