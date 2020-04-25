import Scene from "./Scene";
import Game from "../Game";

export default class MenuScene extends Scene {
  create(g: Game) {
    console.log("Menu Called");
    console.log(g.keys.history);
  }

  update(g: Game) {
    if (g.keys.down["Escape"] === true) {
      g.replaceScene(g.previousScene);
    }
  }
}
