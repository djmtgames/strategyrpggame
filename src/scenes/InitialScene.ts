export default class InitialScene extends Phaser.Scene {
  game: Phaser.Game;
  info: Phaser.GameObjects.Text;
  tick: number;

  preload() {
    console.log('preload')
  }

  create() {
    this.info = this.add.text(10, 10, 'text-goes-here', { font: '12px Arial', fill: '#FFF' });
    this.tick = 0;
  }

  update() { 
    this.tick += 1;
    this.info.setText(`[TICK(${this.tick.toLocaleString()}), FPS(${Math.floor(this.game.loop.actualFps)})]`);
  }
}