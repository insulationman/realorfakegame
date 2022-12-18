import Phaser from "phaser";

export default class BouncingLogo {
  private image: Phaser.Physics.Arcade.Image;

  get display() {
    return this.image;
  }

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    this.image = scene.physics.add.image(x, y, texture);

    this.initialize();
  }

  private initialize() {
    this.image.setVelocity(100, 200);
    this.image.setBounce(1, 1);
    this.image.setCollideWorldBounds(true);
  }
}
