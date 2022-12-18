import StartScene from "./Scenes/Start/StartScene";
import HelloWorldScene from "./Scenes/HelloWorld/HelloWorldScene";
import Phaser from "phaser";

const config = {
  type: Phaser.AUTO,
  width: document.body.clientWidth,
  height: document.body.clientHeight,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
    },
  },
  scene: [StartScene, HelloWorldScene],
};

const game = new Phaser.Game(config);
