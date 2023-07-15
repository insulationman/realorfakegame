import { Tilemaps } from "phaser";
import VirtualJoyStick from "phaser3-rex-plugins/plugins/virtualjoystick";
import VirtualJoyStickPlugin from "phaser3-rex-plugins/plugins/virtualjoystick-plugin";

// import themeSongUrl from "../../Assets/Audio/theme.mp3";
import playerSpriteSheetUrl from "../../Assets/SpriteSheets/mage_f.png";
import playerSpriteUrl from "../../Assets/Sprites/player.png";
import tileMapJsonUrl from "../../Assets/Tilemaps/Orust/Orust.json?url";
import tilePngUrl from "../../Assets/Tilemaps/Tiles/Serene_Village_32x32.png";
import { Player } from "../../Classes/Player";

export default class OrustScene extends Phaser.Scene {
  constructor() {
    super("orust-scene");
  }
  private map!: Tilemaps.Tilemap;
  private player!: Player;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private joystick!: VirtualJoyStick;

  private groundlayer!: Tilemaps.TilemapLayer;
  private waterlayer!: Tilemaps.TilemapLayer;
  private collidingobjectslayer!: Tilemaps.TilemapLayer;
  private noncollidingobjectslayer!: Tilemaps.TilemapLayer;
  private noncollidinghigherlayer!: Tilemaps.TilemapLayer;

  preload() {
    this.cameras.main.setBackgroundColor("#FFFFFF");
    //Load tilemap
    this.load.tilemapTiledJSON("Ground", tileMapJsonUrl);
    //Load tileset
    this.load.image("tiles", tilePngUrl);
    //Load player
    this.load.image("player", playerSpriteUrl);
    // this.load.audio("music", themeSongUrl);
    this.load.spritesheet("playerspritesheet", playerSpriteSheetUrl, {
      frameWidth: 32,
      frameHeight: 36,
    });
  }

  create() {
    this.player = new Player(this, 100, 1000);
    this.initMap();
    this.initControls();
    this.initCameraFollow();
    this.initJoystick();
    // this.initMusic();
  }

  update() {
    this.updatePlayer();
  }

  private initMusic(): void {
    const music = this.sound.add("music");
    music.play();
  }

  private initMap(): void {
    //add the tilemap
    this.map = this.add.tilemap("Ground");
    //add the tileset
    this.map.addTilesetImage("villagetileset", "tiles");
    //create the layer
    this.groundlayer = this.map.createLayer("Ground", "villagetileset", 0, 0);
  }

  private initHigherLayers(): void {
    this.noncollidinghigherlayer = this.map.createLayer(
      "NonCollidingCanWalkUnder",
      "villagetileset",
      0,
      0
    );
  }

  private initControls(): void {
    //add the controls
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  private updatePlayer(): void {
    const joyStick = this.joystick;
    //move the player
    if (this.cursors.left.isDown || joyStick.left) {
      this.player.moveLeft();
    } else if (this.cursors.right.isDown || joyStick.right) {
      this.player.moveRight();
    } else if (this.cursors.up.isDown || joyStick.up) {
      this.player.moveUp();
    } else if (this.cursors.down.isDown || joyStick.down) {
      this.player.moveDown();
    } else {
      this.player.moveStill();
    }
  }

  private initCameraFollow(): void {
    //update the camera
    this.cameras.main.startFollow(this.player);
    this.cameras.main.roundPixels = true;
  }

  private initJoystick(): void {
    const joystickplugin = this.plugins.get(
      "rexVirtualJoystick"
    ) as VirtualJoyStickPlugin;

    //add the joystick
    this.joystick = joystickplugin.add(this, {
      x: document.body.clientWidth - 100,
      y: document.body.clientHeight - 200,
      radius: 50,
      base: this.add.circle(0, 0, 50, 0x888888),
      thumb: this.add.circle(0, 0, 25, 0xcccccc),
      dir: "8dir",
      forceMin: 16,
      enable: true,
    });
  }
}
