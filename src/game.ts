// import HelloWorldScene from "./src/Scenes/HelloWorld/HelloWorldScene";
import Phaser from "phaser";
import AnimatedTiles from "phaser-animated-tiles-phaser3.5/dist/AnimatedTiles.min.js";
import VirtualJoystickPlugin from "phaser3-rex-plugins/plugins/virtualjoystick-plugin.js";
import HaguddenScene from "./Scenes/Game/HaguddenScene";
import OrustScene from "./Scenes/Game/OrustScene";

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
    scene: [
      {
        key: "AnimatedTiles",
        plugin: AnimatedTiles,
        mapping: "AnimatedTiles",
      },
    ],
  },
  scene: [OrustScene, HaguddenScene],
};
new Phaser.Game(config);

console.log(AnimatedTiles);
