import StartScene from "./src/Scenes/Start/StartScene";
// import HelloWorldScene from "./src/Scenes/HelloWorld/HelloWorldScene";
import Phaser from "phaser";
import GameScene from "./src/Scenes/Game/GameScene";

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
  scene: [StartScene, GameScene],
};

const game = new Phaser.Game(config);
