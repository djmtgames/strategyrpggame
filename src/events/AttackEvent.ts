import GameEvent from "./GameEvent";

export default class AttackEvent extends GameEvent {
  name: "AttackEvent";
  private msg: string;
  constructor(msg: string) {
    super();
    this.msg = msg;
  }

  display() {
    return this.msg;
  }
}
