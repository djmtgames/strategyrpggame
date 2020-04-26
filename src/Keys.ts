import SizedArray from "./utils/SizedArray";

export default class Keys {
  down: { [x: string]: boolean };
  history: { down: SizedArray<string>; up: SizedArray<string> };

  /*
    TODO:
      - Make internal DSs private
      - Add helper methods for accessing data
  */

  constructor() {
    this.down = {};
    this.history = {
      up: new SizedArray(25),
      down: new SizedArray(25),
    };

    document.addEventListener("keyup", (e) => {
      this.down[e.code] = false;
      this.history.up.push(e.code);
    });

    document.addEventListener("keydown", (e) => {
      this.down[e.code] = true;
      this.history.down.push(e.code);
    });
  }
}
