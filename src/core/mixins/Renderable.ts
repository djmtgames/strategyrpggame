import { AnyConstructor, Base, Mixin } from "../../utils/Utils";
import { Game } from "../../Game";

export const Renderable = <T extends AnyConstructor<object>>(base: T) =>
  class Renderable extends Base {
    protected pixi!: PIXI.DisplayObject;
    getPixi(): PIXI.DisplayObject {
      if (!this.pixi) {
        console.error(
          'PIXI object is not defined!\nMake sure the class using Renderable has a "protected" member set to "pixi".\n',
          "It should look something like:\n\n",
          "class Foo extends Renderable(Object) {\n",
          '   protected pixi: PIXI.<WHATEVER_PIXI_TYPE_I"M_USING_HERE>;\n',
          "}"
        );
      }
      return this.pixi;
    }

    addToStage(g: Game): void {
      g.app.stage.addChild(this.getPixi());
    }
  };
export type Renderable = Mixin<typeof Renderable>;
