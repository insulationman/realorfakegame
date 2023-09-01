export class Ghost extends Phaser.Physics.Arcade.Sprite {
  private spritesheet!: string;
  constructor(scene: Phaser.Scene, x: number, y: number, spritesheet: string) {
    super(scene, x, y, spritesheet, 0);
    this.spritesheet = spritesheet;
    this.addAnimations();
    scene.add.existing(this);
    this.moveStill();
    this.setDepth(10);
  }

  public moveStill(): void {
    this.anims.play("spin", true);
  }

  private addAnimations(): void {
    this.anims.create({
      key: "spin",
      frameRate: 10,
      frames: this.anims.generateFrameNumbers(this.spritesheet, {
        start: 0,
        end: 10,
      }),
      repeat: -1,
    });
  }
}
