import { Tilemaps } from "phaser";

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
    this.player = this.physics.add.sprite(50, 50, "player");
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
}
