import { AnyConstructor, Base, Mixin, Point } from "../../utils/Utils";

export const Positionable = <T extends AnyConstructor<object>>(base: T) =>
  class Positionable extends base {
    private _x: number = 0;
    private _y: number = 0;
    protected pixi!: PIXI.DisplayObject;

    get x(): number {
      return this._x;
    }

    get y(): number {
      return this._y;
    }

    setY(n: number): this {
      this.pixi.y = n;
      return this;
    }

    setX(n: number): this {
      this.pixi.x = n;
      return this;
    }

    setPos({ x, y }: Point): this {
      this._x = x;
      this._y = y;
      this.pixi.x = x;
      this.pixi.y = y;
      return this;
    }
  };
export type Positionable = Mixin<typeof Positionable>;
