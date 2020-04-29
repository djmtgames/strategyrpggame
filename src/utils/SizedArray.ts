export default class SizedArray<T> {
  internals: Array<T>;
  maxSize: number;

  constructor(size: number) {
    this.internals = new Array();
    this.maxSize = size;
  }

  push(elem: T) {
    if (this.internals.length < this.maxSize) {
      this.internals.push(elem);
    } else {
      this.internals.shift();
      this.internals.push(elem);
    }
    return this;
  }

  last(): T {
    return this.internals[this.internals.length - 1];
  }
}
