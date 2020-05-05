import Scene from "./Scene";
import { Game } from "../core/Game";
import { Occurence } from "../core/occurences/Occurence";
import { Nothing, Maybe } from "purify-ts/Maybe";

export default class OccurenceScene extends Scene {
  occurence: Maybe<Occurence>;

  constructor() {
    super();
    this.occurence = Nothing;
  }

  create(g: Game) {
    this.occurence = this.getOccurence(g);
  }

  update(g: Game, delta: number) {}

  private getOccurence(g: Game): Maybe<Occurence> {
    //Logic goes here to figure out which occurance is generated.
    return Nothing;
  }
}
