export default abstract class GameEvent {
  abstract name: string;
  abstract display(): string;
}
