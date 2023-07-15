export class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "playerspritesheet", 0);
    this.addAnimations();
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setCollideWorldBounds(true);
    this.setBounce(0.2);
    this.setDrag(1000, 1000);
    this.setDepth(100);
  }

  public moveStill(): void {
    this.setVelocityX(0);
    this.setVelocityY(0);
    this.anims.play("spin", true);
  }

  public moveUp(): void {
    this.setVelocityY(-160);
    this.anims.play("up", true);
  }

  public moveDown(): void {
    this.setVelocityY(160);
    this.anims.play("down", true);
  }

  public moveLeft(): void {
    this.setVelocityX(-160);
    this.anims.play("left", true);
  }

  public moveRight(): void {
    this.setVelocityX(160);
    this.anims.play("right", true);
  }

  private addAnimations(): void {
    this.anims.create({
      key: "spin",
      frameRate: 2,
      frames: this.anims.generateFrameNumbers("playerspritesheet", {
        start: 0,
        end: 10,
      }),
      repeat: -1,
    });
    this.anims.create({
      key: "down",
      frameRate: 5,
      frames: this.anims.generateFrameNumbers("playerspritesheet", {
        start: 6,
        end: 8,
      }),
      repeat: -1,
    });
    this.anims.create({
      key: "up",
      frameRate: 5,
      frames: this.anims.generateFrameNumbers("playerspritesheet", {
        start: 0,
        end: 2,
      }),
      repeat: -1,
    });
    this.anims.create({
      key: "right",
      frameRate: 5,
      frames: this.anims.generateFrameNumbers("playerspritesheet", {
        start: 3,
        end: 5,
      }),
      repeat: -1,
    });
    this.anims.create({
      key: "left",
      frameRate: 5,
      frames: this.anims.generateFrameNumbers("playerspritesheet", {
        start: 9,
        end: 11,
      }),
      repeat: -1,
    });
  }
}
