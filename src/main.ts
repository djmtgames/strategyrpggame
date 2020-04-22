import * as Phaser from "phaser";
import InitialScene from "./scenes/InitialScene";

const Config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: InitialScene,
};

window.onload = () => {
  new Phaser.Game(Config);
};
