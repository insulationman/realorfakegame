import Phaser from "phaser";

export default class StartScene extends Phaser.Scene {
  constructor() {
    super("start");
  }

  preload() {
    this.load.image("logo", "src/Assets/Images/Rof-300-400.png");
  }

  create() {
    //set background color
    this.cameras.main.setBackgroundColor("#FFFFFF");
    // this.add.text(20, 20, "Loading..");
    const logo = this.add.image(0, 0, "logo");
    //center image dynamically
    Phaser.Display.Align.In.Center(
      logo,
      this.add.zone(
        document.body.clientWidth / 2,
        document.body.clientHeight / 2,
        document.body.clientWidth,
        document.body.clientHeight
      )
    );

    setTimeout(() => {
      this.scene.start("game-scene");
    }, 1000);
  }
}
