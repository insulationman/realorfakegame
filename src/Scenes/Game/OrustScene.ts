import { Tilemaps } from "phaser";

// import themeSongUrl from "../../Assets/Audio/theme.mp3";
import AnimatedTiles from "phaser-animated-tiles-phaser3.5/dist/AnimatedTiles.min.js";
import playerSpriteSheetUrl from "../../Assets/SpriteSheets/mage_f.png";
import fireStripUrl from "../../Assets/SpriteSheets/sFire_strip5_32x32.png";
import playerSpriteUrl from "../../Assets/Sprites/player.png";
import tileMapJsonUrl from "../../Assets/Tilemaps/Orust/Orust.json?url";
import tilePngUrl from "../../Assets/Tilemaps/Tiles/Serene_Village_32x32.png";
import { Dialog } from "../../Classes/Dialog";
import { Player } from "../../Classes/Player";

export default class OrustScene extends Phaser.Scene {
  constructor() {
    super("orust-scene");
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
    this.load.tilemapTiledJSON("Ground", tileMapJsonUrl);

    //Load tileset
    this.load.image("tiles", tilePngUrl);
    this.load.image("fire", fireStripUrl);
    //Load player
    this.load.image("player", playerSpriteUrl);
    // this.load.audio("music", themeSongUrl);
    this.load.spritesheet("playerspritesheet", playerSpriteSheetUrl, {
      frameWidth: 32,
      frameHeight: 36,
    });
    this.load.scenePlugin(
      "animatedTiles",
      AnimatedTiles,
      "animatedTiles",
      "animatedTiles"
    );
  }

  create() {
    this.player = new Player(this, 200, 100);
    this.initMap();
    // this.initMusic();
    this.initCollidingActions();
    //get the animated tiles plugin
    this.animatedTiles.init(this.map);
    //create a dialog
    const dialog = new Dialog("Holy shit, a dialog box!");
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
    this.map = this.add.tilemap("Ground");
    //add the tileset
    this.map.addTilesetImage("villagetileset", "tiles");
    this.map.addTilesetImage("Firestrip", "fire");
    //create the layer
    this.groundlayer = this.map.createLayer("Ground", "villagetileset", 0, 0);
    this.waterlayer = this.map.createLayer("Under", "villagetileset", 0, 0);
    this.dynamiclayer = this.map.createLayer("Dynamic", "Firestrip", 0, 0);
    //load collision objects
    this.collidingobjectslayer = this.map.createLayer(
      "Colliders",
      "villagetileset",
      0,
      0
    );
  }

  private initCollidingActions(): void {
    const objects = this.map.createFromObjects("Interactive", {
      name: "house",
    });

    const house = objects[0];
    //make the object transparent

    if (house) {
      this.physics.world.enable(house);
      house.removeFromDisplayList();
      //alert when the player collides with the house
      this.physics.add.overlap(this.player, house, () => {
        this.scene.start("castle-scene");
      });
    }
  }

  private initHigherLayers(): void {
    this.noncollidinghigherlayer = this.map.createLayer(
      "NonCollidingCanWalkUnder",
      "villagetileset",
      0,
      0
    );
  }
}
