import Phaser from "phaser";

export default class StartScene extends Phaser.Scene {
  constructor() {
    super("start");
  }

  private label!: Phaser.GameObjects.Text;
  preload() {
    this.load.image("logo", "src/Assets/Images/Rof-300-400.png");
  }

  create() {
    //set background color
    this.cameras.main.setBackgroundColor("#FFFFFF");

    this.label = this.add.text(100, 100, "", {
      font: "70px Arial",
      color: "#000000",
      wordWrap: { width: document.body.clientWidth - 200 },
    });

    this.typewriteTextWrapped(
      "Greetings traveller! \n......\nYou will go through a journey to find the lost treasure of the ancient kingdom of Real or Fake. \n......\nAre you ready?\n" +
        "Press any of the arrow keys or touch the screen to start."
    );

    this.input.keyboard.on("keydown", () => {
      this.scene.start("game-scene");
    });

    this.input.on("pointerdown", () => {
      this.scene.start("game-scene");
    });

    //This code will center the Real or fake logo dynamically
    // const logo = this.add.image(0, 0, "logo");
    //center image dynamically
    // Phaser.Display.Align.In.Center(
    //   logo,
    //   this.add.zone(
    //     document.body.clientWidth / 2,
    //     document.body.clientHeight / 2,
    //     document.body.clientWidth,
    //     document.body.clientHeight
    //   )
    // );
  }
  typewriteTextWrapped(text) {
    const lines = this.label.getWrappedText(text);
    const wrappedText = lines.join("\n");

    this.typewriteText(wrappedText);
  }

  typewriteText(text) {
    const length = text.length;
    let i = 0;
    this.time.addEvent({
      callback: () => {
        this.label.text += text[i];
        ++i;
      },
      repeat: length - 1,
      delay: 50,
    });
  }
}
