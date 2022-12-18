import StartScene from "./src/Scenes/Start/StartScene";
import HelloWorldScene from "./src/Scenes/HelloWorld/HelloWorldScene";
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
