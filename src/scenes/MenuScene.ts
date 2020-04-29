import Scene from "./Scene";
import { Game } from "../Game";

export default class MenuScene extends Scene {
  create(g: Game) {}

  update(g: Game) {
    if (g.keys.down["Escape"] === true && g.previousScene) {
      g.replaceScene(g.previousScene);
    }
  }
}
