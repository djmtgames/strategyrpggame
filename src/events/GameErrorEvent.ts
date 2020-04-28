import GameEvent from "./GameEvent";

export default class GameErrorEvent extends GameEvent {
  name: "ErrorEvent" = "ErrorEvent";
  private msg: string;
  constructor(msg: string) {
    super();
    this.msg = msg;
  }

  display() {
    return this.msg;
  }
}
