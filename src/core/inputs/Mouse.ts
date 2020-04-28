import SizedArray from "../../utils/SizedArray";

interface Point {
  x: number;
  y: number;
}

enum MouseButton {
  Left,
  Middle,
  Right,
  Unknown,
}

export default class Mouse {
  current: {
    pos: Point;
    buttons: { left: boolean; middle: boolean; right: boolean };
  };
  history: {
    clicks: SizedArray<{ pos: Point; button: MouseButton }>;
    pos: SizedArray<Point>;
  };

  constructor() {
    this.current = {
      pos: { x: 0, y: 0 },
      buttons: { left: false, middle: false, right: false },
    };

    this.history = {
      clicks: new SizedArray(1),
      pos: new SizedArray(100),
    };

    document.addEventListener("mousemove", (e) => {
      this.current.pos.x = e.offsetX;
      this.current.pos.y = e.offsetY;
      this.history.pos.push({ x: this.current.pos.x, y: this.current.pos.y });
    });

    document.addEventListener("mouseup", (e) => {
      let clickEvent = {
        pos: { x: this.current.pos.x, y: this.current.pos.y },
        button: MouseButton.Unknown,
      };
      switch (e.which) {
        case 1:
          clickEvent.button = MouseButton.Left;
          this.current.buttons.left = false;
          break;
        case 2:
          clickEvent.button = MouseButton.Middle;
          this.current.buttons.middle = false;
          break;
        case 3:
          clickEvent.button = MouseButton.Right;
          this.current.buttons.left = false;
          break;
        default:
          console.log("What mouse are you using?");
      }
      this.history.clicks.push(clickEvent);
    });

    document.addEventListener("mousedown", (e) => {
      switch (e.which) {
        case 1:
          this.current.buttons.left = true;
          break;
        case 2:
          this.current.buttons.middle = true;
          break;
        case 3:
          this.current.buttons.right = true;
          break;
        default:
          console.log("What mouse are you using?");
      }
    });
  }
}
