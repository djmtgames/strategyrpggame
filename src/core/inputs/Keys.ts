import SizedArray from "../../utils/SizedArray";
import { Maybe, Just, Nothing } from "purify-ts/Maybe";

export default class Keys {
  down: { [x: string]: boolean };
  history: { down: SizedArray<string>; up: SizedArray<string> };
  last: Maybe<string>;

  constructor() {
    this.down = {};
    this.last = Nothing;
    this.history = {
      up: new SizedArray(25),
      down: new SizedArray(25),
    };

    document.addEventListener("keyup", (e) => {
      this.down[e.code] = false;
      this.last = Just(e.code);
      this.history.up.push(e.code);
    });

    document.addEventListener("keydown", (e) => {
      this.down[e.code] = true;
      this.history.down.push(e.code);
    });
  }

  update(): void {
    this.last = Nothing;
  }
}
