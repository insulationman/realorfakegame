import { Tilemaps } from "phaser";
import VirtualJoyStick from "phaser3-rex-plugins/plugins/virtualjoystick";
import VirtualJoyStickPlugin from "phaser3-rex-plugins/plugins/virtualjoystick-plugin";

import themeSongUrl from "../../Assets/Audio/theme.mp3";
import playerSpriteSheetUrl from "../../Assets/SpriteSheets/mage_f.png";
import playerSpriteUrl from "../../Assets/Sprites/player.png";
import tileMapJsonUrl from "../../Assets/Tilemaps/Orust/Orust.json?url";
import tilePngUrl from "../../Assets/Tilemaps/Tiles/Serene_Village_32x32.png";

export default class OrustScene extends Phaser.Scene {
  constructor() {
    super("orust-scene");
  }
  private map!: Tilemaps.Tilemap;
  private player!: Phaser.Physics.Arcade.Sprite;
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
    this.load.audio("music", themeSongUrl);
    this.load.spritesheet("playerspritesheet", playerSpriteSheetUrl, {
      frameWidth: 32,
      frameHeight: 36,
    });
  }

  create() {
    this.initMap();
    this.initPlayer();
    this.initControls();
    this.initCameraFollow();
    this.initJoystick();
    this.initMusic();
  }

  update() {
    this.updatePlayerWithArrows();
    this.updatePlayerWithJoystick();
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

  private initPlayer(): void {
    //add the player
    this.player = this.physics.add.sprite(0, 0, "playerspritesheet", 8);
    //set the player to collide with the layer
    // this.layer.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.player, this.waterlayer);
    this.physics.add.collider(this.player, this.collidingobjectslayer);

    this.anims.create({
      key: "spin",
      frameRate: 5,
      frames: this.anims.generateFrameNumbers("playerspritesheet", {
        outputArray: [
          { frame: 0 },
          { frame: 1 },
          { frame: 2 },
          { frame: 3 },
          { frame: 4 },
          { frame: 5 },
        ],
      }),
      repeat: 1,
    });
    this.anims.create({
      key: "down",
      frameRate: 2,
      frames: this.anims.generateFrameNumbers("playerspritesheet", {
        start: 6,
        end: 8,
      }),
      repeat: -1,
    });
    // this.player.anims.play("down", true);
  }

  private initControls(): void {
    //add the controls
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  private updatePlayerWithArrows(): void {
    //move the player
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
    } else if (this.cursors.up.isDown) {
      this.player.setVelocityY(-160);
    } else if (this.cursors.down.isDown) {
      this.player.anims.play("down", true);
      this.player.setVelocityY(160);
    } else {
      this.player.anims.play("spin", true);
      this.player.setVelocityY(0);
      this.player.setVelocityX(0);
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

  //add the joystick events
  private updatePlayerWithJoystick(): void {
    const joyStick = this.joystick;
    const player = this.player;

    if (joyStick.left) {
      player.setVelocityX(-160);
    } else if (joyStick.right) {
      player.setVelocityX(160);
    }
    if (joyStick.up) {
      player.setVelocityY(-160);
    }
    if (joyStick.down) {
      player.setVelocityY(160);
    }
  }
}
