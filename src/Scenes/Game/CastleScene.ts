import { Tilemaps } from "phaser";

// import themeSongUrl from "../../Assets/Audio/theme.mp3";
import AnimatedTiles from "phaser-animated-tiles-phaser3.5/dist/AnimatedTiles.min.js";
import playerSpriteSheetUrl from "../../Assets/SpriteSheets/mage_f.png";
import playerSpriteUrl from "../../Assets/Sprites/player.png";
import tileMapJsonUrl from "../../Assets/Tilemaps/Castle/Castle.json?url";

import { Dialog } from "../../Classes/Dialog";
import tilePngUrl from "../../Assets/Tilemaps/Tiles/Castle2.png";
import { Player } from "../../Classes/Player";

export default class CastleScene extends Phaser.Scene {
  constructor() {
    super("castle-scene");
  }
  private map!: Tilemaps.Tilemap;
  private player!: Player;
  private animatedTiles!: AnimatedTiles;

  private groundlayer!: Tilemaps.TilemapLayer;
  private waterlayer!: Tilemaps.TilemapLayer;
  private dynamiclayer!: Tilemaps.TilemapLayer;
  private collidingobjectslayer!: Tilemaps.TilemapLayer;
  private noncollidingobjectslayer!: Tilemaps.TilemapLayer;
  private noncollidinghigherlayer!: Tilemaps.TilemapLayer;

  preload() {
    this.cameras.main.setBackgroundColor("#FFFFFF");
    //Load tilemap
    this.load.tilemapTiledJSON("CastleTilemap", tileMapJsonUrl);
    //Load player
    this.load.image("player", playerSpriteUrl);
    // this.load.audio("music", themeSongUrl);
    this.load.spritesheet("playerspritesheet", playerSpriteSheetUrl, {
      frameWidth: 32,
      frameHeight: 36,
    });

    //Load tileset
    this.load.image("castletiles", tilePngUrl);
  }

  create() {
    this.player = new Player(this, 680, 450);
    this.initMap();
    // this.initMusic();
    // this.initCollidingActions();
    this.initCollidingActions();
    const dialog = new Dialog("You have entered a mysterious house!");
  }

  update() {
    this.player.updatePlayer();
  }

  private initMusic(): void {
    const music = this.sound.add("music");
    music.play();
  }

  private initMap(): void {
    //add the tilemap
    this.map = this.add.tilemap("CastleTilemap");
    //add the tileset
    this.map.addTilesetImage("Castle2", "castletiles");
    //create the layer
    this.groundlayer = this.map.createLayer("Ground", "Castle2", 0, 0);
    this.collidingobjectslayer = this.map.createLayer(
      "Collision",
      "Castle2",
      0,
      0
    );
    this.map.setCollisionBetween(1, 10000, true, false, "Collision");
    this.physics.add.collider(this.player, this.collidingobjectslayer);
  }

  private initCollidingActions(): void {
    const objects = this.map.createFromObjects("Interactive", {
      name: "orust",
    });

    const house = objects[0];
    //make the object transparent

    if (house) {
      this.physics.world.enable(house);
      house.removeFromDisplayList();
      //alert when the player collides with the orust collider
      this.physics.add.overlap(this.player, house, () => {
        this.events.emit('player-exit-house');
        this.scene.switch("orust-scene");
      });
    }
  }
}
