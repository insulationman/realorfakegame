// import HelloWorldScene from "./src/Scenes/HelloWorld/HelloWorldScene";
import Phaser from "phaser";
import VirtualJoystickPlugin from "phaser3-rex-plugins/plugins/virtualjoystick-plugin.js";
import GameScene from "./Scenes/Game/GameScene";

const config: Phaser.Types.Core.GameConfig = {
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
  scene: [GameScene],
};
const game = new Phaser.Game(config);

const joyStick = game.plugins.get("rexVirtualJoystick");
