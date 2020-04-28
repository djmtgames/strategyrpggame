export const NOOP = () => undefined;

type Constructor<T = {}> = new (...args: any[]) => T;

const Positionable = <TBase extends Constructor>(Base: TBase) => {
  return class extends Base {
    private _x: number = 0;
    private _y: number = 0;
    private pixi: PIXI.DisplayObject = new PIXI.DisplayObject();

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

    setPos({ x, y }: PIXI.Point): this {
      this._x = x;
      this._y = y;
      this.pixi.x = x;
      this.pixi.y = y;
      return this;
    }
  };
};
