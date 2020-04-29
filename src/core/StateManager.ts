export default class StateManager {
  private internal: {
    [x: string]: any;
  };

  constructor() {
    this.internal = {};
  }

  register(name: string, initial: any): StateManager {
    this.internal[name] = initial;
    return this;
  }

  fetch(name: string, fallback: any): any {
    return this.internal[name] || fallback;
  }

  map(name: string, fn: any): StateManager {
    this.internal[name] = fn(this.internal[name]);
    return this;
  }

  update(name: string, value: any): StateManager {
    this.internal[name] = value;
    return this;
  }
}
