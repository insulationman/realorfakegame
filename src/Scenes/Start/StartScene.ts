import Phaser from "phaser";

import BitmapFntUrl from "../../Assets/BitMapFonts/BitMapFont.fnt?url";
import BitmapPngUrl from "../../Assets/BitMapFonts/BitMapFont_0.png?url";
import LogoUrl from "../../Assets/Images/Rof-300-400.png";

export default class StartScene extends Phaser.Scene {
  constructor() {
    super("start");
  }

  private label!: Phaser.GameObjects.BitmapText;
  preload() {
    this.load.image("logo", LogoUrl);
    this.load.bitmapFont("BitMapFont", BitmapPngUrl, BitmapFntUrl);
  }

  create() {
    this.label = this.add.bitmapText(
      40,
      70,
      "BitMapFont",
      "Greetings \ntraveller!\n",
      16
    );

    this.typewriteText(
      "\nYour experience\nbegins with this \nexperience.\n\nYou will be \npresented with an\nancient series of\npixels. \n\nChoose wisely. \n\nChoose Real. \n\nOr choose Fake.\n\nOr choose Feke.\n\nOr choose Real \nor Fake.\n\n \n\nPress any key or\ntouch the screen \nto continue."
    );

    this.input.keyboard.on("keydown", () => {
      this.scene.start("game-scene");
    });

    this.input.on("pointerdown", () => {
      this.scene.start("game-scene");
    });
  }

  typewriteText(text: string) {
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
