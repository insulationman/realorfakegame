import Phaser from "phaser";

export default class StartScene extends Phaser.Scene {
  constructor() {
    super("start");
  }

  create() {
    this.add.text(20, 20, "Loading..");

    setTimeout(() => {
      this.scene.start("game-scene");
    }, 2000);
  }
}
