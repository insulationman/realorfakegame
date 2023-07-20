import VirtualJoyStick from "phaser3-rex-plugins/plugins/virtualjoystick";
import VirtualJoyStickPlugin from "phaser3-rex-plugins/plugins/virtualjoystick-plugin";

export class Player extends Phaser.Physics.Arcade.Sprite {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private joystick!: VirtualJoyStick;
  private cameras = this.scene.cameras;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "playerspritesheet", 0);
    this.addAnimations();
    this.initCameraFollow();
    this.initControls();
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setCollideWorldBounds(false);
    this.setBounce(0.2);
    this.setDrag(1000, 1000);
    this.setDepth(100);
    this.initJoystick();
    this.body.setSize(20, 20);
    this.body.setOffset(0, 16);
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

  public initControls(): void {
    //add the controls
    this.cursors = this.scene.input.keyboard.createCursorKeys();
  }

  public updatePlayer(): void {
    const joyStick = this.joystick;
    //move the player
    if (this.cursors.left.isDown || joyStick.left) {
      this.moveLeft();
    } else if (this.cursors.right.isDown || joyStick.right) {
      this.moveRight();
    } else if (this.cursors.up.isDown || joyStick.up) {
      this.moveUp();
    } else if (this.cursors.down.isDown || joyStick.down) {
      this.moveDown();
    } else {
      this.moveStill();
    }
  }

  private initCameraFollow(): void {
    //update the camera
    this.cameras.main.startFollow(this);
    this.cameras.main.roundPixels = true;
  }

  private initJoystick(): void {
    const joystickplugin = this.scene.plugins.get(
      "rexVirtualJoystick"
    ) as VirtualJoyStickPlugin;

    //add the joystick
    const basecircle = this.scene.add.circle(0, 0, 50, 0x888888);
    basecircle.depth = 100;
    const thumbcircle = this.scene.add.circle(0, 0, 25, 0xcccccc);
    thumbcircle.depth = 101;
    this.joystick = joystickplugin.add(this.scene, {
      x: document.body.clientWidth - 100,
      y: document.body.clientHeight - 200,
      radius: 50,
      base: basecircle,
      thumb: thumbcircle,
      dir: "4dir",
      forceMin: 16,
      enable: true,
    });
  }
}
