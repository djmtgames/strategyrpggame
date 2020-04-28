import Garlic from "./images/garlic.png";
import Gold from "./images/gold.png";
import Peasant from "./images/peasant.png";
import Container from "../ui/Container";
import Image from "../ui/Image";

export default class GameSceneAssets {
  resourceContainerAssets(container: Container) {
    this.foodAssets(container);
    this.goldAssets(container);
    this.populationAssets(container);
  }

  private foodAssets(container: Container) {
    const asset = Image.from(Garlic).setBounds(0, 0, 25, 25);
    container.add(asset);
  }

  private goldAssets(container: Container) {
    const asset = Image.from(Gold).setBounds(0, 30, 25, 25);
    container.add(asset);
  }

  private populationAssets(container: Container) {
    const asset = Image.from(Peasant).setBounds(0, 60, 25, 25);
    container.add(asset);
  }
}
