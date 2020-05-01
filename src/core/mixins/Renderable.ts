import { AnyConstructor, Base, Mixin } from "../../utils/Utils";
import { Game } from "../Game";

/*
 * There are a few non-obvious issues that have come up already with this approach. 
   They aren't so bad that this all needs to be reverted, but are worth considering.
 *  - We need to log an error, because this introduces a subtle amount of complexity/work
      that needs to be done for it to be successful and this cannot be enforced by the typesystem, which I don't like.
 *  - Both components (and the eventual end-module) use the pixi object, which means any new components need to
      follow this same pattern of using the pixi object internally as-is, or it doesn't work. Severly limiting what we can build.
 *  - Every ui element that is using Renderable is also using Positionable and vice-versa, so maybe they should be combined complete?
      - And just made into a generic super class?
 */
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
