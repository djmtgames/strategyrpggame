import Garlic from "./images/garlic.png";
import Gold from "./images/gold.png";
import Peasant from "./images/peasant.png";
import Container from "../ui/Container";
import Image from "../ui/Image";
import { Bounds } from "../utils/Utils";

export default class GameSceneAssets {
  defaults: Bounds = {
    x: 0,
    y: 0,
    width: 25,
    height: 25,
  };
  resourceContainerAssets(container: Container) {
    this.foodAssets(container);
    this.goldAssets(container);
    this.populationAssets(container);
  }

  private foodAssets(container: Container) {
    const asset = Image.from(Garlic).setBounds({ ...this.defaults });
    container.add(asset);
  }

  private goldAssets(container: Container) {
    const asset = Image.from(Gold).setBounds({ ...this.defaults, y: 30 });
    container.add(asset);
  }

  private populationAssets(container: Container) {
    const asset = Image.from(Peasant).setBounds({ ...this.defaults, y: 60 });
    container.add(asset);
  }
}
