import GameEvent from "./GameEvent";

export default class EventQueue {
  private internal: Array<GameEvent>;

  constructor() {
    this.internal = [];
  }

  add(e: GameEvent) {
    this.internal.push(e);
    return this;
  }

  all(): Array<GameEvent> {
    return this.internal;
  }
}
