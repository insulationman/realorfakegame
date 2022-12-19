import { Tilemaps } from "phaser";
import VirtualJoyStickPlugin from "phaser3-rex-plugins/plugins/virtualjoystick-plugin";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("game-scene");
  }
  private map!: Tilemaps.Tilemap;
  private layer!: Tilemaps.TilemapLayer;
  private player!: Phaser.Physics.Arcade.Sprite;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

  preload() {
    //Load tilemap
    this.load.tilemapTiledJSON(
      "Ground",
      "src/Assets/Tilemaps/Json/hagudden-1.json"
    );
    //Load tileset
    this.load.image(
      "tiles",
      "src/Assets/Tilemaps/Tiles/Serene_Village_32x32.png"
    );
    //Load player
    this.load.image("player", "src/Assets/Sprites/player.png");
  }

  create() {
    this.initMap();
    this.initPlayer();
    this.initControls();
    this.initCameraFollow();
    this.initJoystick();
  }

  update() {
    this.updatePlayer();
  }

  private initMap(): void {
    //add the tilemap
    this.map = this.add.tilemap("Ground");
    //add the tileset
    this.map.addTilesetImage("villagetileset", "tiles");
    //create the layer
    this.layer = this.map.createLayer("Ground", "villagetileset", 0, 0);
  }

  private initPlayer(): void {
    //add the player
    this.player = this.physics.add.sprite(1000, 1000, "player");
    //set the player to collide with the layer
    // this.layer.setCollisionByProperty({ collides: true });
    // this.physics.add.collider(this.player, this.layer);
  }

  private initControls(): void {
    //add the controls
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  private updatePlayer(): void {
    //move the player
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
    } else {
      this.player.setVelocityX(0);
    }
    if (this.cursors.up.isDown) {
      this.player.setVelocityY(-160);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(160);
    } else {
      this.player.setVelocityY(0);
    }
  }

  private initCameraFollow(): void {
    //update the camera
    this.cameras.main.startFollow(this.player);
  }

  private initJoystick(): void {
    const joystickplugin = this.plugins.get(
      "rexVirtualJoystick"
    ) as VirtualJoyStickPlugin;

    //add the joystick
    const joystick = joystickplugin.add(this, {
      x: document.body.clientWidth - 100,
      y: document.body.clientHeight - 200,
      radius: 50,
      base: this.add.circle(0, 0, 50, 0x888888),
      thumb: this.add.circle(0, 0, 25, 0xcccccc),
      dir: "8dir",
      forceMin: 16,
      enable: true,
    });
    // joystick. .on("update", this.dumpJoyStickState, this);
  }
}
