import StartScene from "./src/Scenes/Start/StartScene";
// import HelloWorldScene from "./src/Scenes/HelloWorld/HelloWorldScene";
import Phaser from "phaser";
import GameScene from "./src/Scenes/Game/GameScene";
import VirtualJoystickPlugin from "phaser3-rex-plugins/plugins/virtualjoystick-plugin.js";

const config = {
  type: Phaser.AUTO,
  width: document.body.clientWidth,
  height: document.body.clientHeight,
  physics: {
    default: "arcade",
  },
  plugins: {
    global: [
      {
        key: "rexVirtualJoystick",
        plugin: VirtualJoystickPlugin,
        start: true,
      },
    ],
  },
  resolution: window.devicePixelRatio,
  scene: [StartScene, GameScene],
};

const game = new Phaser.Game(config);

const joyStick = game.plugins.get("rexVirtualJoystick");
