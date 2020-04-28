import { Either, Left, Right } from "purify-ts/Either";

type DuplicateElementFoundError = "Duplicate Element Found";

export default class SizedSet<T> {
  internals: Array<T>;
  maxSize: number;

  constructor(size: number) {
    this.internals = new Array();
    this.maxSize = size;
  }

  push(elem: T): Either<DuplicateElementFoundError, this> {
    if (this.internals.indexOf(elem) > -1) {
      return Left("Duplicate Element Found");
    } else {
      if (this.internals.length < this.maxSize) {
        this.internals.push(elem);
      } else {
        this.internals.shift();
        this.internals.push(elem);
      }
      return Right(this);
    }
  }

  empty(): this {
    this.internals = [];
    return this;
  }

  forEach({ fn }: { fn: (_: T) => void }): this {
    this.internals.forEach(fn);
    return this;
  }

  contains(elem: T): boolean {
    if (this.internals.indexOf(elem) > -1) {
      return true;
    }
    return false;
  }

  length(): number {
    return this.internals.length;
  }
}
