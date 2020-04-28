import * as PIXI from 'pixi.js';
import { Game } from '../Game';
import { Renderable } from '../core/Components';
import Style from './Style';

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

export default class Label implements Renderable {
  private pixi: PIXI.Text = new PIXI.Text('');
  private text: string = '';

  static from(text: string): Label {
    return new Label().setText(text);
  }

  setStyle(styles: Style): this {
    this.pixi.style = styles.getPixi();
    return this;
  }

  setY(n: number): this {
    this.pixi.y = n;
    return this;
  }

  setX(n: number): this {
    this.pixi.x = n;
    return this;
  }

  setText(msg: string): this {
    this.text = msg;
    this.pixi.text = msg;
    return this;
  }

  getPixi(): PIXI.Container {
    return this.pixi;
  }

  addToStage(g: Game): void {
    g.app.stage.addChild(this.pixi);
  }
}
