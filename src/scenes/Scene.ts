import { Game } from "../core/Game";
export default abstract class Scene {
  abstract create(g: Game): void;
  abstract update(g: Game, delta: number): void;
}
