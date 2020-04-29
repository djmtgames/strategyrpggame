import * as PIXI from "pixi.js";
export const NOOP = () => undefined;

export type Point = { x: number; y: number };
export type Size = { width: number; height: number };
export type Bounds = Point & Size;

export class Base {
  initialize<T extends Base>(props?: Partial<T>) {
    props && Object.assign(this, props);
  }

  static new<T extends typeof Base>(
    this: T,
    props?: Partial<InstanceType<T>>
  ): InstanceType<T> {
    const instance = new this();
    instance.initialize<InstanceType<T>>(props);
    return instance as InstanceType<T>;
  }
}

export type BaseConstructor = typeof Base;
export type AnyFunction<A = any> = (...input: any[]) => A;
export type AnyConstructor<A = object> = new (...input: any[]) => A;

export type Mixin<T extends AnyFunction> = InstanceType<ReturnType<T>>;

export type MixinConstructor<T extends AnyFunction> = T extends AnyFunction<
  infer M
>
  ? M extends AnyConstructor<Base>
    ? M & BaseConstructor
    : M
  : ReturnType<T>;

export type MixinFunction = (base: AnyConstructor) => AnyConstructor;
