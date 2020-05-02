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
  fetch(name: string): any {
    return this.internal[name];
  }
  map(name: string, fn: any): StateManager {
    this.internal[name] = fn(this.internal[name]);
    return this;
  }
  update(name: string, value: any): StateManager {
    this.internal[name] = value;
    
    if(this.internal[name] <= 0) {
      this.internal[name] = 0;
    }
    return this;
  }
  increment(name: string, value: number): StateManager {
    this.internal[name] += value;

    if(this.internal[name] <= 0) {
      this.internal[name] = 0;
    }
    return this;
  }
  decrement(name: string, value: number): StateManager {
    this.internal[name] -= value;

    if(this.internal[name] <= 0) {
      this.internal[name] = 0;
    }
    return this;
  }
}
