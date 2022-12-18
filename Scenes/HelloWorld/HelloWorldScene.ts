import Phaser from "phaser";
import BouncingLogo from "./BouncingLogo";

enum ImageNames {
  Sky = "sky",
  Logo = "logo",
  RedParticle = "red_particle",
}

export default class HelloWorldScene extends Phaser.Scene {
  constructor() {
    super("hello-world");
  }

  preload() {
    this.load.setBaseURL("http://labs.phaser.io");

    this.load.image(ImageNames.Sky, "assets/skies/space3.png");
    this.load.image(ImageNames.Logo, "assets/sprites/phaser3-logo.png");
    this.load.image(ImageNames.RedParticle, "assets/particles/red.png");
  }

  create() {
    this.add.image(400, 300, ImageNames.Sky);

    const emitter = this.createEmitter(ImageNames.RedParticle);
    const logo = new BouncingLogo(this, 400, 100, ImageNames.Logo);

    emitter.startFollow(logo.display);
  }

  private createEmitter(textureName: string) {
    const particles = this.add.particles(textureName);

    const emitter = particles.createEmitter({
      speed: 100,
      scale: { start: 1, end: 0 },
      blendMode: "ADD",
    });

    return emitter;
  }
}
